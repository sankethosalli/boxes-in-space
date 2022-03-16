const Promise = require('bluebird');
const requestPromise = require('request-promise');
// const logger = require('../log/log');


exports.makeHTTPGETRequest = (url, queryString) => {
    const transactionRequestOptions = {
        method: 'GET',
        url,
        qs: queryString,
        json: true,
        resolveWithFullResponse: true,
        simple: false,
    };
    return requestPromise(transactionRequestOptions)
    .then((response) => {
        // logger.debug({ url, statusCode: response.statusCode }, '[makeHTTPGETRequest][then]');
        return Promise.resolve(response);
    })
    .catch((error) => {
        // logger.error({ url, err: error}, '[makeHTTPGETRequest][catch]');
        return Promise.reject(error);
    });
};

exports.makeHTTPGetRequestBA = (url) => {
    const accessToken = '';
    const requestOptions = {
        method: 'GET',
        url,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        resolveWithFullResponse: true,
        simple: false,
    };

    return requestPromise(requestOptions)
        .then((response) => {
            // logger.debug({ url, statusCode: response.statusCode }, '[makeHTTPGetRequestBA][then]');
            return Promise.resolve(response);
        })
        .catch((error) => {
            // logger.error({ url, err: error }, '[makeHTTPGetRequestBA][catch]');
            return Promise.reject(error);
        });
};

exports.makeHTTPPOSTRequest = (url, params) => {
    alert("url: ",url);
    alert("params: ",params);
    const transactionRequestOptions = {
        method: 'POST',
        url,
        body: params,
        json: true,
        resolveWithFullResponse: true,
        simple: false,
    };

    return requestPromise(transactionRequestOptions)
    .then((response) => {
        // logger.debug({ url, statusCode: response.statusCode }, '[makeHTTPPOSTRequest][then]');
        return Promise.resolve(response);
    })
    .catch((error) => {
        // logger.error({ url, err: error}, '[makeHTTPPOSTRequest][catch]');
        return Promise.reject(error);
    });
};

exports.makeHTTPPOSTRequestBA = (url, params) => {
    const accessToken = '';
    const transactionRequestOptions = {
        method: 'POST',
        url,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: params,
        json: true,
        resolveWithFullResponse: true,
        simple: false,
    };
    return requestPromise(transactionRequestOptions)
        .then((response) => {
            // logger.debug({ url, statusCode: response.statusCode }, '[makeHTTPPOSTRequestBA][then]');
            return Promise.resolve(response);
        })
        .catch((error) => {
            // logger.error({ url, err: error}, '[makeHTTPPOSTRequestBA][catch]');
            return Promise.reject(error);
        });
};