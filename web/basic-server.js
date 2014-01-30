var http = require("http");
var connect = require("connect");
var handler = require("./request-handler");
var archive = require("../helpers/archive-helpers");

var port = 8080;
var ip = "127.0.0.1";
// var server = http.createServer(handler.handleRequest);
var server = connect.createServer()
  .use(connect.static(archive.paths.siteAssets))
  .use(handler.handleRequest);

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

