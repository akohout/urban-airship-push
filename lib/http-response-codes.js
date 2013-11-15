/*
 * urban-airship-push
 * https://github.com/BrightSnowman/urban-airship-push
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

'use strict';

var HTTP_RESPONSE_CODES = {
    OK: {
        CODE: 200,
        HELP: 'Nice work!'
    },
    CREATED: {
        CODE: 201,
        HELP: 'An API request to create a new entity or entities was succesful, the entities were created.'
    },
    ACCEPTED: {
        CODE: 202,
        HELP: 'An API request has been succesfully accepted into a processing queue to be acted on later.'
    },
    NO_CONTENT: {
        CODE: 204,
        HELP: 'An API request was successful, but there’s no response body to return. Often seen on successful DELETE calls.'
    },
    BAD_REQUEST: {
        CODE: 400,
        HELP: 'Parsing or validating the request failed'
    },
    UNAUTHORIZED: {
        CODE: 401,
        HELP: 'Authentication information (the app key & secret) was either incorrect or missing'
    },
    FORBIDDEN: {
        CODE: 403,
        HELP: 'Authentication was correct, but the user does not have permission to access the requested API'
    },
    NOT_FOUND: {
        CODE: 404,
        HELP: 'Returned when a request is made for a non-existent entity.'
    },
    METHOD_NOT_ALLOWED: {
        CODE: 405,
        HELP: 'Returned when a request is made using an HTTP method not supported by the endpoint. For example, sending a DELETE to /api/schedules.'
    },
    UNACCEPTABLE: {
        CODE: 406,
        HELP: 'Return when the client requests a version of the API which cannot be satisfied, because no compatible version is currently deployed.'
    }
};

module.exports = HTTP_RESPONSE_CODES;
