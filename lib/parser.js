var load = function(input, cb) {
  var output = {}

  var meta = input.split("<meta_data>")
  var attachment = input.split("<attachment>")  

  if(meta.length + attachment.length < 4) {
    cb()
    return
  }

  output.dest_mail =  meta[1].split("<dest_mail>")[1] 
  output.subject = meta[1].split("<subject>")[1]  
  output.message = meta[1].split("<message>")[1]
  output.origin = meta[1].split("<origin>")[1]
  output.attachment = attachment[1]

  output.ts = new Date().toISOString().
    replace(/T/, 'at').
    replace(/\..+/, '')
  
  output.filename = output.dest_mail+"_"+output.ts


  output.message="Dear Kimmo H, be welcome"

  cb(output)

}

exports.load = load
