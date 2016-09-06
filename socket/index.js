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



app.get('/', function(req, res){

});

io.on('connection', function(socket){
	console.log("user conected");
	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
		console.log(msg);
	});

	socket.on('login', function(msg){


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

		if(msg){
			var fs = require('fs');
			fs.writeFile("./stats.txt",  msg, function(err) {
				if(err) {
					return console.log(err);
				}

				console.log("The file was saved!");
				SendStats();
			});
		}else{
			SendStats();
		}
	});
	socket.on('buscarPartida', function(msg){

		io.emit('buscandoPartida', "buscando partida...");

		setTimeout(function(){
			//io.emit('partidaEncontrada', "oponente Encontrado!");
			mod=randomBetween(0,1);
			golesUser=0;
			golesComputer=0;

			if(mod%2==0){
				var counterLocal=0;
				var counterVisitante=1;

			}else{
				var counterLocal=1;
				var counterVisitante=0;
			};



			oponente["nombre"]="Pepita";

			oponente["efectividad"]="20";

			oponente["tendencia"]= [[0,0,1,2,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,1,1,1,2,2]];

			jugada["oponente"]=oponente;

			jugada["tiempomaximo"]= 3000;

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
			io.emit('inicioPartida', "inicio partidaaa!");
			console.log("Iniciar Partida");

			},2000);
		},2000);
	});

	socket.on('enviarJugada', function(msg){

		setTimeout(function(){
			io.emit('recibirJugada', "resolver turnooo");

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

										if(golesUser == golesComputer){

											console.log("ES EMPATE");
											io.emit('inicioTurno', "iniciar nuevo turno!!, en desempate");
											console.log("Iniciar Turno");

										}else{
											console.log("TERMINA JUEGO")
											GetResultado();
										}
				}else{

						console.log("SIGUE JUGANDO");

						io.emit('inicioTurno', "iniciar nuevo turno!!");
						console.log("Iniciar Turno");
				}

			},3000);
		},2000);
	});


	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});

function SendStats(){
	//setear variable resultados
	var stats;
	var fs = require('fs');
	fs.readFile("./stats.txt",  "utf8", function(err,data) {
		if(err) {
			console.log("entra error");
			return console.log(err);
		}
		//stats= JSON.parse(msg);
		stats=data;
		console.log("The file was read!");
		io.emit('statsRecived', data);
	});
}

function GetResultado(){
	io.emit('resultadoPartida', "terminó partidaaaa!");
	SendStats();
	counterPartida=0;
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
	var a = getMaso();
	var b= generarRiesgo(a);

		return b;


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


function tiroUserElegido(id){

		 if(id){

		 }

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
