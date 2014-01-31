var fs = require('fs');
var path = require('path');
var http = require('http-request');


/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// returns an array of the websites
exports.readListOfUrls = function(inputUrl, cb){

  fs.readFile(exports.paths.list, {encoding: 'utf-8'}, function(error, data) {
    // console.log(data)
    if(error) throw err;
    // console.log('in the middle, the list is: ', data);
    var resultArray = data.split('\n');
    // console.log('in the middle, the array is: ', resultArray);
    // console.log('cb ', cb)
    cb(resultArray);
  });

};

// returns a boolean indicating whether or not the url is in sites.txt 
exports.isUrlInList = function(inputUrl, cb){

  var list = exports.readListOfUrls(inputUrl, function(list) {
    // console.log('in isUrlInList, the list is: ', list);
    if(list.indexOf(inputUrl) > -1){
      // console.log('in list');
      cb(true);
      // return true;
    } else {
      // console.log('not in list');
      cb(false);
      // return false;
    }
  });

};

// appends a url to sites.txt
exports.addUrlToList = function(inputUrl, cb){
  // console.log(exports.paths.list);

  console.log('inside addURL');
  exports.isUrlInList(inputUrl, function(bool) {
    if (bool) {
      console.log('already in the file');
    } else {
      fs.appendFile(exports.paths.list, inputUrl + '\n', function(err, data) { 
        if (err) throw err; 
        cb(data); 
      })      
    }
  })
};

// returns a boolean indicating whether or not the site has been downloaded/archived 
exports.isURLArchived = function(inputUrl, cb){
  console.log('in isURLArchived');
  fs.readdir(exports.paths.archivedSites, function(err, files){
    console.log('files = ', files, ' inputUrl = ', inputUrl);
    var found = false;
    for (var i = 0; i < files.length; i++) {
      if (files[i] === inputUrl.toString()) {
        // console.log('it is a match!');
        found = true;
      }
    }
    cb(found);
  });
};

// downloads the site
exports.downloadUrls = function(inputUrl){
  var data;

  console.log('inputUrl ', inputUrl);
  var fileName = exports.paths.archivedSites + '/' + inputUrl

  http.get(inputUrl, function(err, res) {
    if (err) {
      console.log('error!');
      return;
    } else {
      exports.isURLArchived(inputUrl, function(exists) {
        if (!exists) {
          fs.writeFile(fileName, res.buffer.toString(), function(err){
            if (err) throw err;
          })
        }
      })
    }
  });
};

