var SocketEvent = require('../../dist/socket-event');


var socket = io();

var sevent = new SocketEvent({
  socket: socket
});

sevent.on('chatMessage', function(msg){
  console.log(msg);
  $('#messages').append($('<li>').text(msg));
});

$('form').submit(function(){
  sevent.remoteEmit('chatMessage', $('#m').val());
  $('#m').val('');
  return false;
});
