var Imap  = require('imap'),
inspect   = require('util').inspect,
login     = require('./login.js')

var imap = new Imap({
  user: login.user, 
  password: login.pass,
  host: login.host_imap,
  port: 993,
  tls: true
})

var cb

//priv and public methods
var openInbox = function(cb) {
  imap.openBox('INBOX', true, cb)
}

var connect = function(cback) {
  cb = cback
  imap.connect()
}

//event handlers
imap.once('ready', function(){
   
  openInbox(function(err, box){
    if(err) throw err
    
    //request 
    var f = imap.seq.fetch(box.messages.total + ':*', 
      { bodies: ['TEXT'] })
   
 
    f.on('message', function(msg, seqno) {
      var prefix = '[#' + seqno + ']';
      var data
 
      msg.on('body', function(stream, info) {
        //console.log(info)
          
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
        cb(data, seqno)
      })
    })
  }) 
})



exports.connect = connect
