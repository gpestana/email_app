var phantom = require('node-phantom')

var convertPDF = function(url) {

  phantom.create(function(error , ph){
    console.log(error)
    ph.createPage(function(err,page){
      page.open(url, function(err , status){
        console.log(err || status)
      })
    })
  })
}


exports.convert = convertPDF
