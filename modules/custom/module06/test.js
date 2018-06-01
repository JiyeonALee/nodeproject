var Score = require('./score');

var kim = new Score(100, 90);
var lee = new Score(80, 70);
console.log(kim.sum(), kim.avg());
console.log(lee.sum(), lee.avg());