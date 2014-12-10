var email = require('emailjs'),
login     = require('./login.js'),
config    = require('../configs/config.js')

var fs = require('fs')

var server = email.server.connect({
  user: login.user_send,
  password: login.pass_send,
  host: login.host_send,
  ssl: true
})

var send = function(data, attachment, cb) { 

  console.log("[smtp] sending mail+attachment")

  var message = {
   text:    data.message,
   from:    config.sender_name+" <"+config.sender_mail+">",
   to:      data.dest_mail+" <"+data.dest_mail+">",
// bbc:     data.bbc_mail,
   subject: data.subject,
   attachment: [attachment]
  }

  server.send(message, function(err, msg) {
    cb(err, msg) 
  })

}


exports.send = send
