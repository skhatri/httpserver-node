var docRoot = '/usr/local/repository/repository/';
var fs = require('fs');
var fileutil = (function(){
  var readFile = function(fileName) {
  try {
    var stat = fs.statSync(docRoot+fileName);

    if(stat.isDirectory()) {
      return {content: "Forbidden Access", status: 403, contentType:"text/plain"      };
    }

    if(!stat.isFile()) {
      return {content: "Not found", status: 404, contentType: "text/plain"};
    }
    var contentType = 'text/plain';
    if (/\.xml$/.test(fileName) || /\.pom$/.test(fileName)) {
      contentType = 'text/xml';
    } else if (/\.html$/.test(fileName)) {
      contentType = 'text/html';
    } else if (/\.json$/.test(fileName)) {
      contentType = 'application/json';
    } else if (/\.jar$/.test(fileName)) {
      contentType = 'application/zip';
    }
    var content = fs.readFileSync(docRoot+fileName);
  return {content: content, status: 200, contentType: contentType};
  } catch(e) {
    return {content: ""+e, status: 500, contentType:'text/plain'};
  }
  };
  return {
    readFile: readFile
  };
}());

module.exports = {
  readFile: fileutil.readFile
};

