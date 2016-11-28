var qs = require("querystring");
var twilio = require('twilio');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var formValues = qs.parse(req.body);

    var twiml = new twilio.TwimlResponse();
    twiml.message('You said: ' + formValues.Body);

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
