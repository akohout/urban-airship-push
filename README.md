# urban-airship-push

An API wrapper for urban airship push notifications, based on Urban Airship
Push API V3.

The wrapper is thought to support the complete Urban Airship Push API in
its current version. Currently, only the push is supported (since it's the
most important one).

The following list shows which APIs are implemented at the moment:

* Push API: Complete
* Schedules API: Scheduled Push
* Tag API: Not yet supported
* Feed API: Not yet supported
* Reports API: Not yet supported
* Device Information API: Not yet supported
* Device Registration API: Not yet supported
* Segments API: Not yet supported

In version 3 you don't have to explicitly register devices if you're using the
Urban Airship libraries on your mobile application. It will perform the
registration for you! Most of the APIs are nice to have and thus, currently
the focus lies on the good stuff: Sending Pushes.

## Getting Started
Install the module with: `npm install urban-airship-push`

```javascript
// Require the module. The module provides a constructor function as main
// entry object.
var UrbanAirshipPush = require('urban-airship-push.js');

// Your app access configuration. You will find this stuff in your App
// Settings under App Key, App Secret and App Master Secret.
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};

// Create a push object
var urbanAirshipPush = new UrbanAirshipPush(testConfig);
```

## Documentation

The module provides a constructor function, which provides the following
functionality after instantiating.

### API Objects

The constructor encapsulates all Urban Airship Push APIs,
which are itself encapsulated in a separate object. The following objects are
 available:

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

// urbanAirshipPush.deviceInformation represents the Device Information API
// urbanAirshipPush.deviceRegistration represents the Device Registration API
// urbanAirshipPush.feed represents the Feed API
// urbanAirshipPush.location represents the Location API
// urbanAirshipPush.push represents the Push API
// urbanAirshipPush.reports represents the Reports API
// urbanAirshipPush.schedule represents the Schedules API
// urbanAirshipPush.segments represents the Segments API
// urbanAirshipPush.tag represents the Tag API
```

### Push API: Validate

The Push API currently implements the following methods.

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

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
urbanAirshipPush.push.validate(pushData, callback);
```

### Push API: Push

The Push API currently implements the following methods.

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

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
urbanAirshipPush.push.send(pushData, callback);
```

### Schedules API: Push

The Push API currently implements the following methods.

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

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
urbanAirshipPush.schedule.push(pushData, callback);
```

## Examples

All code snippets can be copied & pasted and should work out of the box. You
only have to enter your app's credentials.

### Push API

Send a Push Notification to your people: (see http://docs.urbanairship.com/reference/api/v3/push.html#push for API details)

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

var pushInfo = {
    device_types: 'all',
    audience: 'all',
    notification: {
        alert: 'Blubb blub bla'
    }
};

urbanAirshipPush.push.send(pushInfo, function (err, data) {
    if (err) {
        // Handle error
        return;
    }

    console.log(data);
});
```

Validate your Push Notification information before you send:
(http://docs.urbanairship.com/reference/api/v3/push.html#validate for API details)

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

var pushInfo = {
    device_types: 'all',
    audience: 'all',
    notification: {
        alert: 'Blubb blub bla'
    }
};

urbanAirshipPush.push.validate(pushInfo, function (err, data) {
    if (err) {
        // Handle error
        return;
    }

    console.log(data);
});
```

### Schedules API

Send a scheduled push notification: (see http://docs.urbanairship.com/reference/api/v3/schedule.html#schedule-a-notification for more details)

```javascript
var UrbanAirshipPush = require('urban-airship-push.js');
var config = {
    key: 'XXX',
    secret: 'YYY',
    masterSecret: 'ZZZ'
};
var urbanAirshipPush = new UrbanAirshipPush(testConfig);

var scheduleData = {
    "schedule" : {
        "local_scheduled_time" : "2015-04-01T12:00:00"
    },
    "push" : {
        "audience" : "all",
        "notification" : { "alert" : "OH HAI FUTURE PEOPLEZ" },
        "device_types" : "all"
    }
};

urbanAirshipPush.schedule.push(scheduleData, function (err, data) {
    if (err) {
        // Handle error
        return;
    }

    console.log(data);
});
```

## Contributing

Any contributions to complete the API wrapper are warmly welcome!

* Fork the repo and implement the missing functionality
* There are stub objects for all APIs supported by Urban Airship. Use these
stubs in the same style the push and the schedule API have been implemented.
* Write a nodeunit test for your functionality in the urban-airship-push_test
.js file. You can use the provided test credentials, it's a dummy account.
* Send your implemented functionality as Pull Request.


## Release History

### 0.1.0 15.11.2013

Init Release. Supported APIs:
* Push API: Complete
* Schedules API: Scheduled Push
* Stub Objects for all other APIs

## License

Copyright (c) 2013 Alexander Kohout
Licensed under the MIT license.
