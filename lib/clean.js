var fs = require('fs');

var up = function(filename, cb) {
  var pdf = '/tmp/'+filename+'.pdf'
  var html = '/tmp/'+filename+'.html'

  fs.unlink(pdf, function(err) {
    if(err) cb(err) 
    else {
      fs.unlink(html, function(err) {
        if(err) cb(err)
        else {
          console.log('[cleanup] cleaned up')
          cb()
        }
      })
    }
  })  
}

exports.up = up
