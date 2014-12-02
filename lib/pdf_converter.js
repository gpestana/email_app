var phantom = require('phantom'),
path        = require('path')


var convertPDF = function(data, cb) {

  phantom.create(function (ph) {
   ph.createPage(function (page) {

    page.set('paperSize', {format: 'A4'})

    page.open('./data/html/'+data.filename+".html", function start(status) {
      if(status=="fail") cb(status)
      else {
        page.render('./data/pdf/'+data.filename+".pdf", {
          format: 'pdf', quality: '100'
        })

      setTimeout(function(){
        ph.exit()
        console.log("[pdf] "+data.filename+".pdf written to disk")
        cb()
       }, 5000)
      }
    })
  })
 })
}


//other possible solution than setTimeout()
var block_exists = function(filename, cb){
  var keep_checking = true
  while(keep_checking) {
    console.log("[blocking]"+data.filename+" does not exist yet..")
    path.exists("./data/"+data.filename+".pdf",function(exists){
      if(exists) keep_checking = false
    })
  }
  cb()
}


exports.convertPDF = convertPDF
