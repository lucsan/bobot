const qs = require('querystring')

const responder = require('../../../server/responder')
const bobotEvents = require('../bobotSlackEvents')
const bobotInteract = require('../bobotSlackInteract')
const commandsRouter = require('./commandsRouter')

const route = (uri, data, response) => {
  if (uri === '/slack/command') commands(data, response)
  if (uri === '/slack/events') events(data, response)
  if (uri === '/slack/interact') interactions(data, response)
}

const interactions = (data, response) => {

  response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8' })
  response.end()

  const qsString = qs.parse(data.toString())
  const payload = bobotInteract.perform(qsString.payload.replace('`', ''))
  sendPayload(payload)
}


const commands = (data, response) => {
  const payload = commandsRouter.route(qs.parse(data.toString()), response)
  if (payload.replyType !== false) { sendPayload(payload) }
}

const events = (data, response) => {

  const payload = bobotEvents.perform(JSON.parse(data.toString()))

  response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8' })
  if (payload.type === 'url_verification') {
    response.write(payload.challenge) 
  }
  response.end()

  sendPayload(payload)

}

const sendPayload = (payload) => {

  if (payload === undefined || payload.reply === undefined || !payload.reply) return

  if (payload.replyType === 'text') {
    responder.postResponse(payload)
    return
  }

  if (payload.replyType === 'blocks') {
    responder.postResponse(payload)
    return    
  }
}

exports.route = route