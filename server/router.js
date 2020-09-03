/**
 * router.js - routes requests.
 */

const slackRouter = require('../bots/bobot/slack/slackRouter')

const route = (request, response) => {
  let data = []

  request.on('data', (chunk) => {
    data.push(chunk)
  })

  request.on('end', () => {
    if (request.url === '/test') handleTest(data, response)

    // && request.method === 'POST'
    if (request.url.indexOf('slack') === 1) {
      slackRouter.route(request.url, data, response)
    }

  })

}

const handleTest = (data, response) => {
  console.log('data', data.toString());      
  response.writeHead(200, {"Content-Type" : 'text/html;charset=utf-8'})
  response.write('tested')
  response.end()
}

exports.route = route