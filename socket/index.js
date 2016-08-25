var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


		var oponente={};

		var jugada={};

var counterPartida=0;

var counterLocal=0;

mod=randomBetween(0,1);

console.log(mod);

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/index.html');
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

    SendStats();
  });
  socket.on('requestStats', function(msg){

    SendStats();
  });
  socket.on('buscarPartida', function(msg){

    io.emit('buscandoPartida', "buscando partida...");



	setTimeout(function(){
		io.emit('partidaEncontrada', "oponente Encontrado!");

		oponente["nombre"]="Pepita";

		oponente["efectividad"]="20";

		oponente["tendencia"]= [[0,0,1,2,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,2,1,1,2,0],[0,1,1,1,2,2]];

		jugada["oponente"]=oponente;

		jugada["tiempomáximo"]= 3000;

		if(mod==1){
			jugada["camiseta"]= "local";
			jugada["rol-inicial"]= "Pateador";
		}else{
			jugada["camiseta"]= "Visitante";
			jugada["rol-inicial"]= "Arquero";
		}

		io.emit('Jugada', JSON.stringify(jugada));

		setTimeout(function(){
		io.emit('inicioPartida', "inicio partidaaa!");

		},2000);
	},2000);
  });

  socket.on('enviarJugada', function(msg){

	 setTimeout(function(){
		io.emit('recibirJugada', "resolver turnooo");
		 if(mod%2 == 0){
			ubicacion =  CalculateTiro(msg);
		 }else{
			ubicacion = CalculateAtaje(msg);
		 }


		 io.emit('recibeJugada', ubicacion);

		 setTimeout(function(){
			 counterPartida++;
			 if(counterPartida>=5){
				 GetResultado();
			 }else{
				io.emit('inicioTurno', "iniciar nuevo turno!!");

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
	var stats={};
	stats["TotalConvertidos"]=10;
	stats["PartidosGanados"]=5;
	stats["PartidosPerdidos"]=3;
	stats["TotalErrados"]=3;
	stats["TotalAtajados"]=3;
	stats["TotalNoAtajados"]=3;
	stats["RachaGanados"]=3;
	stats["RachaPerdidos"]=3;
	stats["RachaConvertidos"]=3;
	stats["RachaErrados"]=3;
	stats["RachaAtajados"]=3;
	stats["RachaNoAtajados"]=3;
	stats["MejorRachaAtajados"]=3;
	stats["MejorRachaConvertida"]=3;
	stats["PeorRachaNoAtajados"]=3;
	stats["PeorRachaErrados"]=3;
	stats["TotalPartidaAtajados"]=3;
	stats["TotalPartidaConvertidos"]=3;
	stats["TotalPartidaNoAtajados"]=3;
	stats["TotalPartidaErrados"]=3;

	io.emit('statsRecived', JSON.stringify(stats));
}

function GetResultado(){
	io.emit('resultadoPartida', "terminó partidaaaa!");
	SendStats();
	counterPartida=0;
}

function CalculateTiro(msg){


	  if(mod%2 ==0){
	    while(generator==5){
	        generator = randomBetween(1,6);

	        break;
	    }
	  }else{
	    generator = calculoChancesAtajar(msg);

	    }

		 return generator;

}

function calculoChancesAtajar(msg){


    var chanceAtajar = randomBetween(1,jugador["efectividad"]);

    if(chanceAtajar==1){

      var gen= msg;


    }else {

      var gen = randomBetween(1,6);

    }

    return gen;
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
