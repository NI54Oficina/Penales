var socket = io('http://localhost:3000');
var usuario;
console.log("entra client");

var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call (this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};

socket.on("*",function(event,data) {
	console.log("entra generico");
    console.log(event);
    console.log(data);
	CheckEvent(event,data);
});


socket.on('loginConfirmed', function(msg){
  console.log(msg);
  //ResponseCallBack(msg);
});

socket.on('statsRecived', function(msg){
	console.log(msg);
	auxArray=JSON.parse(msg);
	console.log(auxArray);
	$.each(auxArray, function( index, value ) {
		localStorage[index]=value;
	});
	console.log(msg);
});

socket.on('buscandoPartida', function(msg){
  console.log("buscando partida");
  console.log(msg);


});

socket.on('partidaEncontrada', function(msg){
  console.log(msg);

    ResponseCallBack(msg);


});

socket.on('inicioPartida', function(msg){
	console.log(msg);
//  console.log(currentContext);
  //currentContext["Clicked"](currentContext);
  //Clicked();


});

socket.on('recibeJugada', function(msg){
  //console.log(msg);

  //ResponseCallBack(msg);

});

socket.on('inicioTurno', function(msg){
//console.log(msg);
  //currentContext["checkIntentos"](currentContext);
  //restart();
});


socket.on('resultadoPartida', function(msg){
console.log(msg);
});


var currentCallback;
var currentContext;

function Emit(toEmit,params,eventListen="",callback="",context="",oneshot=true){
  if(toEmit=='enviarJugada'){
    console.log("envia jugada al servidor");
  }
  console.log("params "+params);
  console.log("event listen "+eventListen);
  if(eventListen!=""){
	SuscribeServerEvent(eventListen,callback,context,oneshot);
  }
	//currentCallback=callback;
	//currentContext=context;
	socket.emit(toEmit, params);
}

function ResponseCallBack(msg){
	if(currentCallback){
		currentContext[currentCallback](msg);
		currentCallback=null;
		//currentContext=null;
	}
}

var events={};

function SuscribeServerEvent(code,callback,context,oneshot=true){
	var auxEvent= new ServerEvent(callback,context,oneshot);
	console.log("sucribe "+code);
	events[code]= auxEvent;
}

function CheckEvent(toCheck,params){
	console.log("entra check "+toCheck);
	if(events[toCheck]){
		events[toCheck].trigger(params);
		if(events[toCheck].oneshot){
			events[toCheck]=null;
		}
	}
}

function ServerEvent(callback,context,oneshot=true){
	this.callback= callback;
	this.context=context;
	this.oneshot=oneshot;
	this.trigger= function(params=""){
		context[callback](params);
	};
}