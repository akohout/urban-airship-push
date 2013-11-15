/*
 * urban-airship-push
 * https://github.com/BrightSnowman/urban-airship-push
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

'use strict';

var HTTP_RESPONSE_CODES = require('./../http-response-codes');
var REST_ENDPOINTS = {
    PUSH: '/api/push',
    VALIDATE_PUSH: '/api/push/validate'
};

var urbanAirshipConnection = require('./../urban-airship-connection');

/**
 * Create a ScheduleApi object that abstracts from the Urban Airship Schedules
 * API V3.
 *
 * See http://docs.urbanairship.com/reference/api/v3/push.html
 * for more information.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account.
 * @constructor
 */
var PushApi = function (accessConfiguration) {
    this.accessConfiguration = accessConfiguration;
};

/**
 * Validate the push data to see whether the structure is ok.
 *
 * See http://docs.urbanairship.com/reference/api/v3/push.html#validate
 * for more information.
 *
 * @param pushData An object that is send for validation.
 * @param callback A callback function that is called after the request
 * has been made. It will receive as first parameter an error object in
 * case of an error, or null if everything worked out well. The second
 * parameter will be the answer returned by the Urban Airship API.
 */
PushApi.prototype.validate = function (pushData, callback) {
    var options = {
        path: REST_ENDPOINTS.VALIDATE_PUSH,
        method: 'POST',
        expectedStatusCode: HTTP_RESPONSE_CODES.OK.CODE,
        useMasterAuth: true,
        auth: this.accessConfiguration
    };
    urbanAirshipConnection.sendRequest(options, pushData, callback);
};

/**
 * Send a push notification immediately to your receivers.
 *
 * See http://docs.urbanairship.com/reference/api/v3/push.html#push
 * for more information.
 *
 * @param pushData An object that is send to the receivers.
 * @param callback A callback function that is called after the request
 * has been made. It will receive as first parameter an error object in
 * case of an error, or null if everything worked out well. The second
 * parameter will be the answer returned by the Urban Airship API.
 */
PushApi.prototype.send = function (pushData, callback) {
    var options = {
        path: REST_ENDPOINTS.PUSH,
        method: 'POST',
        expectedStatusCode: HTTP_RESPONSE_CODES.ACCEPTED.CODE,
        useMasterAuth: true,
        auth: this.accessConfiguration
    };
    urbanAirshipConnection.sendRequest(options, pushData, callback);
};

module.exports = PushApi;
