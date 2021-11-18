import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setContact } from '../../store/contact/contact.action';
import { loginUser } from "../store/user/user.action";

const InputForm = ({ 
    history, 
    loginUser, 
    loginError,
    isAuthenticated,
 }) => {
    const [contactData, setContactData] = useState({ fullName: "",email:"", contact: "" ,});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
          }
    }, [isAuthenticated,history]);

    function handleChange(event) {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setErrors(prevData => ({
            ...prevData,
            [name]: ""
        }));
    }

    function formIsValid() {
        const { email, password } = userData;
        const errors = {};

        if (!email) errors.email = "*Email is required";
        if (!password) errors.password = "*Password is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        props.setContact(contactData);
    }

    return (
        <div className="input-form">
            <Form onSubmit={handleSave}>
                <Form.Group controlId="fullName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        name="fullName"
                        value={contactData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName ? <div className="form-error">{errors.fullName}</div> : null}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder=""
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                    />
                    {errors.email ? <div className="form-error">{errors.email}</div> : null}
                </Form.Group>
                <Form.Group controlId="formBasicCOntact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder=""
                        name="contact"
                        value={contactData.contact}
                        onChange={handleChange}
                    />
                    {errors.contact ? <div className="form-error">{errors.contact}</div> : null}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

const mapDispatchToProps ={
    setContact: setContact(contact)
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated,
    loginError:state.users.loginError
});

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);