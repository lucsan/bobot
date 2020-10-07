/*
config.js - global config values for noddy.
*/

var env = process.env.NODE_ENV || 'development'

var server = {
  port: 8800,
  remarks: true,
}

var testServer = {
  port: 8808
}

var log = {
  on: true,
  to: 'cli', // Output messages to cli or file.
  path: '',// path for noddy.log file.
  file: 'noddy.log' // log file name.
}

exports.server = server
exports.testServer = testServer
exports.log = log
