/*
 * urban-airship-push
 * https://github.com/BrightSnowman/urban-airship-push
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

'use strict';

var HTTP_RESPONSE_CODES = require('./http-response-codes');
var https = require('https');


var isValidMethod = function (method) {
    var ALLOWED_METHODS = ['POST', 'GET', 'PUT', 'DELETE'];
    return ALLOWED_METHODS.indexOf(method) !== -1;
};

var isValidStatusCode = function (statusCode) {
    for (var key in HTTP_RESPONSE_CODES) {
        if (HTTP_RESPONSE_CODES[key].CODE === statusCode) {
            return true;
        }
    }

    return false;
};

var printError = function (statusCode, error) {
    console.error('***** ERROR in Urban Airship Push:', error);

    for (var key in HTTP_RESPONSE_CODES) {
        if (HTTP_RESPONSE_CODES[key].CODE === statusCode) {
            console.error('Hint: ' + HTTP_RESPONSE_CODES[key].HELP);
        }
    }
};

/**
 * Sends an HTTPS request to the Urban Airship Push Notifications API v3.
 *
 * The function deals with
 * - doing the HTTP Basic Authentication for you
 * - defines that you only use V3 of their API
 * - the answer from the API is parsed and returned as object
 *
 * @param connectionOptions An options object that gives the flexibility
 * to use this method for every API request. The object therefore needs
 * to define a number of properties:
 * - method: The HTTP method to be used (e.g. GET or POST)
 * - path: The path of the API method to be used (e.g. /api/push).
 * - expectedStatusCode: Every API defines what HTTP status code is returned
 * if the call is successful. You pass this value here so that the caller
 * doesn't have to check for this - it's done for you and the callback
 * gets called with an error object (in case the value isn't as expected)
 * or with a data object.
 * - auth: An object containing the Urban Airship key, secret and masterSecret
 * properties.
 * - useMasterAuth: Some API calls use the secret, some use the master
 * secret. You can control what to use with this simple boolean value.
 * Setting to a truthy value will cause to use the master secret, a falsy
 * value will cause that the function uses the normal secret.
 * @param body The payload of the function, i.e., an object that is structured
 * as in the API docs. The function will produce a JSON string out of it
 * and send it to the API (if needed). If your API call does not need any
 * payload you can set this value to a falsy value (undefined, false, null).
 * @param callback A function that will be called when the API answers. The
 * callback will retrieve as first parameter an error object in case of
 * error, or null if everything worked well. The second parameter will be
 * an object that was returned by the API. This will contain the ok
 * parameter and everything else that Urban Airship defines.
 */
var sendRequest = function (connectionOptions, body, callback) {
    var request;
    var requestData = body ? JSON.stringify(body) : undefined;
    var requestOptions = {
        host: 'go.urbanairship.com',
        headers: {
            Accept: 'application/vnd.urbanairship+json; version=3;'
        }
    };

    if (!isValidMethod(connectionOptions.method)) {
        callback(new Error('Incorrect method'));
        return;
    }

    if (!isValidStatusCode(connectionOptions.expectedStatusCode)) {
        callback(new Error('Incorrect Status Code'));
        return;
    }

    requestOptions.path = connectionOptions.path;
    requestOptions.method = connectionOptions.method;
    requestOptions.auth = connectionOptions.auth.key + ':';
    if (connectionOptions.useMasterAuth) {
        requestOptions.auth += connectionOptions.auth.masterSecret
    } else {
        requestOptions.auth += connectionOptions.auth.secret;
    }

    if (requestData) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.headers['Content-Length'] = Buffer.byteLength(requestData, 'utf8');
    }

    request = https.request(requestOptions, function (response) {
        var rawResponseData = '';
        var parsedResponseData;

        response.setEncoding('utf8');

        response.on('data', function(data) {
            rawResponseData += data;
        });

        response.on('end', function() {
            try {
                parsedResponseData = JSON.parse(rawResponseData);
            }
            catch (e) {
                console.error('Error while parsing answer from UA', rawResponseData, e);
            }

            if (response.statusCode === connectionOptions.expectedStatusCode) {
                callback(null, parsedResponseData ? parsedResponseData : rawResponseData);
            } else {
                printError(response.statusCode, parsedResponseData ? parsedResponseData.error : rawResponseData);
                callback(new Error('Unexpected answer'));
            }
        });

        response.on('error', function (error) {
            callback(error);
        });
    });

    if (requestData) {
        request.write(requestData);
    }

    request.end();
};

module.exports = {
    sendRequest: sendRequest
};
