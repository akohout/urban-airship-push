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
    FEEDBACK: '/api/device_tokens/feedback?since='
};

var urbanAirshipConnection = require('./../urban-airship-connection');
var util = require('util');

/**
 * Create a DeviceInformationApi object that abstracts from the
 * Urban Airship Device Information API V3.
 *
 * See http://docs.urbanairship.com/reference/api/v3/device_information.html
 * for more information.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account.
 * @constructor
 */
var DeviceInformationApi = function (accessConfiguration) {
    this.accessConfiguration = accessConfiguration;
};

module.exports = DeviceInformationApi;
