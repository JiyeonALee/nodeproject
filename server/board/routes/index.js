var express = require('express');
var router = express.Router();
var controller = require('../controllers/board');
var ensureLogin = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/board');
  // res.redirect('/login.html');
});
// 목록 조회
router.get('/board', function(req, res, next) {
  controller.list(req, res);
});
// 등록 화면 요청
router.get('/board/new', ensureLogin('/login.html'), function(req, res, next) {
  controller.form(req, res);
});
// 등록 요청
router.post('/board/new', function(req, res, next) {
  controller.create(req, res);
});
// 상세 조회
router.get('/board/:no', function(req, res, next) {
  controller.show(req, res);
});
// 삭제
router.delete('/board/:no', ensureLogin('/login.html'), function(req, res, next) {
  controller.remove(req, res);
});

module.exports = router;
