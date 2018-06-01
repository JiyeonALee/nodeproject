var assert = require('assert');

var a = 10;
var board = {writer: '김철수', title: '테스트', content: '김철수 만세'};
var result = {title: '테스트', writer: '김철수', content: '김철수 만세'};

// test suite
describe('suite #1 동기방식 테스트', function() {
  // unit test
  it('unit #1 board와 result비교 - equal', function() {
    assert.equal(board, result);
  });

  it('unit #1 board와 result비교 - deepEqual', function() {
    assert.deepEqual(board, result);
  });
});