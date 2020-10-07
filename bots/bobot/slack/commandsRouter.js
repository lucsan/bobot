const goatme = require('../slack/commands/goatme')
const slackForm = require('../slack/forms/dialogme')
const roster = require('../slack/interactions/roster')

const route = (slackReply, response) => {
  if (slackReply.command === '/goatme') {
    respond(response, goatme.reply(slackReply.user_name, slackReply.text))
    return { replyType: false }
  }

  if (slackReply.command === '/dialogme') {
    respond(response)
    return slackForm.reply(slackReply)
  }

  if (slackReply.command === '/roster') {
    respond(response)
    return roster.reply(slackReply)
  }

}

const respond = (response, message = '') => {
  response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8' })
  if (message) {
    response.write(message)
  }
  response.end()
}

exports.route = route