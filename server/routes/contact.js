const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all todos and name
router.get("/", authorize, async (req, res) => {
  try {

    // get todo name and description for a specified user id
    const user = await pool.query(
      "SELECT u.user_name, t.name, t.email,t.phonenumber FROM users AS u LEFT JOIN contacts AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo, using authorize middleware
router.post("/contact", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { name,email,phonenumber } = req.body;
    const contact = await pool.query(
      "INSERT INTO contacts (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, name,email,phonenumber]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
router.delete("/contact/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await pool.query(
      "DELETE FROM contacts WHERE contact_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This contact is not yours");
    }

    res.json("Contact was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;