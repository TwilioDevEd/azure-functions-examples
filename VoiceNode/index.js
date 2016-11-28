var qs = require("querystring");
var twilio = require('twilio');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var formValues = qs.parse(req.body);
    // Insert spaces between numbers to aid text-to-speech engine
    var phoneNumber = formValues.From.replace(/\+/g, '').split('').join(' ');

    var twiml = new twilio.TwimlResponse();
    twiml.say('Your phone number is: ' + phoneNumber);

    res = {
        status: 200,
        body: twiml.toString(),
        headers: {
            'Content-Type': 'application/xml'
        },
        isRaw: true
    };
    context.done(null, res);
};
