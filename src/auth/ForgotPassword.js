import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  
    function validateForm() {
      return email.length > 0
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
    return (
      <div className="ForgotPassword">

<div className="Wrapper">

        <h2>Forgot Password ?</h2>
        <br/>
        <h5>Don't Worry, we will help you.</h5>
        <br/>

        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          
          
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Send Magic Link
          </Button>

          
          <Button className="btn btn-info" block size="lg" type="submit" disabled={!validateForm()}>
            Send Password Reset Link
          </Button>
        </Form>

<br/>
        <p className="text-center">
        Yo, I just remembered my Password 🤔 <br/> <Link to="/login/" >Go Back To <b>Login</b></Link>
                </p>

        
        </div>
      </div>
    );
  };

export default ForgotPassword;
