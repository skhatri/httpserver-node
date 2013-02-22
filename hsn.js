var http = require('http');
var fileutil = require('./fileutil');
var port = 8097;

var requestAction = function(request, response) {
  console.log(request.url);
  var data = fileutil.readFile(request.url.substring(1));

  response.writeHead(data.status, {"Content-Type": data.contentType,
    "Server-Time": new Date()
  });
  response.write(data.content);
  response.end();
};

http.createServer(requestAction).listen(port);
console.log("HTTP Server started on "+ port);



