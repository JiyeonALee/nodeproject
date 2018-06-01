/**
 * 웹서버 개발시 해야 할 일들
 * 1. 로깅
 * 2. favicon 응답
 * 3. POST 방식의 body 파싱
 * 4. JSON 형태의 데이터 파싱
 * 5. url 텍스트 인코딩
 * 6. 쿠키 파싱
 * 7. 세션 처리(로그인 상태 유지)
 * 8. 정적인 자원 응답
 * 9. 동적인 자원 응답
 * 10. 파일 업로드
 * 11. DB 핸들링
 * 12. 보안(권한, 인증)
 * 13. 에러 처리
 * ......
 * 
 * 각각의 기능을 독립적인 함수로 작성(미들웨어)
 * connect 모듈을 사용
 * connect@2
 *  - 위의 기능을 대신해주는 미들웨어 시스템(미들웨어 내장)
 * connect@3
 *  - 미들웨어를 관리하는 컨테이너 기능만 제공
 *  - 미들웨어는 제공하지 않음.
 */

var connect = require('connect');
var favicon = require('serve-favicon');
var logger = require('morgan');
var static = require('serve-static');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var ejs = require('ejs');

var path = require('path');
var index = require('./routes/index');

var app = connect();

// 미들웨어 등록
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  cookie: {maxAge: 1000*60},
  secret: 'some text',
  rolling: true // 매 응답마다 쿠키 시간 초기화
}));
app.use('/', index);

// 404 에러 처리 미들웨어
var fs = require('fs');
app.use(function(req, res, next){
  var err = new Error(req.url + ' 파일을 찾을 수 없습니다.');
  err.status = 404;
  var filename = path.join(__dirname, 'views', 'error.ejs');
  ejs.renderFile(filename, {
    message: err.message,
    error: err
  }, function(error, data){
    res.writeHead(200, 
        {'Content-Type': 'text/html;charset=utf-8'});
    res.end(data);
  });
});

module.exports = app;