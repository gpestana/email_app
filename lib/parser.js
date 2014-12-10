var quotedPrintable = require('quoted-printable'),
utf8                = require('utf8')

var load = function(input_raw, cb) {
  var output = {}
  var input = '' 
  
  try {
    input = utf8.decode(quotedPrintable.decode(input_raw))
  } catch (err) {
    cb()
    return
  }

  var meta = input.split("<meta_data>")
  var attachment = input.split("<attachment>")  

  if(meta.length + attachment.length < 4) {
    cb()
    return
  }

  output.dest_mail =  meta[1].split("<dest_mail>")[1] 
  output.subject = meta[1].split("<subject>")[1]  
  output.origin = meta[1].split("<origin>")[1]
  output.message = meta[1].split("<message>")[1].replace(/<br>/g,'\n') 
  output.attachment = attachment[1]
  
  output.ts = new Date().toISOString().
    replace(/T/, 'at').
    replace(/\..+/, '')
  
  output.filename = output.dest_mail+"_"+output.ts

  console.log(output.message)
//  cb(output)

}

exports.load = load
