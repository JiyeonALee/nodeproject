var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var dao = require('./models/board');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {maxAge: 1000*60*60},
  secret: 'some text',
  rolling: true // 매 응답마다 쿠키 시간 초기화
}));

app.use(function(req, res, next){
  if(typeof req.body == 'object' 
          && '_method' in req.body){
    req.method = req.body._method;
    delete req.body._method;
  }

  console.log(req.session);
  next();
});



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(function(username, password, cb){
  dao.login(username, password, function(err, user){
    if(err){
      cb(err);
    }else if(!user){
      cb(null, false);
    }else{
      cb(null, user);
    }
  });
}));

// 로그인 성공 시 세션에 사용자 정보를 저장
passport.serializeUser(function(user, cb){
  cb(null, user._id);
});

// 세션에서 사용자 정보를 추출해 req.user에 저장
passport.deserializeUser(function(id, cb){
  dao.findUser(id, cb);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
