const reply = (params) => {
  params.replyType = 'blocks'
  params.reply = slackForm
  return params
}

const slackForm = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "A message *with some bold text* and _some italicized text_."
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
          "value": "click_me_1"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "no click me",
            "emoji": true
          },
          "value": "click_me_2"
        }
      ]
    }
  ]

  exports.reply = reply