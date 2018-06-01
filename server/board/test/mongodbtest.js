// 현재 DB 삭제
db.runCommand({dropDatabase: 1});

// 등록할 게시물
var b1 = {
		_id: 1,
		title: '첫번째 게시물',
		writer: '김철수',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '2018-05-20 12:34'
};
var b2 = {
		_id: 2,
		title: '두번째 게시물',
		writer: '이영희',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '2018-05-21 12:54'
};

// 게시물 등록(collection.insert(document))
// db.board.insert(b1);
// db.board.insert(b2);
db.board.insert([b1, b2]);

// 게시물 목록 조회
// collection.find({검색조건}, {출력속성})).sort({정렬옵션}).limit(개수)
db.board.find();
db.board.find({_id: 1});
db.board.find({}, {title: 1, writer: 1, _id: 0})
										.sort({writer: -1}).limit(1);

// 모든 게시물을 _id의 내림차순으로 조회
// (출력 컬럼은 번호, 제목, 글쓴이, 조회수, 작성일)
db.board.find({}, {content: 0}).sort({_id: -1});

// 게시물 한건 조회(collection.findOne({검색조건}, {출력속성}))
db.board.findOne({_id: 2}, {view: 0, regdate: 0});

// 게시물 수정(collection.update({검색조건}, {수정할문서}))
db.board.update({_id: 1}, {$set: {writer: '홍길동'}});

// 게시물 한건 조회 및 업데이트(collection.findOneAndUpdate({검색조건}, {수정할문서}))
db.board.findOneAndUpdate({_id: 2}, {$inc: {view: 1}});

// 게시물 삭제(collection.remove({검색조건}))
db.board.remove({_id: 1});




// sequence용 데이터 추가
db.seq.insert({seq: 1});

// sequence 조회 및 업데이트
db.seq.findOneAndUpdate({}, {$inc: {seq: 1}});

// board DB 초기화
use boardDB;
db.runCommand({dropDatabase: 1});
db.board.insert([b1, b2]);
db.seq.insert({seq: 3});


// user 컬렉션 추가
var kim = {
	_id: 'kim',
	pwd: '123',
	name: '김철수'
};
db.user.insert(kim);




