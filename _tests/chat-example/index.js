var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SocketEvent = require('../../dist/socket-event');

var sevent = new SocketEvent({
  io: io
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/bundle.js', function(req, res){
  res.sendFile(__dirname + '/bundle.js');
});

sevent.on('chatMessage', function(msg){
  sevent.remoteEmit('chatMessage', msg);
});

sevent.on('chatMessage', function(msg){
  console.log('msg rec : '+msg);
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
