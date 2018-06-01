var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
  if(req.url == '/'){
    req.url = '/index.html';
  }
  fs.readFile(path.join(__dirname, req.url), function(err, data){
    if(err){
      res.writeHead(404, 
          {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
    }else{
      res.writeHead(200, 
          {'Content-Type': 'text/html;charset=utf-8'});
      res.end(data);
    }
  });
});

server.listen(80, function(){
  console.log('HTTP 서버 구동.');
});