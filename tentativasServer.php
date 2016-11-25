<?php

/**Codigo para hacerlo funcionar local**/
if(isset($_GET)){
	
	if(isset($_GET['code'])&&$_GET["code"]=="getSession"){
		getSession();
	}
	if(isset($_GET['code'])&&$_GET["code"]=="getStats"){
		if(isset($_GET["tendencia"])){
			GetStats($_GET["data"],$_GET["tendencia"]);
		}else{
			GetStats($_GET["data"]);
		}
		
	}
	if(isset($_GET['code'])&&$_GET["code"]=="UpdateStats"){
		$data= json_decode($_GET["data"]);
		
		UpdateStats($data->gameId,$data->localId,$data->visitanteId,$data->jugadasLocal,$data->jugadasVisitante);
	}
	if(isset($_GET['code'])&&$_GET["code"]=="createMatch"){
		/*foreach($_POST as $k=>$v){
			echo $k;
			echo "---";
			echo $v;
			echo "---";
		}*/
		
		$data= json_decode($_POST["data"]);
		//echo "entra";
		//echo $data;
		CreateMatch($data->usuarios,$data->modo);
	}
}else{
	$data= $_POST["data"];
}
/**Fin codigo arreglo **/

//UpdateStats(1,1,1,[6,1,2,3,4,1,6,1,1,1,1,1],[6,1,1,1,1,1,6,1,1,1,1,1]);

function getSession(){
	
	$datos= array();
	$datos["id"]=2;
	$datos["avatar"]="assets/general/images/test-avatar.jpg";
	$datos["nickname"]="Pepito";
	$datos["puntos"]= "10000";
	$datos["credits"]= 23232;
	echo json_encode($datos);
}
function _GetStats($userId, $tendencia=null){
	
	/*
	Get Variables del server
	*/
	$stats= array();
	
	if($tendencia!=null&&$tendencia!=0){
		//tendencia = primeros 5 tiros como pateador a que indice fueron tirados con mayor frecuencia, esto en singleplayer no se usaría
		$stats["tendencia"]= [
			[0,1,2,2,1,0],
			[0,1,0,2,1,0],
			[1,1,2,2,1,0],
			[0,2,2,2,1,0],
			[0,1,2,2,1,0],
		];
	}
	
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

function GetStats($userId, $tendencia=null){
	
	/*
	Get Variables del server
	*/
	$stats= array();
	
	if($tendencia!=null&&$tendencia!=0){
		//tendencia = primeros 5 tiros como pateador a que indice fueron tirados con mayor frecuencia, esto en singleplayer no se usaría
		$stats["tendencia"]= [
			[0,1,2,2,1,0],
			[0,1,0,2,1,0],
			[1,1,2,2,1,0],
			[0,2,2,2,1,0],
			[0,1,2,2,1,0],
		];
	}
	
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
	echo  json_encode($stats);
}

function CreateMatch($users,$modo){
	//aca crea la partida
	//users es un array con el id de ambos jugadores
	$partidaId= rand (0,9999);
	echo $partidaId;
}

//quizas recibir el fin de partida?
function UpdateStats($gameId,$localId,$visitanteId,$jugadasLocal,$jugadasVisitante){
	
	if($gameId=-1){
		//crea la partida, 
		$modo= 1;
	}else{
		//$modo= Obtener partida por el id---> modo;
	}
	
	$arqueroLocal= array();
	$arqueroVisitante= array();
	$pateadorVisitante= array();
	$pateadorLocal= array();
	for($a=0;$a<count($jugadasLocal);$a++){
		
		if($jugadasLocal[$a]!=$jugadasVisitante[$a]){
			//si modulo es 0 sumo a pateador visitante y a arquero local
			if($a%2==0){
				if($jugadasVisitante[$a]>0){
					array_push($pateadorVisitante,"1");
					array_push($arqueroLocal,"0");
				}else{
					array_push($pateadorVisitante,"0");
					array_push($arqueroLocal,"1");
				}
			}else{
				if($jugadasLocal[$a]>0){
					array_push($pateadorLocal,"1");
					array_push($arqueroVisitante,"0");
				}else{
					array_push($pateadorLocal,"0");
					array_push($arqueroVisitante,"1");
				}
			}
		}else{
			if($a%2==0){
				array_push($pateadorVisitante,"0");
				array_push($arqueroLocal,"1");
			}else{
				array_push($pateadorLocal,"0");
				array_push($arqueroVisitante,"1");
			}
		}
		
	}
	
	$response= new stdClass();
	
	
	if($modo!=1){
		$response->user1=UpdateUser($localId,$pateadorLocal,$arqueroLocal,$modo);
		$response->user2=UpdateUser($visitanteId,$pateadorVisitante,$arqueroVisitante,$modo);
	}else{
		$response->user1=UpdateUser($visitanteId,$pateadorVisitante,$arqueroVisitante,$modo);
	}
	
	echo json_encode($response);
}

function UpdateUser($idUser,$pateador,$arquero,$modo){
	
	$stats=_GetStats($idUser);
	$auxPateador=0;
	$puntos=0;
	$puntosDiscriminados= array();
	$auxP=0;
	$index=0;
	$puntosPateador=0;
	$puntosArquero=0;
	foreach($pateador as $p){
		
		if($p==1){
			if($index<5){
				$puntosPateador+=1;
			}
			
			$auxPateador++;
			$stats['convertidos']++;
			$stats['rachaConvertidos']++;
			$stats['rachaErrados'] =0;
			if($stats['rachaConvertidos']>$stats['rachaConvertidosHistorica']){
				$stats['rachaConvertidosHistorica']=$stats['rachaConvertidos'];
			}
		}else{
			if($index<5){
				$puntosPateador-=1;
			}
			$stats['errados']++;
			$stats['rachaConvertidos']=0;
			$stats['rachaErrados']++;
			if($stats['rachaErrados']>$stats['rachaErradosHistorica']){
				$stats['rachaErradosHistorica']=$stats['rachaErrados'];
			}
		}
		$index++;
	}
	//cambio
	$puntosDiscriminados["Goles Convertidos"]=[$pateador,$puntosPateador];
	$puntos+=$puntosPateador;
	$auxP=0;
	$auxArquero=0;
	$index=0;
	foreach($arquero as $a){
		
		if($a==1){
			if($index<5){
				$puntosArquero+=1;
			}
			$auxArquero++;
			$stats['atajados']++;
			$stats['rachaNoAtajados']=0;
			$stats['rachaAtajados']++;
			if($stats['rachaAtajados']>$stats['rachaAtajadosHistorica']){
				$stats['rachaAtajadosHistorica']= $stats['rachaAtajados'];
			}
		}else{
			$puntosArquero-=0;
			$stats['noAtajados']++;
			$stats['rachaAtajados']=0;
			$stats['rachaNoAtajados']++;
			if($stats['rachaNoAtajados']>$stats['rachaNoAtajadosHistorica']){
				$stats['rachaNoAtajadosHistorica']= $stats['rachaNoAtajados'];
			}
		}
		$index++;
	}
	//cambio
	$puntosDiscriminados["Tiros atajados"]=[$arquero,$puntosArquero] ;
	$puntos+=$puntosArquero;
	$auxP=0;
	
	if($puntosPateador==5){
		$puntos+=5;
		//cambio
		$puntosDiscriminados["Delantera Letal"]=["Bonus",5];
	}
	if($puntosArquero==5){
		$puntos+=20;
		//cambio
		$puntosDiscriminados["Valla invicta"]=["Bonus",20];
	}
	
	if($auxPateador>(count($arquero)-$auxArquero)){
		//cambio
		$puntosDiscriminados["Victoria"]=["",10];
		$puntos+=10;
		$stats['ganados']++;
		$stats['rachaGanados']++;
		$stats['rachaPerdidos']=0;
		if($stats['rachaGanados']>$stats['rachaGanadosHistorica']){
			$stats['rachaGanadosHistorica']= $stats['rachaGanados'];
		}
	}else{
		$stats['perdidos']++;
		$stats['rachaPerdidos']++;
		$stats['rachaGanados']=0;
		if($stats['rachaPerdidos']>$stats['rachaPerdidosHistorica']){
			$stats['rachaPerdidosHistorica']= $stats['rachaPerdidos'];
		}
	}
	
	/*if($stats['rachaGanados']>1){
		$puntos+=4;
		$puntosDiscriminados["Racha Ganados"]=4;
	}*/
	//rachas errados o perdidos?
	/*if($stats['rachaErrados']>1){
		$auxP= ($stats['rachaErrados']-1)*-1;
		if($auxP<-5){
			$auxP=-5;
		}
		$puntos+=$auxP;
		$puntosDiscriminados["Racha Errados"]=$auxP;
	}*/
	
	//aqui debería guardar los nuevos stats
	//sumar puntos o restar segun el caso
	$response= new stdClass();
	$response->puntosNuevos=$puntos;
	//en puntos totales mostrar los puntos actualizados
	$response->puntosTotales=$puntos;
	$response->detalle= $puntosDiscriminados;
	$response->stats= $stats;
	return $response;
}

function GetTendencia(){
		
}

?>