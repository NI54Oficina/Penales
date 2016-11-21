var serverEnabled=false;
var socket;
var testLocal =true;
if(serverEnabled){
socket = io('http://localhost:3000');
}else{

}
var usuario;
console.log("entra client");

if(serverEnabled){
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

socket.on('resultadoPartida', function(msg){
console.log(msg);
});

}

var currentCallback;
var currentContext;


function Emit(toEmit,params,eventListen="",callback="",context="",oneshot=true){
	if(toEmit=='enviarJugada'){
		console.log("envia jugada al servidor");
		console.log("params "+params);
	}
	console.log("params "+params);
	console.log("event listen "+eventListen);
	if(eventListen!=""){
		SuscribeServerEvent(eventListen,callback,context,oneshot);
	}
	if(serverEnabled){
		socket.emit(toEmit, params);
	}else{
		CheckEvent(eventListen,GetDummy(eventListen));
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
		//if(serverEnabled){
			params=JSON.parse(params);
		//}
		context[callback](params);
	};
}

var prefijo="pasos";

function SaveStorage(code,value){
	localStorage[prefijo+code]=value;
}

function GetStorage(code){
	return localStorage[prefijo+code];
}

function GetDummy(event){
	if(!serverEnabled&&event=='recibeJugada'){
		return '{"user":'+localStorage["jugadaPlayer"]+',"computer":'+game.rnd.integerInRange(1,6)+'}';
	}
	return dummys[event];
}

var dummys={};
dummys["loginConfirmed"]='{"id":2,"avatar":"assets\/general\/images\/test-avatar.jpg","puntos":"10000","credits":23232}';
dummys["statsRecived"]='{"TotalConvertidos":10,"PartidosGanados":5,"PartidosPerdidos":3,"TotalErrados":3,"TotalAtajados":5,"TotalNoAtajados":3,"RachaGanados":3,"RachaPerdidos":3,"RachaConvertidos":3,"RachaErrados":3,"RachaAtajados":3,"RachaNoAtajados":3,"MejorRachaAtajados":3,"MejorRachaConvertida":3,"PeorRachaNoAtajados":3,"PeorRachaErrados":3,"TotalPartidaAtajados":3,"TotalPartidaConvertidos":3,"TotalPartidaNoAtajados":3,"TotalPartidaErrados":3}';
dummys["partidaEncontrada"]='{"oponente":{"nombre":"Pepita","session":"token","efectividad":"20","tendencia":[[0,0,1,2,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,1,1,1,2,2]]},"tiempomaximo":5,"camiseta":"Visitante","rol-inicial":"Arquero","rol":0,"IntentosOponente":1,"Intentoslocal":0}';
dummys["recibeJugada"]='{"user":5,"computer":5}';
dummys["inicioTurno"]='{"localGol":0,"visitanteGol":0,"localTurno":0,"visitanteTurno":2}';
dummys["resultadoPartida"]='{"golesUser":3,"golesComputer":2}';
dummys["getStats"]='{"ganados":6,"perdidos":16,"rachaGanados":0,"rachaPerdidos":1,"atajados":27,"convertidos":57,"errados":54,"noAtajados":84,"rachaAtajados":0,"rachaConvertidos":0,"rachaErrados":2,"rachaErradosHistorica":6,"rachaConvertidosHistorica":9,"rachaNoAtajados":2,"rachaNoAtajadosHistorica":11,"rachaAtajadosHistorica":3,"rachaPerdidosHistorica":7,"rachaGanadosHistorica":3}';


function SaveStats(msg){
	console.log("entra save");
	//msg= JSON.parse(msg);
	
	//console.log(JSON.parse(msg));
	
	$.each(msg,function(index,value){
		localStorage[index]=value;
	});
}
