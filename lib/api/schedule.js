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
    SCHEDULED_PUSH: '/api/schedules'
};

var urbanAirshipConnection = require('./../urban-airship-connection');

/**
 * Create a ScheduleApi object that abstracts from the Urban Airship Schedules
 * API V3.
 *
 * See http://docs.urbanairship.com/reference/api/v3/schedule.html
 * for more information.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account.
 * @constructor
 */
var ScheduleApi = function (accessConfiguration) {
    this.accessConfiguration = accessConfiguration;
};

/**
 * Send the scheduled push data to the UA Api.
 *
 * See http://docs.urbanairship.com/reference/api/v3/schedule.html#schedule-a-notification
 * for more information.
 *
 * @param pushData An object that is send to the schedules push.
 * @param callback A callback function that is called after the request
 * has been made. It will receive as first parameter an error object in
 * case of an error, or null if everything worked out well. The second
 * parameter will be the answer returned by the Urban Airship API.
 */
ScheduleApi.prototype.push = function (pushData, callback) {
    var options = {
        path: REST_ENDPOINTS.SCHEDULED_PUSH,
        method: 'POST',
        expectedStatusCode: HTTP_RESPONSE_CODES.CREATED.CODE,
        useMasterAuth: true,
        auth: this.accessConfiguration
    };
    urbanAirshipConnection.sendRequest(options, pushData, callback);
};

module.exports = ScheduleApi;
