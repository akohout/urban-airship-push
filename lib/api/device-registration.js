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

};

var urbanAirshipConnection = require('./../urban-airship-connection');

/**
 * Create a DeviceRegistrationApi object that abstracts from the
 * Urban Airship Device Registration API V3.
 *
 * See http://docs.urbanairship.com/reference/api/v3/registration.html
 * for more information.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account.
 * @constructor
 */
var DeviceRegistrationApi = function (accessConfiguration) {
    this.accessConfiguration = accessConfiguration;
};

module.exports = DeviceRegistrationApi;
