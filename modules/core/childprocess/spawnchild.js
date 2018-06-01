var path = require('path');
var filename = path.basename(__filename);
console.log(filename, '실행.');

// 2. 표준 입력장치의 data 이벤트 등록
process.stdin.on('data', function(data){
  // 3. 받은 메세지를 표준 출력장치로 출력
  console.log('부모에게서 온 메세지', data.toString());
});