var fs = require('fs');
var path = require('path');
var url = require('url');

var mime = {
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.css': 'text/css',
  '.js': 'application/javascript',
  // ...
};

var staticServer = function(req, res, next){
  if(req.url == '/'){
    req.url = '/index.html';
  }
  var parseUrl = url.parse(req.url);
  var filename = path.join(base, parseUrl.pathname);
  var extname = path.extname(filename);

  fs.stat(filename, function(err, status){
    if(err){
      // 없을 경우
      next();
    }else if(status.isFile()){
      // 파일일 경우
      res.writeHead(200, 
        {'Content-Type': mime[extname] + ';charset=utf-8'});
      var fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);
    }else{
      // 폴더일 경우
      res.writeHead(403, 
        {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>directory access is forbidden.</h1>`);
    }
  });  
};

var base;
function setBase(dir){
  base = dir;
  return staticServer;
}

module.exports = setBase;

// app.js
// var static = require('./middleware/static')
//                   (path.join(__dirname, 'public'));
// static(req, res);