var assert = require('assert');

var a = 10;
var board = {writer: '김철수', title: '모카테스트', content: '김철수 만세'};
var result = {title: '테스트', writer: '모카테스트', content: '김철수 만세'};

// test suite
describe.skip('suite #1 동기방식 테스트', function() {
  // unit test
  it('unit #1 board와 result비교 - equal', function() {
    assert.equal(board, result);
  });

  it('unit #1 board와 result비교 - deepEqual', function() {
    assert.deepEqual(board, result);
  });
});

/**
 * 비동기함수 테스트를 위해 it 콜백함수에 done을 넘기고 done()을 호출하기 전까지 기다려줌
 */
describe('suite #2 비동기 함수 테스트', function() {
  this.timeout(1000*35);
  it('unit #1 a==10', function(done) {
    setTimeout(function(){
      assert(a == 10);
      a++;
      done(); 
    }, 10*1000);
  });

  it('unit #2 a==11', function(done) {
    setTimeout(function(){
      assert(a == 11);
      a++;
      done();
    }, 10*1000);
  });

  it('unit #3 a==12', function() {
    setTimeout(function(done){
      assert(a == 12);
      a++;
      done();
    }, 10*1000);
  });

});


// board 테스트
var dao = require('../models/board');;
describe.only('게시판기능테스트', function() {

  var regNo;
  var beforeList;
 
  // 테스트시작전 @Before 어노테이션같은..
  before(function(done) {
    setTimeout(done, 1.5*1000);      
  });
  before(function(done) {
    // 삭제후 목록비교를 위해 미리 목록을 조회한다.
    dao.list(function(resut) {
      beforeList = resut;
      done();
    });

  });
  

  describe('#1 등록작업', function() {
    it('#1-A 등록요청', function(done) {
      dao.create(board, function(no) {
        assert.equal(typeof no, 'number');
        regNo = no;
        done();
      });
    });
    it('#1-B 등록한 게시물 조회', function(done) {
      dao.show(regNo, function(regResult) {
        // assert.equal(result._id, regNo);
        assert.deepEqual(regResult, board);
        done();
      });
    });
  });

  describe('#2 삭제', function() {
    it('#2-A 삭제요청', function(done) {
      dao.remove(regNo, done);
    });
    it('#2-B 삭제후 목록조회', function(done) {
      dao.list(function(list) {
        assert.deepEqual(list, beforeList);
        done();
      });
    });
  });

  // 후처리 함수에서 db 닫아주기
  after(function() {
    dao.close();
  });

});