import React from "react";
import { makeHTTPGETRequestAuthorized } from "../services/http";
import createNotification from "../assets/nativelib/js/notification";
const logger = require("../log/log");
const config = require("../configs/config");

const parseRedirectorPath = (pathname) => {
  return pathname.slice(pathname.lastIndexOf("r/") + 2);
};

function UrlRedirector(props) {
  // logger.debug({ path: props.path }, "UrlRedirector");
  const rPath = parseRedirectorPath(window.location.pathname);
  // logger.debug({ rPath }, "UrlRedirector");

  const fetchUrlRedirectionData = () => {
    makeHTTPGETRequestAuthorized(
      `${config.api.apiBaseUrl}/shortener/fetch-url/?short_url=${rPath}`,
      {}
    )
      .then((response) => {
        // logger.debug({ re: response }, "");
        if (response.message === "success") {
          const data = response.data;
          // logger.debug({ data }, "fetchUrlRedirectionData");
          window.location.href = data[0].full_url;
        } else {
          createNotification({
            title: "Error",
            message: "Unknown Error Occured",
            type: "danger",
          });
        }
      })
      .catch((err) => {
        // logger.debug({ err }, "");
        createNotification({
          title: "Error",
          message: "Unknown Error Occured",
          type: "danger",
        });
      });
  };
  fetchUrlRedirectionData();

  return (
    <div>
      <div className="container">Redirecting...</div>
    </div>
  );
}

export default UrlRedirector;
