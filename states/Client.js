var socket = io('http://localhost:3000');
//socket.emit('login', $('#m').val());
$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('loginConfirmed', function(msg){
  $('#messages').append($('<li>').text(msg));

});
socket.on('statsRecived', function(msg){
  $('#messages').append($('<li>').text(msg));
$('[code=login]').hide();
$('[code=requestStats]').show();
$('[code=buscarPartida]').show();
});

socket.on('buscandoPartida', function(msg){
  $('#messages').append($('<li>').text(msg));
$('[code=requestStats]').hide();
$('[code=buscarPartida]').hide();
});

socket.on('partidaEncontrada', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('inicioPartida', function(msg){
  $('#messages').append($('<li>').text(msg));
$('[code=enviarJugada]').show();
});

socket.on('recibirJugada', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('inicioTurno', function(msg){
$('#messages').append($('<li>').text(msg));
$('[code=enviarJugada]').show();
});

socket.on('resultadoPartida', function(msg){
$('#messages').append($('<li>').text(msg));
$('[code=requestStats]').show();
$('[code=buscarPartida]').show();
});



$("body").on("click",".buttonSend",function(){
socket.emit($(this).attr("code"), $(this).attr("val"));
//socket.emit("login", " ");

});
