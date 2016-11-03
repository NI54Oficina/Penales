<?php

//get stats en multiplayer que tenga tendencia

//iniciar partida 

//tabla historial
//id, userid, partidaid, pateador, arquero, tipo

//tabla partida
//id (o token),idLocal, idVisitante, score=null, tipoPartida(single, multi o tipo de multi), apuesta

function GetStats(){
	
}

//quizas recibir el fin de partida?
function UpdateStats($userId,$gameId,$pateador,$arquero,$tendencia){
	//guardaria en db todos los datosa modo de historial y para asi desglozar los puntos de ser necesario
	//pateador y aruqero son arrays con 0-1 segun si el user fue efectivo o no en sus respectivos turnos de ese modo
	//tendencia = primeros 5 tiros como pateador a que indice fueron tirados, esto en singleplayer no se usaría
	$auxPateador=0;
	$puntos=0;
	foreach($pateador as $p){
		if($p==1){
			$puntos+=1;
			
			$auxPateador++;
			//convertidos++
			//rachaConvertidos ++
			//rachaErrados =0
			//if(rachaConvertidos>rachaConvertidosHistorica){
			//	rachaConvertidosHistorica=rachaConvertidos
			//}
		}else{
			$puntos-=5;
			//errados++
			//rachaConvertidos=0
			//rachaErrados ++
			//if(rachaErrados>rachaErradosHistorica){
			//	rachaErradosHistorica=rachaErrados
			//}
		}
	}
	$auxArquero=0;
	foreach($arquero as $a){
		if($a==1){
			$puntos+=5;
			//atajados++
			//rachaNoAtajados=0;
			//rachaAtajados++
			//if(rachaAtajados>rachaAtajadosHistorica){
			//	rachaAtajadosHistorica= rachaAtajados
			//}
		}else{
			$puntos-=1;
			$auxArquero++;
			//noAtajados++
			//rachaAtajados=0;
			//rachaNoAtajados++
			//if(rachaNoAtajados>rachaNoAtajadosHistorica){
			//	rachaNoAtajadosHistorica= rachaNoAtajados
			//}
		}
	}
	if($auxPateador==count($pateador)){
		$puntos+=5;
	}
	if($auxArquero==count($arquero)){
		$puntos+=10;
	}
	if($auxPateador>$auxArquero){
		//ganados++
		//rachaGanados++
		//rachaPerdidos=0
		//if(rachaGanados>rachaGanadosHistorica){
		//	rachaGanadosHistorica= rachaGanados
		//}
	}else{
		//perdidos++
		//rachaPerdidos++
		//rachaGanados=0
		//if(rachaPerdidos>rachaPerdidosHistorica){
		//	rachaPerdidosHistorica= rachaPerdidos
		//}
	}
	
	GetStats();
}

function GetTendencia(){
		
}

?>