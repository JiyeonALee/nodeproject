var assert = require('assert');
var Browser = require('zombie');
Browser.localhost('localhost', 89);


var board = {writer: '좀비', title: '좀비가 등록함.', content: '좀비가 등록한 게시물'};

describe('1. 메인 페이지 접속', function() {
  var browser = new Browser();
  
  before(function(done) {
    browser.visit('/', done);
  });

  it('1-1. 응답 정상 완료',  function() {
    // 접속 성공시 받는 2xx, 3xx 응답상태코드 확인
    browser.assert.success();
  });

  it('1-2. 목록화면?',  function() {
    browser.assert.text('header h1', '게시물 목록');
  });

});

describe('2. 글쓰기', function() {
  var browser = new Browser();
  
  before(function(done) {
    browser.visit('/board/new', done);
  });

  it('2-1. 응답 정상 완료',  function() {
    // 접속 성공시 받는 2xx, 3xx 응답상태코드 확인
    browser.assert.success();
  });

  it('2-2. 로그인 화면?', function(done) {
    browser.assert.text('body h1', '로그인');
    if(browser.text('body h1') == '로그인') {
      browser.fill('username', 'kim');
      browser.fill('password', '123');
      browser.pressButton('button', done);
    } else {
      done();
    }
  });

  it('2-3. 등록작업', function(done) {
    browser.fill('writer', board.writer);
    browser.fill('title', board.title);
    browser.fill('content', board.content);
    browser.pressButton('button', done);
  });

  it('2-4. 응답 정상 완료', function() {
    browser.assert.success();
  });

  it('2-5. 등록 성공', function() {
    browser.assert.text('header h1', '등록 결과');
  });

});