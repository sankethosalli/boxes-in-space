import React from "react";
import "./Topnav.css";
import { Avatar, IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import { useState, useEffect } from "react";
// import { Router, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
// import ReactMegaMenu from "react-mega-menu";
// import MegaMenu from "react-awesome-mega-menu";
const logger = require("../../log/log");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function Topnav(props) {
  // false: inactive
  // true: active
  const [profileIcon, setProfileIcon] = useState(() => false);

  const [pathname, setPathname] = useState(() => window.location.pathname);

  const [toggle, setToggle] = useState(() => {
    return {
      url: props.toggle.url,
      category: props.toggle.category,
    };
  });

  function toggleUrl() {
    const negate = !toggle.url;

    setToggle(() => {
      return { ...toggle, url: negate };
    });
    props.setToggle(() => {
      return { ...toggle, url: negate };
    });
  }

  function toggleCategory() {
    const negate = !toggle.category;

    setToggle(() => {
      return { ...toggle, category: negate };
    });
    props.setToggle(() => {
      return { ...toggle, category: negate };
    });
  }

  return (
    <div>
      <div className="topnav_wrapper">
        <div className="topnav__left">
          <Link to="/dashboard/">
            <IconButton>
              <img draggable="false" src="/logo.png" className="logo" />
            </IconButton>
          </Link>
          {pathname === "/dashboard" || pathname === "/dashboard/" ? (
            <span>
              <IconButton onClick={() => toggleUrl()}>
                {toggle.url === false ? (
                  <span>Add Url</span>
                ) : (
                  <span>Hide Url</span>
                )}
              </IconButton>
              <IconButton onClick={() => toggleCategory()}>
                {toggle.category === false ? (
                  <span>Add Category</span>
                ) : (
                  <span>Hide Category</span>
                )}
              </IconButton>
            </span>
          ) : (
            <span></span>
          )}
        </div>

        <div className="topnav__right">
          <Link
            // onFocus = {setProfileIcon(()=>true)}
            // onBlur = {setProfileIcon(()=>false)}
            to="/profile/"
          >
            <IconButton
              // onFocus = {setProfileIcon(()=>true)}
              // onBlur = {setProfileIcon(()=>false)}
              style={{ borderRadius: 50 }}
            >
              {profileIcon ? (
                <AccountCircleIcon
                  onClick={() => {
                    // logger.debug(window.location.pathname);
                    setPathname(window.location.pathname);
                  }}
                  className="account-icon"
                />
              ) : (
                <AccountCircleOutlinedIcon
                  onClick={() => {
                    // logger.debug(window.location.pathname);
                    setPathname(window.location.pathname);
                  }}
                  className="account-icon"
                />
              )}
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topnav;
