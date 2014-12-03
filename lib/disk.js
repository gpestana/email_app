var fs = require('fs')

var write = function(data, cb){
  fs.writeFile("/tmp/"+data.filename+".html", data.attachment, function(err){
    if(err) console.log("[disk] error writing to disk "+err)
    else {
      console.log("[disk] "+data.filename+".html written to disk")
      cb(data)
    }
  })
}

exports.write = write
