var dao = require('../models/board');
// var dao = require('../models/board_mysql');

exports.list = function(req, res){
  dao.list(function(list){
    res.render('board/list', { title: '게시물 목록', list: list });
  });
};
exports.form = function(req, res){
  res.render('board/write', { title: '글쓰기' });
};
exports.create = function(req, res){
  var board = req.body;
  dao.create(board, function(no){
    res.render('board/result', { title: '등록 결과', no: no });
  });  
};
exports.show = function(req, res){
  var no = req.params.no;
  dao.show(parseInt(no), function(board){
    res.render('board/view', { title: '내용 조회', board: board });
  });
};
exports.remove = function(req, res){
  var no = req.params.no;
  dao.remove(parseInt(no), function(){
    res.redirect('/');
  });
};