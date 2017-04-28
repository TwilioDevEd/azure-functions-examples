const qs = require("querystring");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const formValues = qs.parse(req.body);

  const twiml = new MessagingResponse();
  twiml.message('You said: ' + formValues.Body);

  res = {
    status: 200,
    body: twiml.toString(),
    headers: { 'Content-Type': 'application/xml' },
    isRaw: true
  };

  context.done(null, res);
};
