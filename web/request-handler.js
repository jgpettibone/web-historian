var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require("fs");


// require more modules/folders here!

// test to sites.txt list
var testUrl = path.join(__dirname, '../archives/sites/www.test.com');

//parsing the request url to our pathname
var parsePath = function(requestUrl){
  var urlPath = url.parse(requestUrl).pathname;
  //var pathArray = urlPath.split('/');
  // console.log(pathArray);
  // return pathArray;
  return urlPath;
}

var getPage = function(pathParsed, res){
  res.writeHead(200, {'Location': archive.paths.siteAssets + '/index.html'});
  res.pipe(pathParsed);
  res.end();

}


exports.handleRequest = function (req, res) {

    // var pathArray = parsePath(req.url);
    // if (pathArray[1] !== 'archives' || pathArray[2] !== 'sites') {
    //   res.writeHead(404, helpers.headers);
    // }

  if (req.method === 'GET'){
    var pathParsed = parsePath(req.url);
    getPage(pathParsed, res);
    // res.writeHead(200, {'Location': archive.paths.siteAssets + '/loading.html'});
    //   // helpers.headers);
    // res.redirect(archive.paths.siteAssets + '/loading.html');
    // res.end() // this is where we want to return the stuff in index.html
  }
  // res.redirect('www.google.com');
  // res.end("<input");
  // archive.paths.siteAssets

  if (req.method === 'POST') {
    var siteName = $("[name=url]").val();
    archieve.addUrlToList(siteName); 
  }
};

