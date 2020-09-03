const https = require('https')

const postResponse = (payload) => {
  console.log('outgoing payload', payload)

  let postBody = ''

  if (payload.replyType === 'text') {
    postBody = JSON.stringify({
      token: payload.token,
      channel: payload.event.channel,
      text: payload.reply
    })    
  }

  if (payload.replyType === 'blocks') {
    postBody = JSON.stringify({
      token: payload.token,
      trigger_id: payload.trigger_id,
      channel: payload.channel_id,
      blocks: payload.reply
    })    
  }



  const options = {
    hostname: 'slack.com',
    port: 443,
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Content-Length': postBody.length,
      'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
    }
  }

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', (d) => {
      process.stdout.write('returned data ' + d + '\n')
    })
  })
  
  req.on('error', (error) => {
    console.error(error)
  })
  
  req.write(postBody)
  req.end()


}

exports.postResponse = postResponse