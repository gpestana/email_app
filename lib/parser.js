var load = function(input, cb) {
  var output = {}

  var meta = input.split("<meta_data>")
  var mail = input.split("<mail>")  

  if(meta.length + mail.length < 4) {
    cb()
    return
  }

  output.dest_mail =  meta[1].split("<dest_mail>")[1] 
  output.origin = meta[1].split("<origin>")[1]
  output.mail = mail[1]
  
  output.ts = new Date().toISOString().
    replace(/T/, 'at').
    replace(/\..+/, '')
  
  output.filename = output.dest_mail+"_"+output.ts

  cb(output) 
}

exports.load = load
