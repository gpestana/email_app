var phantom = require('phantom')


var convertPDF = function(url, file_name, cb) {

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


exports.convert = convertPDF
