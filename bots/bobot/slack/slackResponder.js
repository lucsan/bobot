const https = require('https')

const postResponse = (postBody, payload) => {
  console.log(
    'outgoing postBody -> ',
    postBody,
    ''
  )

  if (!payload.path) {
    payload.path = '/api/chat.postMessage'
  }

  if (!payload.hostname) {
    payload.hostname = 'slack.com'
  }

  console.log('payload', payload);



  const options = {
    hostname: payload.hostname,
    port: 443,
    path: payload.path,
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
      process.stdout.write('returned data to slack Responder ->\n' + d + '\n\n')
    })
  })
  
  req.on('error', (error) => {
    console.error(error)
  })
  
  req.write(postBody)
  req.end()


}

exports.postResponse = postResponse