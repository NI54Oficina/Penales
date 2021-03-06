var serverEnabled=false;
var modoMultiplayer=false;
var socket;
if(serverEnabled){
socket = io('http://localhost:3000');
}else{

}
var usuario;
var testLocal=true;
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
		//socket.emit(toEmit, params);
	}else{
		//CheckEvent(eventListen,GetDummy(eventListen));
	}
	console.log("To emit: "+toEmit);
	window[toEmit](params);

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

var prefijo="pasos";

function SaveStorage(code,value){
	localStorage[prefijo+code]=value;
}

function GetStorage(code){
	return localStorage[prefijo+code];
}

function GetDummy(event){
	/*if(!serverEnabled&&event=='recibeJugada'){
		return '{"user":'+localStorage["jugadaPlayer"]+',"computer":'+game.rnd.integerInRange(1,6)+'}';
	}*/
	return dummys[event];
}



//********************************************************///
//********************************************************///
//********************************************************///
//********************************************************///
//********************************************************///

var oponente={};

var partida={};

var jugadaActual={};

var counterPartida=0;

var counterLocal=0;

var counterVisitante=0;

var golesUser;

var golesComputer;

var auxCont=0;

var modStart=-1;

var enAlargue=false;

var finished=true;

var perfiles;

var jugadasLocal= new Array();
var jugadasVisitante= new Array();

var auxGolesUser;
var auxGolesComputer;


function buscarPartida(msg){
	//io.emit('buscandoPartida', "buscando partida...");
	CheckEvent("buscandoPartida", "buscando partida...");

	Reset();
	finished=false;
	mod=randomBetween(0,1);
	mod=1;
	modStart=mod;
	if(mod%2==0){
		counterLocal=0;
		counterVisitante=1;
	}else{
		counterLocal=1;
		counterVisitante=0;
	};

	oponente= GetOponente(msg);

	partida["oponente"]=oponente;

	partida["tiempomaximo"]= 0;

	if(mod==1){
		partida["camiseta"]= "local";
		partida["rol-inicial"]= "Pateador";

	}else{
		partida["camiseta"]= "Visitante";
		partida["rol-inicial"]= "Arquero";
	}

	partida["rol"]=mod;
	partida["IntentosOponente"]=counterVisitante;
	partida["Intentoslocal"]=counterLocal;

	CheckEvent('partidaEncontrada', JSON.stringify(partida));

	console.log("Partida encontrada");
	console.log("Goles USER "+golesUser);
	console.log("Goles COMPUTER "+golesComputer);

	setTimeout(function(){
	CheckEvent('inicioPartida', "start");
	console.log("Iniciar Partida");

	},100);

}

function enviarJugada(msg){
	console.log("entra enviar jugada");
	if(finished){
		return;
	}
	setTimeout(function(){

		if(mod%2 == 0){
			//entra con jugador en modo arquero
			console.log("jugador es arquero");
			ubicacion =  CalculateTiro(msg);

			counterVisitante++;
		}else{
			//entra con jugador en modo pateador
			console.log("jugador es pateador");
			ubicacion = CalculateAtaje(msg);

			counterLocal++;
		}
		jugadasLocal.push(msg);
		jugadasVisitante.push(ubicacion);
		calculatePuntaje(msg, ubicacion);
		jugadaActual["user"]=msg;
		jugadaActual["computer"]=ubicacion;
		mod++;
		console.log("PUNTOS USER: "+ golesUser);
		console.log("PUNTOS COMPUTER: "+ golesComputer);


		CheckEvent('recibeJugada', JSON.stringify(jugadaActual));

		setTimeout(function(){

			if(counterVisitante >= 5 &&  counterLocal >= 5 ){

					if(golesUser == golesComputer && !enAlargue){
						auxCont++;
						enAlargue=true;
						//auxGolesComputer= golesComputer;
						//auxGolesUser=golesUser;
						console.log("EMPATE");
						InicioTurno();
						console.log("Iniciar Turno");

					}else if(enAlargue){
						if(auxCont!=2){
							auxCont++;
							console.log("EMPATE");
							InicioTurno();
							console.log("Iniciar Turno");
						}else{

							console.log("GOLES USER: "+ golesUser +", GOLES COMPUTER: "+ golesComputer);
							 if(golesUser == golesComputer){
								//golesUser=auxGolesUser;
								//golesComputer= auxGolesComputer;
								auxCont=0;
								console.log("EMPATE");
								InicioTurno();
								console.log("Iniciar Turno");
							}else{

								console.log("TERMINA JUEGO EN EMPATE"); GetResultado();
							}
						};
					}else{
						console.log("TERMINA JUEGO");
						finished=true;
						GetResultado();
					};
			}else{
				console.log("NUEVO TURNO");
				InicioTurno();
				console.log("Iniciar Turno");
			}

		},4500);
	},700);
}

function InicioTurno(){

	var turnoArray={};
	turnoArray["localGol"]=golesUser;
	turnoArray["visitanteGol"]=golesComputer;
	turnoArray["localTurno"]=counterLocal;
	turnoArray["visitanteTurno"]=counterVisitante;

	CheckEvent('inicioTurno', JSON.stringify(turnoArray));
}

function GetResultado(){
	console.log("entra resultado");
	//tendria que emitir el resultado, cliente lo recibe, setea y va a pantalla correspondiente segun comprobación.

	//aca debería de llamar UpdateStats;
	var toSend={};
	toSend["gameId"]=-1;
	toSend["localId"]= 1;
	toSend["visitanteId"]= -1;
	toSend["jugadasLocal"]= jugadasVisitante;
	//toSend["jugadasLocal"]= [1,1,1,1,1,1,1,1,1,1];
	toSend["jugadasVisitante"]= jugadasLocal;
	//toSend["jugadasVisitante"]= [2,1,2,1,2,1,2,1,2,1];
	console.log(JSON.stringify(toSend));
	toSend=JSON.stringify(toSend);
	//sucribir evento "stats actualizados" a la función del mismo nombre. One shot
	SuscribeServerEvent("statsActualizados","StatsActualizados",this,true);
	if(testLocal){
		requestSoap("?code=UpdateStats&data="+toSend," ","statsActualizados");
	}else{
		requestSoap("/UpdateStats",{json: toSend},"statsActualizados");
		//requestSoap("/UpdateStats",toSend,"statsActualizados");
	}


}

var resultadoPartida= "";

function StatsActualizados(msg){
	console.log("entra resultado update");
	
	//SaveStats();

	
	resultadoPartida=msg["user1"];
	resultadoPartida["golesUser"]=golesUser;
	resultadoPartida["golesComputer"]=golesComputer;
	console.log(resultadoPartida);
	
	CheckEvent('resultadoPartida', JSON.stringify(resultadoPartida));
	SendStats();
	golesUser=0;
	golesComputer=0;
	counterLocal=0;
	counterVisitante=0;
}

function CalculateAtaje(msg){

	generator = calculoChancesAtajar(msg);
	return generator;

}

function calculoChancesAtajar(msg){
	/**borrar
	return msg;
	/**end borrar**/
    var chanceAtajar = randomBetween(1,oponente["efectividadA"]);

    if(chanceAtajar==1){
		return msg;
    }else {
		var gen = randomBetween(1,6);
		return gen;
    }
}

function CalculateTiro(){
	
	var errar=randomBetween(1,oponente['efectividadP']);

	if(errar==1){
		return randomBetween(0,-4);
	}
	if(!enAlargue){
		var a = getMaso();
		var b= generarRiesgo(a);

		return b;
	}else{
		return randomBetween(1,6);
	}


}

function getMaso(){
	return oponente["tendencia"][counterVisitante];
}

function generarRiesgo(arrai){
	//a veces llega array vacio
	if(!arrai){
		return randomBetween(1,6);
	}
	var arrayNuevo = [];


	for(var i =1 ; i<7; i++){
		if(arrai[i-1] == 1){
		  for (var j=1; j < 3; j++) {
		  arrayNuevo.push(i);
		  }

		}else if(arrai[i-1]==2){
		  for (var j=1; j < 4; j++) {
			arrayNuevo.push(i);
			}
		}else{

		  arrayNuevo.push(i);

		};
	}

	var longitud = arrayNuevo.length;
	var lon= longitud-1;
	var pos = randomBetween(0,lon);
	return arrayNuevo[pos];
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function calculatePuntaje(msg, generator){
	console.log("entra puntaje");

	if(mod%2 == 0){
		console.log("jugador es arquero");
		if(generator>0 && msg!=generator){
			golesComputer++;
		};
	}else{
		console.log("jugador es pateador");
		//entra en jugador modo pateador
		if(msg>0 && msg!=generator){
			golesUser++;
		}
	}
	return;
}

function Reset(){
	jugadasLocal=new Array();
	jugadasVisitante=new Array();
	finished=true;
	enAlargue=false;
	modStart=-1;
	auxCont=0;
	golesComputer=0;
	golesUser=0;
	counterVisitante=0;
	counterLocal=0;
	oponente={};
	jugada={};
	jugadaActual={};
}

function GetOponente(idOponente=-1){
	console.log("entra oponente "+idOponente);
	var oponente= {};

	oponente["session"]="token";
	setPerfiles();
	var auxP;
	if(idOponente!=-1&&idOponente!=" "){
		auxP= idOponente;
	}else{
		auxP= randomBetween(1,5);
	}

	auxP= perfiles[auxP-1];
	/*oponente["nombre"]=auxP["nombre"];
	oponente["imagen"]=auxP["imagen"];
	oponente["id"]=auxP["id"];
	oponente["efectividadA"]=auxP["efectividadA"];
	oponente["efectividadP"]=auxP["efectividadP"];


	oponente["tendencia"]= auxP["tendencia"];*/

	var auxTendencia= new Array();
	console.log("lega");
	console.log(auxP);
	var secuencia= new Array();
	$.each(auxP["tendencia"],function(index,value){
		console.log("valor "+value);

		for(var a=0;a<value;a++){
			secuencia.push(index);
		}

	});
	for(var a=0;a<6;a++){
		var auxTurno= secuencia.slice();
		for(var b=0;b<20;b++){
			var i1= randomBetween(0,5);
			var i2= randomBetween(0,5);
			var auxContainer= auxTurno[i1];
			auxTurno[i1]=auxTurno[i2];
			auxTurno[i2]= auxContainer;
		}
		auxTendencia.push(auxTurno);
	}

	auxP["tendencia"]= auxTendencia;

	return auxP;
}

function SetEnemy(){
  var id= game.rnd.integerInRange(1,4);

  array= perfiles[id-1].tendencia;

  return perfiles[id-1];

}

function setPerfiles(){

	perfil1 = {
	id:1,
	nombre: "SAN BOEDO",
	avatar: "img-1",
	arquero: "arquero-mercado",
	pateador: "pateador-mercado",
	efectividadA:2,
	efectividadP:2,
	tendencia:[2,2,2]
	};

	perfil2 = {
		id:2,
		nombre: "A DEFINIR",
		avatar: "img-2",
		arquero: "arquero-svisitante",
		pateador: "pateador-svisitante",
		efectividadA:5,
		efectividadP:5,
		tendencia:[2,2,2]
	};


  perfil3 = {
  id:3,
  nombre: "LA BANDA ROJA",
  avatar: "img-3",
arquero: "arquero-riber",
pateador: "pateador-riber",
  efectividadA:10,
  efectividadP:10,
  tendencia:[2,2,2]
  };

  perfil4 = {
	  id:4,
	  nombre: "LA ACADÉ",
	  avatar: "img-4",
		arquero: "arquero-mufa",
		pateador: "pateador-mufa",
	  efectividadA:20,
	  efectividadP:20,
	  tendencia:[2,2,2]
	};

	perfil5 = {
	  id:5,
	  nombre: "LOS ROJOS",
	  avatar: "img-5",
	  		arquero: "arquero-ind",
		pateador: "pateador-ind",
	  efectividadA:20,
	  efectividadP:20,
	  tendencia:[2,2,2]
	};


	perfiles=[perfil1,perfil2, perfil3, perfil4,perfil5];
}

function login(msg){
	if(testLocal){
		requestSoap("?code=getSession"," ","loginConfirmed");
	}else{
		requestSoap("/getSession",msg,"loginConfirmed");
	}
}


function getStats(msg){
	//SuscribeServerEvent("getStats","SaveStats",this,true);
	if(testLocal){
		requestSoap("?code=getStats&data="+msg," ","getStats");
	}else{
		// var auxU= {id: usuario["id"]};
		requestSoap("/getStats",{id: msg},"getStats");
		// requestSoap("/getStats",JSON.stringify(auxU),"getStats");
	}
}

function SendStats(msg){
	//console.log("terminalogin");

}

function requestSoap(code,params,callback){
	console.log("envia params");
	console.log(params);
	 //$.post (urlConnect+code, function (response) {
	 $.post (urlConnect+code,params, function (response) {
		console.log("entra response");
		console.log(response);
		CheckEvent(callback,JSON.parse(response));
	});
}


function SaveStats(msg){
	$.each(msg,function(index,value){
		localStorage[index]=value;
	});
}
