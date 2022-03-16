import React, { useState } from "react";
// import PropTypes from 'prop-types';
import { Router, Route, Switch } from "react-router";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";

import "./Body.css";
const logger = require("../../log/log");

const Body = (props) => {
  // function toggleUrlAdd() {
  //   const urlAddNegate = !urlAdd.value;

  //   setUrlAdd(() => {
  //     return { value: urlAddNegate };
  //   });
  //   props.setUrlAdd(() => {
  //     return { value: urlAddNegate };
  //   });
  // }

  return (
    <div className="Body">
      {/* <div>{urlAdd.value === true ? <div>true</div> : <div>false</div>}</div>
      <button className="btn btn-primary" onClick={() => toggleUrlAdd()}>
        ToggleUrlAdd
      </button> */}
      <div className="container-fluid">
        <div className="row up-space"></div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <Route
              exact
              path="/dashboard/"
              exact
              component={() => <Dashboard toggle={props.toggle} />}
            ></Route>
            <Route
              exact
              path="/profile/"
              exact
              component={() => <Profile />}
            ></Route>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  );
};

// Body.propTypes = {

// };

export default Body;
