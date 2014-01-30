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


// returns a string list of the websites
exports.readListOfUrls = readListOfUrls= function(){

  var list = '';

  fs.readFile(fileName, {encoding: 'utf-8'}, function(error, data) {
    if(error) {
      console.log('ERROR READING FILE');
    } else {
      list = data;
    }
  });

  return list;

};

// returns a boolean indicating whether or not the url is in sites.txt 
exports.isUrlInList = function(inputUrl){

  var list = readListOfUrls();
  if(list.indexOf(inputUrl) > -1){
    return true;
  } else {
    return false;
  }
};

// appends a url to sites.txt
exports.addUrlToList = function(inputUrl){
  fs.appendFile(paths.list, inputUrl, function(err){
    if (err) throw err;
  });

};

// returns a boolean indicating whether or not the site has been downloaded/archived 
exports.isURLArchived = function(inputUrl){
  fs.readdir(paths.archivedSites, function(err, files){
    if (files.indexOf(inputUrl)){
      return true;
    } else {
      return false;
    }
  });
};

// downloads the site
exports.downloadUrls = function(inputUrl){
  var data;
  http.get(inputUrl, function(err, res) {
    if (err) {
      console.log('error!');
      return;
    }
    data = res.buffer.toString();
  });

  var file = paths.archivedSites + '/inputUrl'

  if (isURLArchived(inputUrl) === false){
    fs.writeFile(file, data, function(err){
      if (err) {
        console.log('error!');
      }
      console.log('It\'s saved!');
    });
  }

};

