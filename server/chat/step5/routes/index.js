var url = require('url');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

var views = path.join(__dirname, '..', 'views');

function chat(req, res, next){
  // 채팅 화면으로 이동
  // res.writeHead(303, {Location: '/chat.html'});
  // res.end();

  // TODO: 세션에서 대화명 꺼낸다.
  var nickname = req.session.nickname;
  // if(!nickname){
  //   res.writeHead(303, {Location: '/'});
  //   res.end();
  //   return;
  // }
  var filename = path.join(views, 'chat.ejs');
  ejs.renderFile(filename, {
    nickname: nickname,
    title: '채팅방'
  }, function(err, data){
    res.writeHead(200, 
        {'Content-Type': 'text/html;charset=utf-8'});
    res.end(data);
  });
  /*
  fs.readFile(filename, function(err, data){
    res.writeHead(200, 
        {'Content-Type': 'text/html;charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
  */
}

function login(req, res, next){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: 세션에 닉네임 저장
    req.session.nickname = nickname;
    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }

  res.end();
}

function logout(req, res, next){
  // TODO: 세션 삭제
  req.session.destroy();
  res.writeHead(303, {Location: '/'});
  res.end();
}

var router = function(req, res, next){
  var pathname = url.parse(req.url).pathname;
  switch(pathname){
    case '/chat':
      chat(req, res, next);
      break;
    case '/login':
      login(req, res, next);
      break;
    case '/logout':
      logout(req, res, next);
      break;
    default:
      next();
  }
};

module.exports = router;