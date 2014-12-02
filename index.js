var express = require('express'), 
http        = require('http'),

email       = require('./lib/smtp.js'),
pdf         = require('./lib/pdf_converter.js'),
hook        = require('./lib/hook.js'),
disk        = require('./lib/disk.js'),
parser      = require('./lib/parser.js')

//webserver interface
server = express()
server.listen(process.env.PORT || 3030)
server.get('/logs', function(req, res){
  console.log("[web] logs requested")
  res.send("Logs requested")
})
server.get('/ping', function(req, res){
  res.send("pong")
})

var app = function() {
  console.log("[main] server started ")

  hook.connect(function(raw_data) {
    parser.load(raw_data, function(data) {
      if(data) writeHtml(data)
      else console.log("[main] mail not properly formated received")
    })
  })


  //private functions
  var writeHtml = function(data) {
    console.log("\n"+data.ts+" process started")
    disk.write(data, convertPDF)
  }
  var convertPDF = function(data) {
    pdf.convertPDF(data, function(err) {
      if(err) console.log("[main] err @ convertPDF: "+err)
      else sendMail(data)
    })
  }
  var sendMail = function(data) {
    var attachment = {
      path: "/tmp/"+data.filename+".pdf",
      type: "pdf",
      name: "attachment.pdf"
    }
    
    email.send(data, attachment, function(err, msg){
      if(err) console.log("[main] err @ email: "+err)
      else console.log(data.ts+" process concluded\n")
    })
  }

}

app()
