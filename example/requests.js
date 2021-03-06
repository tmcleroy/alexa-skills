module.exports = [
  {
    request: {
      // copy this from the Amazon developer console
      "session": {
        "sessionId": "SessionId.b75be623-0055-4397-b892-744aac7a8640",
        "application": {
          "applicationId": "amzn1.echo-sdk-ams.app.d765a3e4-cdc9-4bc0-9331-98809ea660b9"
        },
        "user": {
          "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QGRMWL333237OU2AVMO32G3JRIQCQ6ZI7QEDAUQGEOQWF4K7QL7UN5M5VRX7G6ZNPVTRCOURJCL7VIMT5ZF6Y6VJQZMGZXNNXNITQ4JYGIZJSLSWU44LDVKB5IDJRDU7AE23RSO56MEAVB4E3Q7PP3XJKVXI"
        },
        "new": true
      },
      "request": {
        "type": "IntentRequest",
        "requestId": "EdwRequestId.741a1fa2-3fae-4e54-b239-c4673125273a",
        "timestamp": "2016-04-06T01:40:40Z",
        "intent": {
          "name": "StreamIntent",
          "slots": {}
        }
      },
      "version": "1.0"
    },
    // function to test if the response is correct
    // just return true if a successful return is sufficient
    test: data => {
      const a = data.response.outputSpeech.ssml.indexOf('The top streamers of') > -1;
      const b = data.response.outputSpeech.ssml.indexOf('<break strength="strong"/>') > -1;
      return a && b;
    }
  }
]
