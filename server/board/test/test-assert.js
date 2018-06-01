var assert = require('assert');

var a = 10;
var board = {writer: '김철수', title: '테스트'};
var result = {title: '테스트', writer: '김철수'};

console.log('테스트 시작.');

assert(true);
//assert(false);
assert(a == 10);
assert(a++ == 10);
assert.equal(a, 11);
assert.deepEqual(board, result); // 객체속성 비교시 사용

// 각각의 테스트를 통과하지 못하면 다음테스트 진행불가.
// 독립적인 테스트를 위해 try-catch 를 이용하여 가능하긴 함.. 
// 하지만, 비동기함수의 테스트가 어려움. 테스트의 순서가 필요한 경우도 힘듬

setTimeout(function() {
  assert.equal(board, result);
}, 1000);

console.log('테스트 통과.');