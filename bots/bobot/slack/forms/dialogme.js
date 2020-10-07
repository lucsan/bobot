const reply = (payload) => {
  payload.replyType = 'blocks'
  payload.reply = slackForm
  return payload
}

const response = (payload) => {
  console.log('dialogme payload response', payload);
  payload.replyType = 'text'

  if (payload.actions[0].value === 'dialogme_1') {
    payload.reply = "You clicked me"
    return payload
  }

  if (payload.actions[0].value === 'dialogme_2') {
    payload.reply = `Boo You didn't click me`
    return payload
  }

}

const slackForm = [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Dialog Me",
				"emoji": true
			}
		},
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "A message *with some bold text* and _some italicized text_. And some buttons"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "click me",
            "emoji": true
          },
          "value": "dialogme_1"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "no click me",
            "emoji": true
          },
          "value": "dialogme_2"
        }
      ]
    }
  ]

exports.reply = reply
exports.response = response