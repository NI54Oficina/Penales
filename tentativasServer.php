<?php

function UpdateStats($userId,$pateador,$arquero,$tendencia){
	//pateador y aruqero son arrays con 0-1 segun si el user fue efectivo o no en sus respectivos turnos de ese modo
	//tendencia = primeros 5 tiros como pateador a que indice fueron tirados, esto en singleplayer no se usaría
	$auxPateador=0;
	foreach($pateador as $p){
		if($p==1){
			$auxPateador++;
			//convertidos++
			//racha convertidos ++
			//raca errados =0
			//if(rachaConvertidos>rachaConvertidosHistorica){
			//	rachaConvertidosHistorica=rachaConvertidos
			//}
		}else{
			//errados++
			//racha convertidos=0
			//racha errados ++
			//if(rachaErrados>rachaErradosHistorica){
			//	rachaErradosHistorica=rachaErrados
			//}
		}
	}
	$auxArquero=0;
	foreach($arquero as $a){
		if($a==1){
			//atajados++
			//rachaNoAtajados=0;
			//rachaAtajados++
			//if(rachaAtajados>rachaAtajadosHistorica){
			//	rachaAtajadosHistorica= rachaAtajados
			//}
		}else{
			$auxArquero++;
			//noAtajados++
			//rachaAtajados=0;
			//rachaNoAtajados++
			//if(rachaNoAtajados>rachaNoAtajadosHistorica){
			//	rachaNoAtajadosHistorica= rachaNoAtajados
			//}
		}
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
}


?>