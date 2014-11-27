var email   = require('./lib/smtp.js'),
pdf         = require('./lib/pdf_converter.js'),
hook        = require('./lib/hook.js'),
disk        = require('./lib/disk.js')

var msg_bounds = "HTML>"


var app = function() {
  console.log("[main] starting ")

  hook.connect(function(raw_data) {
    var data = raw_data.split(msg_bounds)

    //console.log(data)

    if(data[1]) {
      console.log("[main] incoming data ")
 
      disk.write(data[1], function(filename) {

        pdf.convertPDF(filename, function(err){
          if(err) console.log("[main] err @ converterPDF")
          else {
            var attachment = {
              path:"data/pdf/"+filename+".pdf",
              type:"pdf", 
              name: "attachment.pdf"
              }
 
            email.send("g6pestana@gmail.com", attachment, 
              function(err, msg){
                if(err) console.log("[main] err @ email: "+err)
                else console.log("[main] DONE") 
              })  
          }
        }) 
      })  
    }
  })
}


app()
