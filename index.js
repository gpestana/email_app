var email = require('./lib/smtp.js'),
pdf       = require('./lib/pdf_converter.js')

//convert html to pdf
var url = "http://google.com"
pdf.convert(url)

//send email
var attachment = {path:"data/test.pdf", type:"pdf", name:"testing_pdf"}
//email.send(attachment)
