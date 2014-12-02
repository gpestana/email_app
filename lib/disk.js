var fs = require('fs')

var write = function(data, cb){
  fs.writeFile("./data/html/"+data.filename+".html", data.mail, function(err){
    if(err) console.log("[disk] error writing to disk")
    else {
      console.log("[disk] "+data.filename+".html written to disk")
      cb(data)
    }
  })
}

exports.write = write
