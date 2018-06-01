var m1 = require('./m1'); // return object
console.log(typeof m1, m1.name, m1.type);

var m2 = require('./m2'); // return function
console.log(typeof m2);
var kim = m2('김철수', 30); // object
var lee = m2('이영희', 25); // object
var hong = require('./m2')('홍길동', 40);
console.log(kim.name, kim.age);
console.log(lee.name, lee.age);
console.log(hong.name, hong.age);
console.log(require('./m2') == m2);

var m3 = require('./m3'); // return function
var score1 = m3({kor: 100, eng:90});
var score2 = m3({kor: 80, eng:70});
var score3 = require('./m3')({kor: 60, eng:50});
console.log(score1.sum(), score1.avg());
console.log(score2.sum(), score2.avg());
console.log(score3.sum(), score3.avg());

var http = require('./m4');
var fs = require('./m4');
var url = require('./m4');

http.createServer(function(req, res){});
fs.readFile('hello.html', function(err, data){});
url.parse('http://localhost:1234/hello.html?name=kim');

// var logger = require('./m5')({type: 'console'});
var logger = require('./m5')({type: 'file', path: 'log.txt'});
logger('접속...');
logger('작업중...');
logger('종료...');