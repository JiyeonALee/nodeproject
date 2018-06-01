var http = require('http');
var fs = require('fs');
var h = require('./hellonode.js');

var server = http.createServer(function(req, res){
  // res.writeHead(200, 
  //   {'Content-Type': 'text/html;charset=utf-8'});
  // res.end('<h1>Hello</h1>');
  // res.end(h.hello('Node'));

  var filename = req.url.substring(1);
  console.log(filename);

  // 동기방식
  // try{
  //   var data = fs.readFileSync(filename);
  //   res.end(data);
  // }catch(e){
  //   console.error(e);
  // }

  // 비동기방식
  // fs.readFile(filename, function(err, data){
  //   if(err){
  //     console.error(err);
  //     res.end(filename + ' Not found.');
  //   }else{
  //     res.end(data);
  //   }
  // });

  // 스트림 방식
  var stream = fs.createReadStream(filename);
  stream.on('data', function(data){
    res.writeHead(200, 
        {'Content-Type': 'text/html;charset=utf-8'});
    res.end(data);
  });
  stream.on('error', function(err){
    console.error(err.message);
    res.writeHead(404, 
      {'Content-Type': 'text/html;charset=utf-8'});
    res.end('<h1>Not Found</h1>');
  });
  stream.on('open', function(){
    console.log('file open.');
  });
  stream.on('close', function(){
    console.log('file close.');
  });
});

server.on('error', function(e){
  console.error(e);
});
server.on('listening', function(){
  console.log('HTTP 서버 구동 완료. http://localhost:1234');
});

server.listen(1234, function(){
  console.log('HTTP 서버 구동 완료. http://localhost:1234');
});