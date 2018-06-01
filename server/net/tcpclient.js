var net = require('net');

var target = {
  // host: 'localhost',
  host: 'google.com',
  port: 80
};

var socket = new net.Socket();

socket.on('data', function(data){
  console.log(data.toString());
});
// 반드시 error 이벤트를 처리해야 한다.
socket.on('error', function(){});

process.stdin.on('data', function(data){
  socket.write(data);
});

socket.connect(target.port, target.host, function(){
  console.log('서버 접속 성공.');
  // socket.write('hello');
});