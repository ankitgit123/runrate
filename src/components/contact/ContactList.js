import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ContactList = ({ allTodos, setTodosChange }) => {
  const [contacts, setContacts] = useState([]); //useState to set todos to

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setContacts(allTodos);
  }, [contacts]);


  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length !== 0 &&
            contacts[0].id !== null &&
            contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContact(contactId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapDispatchToProps = {
    getNews: getNews(),
    deleteContact:deleteContact(contactId)
};

const mapStateToProps = (state) => ({
    contacts: state.contactReducer.contact,
});

export default connect(mapStateToProps,mapDispatchToProps)(ContactList);