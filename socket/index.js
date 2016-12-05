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

process.on('uncaughtException', function (err) {
  winston.log("error",'Caught exception: ' + err);
});

var winston = require('winston');

winston.level = 'debug';

winston.add(winston.transports.File, { filename: 'somefile.test' });
winston.add(winston.transports.File, {
      name: 'error-file',
      filename: 'filelog-error.test',
      level: 'error'
    });

winston.log('info', 'Hello distributed log files!');


	
io.on('connection', function(socket){
		winston.log("info",socket.id);
		
		var connectedUser={};
		connectedUser.socket= socket;
		online[socket.id]= connectedUser;
		online[socket.id].estado="online";
		console.log("user conected");
		socket.emit("session",socket.id);
	
		
	socket.on('chat message', function(msg){
		socket.emit('chat message', msg);
		
		console.log(msg);
	});
		
	socket.on('checkSession', function(msg){
		console.log(msg);
		var auxMsg= JSON.parse(msg);
		//console.log(online[socket.id]);
	});

	socket.on('login', function(msg){
		console.log("-----------------------------------");
		console.log(msg);
		console.log("-----------------------------------");
		msg= JSON.parse(msg);
		console.log(msg);
		console.log("-----------------------------------");
		if(testLocal){
			requestSoap("?code=getSession"," ","loginConfirmed",socket.id);
		}else{
			requestSoap("/getSession",msg.msg.id,"loginConfirmed",socket.id);
		}
	});
	
	socket.on('buscar', function(msg){
		msg= JSON.parse(msg);
		console.log("entra buscar");
		console.log("busca a..."+msg.msg);
		
		var toSearch=msg.msg;
		if(toSearch==online[socket.id].usuario.nickname){
			console.log("se busca a si mismo");
			socket.emit("rbusqueda","0");
			return;
		}
		try{
			var inWait="";
			for (var key in online) {
				
				if(online[key].usuario.nickname==toSearch){
					console.log("encontrado");
					socket.emit("rbusqueda","1");
					return;
				}else{
					console.log("no era");
				}
				//console.log(key);
				//console.log(listaEspera[a][key]);
			}
		}catch(error){
			console.log(error);
			
		}
		
		socket.emit("notification",JSON.stringify({titulo:"Error",texto:"No existe el usuario que desea desafiar o no se encuentra conectado o disponible.",ops:{titulo:"Aceptar",callback:"destroy"},tiempo:"-1"}));
	
	});
	
	socket.on('desafiar', function(msg){
		console.log("entra desafio");
		msg= JSON.parse(msg);
		console.log(msg);
		var toSearch=msg.msg["oponente"];
		console.log(toSearch);
		var oponente="";
		try{
			for (var key in online) {
				if(online[key].usuario.nickname==toSearch){
					oponente= key;
				}
			}
		}catch(error){
			console.log(error);
		}
		winston.log("info",oponente);
		if(oponente==""){
			socket.emit("noEncontrado","");
		}else{
			CreateMatch([socket.id,oponente],msg.msg.tipo,1);
		}
	});
	
	socket.on('disconnect', function(data){
		console.log('user disconnected '+socket.id);
		
		console.log(online);
		delete listaEspera[0][socket.id];
		delete listaEspera[1][socket.id];
		delete listaEspera[2][socket.id];
		delete listaEspera[3][socket.id];
		if(online[socket.id].partida!=""&&!(partidas[online[socket.id].partida]==null)){
			partidas[online[socket.id].partida].disconected(socket.id);
		}else{
			console.log("partida es null");
			console.log(partidas[online[socket.id].partida]);
			
		}
		console.log(listaEspera);
		delete online[socket.id];
		
	});
	
	socket.on('online', function(data){
		console.log(online);
	});
	socket.on('listaEspera', function(data){
		console.log("entra lista espera");
		
		console.log(listaEspera);
	});
	
	socket.on('pause', function(data){
	
		socket.emit("notification",JSON.stringify({titulo:"Server Pausado",texto:"se ha pausado el servidor",ops:{titulo:"Aceptar",callback:"destroy"},tiempo:"-1"}));
		pause=true;
		console.log("pause update");
	});
	
	socket.on('resume', function(data){
		pause=false;
		console.log("play update");
		
	});
	
	socket.on('getStats', function(msg){
		
		SendStats(msg,socket.id);
	});
	
	socket.on('buscarPartida', function(msg){
		socket.emit('buscandoPartida', "buscando partida...");
		var ops= JSON.parse(msg);
		ops.msg= JSON.parse(ops.msg);
		console.log(ops);
		console.log("entra buscar partida");
		if(online[socket.id].estado=="desafiado"){
			
			socket.emit("notification",JSON.stringify({titulo:"Error",texto:"Error de conexión, actualice la pagina y vuelva a interntarlo",ops:{titulo:"Aceptar",callback:"destroy"},tiempo:"-1"}));
			return;
		}else{
			online[socket.id].estado="cola";
			listaEspera[ops.msg.tipo-1][socket.id]=1;
		}
		
	});
	
	socket.on('ready', function(msg){
		console.log(msg);
		var ops= JSON.parse(msg);
		//console.log(ops);
		//console.log("----------------------------------");
		online[socket.id].estado="listo";
		var auxPartida= partidas[online[socket.id].partida];
		var oponente= auxPartida.oponente(socket.id);
		oponente.socket.emit("oponenteListo",JSON.stringify({status:1}));
		auxPartida.tick();
	});
	
	socket.on('aceptar', function(msg){
		console.log(msg);
		var ops= JSON.parse(msg);
		//console.log(ops);
		//console.log("----------------------------------");
		online[socket.id].estado="esperando";
		var auxPartida= partidas[online[socket.id].partida];
	
			var auxLocal= JSON.parse(JSON.stringify(auxPartida.oponente(socket.id).usuario));
			delete auxLocal["puntos"];
			delete auxLocal["credits"];
			delete auxLocal["estado"];
			delete auxLocal["id"];
			auxLocal["tendencia"]= auxPartida.local["stats"]['tendencia'];
			delete auxLocal["stats"];
			auxPartida.visitante.socket.emit("oponente",JSON.stringify(auxLocal));
		
	});

	socket.on('enviarJugada', function(msg,session){
		//console.log(msg);
		var ops= JSON.parse(msg);
		//console.log(ops);
		//console.log("----------------------------------");
		online[socket.id].estado="listo";
		online[socket.id].jugadas.push(ops.msg);
		var auxPartida= partidas[online[socket.id].partida];
		auxPartida.tick();
		
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

function SendStats(msg,idSocket){
	//setear variable resultados
	msg= JSON.parse(msg);
	if(testLocal){
		requestSoap("?code=getStats&data="+msg.msg+"&tendencia="+1," ","getStats",idSocket);
	}else{
		// var auxU= {id: usuario["id"]};
		requestSoap("/getStats",{id: msg.msg,tendencia:1},"getStats",idSocket);
		// requestSoap("/getStats",JSON.stringify(auxU),"getStats");
	}
}


function requestSoap(code,params,callback,session){
	//console.log("envia params");
	//console.log(params);
	//console.log(callback);
	//console.log(session);
	
	//console.log("-------------------------------------------------");
	 
	 request.post(urlConnect+code,params, function (error, response, body) {
		
		//console.log(callback);
		//console.log(session);
		//console.log("-------------------------------------------------");
		global[callback](body,session);
	});
}


global.loginConfirmed= function(msg,session){
	var connectedUser= JSON.parse(msg);
	console.log(msg);
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
	console.log(msg);
	console.log("----------------------------------------------------");
	online[session].stats= JSON.parse(msg);
	online[session].socket.emit("getStats",msg);
}



http.listen(3000, function(){
  console.log('listening on *:3000');
});


function Partida (tipo) {
	this.id=-1;
    this.local={};
    this.visitante={};
	
	this.tipo=tipo;

	this.jugadas={};

	this.counterPartida=0;

	this.counterLocal=0;

	this.counterVisitante=0;

	this.golesVisitante=0;

	this.golesLocal=0;

	this.auxCont=0;

	this.modStart=-1;
	
	this.modo=-1;

	this.enAlargue=false;

	this.finished=false;
	
	this.state="pending";
	
	this.tick= function(){
		if(this.finished){
			//función en finish?
			this.state="finished";
			return;
		}
		//console.log("tick "+this.id+" "+this.state);
		//console.log("user1 "+this.local.estado);
		//console.log("user2 "+this.visitante.estado);
		if(this.state=="pending"){
			//console.log("user1 "+this.local.estado);
			//console.log("user2 "+this.visitante.estado);
			if(this.local.estado=="listo"&&this.visitante.estado=="listo"){
				console.log("partida lista!");
				this.local.socket.emit("recibirLado",2);
				this.visitante.socket.emit("recibirLado",1);
				this.local.estado="empezando";
				this.visitante.estado="empezando";
				this.state="starting";
			}
		}else if(this.state=="starting"){
			if(this.local.estado=="listo"&&this.visitante.estado=="listo"){
				this.local.estado="esperando";
				this.visitante.estado="esperando";
				this.state="game";	
				this.modo=0;
				this.local.socket.emit("inicioPartida",JSON.stringify({id:1}));
				this.visitante.socket.emit("inicioPartida",JSON.stringify({id:1}));
			}
		}else if(this.state=="game"){
			if(this.local.estado=="listo"&&this.visitante.estado=="listo"){
				this.local.estado="esperando";
				this.visitante.estado="esperando";
				this.state="animando";
				//console.log(this.local);
				//console.log(this.visitante);
				this.local.socket.emit("recibeJugada",JSON.stringify({user:this.local.jugadas[this.local.jugadas.length-1],computer:this.visitante.jugadas[this.visitante.jugadas.length-1]}));
				this.visitante.socket.emit("recibeJugada",JSON.stringify({user:this.visitante.jugadas[this.visitante.jugadas.length-1],computer:this.local.jugadas[this.local.jugadas.length-1]}));
			}
		}else if(this.state=="animando"){
			if(this.local.estado=="listo"&&this.visitante.estado=="listo"&&!this.finished){
				this.local.estado="esperando";
				this.visitante.estado="esperando";
				this.state="game";
				this.checkResult();
			}
		}
	};
	
	this.checkResult=function(){
		this.calculatePuntaje();
		
		this.modo++;
		this.checkPuntaje();
	},
	
	this.InicioTurno=function(){
		if(this.finished)return;
		this.local.socket.emit("inicioTurno",JSON.stringify({id:1}));
		this.visitante.socket.emit("inicioTurno",JSON.stringify({id:1}));
	},
	
	this.calculatePuntaje= function(){
		var localIndex= this.local.jugadas[this.local.jugadas.length-1];
		var visitanteIndex= this.visitante.jugadas[this.visitante.jugadas.length-1];
		if(this.modo%2 == 0){
			this.counterVisitante++;
			if(visitanteIndex>0 && visitanteIndex!=localIndex){
				this.golesVisitante++;
			};
		}else{
			this.counterLocal++;
			//entra en jugador modo pateador
			if(localIndex>0 && localIndex!=visitanteIndex){
				this.golesLocal++;
			}	
		}
	},
	
	this.checkPuntaje=function(){
		if(this.counterVisitante >= 5 &&  this.counterLocal >= 5 ){
			console.log("GOLES LOCAL: "+ this.golesLocal +", GOLES VISITANTE: "+ this.golesVisitante);
				if(this.golesVisitante == this.golesLocal && !this.enAlargue){
					this.auxCont++;
					this.enAlargue=true;
					console.log("EMPATE1");
					this.InicioTurno();
					console.log("Iniciar Turno");

				}else if(this.enAlargue){
					if(this.auxCont!=2){
						this.auxCont++;
						console.log("EMPATE2");
						this.InicioTurno();
						console.log("Iniciar Turno");
					}else{

						console.log("GOLES LOCAL: "+ this.golesLocal +", GOLES VISITANTE: "+ this.golesVisitante);
						 if(this.golesLocal == this.golesVisitante){
							this.auxCont=1;
							console.log("EMPATE3");
							this.InicioTurno();
							console.log("Iniciar Turno");
						}else{

							console.log("TERMINA JUEGO EN EMPATE");
							this.finished=true;
							this.GetResultado();
						}
					};
				}else{
					console.log("TERMINA JUEGO");
					this.finished=true;
					this.GetResultado();
				};
		}else{
			console.log("NUEVO TURNO");
			this.InicioTurno();
			console.log("Iniciar Turno");
		}
	},
	
	this.GetResultado=function(){
		//tendria que emitir el resultado, cliente lo recibe, setea y va a pantalla correspondiente segun comprobación.
		this.finished=true;
		this.state="finished";
		var toSend={};
		toSend["gameId"]=this.id;
		toSend["localId"]= this.local.usuario.id;
		toSend["visitanteId"]= this.visitante.usuario.id;
		toSend["jugadasLocal"]= this.local.jugadas;
		
		toSend["jugadasVisitante"]= this.visitante.jugadas;
		console.log(JSON.stringify(toSend));
		toSend=JSON.stringify(toSend);
		console.log(this.local);
		
		if(testLocal){
			code="?code=UpdateStats";
		}else{
			code="/UpdateStats";
		}
		var auxThis=this;
		request.post(urlConnect+code,{form:{data:toSend}}, function (error, response, body) {
			console.log(body);
			var auxRes= JSON.parse(body);
			auxRes["user1"].golesUser=auxThis.golesLocal;
			auxRes["user1"].golesComputer=auxThis.golesVisitante;
			
			auxRes["user2"].golesUser=auxThis.golesVisitante;
			auxRes["user2"].golesComputer=auxThis.golesLocal;
			
			auxThis.local.estado="online";
			auxThis.visitante.estado="online";
			
			auxThis.local.socket.emit("resultadoPartida",JSON.stringify(auxRes["user1"]));
			auxThis.visitante.socket.emit("resultadoPartida",JSON.stringify(auxRes["user2"]));
			
		});
		
		
	},
	
	this.disconected= function(uId){
		if(this.finished) return;
		if(this.local.socket.id==uId){
			console.log("pierde el local");
			this.local.jugadas=[0,0,0,0,0,0,0,0,0,0];
			if(this.visitante.jugadas.length<10){
				for(var a=0;this.visitante.jugadas.length<10;a++){
					this.visitante.jugadas.push(1);
				}
			}else if(this.visitante.jugadas.length>10){
				this.visitante.jugadas= this.visitante.jugadas.slice(0,9);
			}
			this.golesLocal=0;
			this.golesVisitante=5;
			this.visitante.estado="online";
			this.visitante.socket.emit("notification",JSON.stringify({titulo:"Oponente desconectado",texto:"Su oponente se ha retirado o perdido conexión con el servidor",tiempo:"3000"}));
		}else{
			console.log("pierde el visitante");
			this.visitante.jugadas=[0,0,0,0,0,0,0,0,0,0];
			if(this.local.jugadas.length<10){
				for(var a=0;this.local.jugadas.length<10;a++){
					this.local.jugadas.push(1);
				}
			}else if(this.local.jugadas.length>10){
				this.local.jugadas= this.local.jugadas.slice(0,9);
			}
			this.golesLocal=5;
			this.golesVisitante=0;
			this.local.estado="online";
			this.local.socket.emit("notification",JSON.stringify({titulo:"Oponente desconectado",texto:"Su oponente se ha retirado o perdido conexión con el servidor",tiempo:"1500"}));
		}
		console.log(this.local.jugadas);
		console.log(this.visitante.jugadas);
		
		this.GetResultado();
	},
		
	this.oponente=function(player){
		if(this.local.socket.id==player){
			return this.visitante;
		}else{
			return this.local;
		}
	};
}


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
 //console.log("entra Update "+Date.now());
 MatchMaking();
 UpdateMatches();
 //console.log("----------------------------------------");
}


gameLoop();

/**End Loop**/

function MatchMaking(){
	//console.log(listaEspera);
	for(var a=0;a<listaEspera.length;a++){
		//console.log("entra "+a);
		try{
			var inWait="";
			for (var key in listaEspera[a]) {
				if(inWait==""){
					inWait= key;
				}else{
					CreateMatch([inWait,key],a,0);
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

function CreateMatch(users,tipo,privada){
	
	var auxPartida= new Partida(tipo);
	
	auxPartida.local= online[users[0]];
	auxPartida.local.jugadas= new Array();
	auxPartida.privada=privada;
	auxPartida.visitante= online[users[1]];
	console.log(auxPartida.visitante);
	if(privada==1){
		if(auxPartida.visitante.estado!="online"){
			console.log("sorry no se puede matchear");
			auxPartida.local.socket.emit("notification",JSON.stringify({titulo:"Error",texto:"Desafío no se puede realizar. Intente nuevamente.",ops:{titulo:"Aceptar",callback:"destroy"},tiempo:"-1"}));
			//auxPartida.local.socket.emit("error","desafio no puede realizarse");
			return;
		}else{
			
		}
	}
	auxPartida.visitante.jugadas= new Array();
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
		if(privada==1){
		if(auxPartida.visitante.estado!="online"){
			console.log("sorry no se puede matchear");
			auxPartida.local.socket.emit("notification",JSON.stringify({titulo:"Error",texto:"Desafío no se puede realizar. Intente nuevamente.",ops:{titulo:"Aceptar",callback:"destroy"},tiempo:"-1"}));
			return;
		}else{
			auxPartida.visitante.estado="desafiado";
			auxPartida.visitante.partida=body;
			console.log("manda desafio al oponente");
			var auxTitulo=auxPartida.local.usuario.nickname.toUpperCase()+" TE DESAFÍA";
			var op1={titulo:"Rechazar",callback:"destroy",params:""};
			var auxTipo;
			switch(tipo){
				case 1:
				auxTipo="clasico";
				break;
				case 2:
				auxTipo="100 puntos";
				break;
				case 3:
				auxTipo="300 puntos";
				break;
				case 4:
				auxTipo="1000 puntos";
				break;
				default:
				auxTipo="und";
				break;
			}
			var op2={titulo:"Aceptar",callback:"change",params:{screen:"Versus",params:{NombreSala:auxTipo,privada:1}}};
			//var op2={titulo:"Aceptar",callback:"emit",params:{code:"aceptar",params:{partida:1}}};
			auxPartida.visitante.socket.emit("desafio",JSON.stringify({oponente:auxPartida.local.usuario.nickname,titulo:auxTitulo,texto:"Partida "+auxTipo+", Te animás?",ops:[op1,op2]}));
		}
		}else{
			auxPartida.visitante.estado="espera";
			auxPartida.visitante.partida=body;
		}
		try{
		delete listaEspera[tipo][users[0]];
		delete listaEspera[tipo][users[1]];
		}catch(error){
			
		}
		console.log(auxPartida);
		console.log("test");
		partidas[body]= auxPartida;
		
			var auxVisitante= JSON.parse(JSON.stringify(auxPartida.visitante.usuario));
			delete auxVisitante["puntos"];
			delete auxVisitante["credits"];
			delete auxVisitante["estado"];
			delete auxVisitante["id"];
			auxVisitante["tendencia"]= auxPartida.visitante["stats"]['tendencia'];
			delete auxVisitante["stats"];
			
		if(privada!=1){
			var auxLocal= JSON.parse(JSON.stringify(auxPartida.local.usuario));;
			delete auxLocal["puntos"];
			delete auxLocal["credits"];
			delete auxLocal["estado"];
			delete auxLocal["id"];
			auxLocal["tendencia"]= auxPartida.local["stats"]['tendencia'];
			delete auxLocal["stats"];
			auxPartida.visitante.socket.emit("oponente",JSON.stringify(auxLocal));
		}
		
		auxPartida.local.socket.emit("oponente",JSON.stringify(auxVisitante));
		
		
		//enviar datos del oponente a cada jugador
		//pause=true;
	});
	
}

function UpdateMatches(){
	for (var id in partidas) {
		partidas[id].tick();
	}
}
