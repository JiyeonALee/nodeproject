console.log('m5는 일부 확장모듈이 제공하는 패턴.');

function fn(options){
  if(options.type == 'file'){
    var logger = require('fs')
        .createWriteStream(options.path, {flags: 'a'});
  }
  return function(msg){
    if(options.type == 'file'){
      logger.write(msg + '\n');
    }else{
      console.log(msg);
    }    
  };
};

module.exports = fn;