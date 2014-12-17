var Imap  = require('imap'),
inspect   = require('util').inspect,
login     = require('../configs/login.js')

var ext_cb
var imap = new Imap({
  user: login.user, 
  password: login.pass,
  host: login.imap,
  port: 993,
  tls: true,
  keepalive: true 
})


var connect = function(cb) {
  ext_cb = cb
  imap.connect()
}

exports.connect = connect


/*
 *  private
 */

var openInbox = function(cb) {
  imap.openBox('INBOX', true, cb)
}

imap.once('ready', function(){
  fetchMail()
})

imap.on('mail', function(res) {
  fetchMail(function(data) {
    ext_cb(data)
  })
})



var fetchMail = function(cb) {
  openInbox(function(err, box){
    if(err) throw err

    var f = imap.seq.fetch(box.messages.total + ':*',
          { bodies: ['TEXT'] })
   
    f.on('message', function(msg, seqno) {
      var prefix = '[#' + seqno + ']';
      var data = ''
 
      msg.on('body', function(stream, info) {
        //parse email streams
        var buffer = ''
        stream.on('data', function(chunk) {
          buffer = buffer+chunk.toString('utf8')
        }) 
 
        stream.on('end', function(){
          data = buffer
        })  
      })
      
      msg.once('end', function(){
        if(cb) cb(data)
        else console.log("[loop] inbox ready ")
      })
    })
  }) 
}


