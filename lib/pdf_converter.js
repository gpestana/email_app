var phantom = require('phantom')


var convertPDF = function(filename, cb) {

  phantom.create(function (ph) {
   ph.createPage(function (page) {

    page.set('paperSize', {format: 'A4'})

    page.open('./data/html/'+filename+".html", function start(status) {
      if(status=="fail") cb(status)
      else {
        page.render('./data/pdf/'+filename+".pdf", {
          format: 'pdf', quality: '100'
        })
 
        cb()
        ph.exit()
      }
      
    })
  })
 })
}





/*
 * Phantom version
 */
var convertPDF2 = function(url, file_name, cb) {
  console.log("2. converting "+file_name)
  
  phantom.create(function (ph) {
   ph.createPage(function (page) {

    page.set('paperSize', {format: 'A4'})
    //#TODO: integrate with sanitized url
    var final_url = "http://"+url
 
    page.open(final_url, function start(status) {
      page.render('./data/'+file_name, {
        format: 'pdf', quality: '100'
      })
 
      //#TODO: wait. If file exists, send. Otherwise, wait
      setTimeout(cb(), 5000)
      ph.exit()
      
    })
  })
 })
}


exports.convertPDF = convertPDF
