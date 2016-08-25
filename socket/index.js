var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var counterPartida=0;

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
		mod=Math.floor((Math.random() * 0) + 1);

		if(mod==1){
				modo="Comienza como modo Pateador";
		}else{
				modo="Comienza como modo Arquero";
		}

    io.emit('buscandoPartida', "buscando partida...");
		io.emit('Modo de jugada', JSON.stringify(modo));


	setTimeout(function(){
		io.emit('partidaEncontrada', "oponente Encontrado!");

		setTimeout(function(){
		io.emit('inicioPartida', "inicio partidaaa!");

		},2000);
	},2000);
  });

  socket.on('enviarJugada', function(msg){

	 setTimeout(function(){
		io.emit('recibirJugada', "resolver turnooo");

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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
