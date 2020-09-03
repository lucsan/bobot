/**
 * Server.js - the server engine for bobot.
 *
 * This is a minimalistic server.
 * Much of the work is done in router.js
 */

const http = require("http")

const router = require('./router')
const datatron = require('./datatron')

const start = () => {
  http.createServer(onRequest).listen(config.web.port)
  tools.log('note', 'server started on localhost:' + config.web.port)
  function onRequest(request, response) {
    request.on('error', function(err){
      tools.log('error', 'request', err)
    });
    router.route(request, response)
  }
  datatron.loadFileData()
}

exports.start = start
