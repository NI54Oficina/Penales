var serverEnabled=false;
var socket;
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

	partida["tiempomaximo"]= 3;

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
	console.log("Goles COMPUTE "+golesComputer);

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
						auxGolesComputer= golesComputer;
						auxGolesUser=golesUser;
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
								golesUser=auxGolesUser;
								golesComputer= auxGolesComputer;
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
	toSend["jugadasVisitante"]= jugadasLocal;
	console.log(JSON.stringify(toSend));
	toSend=JSON.stringify(toSend);
	//sucribir evento "stats actualizados" a la función del mismo nombre. One shot
	SuscribeServerEvent("statsActualizados","StatsActualizados",this,true);	
	requestSoap("?code=UpdateStats&data="+toSend," ","statsActualizados");
	//requestSoap("/UpdateStats",toSend,"statsActualizados");
	
}

var resultadoPartida= "";

function StatsActualizados(msg){
	console.log("entra resultado update");
	
	
	var auxArray={};
	auxArray["golesUser"]= golesUser;
	auxArray["golesComputer"]= golesComputer;
	resultadoPartida=msg["user1"];
	
	
	CheckEvent('resultadoPartida', JSON.stringify(auxArray));
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
	nombre: "San Mercado",
	imagen: "img-1",
	arquero: "arquero-visitante",
	pateador: "pateador-visitante",
	efectividadA:2,
	efectividadP:2,
	tendencia:[ [0,0,1,2,2,0],
				[0,2,1,1,2,0],
				[0,2,1,1,2,0],
				[0,2,1,1,2,0],
				[0,1,1,1,2,2] ]
	};

	perfil2 = {
		id:2,
		nombre: "Visitante",
		imagen: "img-2",
		arquero: "arquero-visitante",
		pateador: "pateador-visitante",
		efectividadA:5,
		efectividadP:5,
		tendencia:[ [0,1,1,1,2,0],
					[0,1,1,1,2,0],
					[2,1,1,1,2,0],
					[0,0,1,1,2,0],
					[0,2,1,1,2,0] ]
	};


  perfil3 = {
  id:3,
  nombre: "Riber",
  imagen: "img-3",
arquero: "arquero-visitante",
pateador: "pateador-visitante",
  efectividadA:10,
  efectividadP:10,
  tendencia:[ [0,0,1,2,2,0],
			  [0,2,1,1,2,0],
			  [0,0,1,1,2,0],
			  [0,2,1,1,2,0],
			  [0,0,1,1,2,2] ]
  };

  perfil4 = {
	  id:4,
	  nombre: "Mufa",
	  imagen: "img-4",
		arquero: "arquero-mufa",
		pateador: "pateador-mufa",
	  efectividadA:20,
	  efectividadP:20,
	  tendencia:[ [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,0,1,1,2,0],
				  [0,0,1,1,2,0] ]
	};
	
	perfil5 = {
	  id:5,
	  nombre: "Indesingente",
	  imagen: "img-5",
	  		arquero: "arquero-visitante",
		pateador: "pateador-ind",
	  efectividadA:20,
	  efectividadP:20,
	  tendencia:[ [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,0,1,1,2,0],
				  [0,0,1,1,2,0] ]
	};


	perfiles=[perfil1,perfil2, perfil3, perfil4,perfil5];
}

function login(msg){
	
		requestSoap("?code=getSession"," ","loginConfirmed");
		//requestSoap("/getSession",msg,"loginConfirmed");
}

	
function getStats(msg){
	
	requestSoap("?code=getStats&data="+msg," ","getStats");
	//requestSoap("/getStats",msg,"getStats");
}

function SendStats(msg){
	//console.log("terminalogin");
	
}

function requestSoap(code,params,callback){
	 $.post (urlConnect+code, function (response) {
	 //$.post (urlConnect+code,params, function (response) {
		console.log("entra response");
		console.log(response);
		CheckEvent(callback,JSON.parse(response));
	});
}