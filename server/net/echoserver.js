var file = require('fs').createWriteStream(
                        'output.txt', {flags: 'a'});
require('net').createServer(function(s){
  s.on('error', function(){});
  s.pipe(s);
  s.pipe(file);
}).listen(3456);