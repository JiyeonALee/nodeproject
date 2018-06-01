var childProcess = require('child_process');

// 지정한 프로세스 실행
// childProcess.spawn('calc.exe');
// childProcess.spawn('notepad.exe');

// spawn(command, [args], options);
var child = childProcess.spawn('node.exe', ['spawnchild.js'], {
  // 부모 프로세스의 표준 입출력 장치를 자식이 사용
  // stdio: 'inherit'
  // -> stdio: ['inherit', 'inherit', 'inherit']

  // 자식 프로세스의 표준 입출력 장치를 사용안함
  // stdio: 'ignore'

  // 자식 프로세스의 표준 입출력 장치를 
  // 생성된 ChildProcess 객체의 
  // stdin, stdout, stderr 속성에 pipe 연결(기본)
  // stdio: 'pipe'
});

var child = childProcess.spawn('cmd.exe');
child.stdin.write('dir\n');

// 1. 자식의 표준 입력장치로 'hello' 전송
// child.stdin.write('hello');

// 4. 자식의 표준 출력장치에 data 이벤트 등록
child.stdout.on('data', function(data){
  // 5. 자신의 표준 출력장치에 출력
  console.log(/*'자식이 보낸 메세지', */data.toString());
});

