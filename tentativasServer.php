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
	echo '{"nombre":"Pepe",
		"id":"2",
		"avatar":"imagen.jpg",
		"puntos":1000,
		"credits":1000}';
}


function GetStats(){
	/*
	Get Variables del server
	*/
	$stats= new stdClass();
	$stats['errados']=0;
	$stats['rachaErrados']  =0;
	$stats['rachaErradosHistorica']=0;
	$stats['convertidos']=0;
	$stats['rachaConvertidosHistorica']=0;
	$stats['noAtajados']=0;
	$stats['rachaNoAtajados']=0;
	$stats['rachaNoAtajadosHistorica']=0;
	$stats['atajados']=0;
	$stats['rachaAtajadosHistorica']=0;
	$stats['rachaGanados']=0;
	$stats['rachaPerdidos']=0;
	$stats['rachaPerdidosHistorica']=0;
	$stats['rachaGanadosHistorica'] =0;
	$stats['rachaAtajados']=0;
	$stats['rachaConvertidos']=0;
	$stats['ganados']=0;
	$stats['perdidos']=0;
	
	/*Fin get variables*/
	return $stats;
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
	$stats=GetStats();
	$auxPateador=0;
	$puntos=0;
	$puntosDiscriminados= array();
	$auxP=0;
	foreach($pateador as $p){
		if($p==1){
			$auxP+=1;
			
			$auxPateador++;
			$stats['convertidos']++;
			$stats['rachaConvertidos']++;
			$stats['rachaErrados'] =0;
			if($stats['rachaConvertidos']>$stats['rachaConvertidosHistorica']){
				$stats['rachaConvertidosHistorica']=$stats['rachaConvertidos'];
			}
		}else{
			$auxP-=5;
			$stats['errados']++;
			$stats['rachaConvertidos']=0;
			$stats['rachaErrados']++;
			if($stats['rachaErrados']>$stats['rachaErradosHistorica']){
				$stats['rachaErradosHistorica']=$stats['rachaErrados'];
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
			$stats['atajados']++;
			$stats['rachaNoAtajados']=0;
			$stats['rachaAtajados']++;
			if($stats['rachaAtajados']>$stats['rachaAtajadosHistorica']){
				$stats['rachaAtajadosHistorica']= $stats['rachaAtajados'];
			}
		}else{
			$auxP-=1;
			$stats['noAtajados']++;
			$stats['rachaAtajados']=0;
			$stats['rachaNoAtajados']++;
			if($stats['rachaNoAtajados']>$stats['rachaNoAtajadosHistorica']){
				$stats['rachaNoAtajadosHistorica']= $stats['rachaNoAtajados'];
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
		$stats['rachaGanados']++;
		$stats['rachaPerdidos']=0;
		if($stats['rachaGanados']>$stats['rachaGanadosHistorica']){
			$stats['rachaGanadosHistorica']= $stats['rachaGanados'];
		}
	}else{
		$perdidos++;
		$stats['rachaPerdidos']++;
		$stats['rachaGanados']=0;
		if($stats['rachaPerdidos']>$stats['rachaPerdidosHistorica']){
			$stats['rachaPerdidosHistorica']= $stats['rachaPerdidos'];
		}
	}
	
	if($stats['rachaGanados']>1){
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
	
	//guardar stats actualizados
	
	$response= new stdClass();
	$response->puntos=$puntos;
	$response->detalle= $puntosDiscriminados;
	echo json_encode($response);
}

function UpdateUser($idUser,$jugadasUser,$jugadasOponente){
	GetStats();
}

function GetTendencia(){
		
}

//UpdateStats("1","2",[1,1,1,1,1],[1,1,1,1,1]);

?>