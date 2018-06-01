var net = require('net');
// var server = new net.Server();
var server = net.createServer(function(socket){
  console.log('클라이언트 접속.'
                  , socket.remoteAddress);
  // error 이벤트는 반드시 처리해야 한다.
  socket.on('error', function(){});
  socket.on('data', function(data){
    // socket.write('반송: ' + data);
    console.log(data.toString());
  });
});
server.on('listening', function(){
  console.log('TCP 서버 구동 완료.');
});
server.listen(2345, function(){
  console.log('listening 이벤트로 등록된다.');
});
