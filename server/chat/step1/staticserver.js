var http = require('http');
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

// 로그 파일
var logfile = fs.createWriteStream('log.txt', {flags: 'a'});

var staticServer = function(req, res){
  if(req.url == '/'){
    req.url = '/index.html';
  }
  var parseUrl = url.parse(req.url);
  var filename = path.join(__dirname, parseUrl.pathname);
  var extname = path.extname(filename);

  fs.stat(filename, function(err, status){
    if(err){
      // 없을 경우
      res.writeHead(404,
        {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
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

    // 로깅 메세지 출력
    logfile.write(`${Date()} ${res.statusCode} ${req.url}\n`);
  });  
};

var server = http.createServer(staticServer);

server.on('error', function(){});

var port = process.argv[2] || 80;
server.listen(port, function(){
  console.log('HTTP 서버 구동.', port);
});