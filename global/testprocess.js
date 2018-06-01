console.log('1. process 시작.');
console.log(process.cwd());
console.log(process.argv);

process.on('exit', function(code){
  console.log('process 종료 직전에 처리할 작업.', code);
  setTimeout(function(){
    console.log('exit 이벤트 내의 비동기 함수는 호출되지 않는다.');
  }, 1000);
});

try{
  a();
}catch(err){
  console.log(err.message);
}

setTimeout(function(){
  console.log('강제 종료 후에는 비동기 함수 실행되지 않음.');
}, 2000);

setTimeout(function(){
  console.log('등록된 비동기 함수 실행 후에 종료2.');
  process.exit(0);
}, 1000);

console.log('2. process 종료 직전에 처리할 작업.');
console.log('3. process 종료.');