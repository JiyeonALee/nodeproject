var childProcess = require('child_process');

// spawn()으로 쉘을 생성한 후 쉘에 command를 전달한다.
// 자식 프로세스의 출력이 완료되면 콜백 함수가 호출
// exec(command[, options][, callback])
childProcess.exec('dir', function(err, stdout, stderr){
  if(err) console.error(err);
  console.log(stdout);
});

// 쉘을 생성하지 않고 지정한 파일을 실행한다.
// 나머지는 exec() 동일
childProcess.execFile('calc.exe');