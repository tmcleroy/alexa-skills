var http = require('http');
var cheerio = require('cheerio');

// var APP_ID = "YOUR APP ID";

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        // if (event.session.application.applicationId !== APP_ID) {
        //   console.log("DAT ID", event.session.application.applicationId);
        //   context.fail("Invalid Application ID");
        // }

        if (event.session.new) {
          onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
              context.succeed(buildResponse(sessionAttributes, speechletResponse));
            });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
              context.succeed(buildResponse(sessionAttributes, speechletResponse));
            });
        } else if (event.request.type === "SessionEndedRequest") {
          onSessionEnded(event.request, event.session);
          context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
  console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
  console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
  // Add cleanup logic here
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
  console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);

  // Dispatch to your skill's launch.
  getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
  console.log("onIntent requestId=" + intentRequest.requestId + ", sessionId=" + session.sessionId);

  var intent = intentRequest.intent,
      intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
  if ('DmxIntent' === intentName) {
    dmxIntent(intent, session, callback);
  } else if ("AMAZON.HelpIntent" === intentName) {
    getHelpResponse(callback);
  } else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
    callback({}, buildExitResponse());
  } else {
    throw "Invalid intent";
  }
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
  // If we wanted to initialize the session to have some attributes we could add those here.
  var sessionAttributes = {};
  var cardTitle = "Welcome";
  var speechOutput = "This skill will tell you whether or not DMX is in jail. Try asking if DMX is in jail";
  // If the user either does not reply to the welcome message or says something that is not
  // understood, they will be prompted again with this text.
  var repromptText = "Please ask me if dmx is in jail by saying: Alexa ask the warden if DMX is in jail";
  var shouldEndSession = false;

  callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getHelpResponse(callback) {
  // If we wanted to initialize the session to have some attributes we could add those here.
  var sessionAttributes = {};
  var cardTitle = "Help";
  var speechOutput = "This skill will tell you whether or not DMX is in jail. Try asking if DMX is in jail";
  // If the user either does not reply to the welcome message or says something that is not
  // understood, they will be prompted again with this text.
  var repromptText = "Please ask me if dmx is in jail by asking if DMX is in jail";
  var shouldEndSession = false;

  callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function dmxIntent (intent, session, callback) {
  var cardTitle = 'Warden: is DMX in jail?';
  http.get('http://isdmxinjail.com', function (res) {
    res.on('data', function (d) {
      var $ = cheerio.load(d);
      var response = $('#main h1').text();
      callback({}, buildSpeechletResponse(cardTitle, response, 'No', true));
    });
  });
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    card: {
      type: "Simple",
      title: "Lake Travis - " + title,
      content: "Current Status: " + output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildExitResponse() {
  return {
    outputSpeech: {
      type: "PlainText",
      text: "Goodbye"
    },
    shouldEndSession: true
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
