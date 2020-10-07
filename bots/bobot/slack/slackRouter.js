const qs = require('querystring')

const responder = require('./slackResponder')
const testResponder = require('../../../tests/slackTestResponder')
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
  console.log('interactions (slackRouter) outgoing payload', payload);
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

  let postBody = ''

  const channel = payload.channel_id
  //if (!channel && payload.event.channel) channel = payload.event.channel
  //if (!channel && payload.container.channel_id) channel = payload.container.channel_id
  //const channel = payload.channel_id ? payload.channel_id : payload.event.channel

  // block_actions payload.container.channel_id
  
  if (payload.replyType === 'text') {
    postBody = JSON.stringify({
      token: payload.token,
      channel,
      text: payload.reply
    })    
  }

  if (payload.replyType === 'blocks') {
    postBody = JSON.stringify({
      token: payload.token,
      trigger_id: payload.trigger_id,
      channel,
      blocks: payload.reply
    })
  }

  if (payload.replyType === 'view') {
    postBody = JSON.stringify({
      token: payload.token,
      trigger_id: payload.trigger_id,
      channel,
      view: payload.reply
    })
  }

  if (!payload.trigger_id || payload.trigger_id.indexOf('test.') === -1) {
    responder.postResponse(postBody, payload)
    return
  }
  testResponder.postResponse(postBody, payload)

}

exports.route = route