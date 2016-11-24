var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var testLocal=true;

var urlConnect="http://localhost/Penales/tentativasServer.php";

var perfiles;

var partidas={};

var listaEspera=[{},{},{},{}];

var online= {};

var pause=false;

var request = require('request');
	
	
io.on('connection', function(socket){
		console.log(socket.id);
		//io.sockets.socket(socket.id).emit("poyo")
		var connectedUser={};
		connectedUser.socket= socket;
		connectedUser.usuario= "poyo";
		online[socket.id]= connectedUser;
		console.log("user conected");
		socket.emit("session",socket.id);
	
	
	socket.on('chat message', function(msg){
		socket.emit('chat message', msg);
		
		console.log(msg);
	});
		
	socket.on('checkSession', function(msg){
		console.log(msg);
		var auxMsg= JSON.parse(msg);
		console.log(online[msg.session]);
	});

	socket.on('login', function(msg){
		console.log("-----------------------------------");
		console.log(msg);
		console.log("-----------------------------------");
		msg= JSON.parse(msg);
		console.log(msg);
		console.log("-----------------------------------");
		if(testLocal){
			requestSoap("?code=getSession"," ","loginConfirmed",msg.session);
		}else{
			requestSoap("/getSession",msg.msg.id,"loginConfirmed",msg.session);
		}
	});
	
	
	socket.on('disconnect', function(data){
		console.log('user disconnected');
		console.log(data);
		Reset();
	});
	
	socket.on('online', function(data){
		console.log(online);
	});
	socket.on('listaEspera', function(data){
		console.log("entra lista espera");
		/*if(data&&data!=""){
			console.log(listaEspera[data]);
		}else{
			console.log(listaEspera);
		}*/
		console.log(listaEspera);
	});
	
	socket.on('pause', function(data){
		pause=true;
		console.log("pause update");
	});
	
	socket.on('resume', function(data){
		pause=false;
		console.log("play update");
		
	});
	
	socket.on('getStats', function(msg){
		//debería solicitar datos a la db sobre las estadisticas, de momento se simulan localmente
		/*if(msg){
			var fs = require('fs');
			fs.writeFile("./stats.txt",  msg, function(err) {
				if(err) {
					return console.log(err);
				}
				SendStats();
			});
		}else{
			SendStats();
		}*/
		SendStats(msg);
	});
	
	socket.on('buscarPartida', function(msg){
		socket.emit('buscandoPartida', "buscando partida...");
		var ops= JSON.parse(msg);
		ops.msg= JSON.parse(ops.msg);
		console.log(ops);
		//console.log(msg);
		online[ops.session].estado="cola";
		listaEspera[ops.msg.tipo-1][ops.session]=1;
	/*	setTimeout(function(){
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

			oponente= GetOponente();

			partida["oponente"]=oponente;

			partida["tiempomaximo"]= 10;

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

			io.emit('partidaEncontrada', JSON.stringify(partida));

			console.log("Partida encontrada");
			console.log(golesUser);
			console.log(golesComputer);

			setTimeout(function(){
			io.emit('inicioPartida', "start");
			console.log("Iniciar Partida");

			},2000);
		},2000);*/
	});
	
	socket.on('ready', function(msg){
		console.log(msg);
		var ops= JSON.parse(msg);
		console.log(ops);
		console.log("----------------------------------");
		online[ops.session].estado="listo";
		var auxPartida= partidas[online[ops.session].partida];
		var oponente= auxPartida.oponente(ops.session);
		oponente.socket.emit("oponenteListo",JSON.stringify({status:1}));
		auxPartida.tick();
	});

	socket.on('enviarJugada', function(msg){
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

			calculatePuntaje(msg, ubicacion);
			jugadaActual["user"]=msg;
			jugadaActual["computer"]=ubicacion;
			mod++;
			console.log("PUNTOS USER: "+ golesUser);
			console.log("PUNTOS COMPUTER: "+ golesComputer);


			socket.emit('recibeJugada', JSON.stringify(jugadaActual));

			setTimeout(function(){

				if(counterVisitante >= 5 &&  counterLocal >= 5 ){

						if(golesUser == golesComputer && !enAlargue){
							auxCont++;
							enAlargue=true;
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

			},3000);
		},2000);
	});

});


	

function InicioTurno(){
	
	var turnoArray={};
	//if(modStart==1){
		turnoArray["localGol"]=golesUser;
		turnoArray["visitanteGol"]=golesComputer;
		turnoArray["localTurno"]=counterLocal;
		turnoArray["visitanteTurno"]=counterVisitante;
	/*}else{
		turnoArray["localGol"]=golesUser;
		turnoArray["visitanteGol"]=golesComputer;
		turnoArray["localTurno"]=counterVisitante;
		turnoArray["visitanteTurno"]=counterLocal;
	}*/
	io.emit('inicioTurno', JSON.stringify(turnoArray));
}

function SendStats(msg){
	//setear variable resultados
	msg= JSON.parse(msg);
	if(testLocal){
		requestSoap("?code=getStats&data="+msg.msg," ","getStats",msg.session);
	}else{
		// var auxU= {id: usuario["id"]};
		requestSoap("/getStats",{id: msg.smg},"getStats",msg.session);
		// requestSoap("/getStats",JSON.stringify(auxU),"getStats");
	}
}


function requestSoap(code,params,callback,session){
	console.log("envia params");
	console.log(params);
	console.log(callback);
	console.log(session);
	
	console.log("-------------------------------------------------");
	 
	 request.post(urlConnect+code,params, function (error, response, body) {
		
		console.log(callback);
		console.log(session);
		console.log("-------------------------------------------------");
		global[callback](body,session);
	});
}


global.loginConfirmed= function(msg,session){
	var connectedUser= JSON.parse(msg);
	console.log(session);
	online[session].usuario= connectedUser;
	online[session].estado="online";
	console.log(online[session]);
	console.log("------------------------");
	//online.[connectedUser.id](connectedUser);
	online[session].socket.emit('loginConfirmed',  msg);
}

global.getStats= function(msg,session){
	console.log("entra session");
	console.log(session);
	console.log("----------------------------------------------------");
	online[session].socket.emit("getStats",msg);
}

function SendStats2(){
	//setear variable resultados
	var stats;
	var fs = require('fs');
	fs.readFile("./stats.txt",  "utf8", function(err,data) {
		if(err) {
			console.log("entra error");
			return console.log(err);
		}
		stats=data;
		console.log("Stats enviados");
		online[session].socket.emit('getStats', data);
	});
}

function GetResultado(){
	//tendria que emitir el resultado, cliente lo recibe, setea y va a pantalla correspondiente segun comprobación.
	var auxArray={};
	//cambiar por local y visitante segun corresponda
	auxArray["golesUser"]= golesUser;
	auxArray["golesComputer"]= golesComputer;
	io.emit('resultadoPartida', JSON.stringify(auxArray));
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
	if(mod%2 == 0){
		if(generator>0 && msg!=generator){
			golesComputer++;
		};
	}else{
		//entra en jugador modo pateador
		if(msg>0 && msg!=generator){
			golesUser++;
		}	
	}
	return;
}

function Reset(){
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


http.listen(3000, function(){
  console.log('listening on *:3000');
});

function GetOponente(){
	var oponente= {};
	oponente["nombre"]="Pepita";
	oponente["session"]="token";
	setPerfiles();
	var auxP= randomBetween(0,3);
	auxP= perfiles[auxP];
	oponente["efectividadA"]=auxP["efectividadA"];
	oponente["efectividadP"]=auxP["efectividadP"];

	oponente["tendencia"]= auxP["tendencia"];
	return oponente;
}

function SetEnemy(){
  var id= game.rnd.integerInRange(1,4);

  array= perfiles[id-1].tendencia;

  return perfiles[id-1];

}

function setPerfiles(){
	
	perfil1 = {
	id:1,
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
	  efectividadA:20,
	  efectividadP:20,
	  tendencia:[ [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,1,1,1,2,0],
				  [0,0,1,1,2,0],
				  [0,0,1,1,2,0] ]
	};


	perfiles=[perfil1,perfil2, perfil3, perfil4];
}


function Partida (tipo) {
	this.id=-1;
    this.local={};
    this.visitante={};
	
	this.tipo=tipo;

	this.jugadas={};

	this.jugadaActual={};

	this.counterPartida=0;

	this.counterLocal=0;

	this.counterVisitante=0;

	this.golesVisitante=0;

	this.golesLocal=0;

	this.auxCont=0;

	this.modStart=-1;

	this.enAlargue=false;

	this.finished=false;
	
	this.state="pending";
	
	this.tick= function(){
		console.log("tick "+this.id+" "+this.state);
		if(this.state=="pending"){
			console.log("user1 "+this.local.estado);
			console.log("user2 "+this.visitante.estado);
			if(this.local.estado=="listo"&&this.visitante.estado=="listo"){
				console.log("partida lista!");
				this.local.socket.emit("recibirLado",1);
				this.visitante.socket.emit("recibirLado",2);
				this.state="starting";
			}
		}else if(this.state="starting"){
			//this.local.emit();
		}else if(this.state="game"){
			
		}
	};
	
	this.oponente=function(player){
		if(this.local.socket.id==player){
			return this.visitante;
		}else{
			return this.local;
		}
	};
}

/*function Usuario(auxU){
	this.id=auxU.id;
	this.avatar=avatar;
}*/


/**Loop**/
//var tickLengthMs = 1000 / 2
var tickLengthMs = 5000 / 1

/* gameLoop related variables */
// timestamp of each loop
var previousTick = Date.now()
// number of times gameLoop gets called
var actualTicks = 0

var gameLoop = function () {
  var now = Date.now()

  actualTicks++
  if (previousTick + tickLengthMs <= now) {
    var delta = (now - previousTick) / 1000
    previousTick = now

    update(delta)

    //console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks)
    actualTicks = 0
  }

  if (Date.now() - previousTick < tickLengthMs - 16) {
    setTimeout(gameLoop)
  } else {
    setImmediate(gameLoop)
  }
}


/**
Update is normally where all of the logic would go. In this case we simply call
a function that takes 10 milliseconds to complete thus simulating that our game
had a very busy time.
*/
var update = function(delta) {
	if(pause){
		return;
	}
 console.log("entra Update "+Date.now());
 MatchMaking();
 UpdateMatches();
 console.log("----------------------------------------");
}

/**
A function that wastes time, and occupies 100% CPU while doing so.
Suggested use: simulating that a complex calculation took time to complete.
*/
var aVerySlowFunction = function(milliseconds) {
  // waste time
  var start = Date.now()
  while (Date.now() < start + milliseconds) { }  
}

// begin the loop !
gameLoop();

/**End Loop**/

function MatchMaking(){
	console.log(listaEspera);
	for(var a=0;a<listaEspera.length;a++){
		//console.log("entra "+a);
		try{
			var inWait="";
			for (var key in listaEspera[a]) {
				if(inWait==""){
					inWait= key;
				}else{
					CreateMatch([inWait,key],a);
					inWait="";
				}
				//console.log(key);
				//console.log(listaEspera[a][key]);
			}
		}catch(error){
			console.log(error);
		}
	}
	
}

function CreateMatch(users,tipo){
	
	var auxPartida= new Partida(tipo);
	auxPartida.local= online[users[0]];
	auxPartida.visitante= online[users[1]];
	console.log("match creado");
	console.log(users);
	console.log(auxPartida);
	
	//aca habría que hacer el soap para pedir el id de partida al server
	var code="";
	var auxParam={modo:tipo,usuarios:users};
	console.log(auxParam);
	if(testLocal){
		code="?code=createMatch";
	}else{
		code="/createMatch";
	}
	request.post(urlConnect+code,{form:{data:JSON.stringify(auxParam)}}, function (error, response, body) {
		console.log("---------------------------");
		console.log(body);
		console.log("---------------------------");
		auxPartida.id= body;
		auxPartida.local.estado="espera";
		auxPartida.local.partida=body;
		auxPartida.visitante.estado="espera";
		auxPartida.visitante.partida=body;
		delete listaEspera[tipo][users[0]];
		delete listaEspera[tipo][users[1]];
		console.log(auxPartida);
		partidas[body]= auxPartida;
		var auxVisitante= JSON.parse(JSON.stringify(auxPartida.visitante.usuario));
		delete auxVisitante["puntos"];
		delete auxVisitante["credits"];
		delete auxVisitante["estado"];
		delete auxVisitante["id"];
		var auxLocal= JSON.parse(JSON.stringify(auxPartida.local.usuario));;
		delete auxLocal["puntos"];
		delete auxLocal["credits"];
		delete auxLocal["estado"];
		delete auxLocal["id"];
		auxPartida.local.socket.emit("oponente",JSON.stringify(auxVisitante));
		auxPartida.visitante.socket.emit("oponente",JSON.stringify(auxLocal));
		//enviar datos del oponente a cada jugador
		//pause=true;
	});
	
}

function UpdateMatches(){
	for (var id in partidas) {
		partidas[id].tick();
	}
}