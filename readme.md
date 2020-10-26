# ⚙ Bobot Bot router with Slack capability #

[Intro](#Intro)

[Configuring the server](Configuring-the-server)

[Bot like responses](#Bot-like-responses)

[Using Bobot](#Using-Bobot)


## Intro ##

Bobot (Bobert) is a signal router with minimal chat bot capability. It is a stream line routing system, which picks up  incomming signals, routes them to the appropriate signaler (eg: Slack or Teams) and returns a response to the responder depennding on the requirments of the signaler.

For example:-
A slack slash command can either return a text message directly, or a something (like a poll) which requres further transactions (eg: an event or interaction). Bobot returns a 200 to the signaler (or a text message with a 200) and uses a responder to originate a signal itself.

## Configuring the server ##

Make a start or run bash script (eg: start.sh) with:

export SLACK_BOT_TOKEN = 'Yor-token'
node server/start.js


## Bot like responses ##

Bobot is capable of simple bot-like responses using a simple tool called a hinter which parses incomming text for keywords.

## Using Bobot ##

This version requires a couple of things;
Somewhere to live. I'm using it from my desktop routing signals via ngrok.
Node. Bobot is writen in latest node.
Slack. While Bobot could do Teams or any other tool, I have target Slack first and you will need to set up a Slack Bot (application), in your slack account. In slack you will need to set the callback uri, and add the commands, these can be found in slack/commandRouter.js and are;
/goatme
/dialogme
/roster

Once wired up to a channel Bobot will also respond to @bobot