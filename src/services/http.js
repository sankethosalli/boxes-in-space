import axios from "axios";
// const Promise = require('bluebird');
// const requestPromise = require('request-promise');
const logger = require("../log/log");
const cookie = require("../services/cookie");
const config = require("../configs/config");

export const makeHTTPGETRequest = (url, params) => {
  const headers = {
    // Authorization: "authToken",
    "Content-Type": "application/json",
    // 'X-CSRFToken':'',
    // 'apiKey':config.api.apiKey,
  };
  // console.log("ent123:headers: ", headers);
  return axios
    .get(url, params, {
      withCredentials: false,
      headers,
    })
    .then((res) => {
      const responseBody = res.data;
      return responseBody;
    });
};

export const makeHTTPGETRequestAuthorized = (url, params) => {
  const headers = {
    "Content-Type": "application/json",
    // 'X-CSRFToken':'',
    // 'apiKey':config.api.apiKey,
    Authorization: cookie.readCookie("jwtToken"),
  };
  // logger.debug(headers, "headers:GET");
  return axios.get(url, { headers }).then((res) => {
    const responseBody = res.data;
    return responseBody;
  });
};

export const makeHTTPPOSTRequest = (url, params) => {
  // const csrftoken = this.getCookie('csrftoken');
  const headers = {
    "Content-Type": "application/json",
    // 'X-CSRFToken':'',
    // apiKey: config.api.apiKey,
  };
  // console.log("ent123:headers: ", headers);
  return axios
    .post(url, params, {
      withCredentials: false,
      headers,
    })
    .then((res) => {
      const responseBody = res.data;
      return responseBody;
    });
};

export const makeHTTPPOSTRequestAuthorized = (url, params) => {
  const headers = {
    "Content-Type": "application/json",
    // 'X-CSRFToken':'',
    // 'apiKey':config.api.apiKey,
    Authorization: cookie.readCookie("jwtToken"),
  };
  // logger.debug(headers, "headers:POST");
  return axios
    .post(url, params, {
      // withCredentials: false,
      headers: headers,
    })
    .then((res) => {
      const responseBody = res.data;
      return responseBody;
    });
};
