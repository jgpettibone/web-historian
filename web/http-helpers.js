var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  fs.readFile(asset, {encoding: 'utf-8'}, function(err, data){
    if (err) {
      exports.sendResponse(res, null, 404);
    } else {
      exports.sendResponse(res, data, 200);
    }
  });

};

// As you progress, keep thinking about what helper functions you can put here!

exports.getPage = function(request, response, currentPath) {

  currentPath = currentPath || url.parse(request.url).pathname;
  console.log('currentPath parsed', url.parse(currentPath));

  if (currentPath === '/') {
    currentPath = archive.paths.siteAssets + '/index.html';
  } else {
    currentPath = archive.paths.archivedSites + currentPath;
  }

  exports.serveAssets(response, currentPath);

}

exports.addPage = function(request, response) {

  exports.collectData(request, function(data){
    // data = data.split('=')[1];
    data = (data.slice(4)).trim();
    // console.log('our data is "', data, '"');

    archive.addUrlToList(data, function(err, newdata) {
      if (err) {
        exports.sendResponse(response, null, 404);
      } else {
        exports.sendResponse(response, newdata, 302);
      }
    });

    console.log('data is "', data.trim(), '"');
    exports.getPage(request, response, data);

  });
}

exports.sendResponse = function(response, object, status) {
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(object);
}

exports.collectData = function(request, cb) {
  var collected = "";
  request.on('data', function(data){
    collected += data;
  });
  request.on('end', function(){
    console.log('collectedData: ', collected);
    cb(collected);
  })
}

exports.methods = {
  'GET': exports.getPage,
  'POST': exports.addPage
}