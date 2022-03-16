// import logo from "./logo.svg";
import "./App.css";

import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { StaticRouter } from "react-router";

import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";

//''all'', components are cuurently imported only for the testing purpose.
import Home from "./components/Home";
import Footer from "./components/footer/Footer";
import About from "./components/About";
import UrlRedirector from "./components/UrlRedirector";
import Users from "./components/Users";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import { makeHTTPPOSTRequest } from "./services/http";
const cookie = require("./services/cookie");
const config = require("./configs/config");
const logger = require("./log/log");

function App() {
  const [authStatus, setAuthStatus] = useState(() => false);
  // logger.debug({ authStatus }, "App");

  const checkAuth = () => {
    const jwtToken = cookie.readCookie("jwtToken");
    // logger.debug({ jwtToken }, "auth");
    return makeHTTPPOSTRequest(`${config.api.apiBaseUrl}/auth/authorize`, {
      jwtToken,
    })
      .then((response) => {
        // logger.debug(
        //   {
        //     response,
        //     pathname: window.location.pathname,
        //     // lgb: window.location.pathname === "/login/",
        //     // rgb: window.location.pathname === "/register/",
        //   },
        //   "auth"
        // );
        if (response.message === "success") {
          // resetInputs();
          setAuthStatus(() => true);
          // logger.debug(window.location.pathname, "window.location.pathname");
          if (
            window.location.pathname === "/login/" ||
            window.location.pathname === "/login"
          ) {
            window.location.pathname = "/";
          } else if (
            window.location.pathname === "/register/" ||
            window.location.pathname === "/register"
          ) {
            // logger.debug("Changing From Regger");
            window.location.pathname = "/";
          }
        } else {
          cookie.createCookie("jwtToken", "jwtToken", 100);
          setAuthStatus(() => false);
          // window.location.pathname = "/login/";

          const a = window.location.pathname === "/register/";
          const b = window.location.pathname === "/register";
          // xor gate for only one of a and b

          if (
            window.location.pathname !== "/login/" &&
            (!a || b) &&
            (a || !b)
          ) {
            window.location.pathname = "/login/";
          }
        }
      })
      .catch((err) => {
        // logger.debug(window.location.pathname, "err:window.location.pathname");
        const a = window.location.pathname === "/register/";
        const b = window.location.pathname === "/register";
        // xor gate for only one of a and b

        if (window.location.pathname === "/register") {
          window.location.pathname = "/register/";
        } else if (
          window.location.pathname !== "/login/" &&
          (!a || b) &&
          (a || !b)
        ) {
          window.location.pathname = "/login/";
        }

        // logger.error({ err }, "auth");
      });
  };
  checkAuth();

  return (
    <div className="App">
      <ReactNotification />
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>

            <Route path="/login/">
              <Login />
            </Route>
            <Route path="/register/">
              <Register />
            </Route>
            <Route path="/forgot-password/">
              <ForgotPassword />
            </Route>

            {authStatus === true ? (
              <div>
                <Route path="/">
                  <Home />
                </Route>
                <Route path="/r/">
                  <UrlRedirector />
                </Route>
              </div>
            ) : (
              <div></div>
            )}
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
