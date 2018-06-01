function chat(io){
  io.on('connection', function(s){
    s.on('disconnect', function(){
      io.emit('chat', `시스템: ${s.nickname} 님이 퇴장했습니다.`);
    });
    s.on('login', function(nickname){
      s.nickname = nickname || 'guest';
      io.emit('chat', `시스템: ${s.nickname} 님이 입장했습니다.`);
    });
    s.on('chat', function(msg){
      io.emit('chat', `${s.nickname}: ${msg}`);
    });
  });
}

module.exports = chat;