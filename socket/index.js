var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var oponente={};

var jugada={};

var counterPartida=0;

var counterLocal=0;

var counterVisitante=0;

var counterLocal;
var counterVisitante;

mod=randomBetween(0,1);

if(mod%2==0){
	var counterLocal=0;
	var counterVisitante=1;

}else{
	var counterLocal=1;
	var counterVisitante=0;
}

console.log(mod);

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
			mod++;

			io.emit('recibeJugada', ubicacion);

			setTimeout(function(){

				if(counterVisitante >= 5 &&  counterLocal >= 5 ){
					GetResultado();
				}else{
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
	return generator;
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
