<?php


//data={"userId":"1","gameId":"2","pateador":[1,0,0,0,1],"arquero":[1,0,0,0,1]}
if(isset($_GET)){
	//$data= $_GET["data"];
	if($_GET["code"]=="getSession"){
		getSession();
	}
}else{
	$data= $_POST["data"];
}

//echo $data;
//$data=json_decode($data);

/*foreach($data as $k=>$d){
	echo "<br>";
	echo $k;
	echo "<br>";
	if(is_array($d)){
		foreach($d as $i){
			echo $i;
		}
	}else{
		echo $d;
	}
}
echo "<br>";*/

//UpdateStats($data->userId,$data->gameId,$data->pateador,$data->arquero);
exit();

//get stats en multiplayer que tenga tendencia

//iniciar partida 

//tabla historial
//id, userid, partidaid, pateador, arquero, tipo

//tabla partida
//id (o token),idLocal, idVisitante, score=null, tipoPartida(single, multi o tipo de multi), apuesta

function getSession(){
	echo '{"poyo":"1"}';
}


function GetStats(){
	
}

//quizas recibir el fin de partida?
function UpdateStats($userId,$gameId,$jugadasLocal,$jugadasVisitante ,$tendencia=null){
	
	//pasaStats del user a función, función devuelve responde de "local"
	//si no es singleplayer calcula stats del visitante, y devuelve response tmb
	//se terminar devolviendo un json con ambos arrays separados en local y visitante
	
	//recorre jugadas, arma array 1-0 y, el cual es al reverso para el visitante (el array de arquero invetido es el de pateador, y el de pateador invertido es el de arquero)
	UpdateUser($userId,$resultadosArquero,$resultadoPateador);
	
	//guardaria en db todos los datosa modo de historial y para asi desglozar los puntos de ser necesario
	//pateador y aruqero son arrays con 0-1 segun si el user fue efectivo o no en sus respectivos turnos de ese modo
	//tendencia = primeros 5 tiros como pateador a que indice fueron tirados con mayor frecuencia, esto en singleplayer no se usaría
	$auxPateador=0;
	$puntos=0;
	$puntosDiscriminados= array();
	$auxP=0;
	foreach($pateador as $p){
		if($p==1){
			$auxP+=1;
			
			$auxPateador++;
			$convertidos++;
			$rachaConvertidos ++;
			$rachaErrados =0;
			if($rachaConvertidos>$rachaConvertidosHistorica){
				$rachaConvertidosHistorica=$rachaConvertidos;
			}
		}else{
			$auxP-=5;
			$errados++;
			$rachaConvertidos=0;
			$rachaErrados ++;
			if($rachaErrados>$rachaErradosHistorica){
				$rachaErradosHistorica=$rachaErrados;
			}
		}
	}
	$puntosDiscriminados["Goles Convertidos"]=$auxP;
	$puntos+=$auxP;
	$auxP=0;
	$auxArquero=0;
	foreach($arquero as $a){
		if($a==1){
			$auxP+=5;
			$auxArquero++;
			$atajados++;
			$rachaNoAtajados=0;
			$rachaAtajados++;
			if($rachaAtajados>$rachaAtajadosHistorica){
				$rachaAtajadosHistorica= $rachaAtajados;
			}
		}else{
			$auxP-=1;
			$noAtajados++;
			$rachaAtajados=0;
			$rachaNoAtajados++;
			if($rachaNoAtajados>$rachaNoAtajadosHistorica){
				$rachaNoAtajadosHistorica= $rachaNoAtajados;
			}
		}
	}
	$puntosDiscriminados["Tiros atajados "]=$auxP ;
	$puntos+=$auxP;
	$auxP=0;
	
	if($auxPateador==count($pateador)){
		$puntos+=5;
		$puntosDiscriminados["Delantera"]=5;
	}
	if($auxArquero==count($arquero)){
		$puntos+=10;
		$puntosDiscriminados["Valla invicta"]=10;
	}
	
	if($auxPateador>=$auxArquero){
		$ganados++;
		$rachaGanados++;
		$rachaPerdidos=0;
		if($rachaGanados>$rachaGanadosHistorica){
			$rachaGanadosHistorica= $rachaGanados;
		}
	}else{
		$perdidos++;
		$rachaPerdidos++;
		$rachaGanados=0;
		if($rachaPerdidos>$rachaPerdidosHistorica){
			$rachaPerdidosHistorica= $rachaPerdidos;
		}
	}
	
	if($rachaGanados>1){
		$puntos+=4;
		$puntosDiscriminados["Racha Ganados"]=4;
	}
	//rachas errados o perdidos?
	if($rachaErrados>1){
		$auxP= ($rachaErrados-1)*-1;
		if($auxP<-5){
			$auxP=-5;
		}
		$puntos+=$auxP;
		$puntosDiscriminados["Racha Errados"]=$auxP;
	}
	
	GetStats();
	
	$response= new stdClass();
	$response->puntos=$puntos;
	$response->detalle= $puntosDiscriminados;
	echo json_encode($response);
}

function UpdateUser($idUser,$jugadasUser,$jugadasOponente){
	
	/*
	Get Variables del server
	*/
	$errados =0;
	$rachaErrados  =0;
	$rachaErradosHistorica=0;
	$convertidos=0;
	$rachaConvertidosHistorica=0;
	$noAtajados=0;
	$rachaNoAtajados=0;
	$rachaNoAtajadosHistorica=0;
	$atajados=0;
	$rachaAtajadosHistorica=0;
	$rachaGanados=0;
	$rachaPerdidos=0;
	$rachaPerdidosHistorica=0;
	$rachaGanadosHistorica =0;
	$rachaAtajados=0;
	$rachaConvertidos=0;
	$ganados=0;
	$perdidos=0;
	
	/*Fin get variables*/
}

function GetTendencia(){
		
}

//UpdateStats("1","2",[1,1,1,1,1],[1,1,1,1,1]);

?>