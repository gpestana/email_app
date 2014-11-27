var email = require('emailjs'),
login     = require('./login.js')

var fs = require('fs')


var server = email.server.connect({
  user: login.user,
  password: login.pass,
  host: login.host,
  ssl: true
})

var send = function(mail_dest, attachment, cb) { 

  console.log("[smtp] sending mail+attachment")

  var message = {
   text:    "Here it goes",
   from:    "me <me@gmail.com>",
   to:      "you <"+mail_dest+">",
   subject: "Testing e-mails",
   attachment: [attachment]
  }

  server.send(message, function(err, msg) {cb(err, msg) })

}


exports.send = send
