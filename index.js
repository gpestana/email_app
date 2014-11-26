var express = require('express'), 
http        = require('http'),
email       = require('./lib/smtp.js'),
pdf         = require('./lib/pdf_converter.js')

var app = express()
var port = 3030

app.listen(process.env.PORT || port, function(){
  console.log('server started')
})

app.get('/send', function(req, res) {

  //#TODO: sanitize input
  var mail_dest = req.query.mail
  var url = req.query.url


  var ts = new Date().getTime()
  var file_name = url+"_"+ts+".pdf"

  console.log("1. processing "+file_name)

  pdf.convert(url, file_name, function() {

    var attachment = {
      path:'data/'+file_name, 
      type:"pdf", name: file_name
    }

    email.send(mail_dest, attachment, function(err, msg) {
      console.log(err || "status: "+file_name+" sent to "+mail_dest)

      if(err) res.send(err.toString())
      else res.send(msg)
    })
  })

})

