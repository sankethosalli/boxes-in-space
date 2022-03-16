import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Signup.css';
// import "../assets/exporter";
const config = require('../config');


const Signup = () => {

  const [userRegistration, setUserRegistration] = useState({
      firstName:"",
      lastName:"",
      emailId:"",
      password:"",
    });
  
    
    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      // console.log(name, value);
      setUserRegistration({ ...userRegistration, [name]: value});
    };


    function validateForm() {
      const newRecords = {...userRegistration};
      const emailId = newRecords.emailId;
      const password = newRecords.password;
      return emailId.length > 0 && password.length > 0;
    }
    
      
    function handleSubmit(event) {
        event.preventDefault();

const newRecords = {...userRegistration};
const firstName = newRecords.firstName;
const lastName = newRecords.lastName;
const emailId = newRecords.emailId;
const password = newRecords.password;

        axios
  .post(`${config.PROTOCOL_DOMAIN}/auth/signup`, {
      firstName,lastName,emailId,password
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  });
      }
    
        return (
            <div className="Signup">
                <div className="Wrapper">
                
                <h3>Register</h3>
                <br/>


                <form onSubmit={handleSubmit}>
                <Form.Group size="lg" >
            <Form.Label>First Name</Form.Label>
            <input
            className="form-control"
            name="firstName"
              autoFocus
              type="text"
              value={userRegistration.firstName}
              onChange={handleInput}
            />
          </Form.Group>


          <Form.Group size="lg" >
            <Form.Label>Last Name</Form.Label>
            <input
            className="form-control"
            name="lastName"
              autoFocus
              type="text"
              value={userRegistration.lastName}
              onChange={handleInput}
            />
          </Form.Group>


                <Form.Group size="lg" >
            <Form.Label>Email <sup className="compulsory-field">*</sup></Form.Label>
            <input
            className="form-control"
            name="emailId"
              autoFocus
              type="email"
              value={userRegistration.emailId}
              onChange={handleInput}
            />
          </Form.Group>

                <Form.Group size="lg" >
            <Form.Label>Password <sup className="compulsory-field">*</sup></Form.Label>
            <input
            className="form-control"
            name="password"
              type="password"
              value={userRegistration.password}
              onChange={handleInput}
            />
          </Form.Group>

                
<Button block size="lg" type="submit" className="btn btn-dark btn-lg btn-block" disabled={!validateForm()}>
Register
</Button>

                
                <br/>
                <p className="text-center">
                    Already registered ? &nbsp;<Link to="/login/" >LogIn</Link>
                </p>
                
            </form>
            </div>
            </div>
        );
    
};

export default Signup;
