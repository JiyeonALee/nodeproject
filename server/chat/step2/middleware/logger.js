var fs = require('fs');

function mylogger(info){
  if(info.type == 'file'){
    // 로그 파일
    var logfile = fs.createWriteStream(info.path, {flags: 'a'});
  }  
  return function(req, res){
    // 로깅 메세지 출력
    if(info.type == 'file'){
      logfile.write(`${Date()} ${res.statusCode} ${req.url}\n`);
    }else{
      console.log(`${Date()} ${res.statusCode} ${req.url}\n`);
    }    
  };
}

module.exports = mylogger;

// app.js
// var logger = require('./middleware/logger')
//             ({type: 'file', path: 'mylog.txt'});
// logger(req, res);
