var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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


	io.on('connection', function(socket){
		console.log("user conected");
		socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log(msg);
	});

	socket.on('login', function(msg){
		//consigue datos de la db
		var datos={};
		datos["nombre"]="Pepe";
		datos["id"]= "2";
		datos["avatar"]= "imagen.jpg";
		datos["puntos"]= 1000;
		io.emit('loginConfirmed',  JSON.stringify(datos));
		console.log("log confirmed");
		SendStats();
	});
	
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
		Reset();
	});


	socket.on('requestStats', function(msg){
		//debería solicitar datos a la db sobre las estadisticas, de momento se simulan localmente
		if(msg){
			var fs = require('fs');
			fs.writeFile("./stats.txt",  msg, function(err) {
				if(err) {
					return console.log(err);
				}
				SendStats();
			});
		}else{
			SendStats();
		}
	});
	
	socket.on('buscarPartida', function(msg){
		io.emit('buscandoPartida', "buscando partida...");
		setTimeout(function(){
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
		},2000);
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


			io.emit('recibeJugada', JSON.stringify(jugadaActual));

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

function SendStats(){
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
		io.emit('statsRecived', data);
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
	//if(mod%2 ==0){
		return oponente["tendencia"][counterVisitante];
	//}else{
	//	return oponente["tendencia"][counterLocal];
	//}
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
		//entra en jugador modo arquero
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