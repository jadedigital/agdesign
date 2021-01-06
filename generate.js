var fs = require('fs')
var path = require( 'path' )

var mdFolder = '_posts/portfolio/'
var layout = '"portfolio"'
var dataFile = 'src/js/data.js'
var stringContent = new Array()

fs.readdir( mdFolder, function( err, mdFiles ) {
    if( err ) {
        console.error( "Could not list the directory.", err )
        process.exit( 1 )
    }

    var itemsProcessed = 0

    mdFiles.forEach( function( file, index, array ) {
      var filepath = path.join( mdFolder, file )

      fs.readFile(filepath, 'utf8', function(err, data){
        if (err) throw err

        stringContent.push(JSON.parse(data))

        itemsProcessed++

        if (itemsProcessed === array.length){
          stringContent.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date)
          })

          var newData = 'var data = {' + layout + ': ' + JSON.stringify(stringContent) + '} \r\n'
          fs.writeFile(dataFile, newData, 'utf8', function (err) {
            if (err) return console.log(err)
          })
        }
      })
    })
})
