//https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
var fs = require('fs');
var path = require('path');
var count = 0

//var start = `./packages/ext-angular-kitchensink/src/examples`
var start = `./packages/ext-react-kitchensink/src/examples2`

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      //var last3 = file.slice(file.length - 3)
      var last3 = file.slice(file.length - 3)
      if (last3 == '.js') {
        count ++

        var fileStringOrig = fs.readFileSync(file).toString()
        //var fileArray = Array.from(fileStringOrig)
        var regex = /<[A-Z]/gi, result, indices = [];
        while ( (result = regex.exec(fileStringOrig)) ) {
          var c = fileStringOrig.charAt(result.index+1)
          console.log(c)
          //var upperCase = fileStringOrig.charAt(result.index+4).toUpperCase();
          //fileArray[result.index+4] = upperCase;
        }
        // var fileStringNew = fileArray.join('')
        // var fileStringDone = fileStringNew.split('ext-').join('Ext');
        // fs.writeFileSync(file, fileStringDone)

        var zeroFilledCount = ('000' + count).substr(-3);
        console.log(zeroFilledCount + ' ' + file)
      }
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};



walk(start, function(err, results) {
  if (err) throw err;
  //console.log(results);
});
