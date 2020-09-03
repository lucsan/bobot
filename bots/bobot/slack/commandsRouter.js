const goatme = require('../slack/commands/goatme')
const slackForm = require('../slack/forms/dialogme')

const route = (slackReply, response) => {
  if (slackReply.command === '/goatme') {
    response.writeHead(200, {"Content-Type" : 'text/html;charset=utf-8'})
    response.write(goatme.reply(slackReply.user_name, slackReply.text))
    response.end()
    return { replyType: false }
  }

  if (slackReply.command === '/dialogme') {
    response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8' })
    response.end()
    return slackForm.reply(slackReply)
  }

}

exports.route = route