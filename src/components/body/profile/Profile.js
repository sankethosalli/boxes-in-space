import React from "react";
const cookie = require("../../../services/cookie");
const config = require("../../../configs/config");

const Profile = () => {
  document.title = "Aspt | Profile";

  // currently simple cookie clearing is done
  // later a cached session specific server will be maintained for more robust authorization and authentication
  const logout = () => {
    cookie.eraseCookie("jwtToken");
    window.location.pathname = "/login/";
  };

  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
        className="btn btn-outline-indigo"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
