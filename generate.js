var fm = require('front-matter')
var fs = require('fs')
var path = require( 'path' )

var mdFolder = '_posts/portfolio/'
var layout = 'portfolio'
var dataFile = 'src/data.pug'

var stringContent = ''
var stringContentOld = ''

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
        //var attr = content.attributes
        if (stringContentOld == '') {
          stringContent = '"' + postKey + '": ' + JSON.stringify(content.attributes).replace(/\r\n/g, '')
        }
        else {
          stringContent = stringContentOld + ', "' + postKey + '": ' + JSON.stringify(content.attributes).replace(/\r\n/g, '')
        }
        stringContentOld = stringContent
        if (index === array.length - 1){ 
          var newData = '- var ' + layout + ' = {' + stringContent + '} \r\n'
          fs.writeFile(dataFile, newData, 'utf8', function (err) {
            if (err) return console.log(err)
          })
        }
        //for (var key in attr) {
          //if (attr.hasOwnProperty(key)) {
            
            //var pugVar = '#{' + attr['key'] + '.' + key + '}'
            //var rePugVar = new RegExp(pugVar,"g");
            //html = html.replace(rePugVar, attr[key])
            
            
          //}
        //}
      })
    })
})
