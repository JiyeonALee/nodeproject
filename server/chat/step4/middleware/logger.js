var fs = require('fs');

function mylogger(info){
  if(info.type == 'file'){
    // 로그 파일
    var logfile = fs.createWriteStream(info.path, {flags: 'a'});
  }  
  return function(req, res, next){
    // connect의 미들웨어 작성 규칙
    // 1. req, res, next를 전달받는 함수
    // 2. 둘중 하나의 작업을 한다.
    //   - 다음 미들웨어를 호출한다.(next())
    //   - res로 응답한다.

    // 로깅 메세지 출력
    if(info.type == 'file'){
      logfile.write(`${Date()} ${res.statusCode} ${req.url}\n`);
    }else{
      console.log(`${Date()} ${res.statusCode} ${req.url}\n`);
    }    
    next();
  };
}

module.exports = mylogger;

// app.js
// var logger = require('./middleware/logger')
//             ({type: 'file', path: 'mylog.txt'});
// logger(req, res);
