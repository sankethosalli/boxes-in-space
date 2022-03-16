import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import createNotification from "../assets/nativelib/js/notification";
import { makeHTTPPOSTRequest } from "../services/http";
const cookie = require("../services/cookie");
const config = require("../configs/config");

const Login = () => {
  const [data, setData] = useState({
    "Email Id": "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setData({ ...data, [name]: value });
  };

  function validateForm() {
    return data["Email Id"].length > 0 && data.Password.length > 0;
  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    return makeHTTPPOSTRequest(`${config.api.apiBaseUrl}/auth/login`, {
      "Email Id": data["Email Id"],
      Password: data.Password,
    })
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          // resetInputs();
          cookie.createCookie("jwtToken", response.data.jwtToken, 100);

          createNotification({
            title: "Succesful",
            message: "Login Succesful",
            type: "success",
            container: "top-right",
          });

          window.location.pathname = "/";
        } else {
          cookie.createCookie("jwtToken", "jwtToken", 100);
          if (response.err) {
            const errList = response.err;

            for (let i = 0; i < errList.length; i++) {
              for (const [key, value] of Object.entries(errList[i])) {
                // console.log(key, value);
                createNotification({
                  title: value.errorTitle,
                  message: value.errorMsg,
                  type: value.errorType,
                  container: "top-right",
                });
              }
            }
          } else if (response.errorMsg) {
            createNotification({
              title: response.errorTitle,
              message: response.errorMsg,
              type: response.errorType,
              container: "top-right",
            });
          } else {
            createNotification({
              title: "Error",
              message: "Unknown Error Occured",
              type: "danger",
              container: "top-right",
            });
          }
        }
      })
      .catch((err) => {
        // logger.debug({ err }, "");
        createNotification({
          title: "Error",
          message: "Unknown Error Occured",
          type: "danger",
          container: "top-right",
        });
      });
  };

  return (
    <div className="Login">
      <div className="Wrapper">
        <h3>Login</h3>
        <br />

        <form onSubmit={handleInputSubmit}>
          <Form.Group size="lg">
            <Form.Label>
              Email <sup className="compulsory-field">*</sup>
            </Form.Label>
            <input
              className="form-control"
              name="Email Id"
              autoFocus
              type="email"
              value={data["Email Id"]}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group size="lg">
            <Form.Label>
              Password <sup className="compulsory-field">*</sup>
            </Form.Label>
            <input
              className="form-control"
              name="Password"
              type="password"
              value={data.Password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </form>

        <br />
        {/* <p className="text-center">
          Forgot Password ? &nbsp;<Link to="/forgot-password/">Click Here</Link>
        </p> */}

        <p className="text-center">
          Don't have an Account ? &nbsp;<Link to="/register/">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
