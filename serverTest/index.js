var self=this;
$(document).ready(function(){
	Init();
});

$("body").on("click",".sender",function(){
	$(".sender").hide();
	Emit($(this).attr("code"),$(this).attr("params"),$(this).attr("listen"),$(this).attr("callback"),self,true);
});

function Init(){
	$(".sender").hide();
	$("#conectarse").show();
	SuscribeServerEvent("statsRecived","recibeStats",self,false);
}

function logueado(){
	$(".sender").hide();
	$("#buscarPartida").show();
	addMessage("se loguea");
}

function recibeStats(){
	addMessage("recibe stats");
}

function addMessage(message){
	$("#log").append("<p>"+message+"</p>");
	$("#log").scrollTop(1000000);
}

function listenerSearch(data){
	$(".sender").hide();
	SuscribeServerEvent("inicioPartida","iniciarJuego",this,false);
	SuscribeServerEvent("inicioTurno","checkIntentos",this,false);
	SuscribeServerEvent("resultadoPartida","setearResultado",this,true);
	addMessage("partida encontrada");
}

function iniciarJuego(data){
	$(".jugada").show();
	addMessage("inicia el primer turno");
}

function resolverJugada(data){
	addMessage("animación del resultado devuelto");
}

function checkIntentos(data){
	$(".jugada").show();
	addMessage("inicio turno");
}

function setearResultado(data){
	addMessage("Juego terminado");
	addMessage("-----------------------------------------------");
	$("#buscarPartida").show();
}
