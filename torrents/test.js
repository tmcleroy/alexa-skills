const index = require('./index.js');

const context = {
  succeed: function (data) {
    console.log('SUCCESS');
    console.log(data);
  }
};

const request = {
  "session": {
    "sessionId": "SessionId.4499063b-2a36-4567-a90d-89a0e5e365b2",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.b41cb7f5-87a5-4236-a6ea-3fcc1b3ee6bb"
    },
    "user": {
      "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QGQQFAOA5OIYRAV3XN44YITEBXFNCE3Q5PQ4M4SJC42M5ZLSPHPNHF3MURRDT46INTFAIGS2AJX2RUKZGUEP5UYGLMQ3PFIDWQJEU3WD2W5H4LPSDIUSKDPTLIKONL277DIIW6Z3XLTX5NR6ZLQM4SW7C6NI"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.234a11bc-c0cc-46f2-a241-028d724669f7",
    "timestamp": "2016-04-06T00:01:31Z",
    "intent": {
      "name": "SearchIntent",
      "slots": {
        "Query": {
          "name": "Query",
          "value": "game of thrones"
        }
      }
    }
  },
  "version": "1.0"
};

index.handler(request, context);
