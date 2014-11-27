var fs = require('fs')

var write = function(data, cb){
  var ts = new Date().getTime()
  var filename = ts+".html"

  fs.writeFile("./data/html/"+filename, data, function(err){
    if(err) console.log("[disk] error writing to disk")
    else {
      console.log("[disk] "+filename+" written to disk")
      cb(ts)
    }
  })
}

exports.write = write
