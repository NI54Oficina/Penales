var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var oponente={};

var jugada={};

var jugadaActual={};

var counterPartida=0;

var counterLocal=0;

var counterVisitante=0;

var golesUser;

var golesComputer;

var auxCont=0;

var modStart=0;

var enAlargue=false;

var finished=false;


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
			finished=false;
			mod=randomBetween(0,1);
			modStart=mod;
			golesUser=0;
			golesComputer=0;
			counterLocal=0;
			counterVisitante=0;
			if(mod%2==0){
				counterLocal=0;
				var counterVisitante=1;
			}else{
				counterLocal=1;
				counterVisitante=0;
			};

			oponente["nombre"]="Pepita";
			oponente["session"]="token";

			oponente["efectividad"]="20";

			oponente["tendencia"]= [[0,0,1,2,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,1,1,1,2,2]];

			jugada["oponente"]=oponente;

			jugada["tiempomaximo"]= 5;

			if(mod==1){
				jugada["camiseta"]= "local";
				jugada["rol-inicial"]= "Pateador";

			}else{
				jugada["camiseta"]= "Visitante";
				jugada["rol-inicial"]= "Arquero";
			}

			jugada["rol"]=mod;
			jugada["IntentosOponente"]=counterVisitante;
			jugada["Intentoslocal"]=counterLocal;

			io.emit('partidaEncontrada', JSON.stringify(jugada));

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

				ubicacion =  CalculateTiro(msg);

				counterVisitante++;
			}else{

				ubicacion = CalculateAtaje();

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


	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});

function InicioTurno(){
	var turnoArray={};
	if(modStart==1){
		turnoArray["localGol"]=golesUser;
		turnoArray["visitanteGol"]=golesComputer;
		turnoArray["localTurno"]=counterLocal;
		turnoArray["visitanteTurno"]=counterVisitante;
	}else{
		turnoArray["localGol"]=golesUser;
		turnoArray["visitanteGol"]=golesComputer;
		turnoArray["localTurno"]=counterVisitante;
		turnoArray["visitanteTurno"]=counterLocal;
	}
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

function CalculateTiro(msg){

	if(mod%2 ==0){
		do {
			generator = randomBetween(1,6);
		}while (generator==5);

	}else{
		generator = calculoChancesAtajar(msg);
	}
	randomChance=randomBetween(0,1);
	if(randomChance==0){
		return generator;
	}else{
		return 0;
	};

}

function calculoChancesAtajar(msg){
    var chanceAtajar = randomBetween(1,jugador["efectividad"]);

    if(chanceAtajar==1){
		return msg;
    }else {
		var gen = randomBetween(1,6);
		return gen;
    }
}

function CalculateAtaje(){

	if(!enAlargue){
		var a = getMaso();
		var b= generarRiesgo(a);

		return b;
	}else{
		return 1;
	}


}

function getMaso(){
	if(mod%2 ==0){
		return oponente["tendencia"][counterVisitante];
	}else{
		return oponente["tendencia"][counterLocal];
	}
}

function generarRiesgo(arrai){
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
	if(generator!=0 && msg!=generator){

			if(mod%2 == 0){
				golesComputer++;
			}else{

				if(msg!=0)golesUser++;
			};

	};
	return;
}


http.listen(3000, function(){
  console.log('listening on *:3000');
});
