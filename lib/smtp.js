var email = require('emailjs'),
login     = require('../configs/login.js'),
config    = require('../configs/config.js')

var fs = require('fs')

var server = email.server.connect({
  user: login.user,
  password: login.pass,
  host: login.host,
  ssl: true,
  port: 465
})

var send = function(data, attachment, cb) { 

  console.log("[smtp] sending mail+attachment")

  console.log(data.dest_mail)

  var message = {
   text:    data.message,
   from:    config.sender_name+" <"+config.sender_mail+">",
   to:      data.dest_mail+" <"+data.dest_mail+">",
   cc:      "orders@thecatchbox.com",
   subject: data.subject,
   attachment: [attachment]
  }

  server.send(message, function(err, msg) {
    cb(err, msg) 
  })

}


exports.send = send
