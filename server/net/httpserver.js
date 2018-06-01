var net = require('net');
var fs = require('fs');
var path = require('path');
// var server = new net.Server();
var server = net.createServer(function(socket){
  console.log('클라이언트 접속.'
                  , socket.remoteAddress);
  // error 이벤트는 반드시 처리해야 한다.
  socket.on('error', function(){});
  socket.on('data', function(data){
    var req = {};
    req.method = data.toString().split('\n')[0].split(' ')[0];
    req.url = data.toString().split('\n')[0].split(' ')[1];
    req.httpVersion = data.toString().split('\n')[0].split(' ')[2];
    if(req.url == '/'){
      req.url = '/index.html';
    }
    fs.readFile(path.join(__dirname, req.url), function(err, data){
      if(err){
        socket.write('HTTP/1.1 404 Not Found\n');
        socket.write('Content-Type: text/html;charset=utf-8\n');
        socket.write('\n');
        socket.end(`<h1>${req.url} 파일을 찾을 수 없습니다.</h1>`);
      }else{
        socket.write('HTTP/1.1 200 OK\n');
        socket.write('Content-Type: text/html;charset=utf-8\n');
        socket.write('\n');
        socket.end(data);
      }
    });
  });
});

server.listen(80, function(){
  console.log('HTTP 서버 구동 완료.');
});
