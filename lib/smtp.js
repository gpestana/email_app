var email = require('emailjs'),
login     = require('./login.js')


var server = email.server.connect({
  user: login.user,
  password: login.pass,
  host: login.host,
  ssl: true
})

var message = {
  text:    "Here it goes",
  from:    "me <me@gmail.com>",
  to:      "you <g6pestana@gmail.com>",
  subject: "Testing e-mails",
  attachment: []
}

var send  = function(attachment) {

  var msg_to_send = message
  msg_to_send.attachment.push(attachment) 

  server.send(message, function(err, msg) {
    console.log(err || msg)
  })
}

exports.send = send
