/*
 * urban-airship-push
 * https://github.com/BrightSnowman/urban-airship-push
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

'use strict';

var DeviceInformationApi = require('./api/device-information');
var DeviceRegistrationApi = require('./api/device-registration');
var FeedApi = require('./api/feed');
var LocationApi = require('./api/location')
var PushApi = require('./api/push');
var ReportsApi = require('./api/reports');
var ScheduleApi = require('./api/schedule');
var SegmentsApi = require('./api/segments');
var TagApi = require('./api/tag');

/**
 * Initializes the Urban Airship Push module. This will make the supported
 * Urban Airship APIs available under the here created object.
 *
 * The APIs
 * are mapped as follows:
 * - deviceInformation: Represents the UA Device Information API.
 * - deviceRegistration: Represents the UA Device Registration API.
 * - feed: Represents the UA Feed API.
 * - location: Represents the UA Location API.
 * - push: Represents the UA Push API.
 * - reports: Represents the UA Reports API.
 * - schedule: Represents the UA Schedules API.
 * - segments: Represents the UA Segments API.
 * - tag: Represents the UA Tag API.
 *
 * @param accessConfiguration An object containing key, secret and masterSecret
 * properties, where these properties define the authorization information
 * of your account. All 3 parameters are necessary to make the communication
 * with Urban Airship work.
 * @constructor
 */
var UrbanAirshipPush = function (accessConfiguration) {
    var requiredConfigurationParams = ['key', 'secret', 'masterSecret'];
    var requiredConfigurationParamsLength = requiredConfigurationParams.length;
    var missingParams = false;
    for (var i = 0; i < requiredConfigurationParamsLength; ++i) {
        if (!accessConfiguration.hasOwnProperty(requiredConfigurationParams[i] ||
                !accessConfiguration[requiredConfigurationParams[i]])) {
            missingParams = true;
            console.log('Missing access configuration parameter ' + requiredConfigurationParams[i]);
        }
    }

    if (missingParams) {
        console.log('Configuration is incomplete, this will cause problems when communication with Urban Airship');
    }

    this.deviceInformation = new DeviceInformationApi(accessConfiguration);
    this.deviceRegistration = new DeviceRegistrationApi(accessConfiguration);
    this.feed = new FeedApi(accessConfiguration);
    this.location = new LocationApi(accessConfiguration);
    this.push = new PushApi(accessConfiguration);
    this.reports = new ReportsApi(accessConfiguration);
    this.schedule = new ScheduleApi(accessConfiguration);
    this.segments = new SegmentsApi(accessConfiguration);
    this.tag = new TagApi(accessConfiguration);
};

module.exports = UrbanAirshipPush;
