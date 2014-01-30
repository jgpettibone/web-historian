var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require("fs");

exports.handleRequest = function (req, res) {

  var method = helpers.methods[req.method];
  if (method) {
    method(req, res);
  } else {
    helpers.sendResponse(res, null, 404);
  }
};


