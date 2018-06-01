/*
var b1 = {
		_id: 1,
		title: '첫번째 게시물',
		writer: '김철수',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '2018-06-20 12:34'
};
var b2 = {
		_id: 2,
		title: '두번째 게시물',
		writer: '이영희',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '2018-06-21 12:54'
};

var boardList = [b1, b2];
*/

var MongoClient = require('mongodb').MongoClient;

var mongo;
var db;
MongoClient.connect('mongodb://localhost:27017', function(err, client){
	mongo = client;
	db = client.db('boardDB');
	db.board = db.collection('board');
	db.seq = db.collection('seq');
	db.user = db.collection('user');
	console.log('DB 접속 완료.');
});

module.exports = {
	list: function(cb){	
		db.board.find({}, {content: 0})
						.sort({_id: -1})
						.toArray(function(err, result){
							cb(result);
						});
	},
	show: function(no, cb){
		db.board.findOneAndUpdate(
							{_id: no}
							, {$inc: {view: 1}}
							, function(err, result){
								cb(result.value);
							});
	},
	create: function(board, cb){
		db.seq.findOneAndUpdate({}
			, {$inc: {seq: 1}}
			, function(err, result){
				board._id = result.value.seq;
				board.view = 0;
				board.regdate = require('date-format')
						.asString('yyyy-MM-dd hh:mm', new Date());
				db.board.insert(board, function(){
					cb(board._id);
				});
			});		
	},
	remove: function(no, cb){
		db.board.remove({_id: no}, cb);
	},
	login: function(id, pwd, cb){
		db.user.findOne({_id: id, pwd: pwd}, {name: 1}, cb);
	},
	findUser: function(id, cb){
		db.user.findOne({_id: id}, {name: 1}, cb);
	},
	close: function() {
		mongo.close();
	}
};
