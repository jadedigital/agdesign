var fm = require('front-matter')
var fs = require('fs')
var path = require( 'path' )

var mdFolder = '_posts/portfolio/'
var layout = 'portfolio'
var dataFile = 'src/js/data.js'
var stringContent = new Array()

fs.readdir( mdFolder, function( err, mdFiles ) {
    if( err ) {
        console.error( "Could not list the directory.", err )
        process.exit( 1 )
    }

    mdFiles.forEach( function( file, index, array ) {
      var filepath = path.join( mdFolder, file )
      var postKey = path.parse(file).name
      fs.readFile(filepath, 'utf8', function(err, data){
        if (err) throw err

        var content = fm(data)
        content.attributes["body"]=content.body
        stringContent.push(JSON.stringify(content.attributes))

        if (index === array.length - 1){ 
          var newData = 'var data = {' + layout + ': [' + stringContent + ']} \r\n'
          fs.writeFile(dataFile, newData, 'utf8', function (err) {
            if (err) return console.log(err)
          })
        }
      })
    })
})
