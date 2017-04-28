const qs = require("querystring");
const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const formValues = qs.parse(req.body);
  // Insert spaces between numbers to aid text-to-speech engine
  const phoneNumber = formValues.From.replace(/\+/g, '').split('').join(' ');

  const twiml = new VoiceResponse();
  twiml.say('Your phone number is: ' + phoneNumber);

  res = {
    status: 200,
    body: twiml.toString(),
    headers: { 'Content-Type': 'application/xml' },
    isRaw: true
  };

  context.done(null, res);
};
