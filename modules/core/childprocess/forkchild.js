process.on('message', function(data){
  // a();
  console.log(data);
  process.send('I am child.');
  process.exit(0);
});