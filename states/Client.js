var socket = io('http://localhost:3000');
var usuario;
console.log("entra client");



socket.on('loginConfirmed', function(msg){
  console.log(msg);
  ResponseCallBack(msg);
});
socket.on('statsRecived', function(msg){
	console.log(msg);
	var auxArray=JSON.parse(msg);
	console.log(auxArray);
	$.each(auxArray, function( index, value ) {
		localStorage[index]=value;
	});
	console.log(msg);
});

socket.on('buscandoPartida', function(msg){
  console.log(msg);

});

socket.on('partidaEncontrada', function(msg){
  console.log(msg);
});

socket.on('inicioPartida', function(msg){
	console.log(msg);
});

socket.on('recibirJugada', function(msg){
  console.log(msg);
});

socket.on('inicioTurno', function(msg){
console.log(msg);
});

socket.on('resultadoPartida', function(msg){
console.log(msg);
});


var currentCallback;
var currentContext;

function Emit(toEmit,params,callback,context){
	currentCallback=callback;
	currentContext=context;
	socket.emit(toEmit, params);
}

function ResponseCallBack(msg){
	if(currentCallback){
		currentContext[currentCallback](msg);
		currentCallback=null;
		currentContext=null;
	}
}