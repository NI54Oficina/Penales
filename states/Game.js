var Game = function(game) {};
var delayPelota=500;

Game.prototype = {

  preload: function () {

    this.optionCount = 1;
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
    game.load.spritesheet('button', 'assets/images/boton.png', 300, 300);
    game.load.image('assert', 'assets/images/green-button.png', 150,150);
    game.load.image('noassert', 'assets/images/red-button.png', 150,150);
    game.load.image('orange-button', 'assets/images/orange-button.png', 150,150);
    game.load.image('yellow-button', 'assets/images/yellow-button.png', 150,150);
    game.load.image('triangle', 'assets/images/puntero.png', 150,150);
   
    game.load.spritesheet('pelota', 'assets/images/pelota.png', 40, 40);
	game.load.image('arco-0', 'assets/images/arco-0.png');
	game.load.atlas('arco', 'assets/images/arcos-sprite.png', 'assets/images/arcos-sprite.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-local', 'assets/images/out.png', 'assets/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	game.load.atlas('pateador-local', 'assets/images/pateador-test.png', 'assets/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-visitante', 'assets/images/out2.png', 'assets/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	game.load.atlas('pateador-visitante', 'assets/images/pateador-test2.png', 'assets/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); 
    
	game.load.image('fondo1', 'assets/images/fondo-game1.png', 759, 150);
	game.load.image('fondo2', 'assets/images/fondo-game2.png', 378, 150);
	game.load.image('fondo3', 'assets/images/fondo-game3.png', 1136, 491);

  },

  create: function () {
    
    self = this;
    triesA=this.triesA;

    triesP=this.triesP;

	counterBarra=0;

	SuscribeServerEvent("inicioPartida","Clicked",this,false);
	SuscribeServerEvent("inicioTurno","checkIntentos",this,false);
	SuscribeServerEvent("resultadoPartida","setearResultado",this,true);

	this.pause=true;
	timer = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
	game.time.events.resume();
    
    presicionText=0;
	rangoDePresicion=40;
    counter=this.tiempoMaximo;
	perfilElegido= this.perfil;

    modo=this.modo;
	
    puntosComputer=0;
    puntosUser=0;
    enAlargue=false;
	clicked =1;
	presicion= 0;
	velocidad=2000;
	 
    this.drawBackground();

	equipoUnoText = game.add.text(10, 160, 'Equipo 1', { font: " 20px TheMinion", fill: "black", align: "center" });
	equipoDosText = game.add.text(10, 260, 'Equipo 2', { font: " 20px TheMinion", fill: "black", align: "center" });

    this.createBarra();

    this.drawArquero();

	this.drawPelota();

	this.drawPlayer();

	this.setClickArea();

	this.createButtons();

	this.cambiarRopa(self);
	
	if(Phaser.Math.isEven(modo)){
		triesA=1;
		triesP=0;
		self.setBotonesRiesgo(self);
	}else{
		triesA=0;
		triesP=1;
	}

	this.drawGui();
},

drawBackground: function(){
	
	fondo1 = game.add.sprite(0,0, 'fondo1');
	fondo2 = game.add.sprite(759,0, 'fondo2');
	fondo3 = game.add.sprite(0,150, 'fondo3');
	velocidadArco=10;
	arco= game.add.sprite(0,80, 'arco-0');
	arco1= game.add.sprite(270,80, 'arco',"i00.png");
	arco1.animations.add("up-left",["i01.png","i02.png"],velocidadArco,false);
	arco1.animations.add("down-left",["i03.png","i04.png"],velocidadArco,false);
	arco1.animations.add("up-right",["i00.png"],velocidadArco,false);
	arco1.animations.add("down-right",["i00.png"],velocidadArco,false);
	arco1.animations.add("up",["i00.png"],velocidadArco,false);
	arco1.animations.add("down",["i00.png"],velocidadArco,false);
	arco1.animations.add("idle",["i00.png"],velocidadArco,false);
	
	arco2= game.add.sprite(456,80, 'arco',"c00.png");
	arco2.animations.add("up",["c01.png","c02.png"],velocidadArco,false);
	arco2.animations.add("down",["c03.png","c04.png"],velocidadArco,false);
	arco2.animations.add("up-right",["c00.png"],velocidadArco,false);
	arco2.animations.add("down-right",["c00.png"],velocidadArco,false);
	arco2.animations.add("up-left",["c00.png"],velocidadArco,false);
	arco2.animations.add("down-left",["c00.png"],velocidadArco,false);
	arco2.animations.add("idle",["c00.png"],velocidadArco,false);
	
	arco3= game.add.sprite(642,80, 'arco',"d00.png");
	arco3.animations.add("up-right",["d01.png","d02.png"],velocidadArco,false);
	arco3.animations.add("down-right",["d03.png","d04.png"],velocidadArco,false);
	arco3.animations.add("up-left",["d00.png"],velocidadArco,false);
	arco3.animations.add("down-left",["d00.png"],velocidadArco,false);
	arco3.animations.add("up",["d00.png"],velocidadArco,false);
	arco3.animations.add("down",["d00.png"],velocidadArco,false);
	arco3.animations.add("idle",["d00.png"],velocidadArco,false);
	
    presicionText = game.add.text(10, 355, 'Tiempo: 00:00', { font: " 20px TheMinion", fill: "black", align: "center" });
	presicionText.visible=false;
},

drawArquero:function(){
	arqueroPosition= {x:320,y:100};
	arquero= game.add.sprite(arqueroPosition.x,arqueroPosition.y, 'arquero-local');
	arquero.scale.setTo(1,1);
    arquero.frame = 0;
   
	arquero.animations.add('idle', [00,01,02,03,04], 10, false);
    arquero.animations.add('down-left', [18,19,20,23,24,26,25,19,18,01,00], 10, false);
    arquero.animations.add('up-left',  [18,19,20,21,22,23,24,26,25,19,18,01,00], 10, false);
    arquero.animations.add('down', [00,00,10,08,09,09,08,08,10,15,02,01,00], 10, false);
    arquero.animations.add('up',  [03,04,11,12,13,14,14,14,13,12,11,04,03,02], 13, false);
	arquero.animations.add('up-right',  [15,16,17,17,16,08,09,08,10,15,02,01,00], 10, false);
	arquero.animations.add('down-right', [05,06,07,08,09,08,10,15,02,01,00], 8, false);
	arquero.animations.add('derrota', [27,28,29,30,31], 8, false);
	arquero.animations.add('festejo', [32,33,34,35,34,33], 8, false);
	arquero.animations.add('festejo2', [36,37,38], 8, false);

    arquero.visible=false;
},


drawPelota:function(){
	pelotaPosition= {x:580,y:490};
	pelota= game.add.sprite(pelotaPosition.x,pelotaPosition.y ,'pelota');
	pelota.scale.setTo(0.9,0.9);
	 pelota.anchor.x=0.5;
	pelota.anchor.y=0.5;
	duracionPelota=400;
	delayStopPelota=1100;
	pelota.animations.add("girar",[0,1,2],30,true);
},


drawPlayer:function(){
	player = game.add.sprite(318,210, 'pateador-local');
	playerIPos=  new Phaser.Point();
	playerIPos.x= 100;
	playerIPos.y=350;
	player.scale.setTo(1.3,1.3);
	player.x=playerIPos.x;
	player.y=playerIPos.y;
	player.frame = 0;
	//animacion player
	player.animations.add('right', [04,05,06,07,08,09,10,11,12,13,14,15,00,01,02], 12, false);
	player.animations.add('idle', [00,01,02,01], 12 , true);
	player.animations.add('derrota', [15,16,17,18,19,20,21,22], 12 , false);
	player.animations.add('festejo', [23,24,25,26,27,28,29,30,31,32], 12 , false);
	player.visible=true;
	player.play("idle");
},

createBarra: function(){
	// MODIFICAMOS NUEVA BARRA DE COLORES
	var 	myBitmap = this.game.add.bitmapData(500, 20);
	var  grd=myBitmap.context.createLinearGradient(500,0,0,0);

	grd.addColorStop(0,"red");
	grd.addColorStop(.10,"orange");
	grd.addColorStop(.50,"green");
	grd.addColorStop(.90,"orange");
	grd.addColorStop(1,"red");

	myBitmap.context.fillStyle=grd;
	myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

	arrayGradient =[[[0, "red"],[0.10,"orange"],[0.50,"green"],[0.90,"orange"],[1,"red"]],
					[[0, "red"],[0.15,"orange"],[0.50,"green"],[0.85,"orange"],[1,"red"]],
					[[0, "red"],[0.25,"orange"],[0.50,"green"],[0.75,"orange"],[1,"red"]],
					[[0, "red"],[0.35,"orange"],[0.50,"green"],[0.65,"orange"],[1,"red"]],
					[[0, "red"],[0.40,"orange"],[0.50,"green"],[0.60,"orange"],[1,"red"]]
					];
   
	barra = this.game.add.sprite(this.game.width/2 - 250,600, myBitmap);
   
   //rangoDePresicion=40;

	focus = game.add.sprite(barra.position.x,600, 'triangle');
	focus.scale.setTo(0.05,0.05);

	beginBarra = barra.position.x;
	centerBarra = barra.position.x + barra.width/2 -focus.width/2 ;
	endBarra = barra.position.x + barra.width - focus.width/2;
	
	barra.visible=false;
	focus.visible=false;
	
},
	
createButtons:function(){
	buttons= game.add.group();
	  var auxID=1;

	  for (var i = 1; i < 3; i++)
	  {
		  for(var j=0; j < 3; j++){

			auxButton = game.add.button((j*120)+400, (i*90)+80, 'button', function(self){}, this, 50, 50, 0);
			auxButton.id=auxID++;


			auxButton.events.onInputDown.add(this.actionOnClick,auxButton);

			auxButton.scale.setTo(0.25,0.25);

			buttons.add(auxButton);
			buttons.visible=true;
			game.world.bringToTop(buttons);
		  };
	  };
	  buttons.y=-70;
},

setClickArea:function(){
	transparentObject = game.add.button(0,0);

	transparentObject.scale.setTo(game.world.width, game.world.height);
	transparentObject.alpha =0;

	transparentObject.visible=false;
},

drawGui:function(){
	var display1="Fallaste!";
    var display2="Ganaste!";
	looser = game.add.text(350, 350, display1, { font: 'bold 60pt TheMinion',fill: 'red' });
	looser.visible=false;
	winner = game.add.text(350, 350, display2, {  font: 'bold 60pt TheMinion',fill: 'red' });
	winner.visible=false;
	points= game.add.group();
	userPointY=200;
	enemyPointY=300;
},

updateCounter: function () {
	if(this.pause){
		return;
	}
	counter--;
	presicionText.setText('Tiempo: 00:0' + counter);
	if(counter< 6){
		presicionText.visible=true;
	}else{
		presicionText.visible=false;
	}
	if (counter==-1) {
		this.pause=true;
		counter=150000;
		presicionText.visible=false;
		this.idElegido=0;
		this.setResult(this.idElegido);
		this.EnviarJugadaServer(this);
	}
},

  setBarraPresicion: function(){

    barra.visible=true;
    focus.visible=true;
    game.world.bringToTop(focus);

  },

  setResult: function(auxValue){

     result=auxValue;
  },
  
  setArco:function(posicion){
	arco1.play(posicion) ;
	arco2.play(posicion);
	arco3.play(posicion);
  },
  
  resetArco:function(){
	arco1.play("idle") ;
	arco2.play("idle");
	arco3.play("idle");
  },

  getResult: function(){
    return result;
  },

  setPlayersMode1: function(){

    player.visible=true;
    focus.position.x=barra.position.x;
    focus.position.y=600;
    tweenFocus = game.add.tween(focus);
    tweenFocus.to( {x:endBarra, y:600}, velocidad, 'Linear', true, 0, false).yoyo(true);
    self.setArquero(self);

	buttons.alpha=0;

  },
  
  setPlayersMode2: function(self){

    player.visible=true;
    self.setArquero(self);
    buttons.visible=false;
    self.EnviarJugadaServer(self);

  },

  setArquero: function(){
    arquero.visible=true;
    arquero.frame=0;
	arqueroPiso=75;
    arquero.position.x =320;
    arquero.position.y =arqueroPiso;
  },

 cambiarRopa: function(){
     if(Phaser.Math.isEven(modo)){
       player.loadTexture('pateador-visitante', 0, false);
       arquero.loadTexture('arquero-visitante', 0, false);
     }else{
       player.loadTexture('pateador-local', 0, false);
       arquero.loadTexture('arquero-local', 0, false);
     }
 },

  actionOnClick: function(target) {

    if(clicked==1){
      return;
    }

    clicked=1;
    self.setResult(target.id);

    if(Phaser.Math.isEven(modo)){

      self.setPlayersMode2(self);

    }else{
		target.events.onInputUp.addOnce(self.mouseUpPateador,self);
      self.updateBarra(self);
      self.setBarraPresicion(self);
      self.setPlayersMode1(self);

    };

  },

  restart: function(self){

    counter=self.tiempoMaximo;
    self.pause=false;
    modo++;

    if(Phaser.Math.isEven(modo)){
      triesA++;

      self.setBotonesRiesgo(self);
    }else{
      triesP++;
      self.setBotonesRojos(self);

    }

	
	self.resetGui();
	self.resetPlayers();
	game.tweens.remove(tweenPelota);
	try{
		game.tweens.remove(tweenFocus);
		game.tweens.remove(tweenArquero);
	}
	catch(e){}
	
	self.cambiarRopa(self);
	pelota.position.x=pelotaPosition.x;
	pelota.position.y=pelotaPosition.y;
	clicked=0;


  },
  
  resetGui:function(){

	presicionText = game.add.text(10, 355, 'Tiempo: 00:00', { font: " 20px TheMinion", fill: "black", align: "center" });
	presicionText.visible=false;
	winner.visible=false;
	looser.visible=false;
	barra.visible=false;

	focus.visible=false;
	buttons.visible=true;
	buttons.alpha=1;  
  },
  
  resetPlayers:function(){
	player.position.x=playerIPos.x;
	player.position.y=playerIPos.y;
	arquero.bringToTop();
	pelota.bringToTop();
	player.bringToTop();
	arquero.position.x= arqueroPosition.x;
	arquero.position.y=arqueroPosition.y;
	player.play("idle");
	arquero.animations.stop();
	arquero.frame=0;
	arquero.visible=false;
	arco1.play("idle");
	arco2.play("idle");
	arco3.play("idle");
  },

  patear: function(){
    tweenPlayer = game.add.tween(player);
	
    setTimeout(function(){tweenPlayer.to({x:200, y:300},500, 'Linear', true, 0);},0); 

    player.animations.play('right');
  },

  stopPlayer: function(){
    //player.animations.stop();
    //player.frame=2;
  },

  NoAssertPoint: function(ubiPuntaje, tries){
    var point= game.add.sprite(10+tries*40,ubiPuntaje, 'noassert');
    point.scale.setTo(0.10,0.10);
    points.add(point);

  },

  AssertPoint: function(ubiPuntaje, tries){
	  
    var point= game.add.sprite(10+tries*40, ubiPuntaje, 'assert');
    point.scale.setTo(0.10,0.10);
    points.add(point);
  },

  seMueveArquero: function(self){

      tweenArquero = game.add.tween(arquero);
	  var auxVar=self.posArquero;


        switch(self.posArqueroI){

          case 1:
		  tweenArquero.to({x:100,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('up-left');
          break;

          case 2:
		  tweenArquero.to({x:320,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('up');
          break;

          case 3:
		  tweenArquero.to({x:520,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('up-right');
          break;

          case 4:
		  tweenArquero.to({x:100,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('down-left');
          break;

          case 5:
		  tweenArquero.to({x:320,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('down');
          break;

          case 6:
		  tweenArquero.to({x:520,y:arqueroPiso}, 500, 'Linear', true, 0);
          arquero.animations.play('down-right');
          break;

        }

    },

    desempatar:function(){
      enAlargue=true;
      desempateText= game.add.text(600, 10, 'Alargue. Desempate', { font: " 20px TheMinion", fill: "black", align: "right" });
      points.removeAll(true);
      setTimeout(function(){
         self.restart(self);
      },200);
      triesA=0;
      triesP=0;

    },

    terminarJuego: function(){

      this.game.state.states["GameOver"].puntosUser = puntosUser;
      this.game.state.states["GameOver"].puntosComputer = puntosComputer;

      this.game.state.start("GameOver")
    },

	setearResultado: function(msg){
		 var resultadoArray=JSON.parse(msg);
		 puntosUser = resultadoArray["golesUser"];
		 puntosComputer = resultadoArray["golesComputer"];
		this.checkIntentos(msg);
    },

    checkIntentos: function(data){
		var auxArray=JSON.parse(data);
		if(modo==1){
		 	golesUser= auxArray["localGol"];
		 	golesComputer= auxArray["visitanteGol"];
			
		}else{
		 	golesUser= auxArray["visitanteGol"];
			golesComputer= auxArray["localGol"];
			
		}
      if( triesA  >= 5 &&  triesP  >= 5 ){

        if(self.esEmpate(self)){
          setTimeout(function(){self.desempatar(self);},200);

        }else{

          self.terminarJuego(self);

        };

      }else{

        if(!enAlargue){
             self.restart(self);
        }else{
			
              if(triesA >=1 && triesP>=1){

                if(puntosUser!=puntosComputer){

                  self.terminarJuego(self);

                }else{
                  setTimeout(function(){self.desempatar(self);},500);

                }

              }else{

                 self.restart(self);
              }

        }

      };

    },

esEmpate: function(){
  if(puntosUser==puntosComputer)return true;
  return false;
},

getRiesgo: function(){
  if(Phaser.Math.isEven(modo)){
    return this.perfil.tendencia[triesA-1];
  }else{
      return this.perfil.tendencia[triesP-1];
  }

},

setBotonesRiesgo: function(self){
  var barray = self.getRiesgo(self);

  for(var i=1; i<7; i++){
    if(barray[i-1]==0){
        buttons.children[i-1].loadTexture('orange-button', 0, false);

    }else if(barray[i-1]==1){
        buttons.children[i-1].loadTexture('yellow-button', 0, false);
    }

  }

},

setBotonesRojos:function(){
  for(var i=0; i<6; i++){
	  buttons.children[i].loadTexture('button', 0, false);
  }
},

establecerParametrosBarra: function(self){
	presicionText.destroy();

	transparentObject.visible=false;
	try{
		tweenFocus.pause();
	}
	catch(i){
	}

	presicion =  centerBarra - focus.position.x ;
	if(!Phaser.Math.isEven(modo)){
		
		if( rangoDePresicion > presicion && presicion > -rangoDePresicion){
			
		  self.idElegido=self.getResult();
		 }else{
			
			  if( presicion < rangoDePresicion+25 ||  presicion < -(rangoDePresicion+25) ){
					switch (self.getResult()) {
					  case 1:
					  case 4:
							//erra left
							self.idElegido=-1;
						break;

					  case 3:
					  case 6:
							//erra right
							self.idElegido=-2;
						break;

					  case 2:
					  case 5:
							//erra centro
							self.idElegido=0;
						break;

					};
			}else if(presicion > rangoDePresicion+30){
				self.idElegido=-3;
			}else{
				self.idElegido=-4;
			}
		
		};

	}else{
	self.idElegido=self.getResult();
	};
},

updateBarra: function(){

	if(counterBarra<(arrayGradient.length)){
		barra.destroy();
		var	myBitmap = this.game.add.bitmapData(500, 20);

		var  mov=myBitmap.context.createLinearGradient(500,0,0,0);

		for(var j=0; j<=(arrayGradient[counterBarra].length-1); j++){

			mov.addColorStop(arrayGradient[counterBarra][j][0],arrayGradient[counterBarra][j][1]);
		}

		myBitmap.context.fillStyle=mov;
		myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

		barra = this.game.add.sprite(this.game.width/2 - 250,600, myBitmap);

	}else{ 
		
	}

	self.setDifficult(self);
	counterBarra++;
	if(counterBarra>=(arrayGradient.length)){
		counterBarra= arrayGradient.length-1;
	}
},

setDifficult(){
      var a = barra.width*arrayGradient[counterBarra][1][0] +15;
       rangoDePresicion= barra.width/2 - a;
      return;
},

//Envio Jugada///
EnviarJugadaServer: function(self){
	
	self.pause=true;
	self.setArquero();
	self.establecerParametrosBarra(self);
	counter=150000;
	buttons.visible=false;
    Emit("enviarJugada",self.idElegido,"recibeJugada","resolverJugada",self);
},

//Respuesta server: resolver jugada
resolverJugada: function(msg){

	var datosServer=JSON.parse(msg)
	self.pelotaEntra=false;
	
	
	if(Phaser.Math.isEven(modo)){
		if(datosServer["computer"]>0&&datosServer["user"]!=datosServer["computer"]){
			self.pelotaEntra=true;		
		}
		self.pateadorID=datosServer["computer"];
		self.arqueroID=datosServer["user"];
		self.ListenerArquero(self, datosServer);
		
	}else{
		if(datosServer["user"]>0&&datosServer["user"]!=datosServer["computer"]){
			self.pelotaEntra=true;		
		}
		self.pateadorID=datosServer["user"];
		self.arqueroID=datosServer["computer"];

		self.ListenerPateador(self, datosServer);

	}
},

ListenerPateador: function(self, datosServer){
    
	self.posArqueroI= self.arqueroID;
	
    self.animarJugada(self,datosServer);
	
},

ListenerArquero: function(self, datosServer){

	/**quitar**/
	generator = datosServer.computer;
	
	self.animarJugada(self,datosServer);

},

animarJugada:function(self,datosServer){
	self.patear(self);
	setTimeout(function(){
		
		self.ubicarArquero(self.arqueroID, self);
		
		self.seMueveArquero(self);
	
		self.moverPelota(self.pateadorID).onComplete.addOnce(function(){
			if(self.pelotaEntra){
				self.animarArco(self);
				arquero.bringToTop();
			}else{
				pelota.bringToTop();
				player.bringToTop();
				if(self.pateadorID>0){
					self.pelotaFuera(self);
				}
			}
			//updatea stats, muestra ganar/perder
			if(Phaser.Math.isEven(modo)){
			    self.atajar(self);
			}else{
				self.acertarTiro(self);
			}
		});
	},delayPelota);
},

animarArco:function(self){
	switch(self.pateadorID){
		case 1:
			arco1.play("up-left");
			arco2.play("up-left");
			arco3.play("up-left");
		break;
		case 2:
			arco1.play("up");
			arco2.play("up");
			arco3.play("up");
		break;
		case 3:
			arco1.play("up-right");
			arco2.play("up-right");
			arco3.play("up-right");
		break;
		case 4:
			arco1.play("down-left");
			arco2.play("down-left");
			arco3.play("down-left");
		break;
		case 5:
			arco1.play("down");
			arco2.play("down");
			arco3.play("down");
		break;
		case 6:
			arco1.play("down-right");
			arco2.play("down-right");
			arco3.play("down-right");
		break;
		
	}
},

pelotaFuera:function(self){
	var auxCoordenada={};
	switch(self.pateadorID){
		case 1: case 4:
		auxCoordenada.x=-100;
		auxCoordenada.y=0;
		break;
		case 2:
		auxCoordenada.x=pelota.x;
		auxCoordenada.y=-500;
		break;
		case 3: case 6: case 5:
		auxCoordenada.x=1000;
		auxCoordenada.y=-100;
		break;
		
	}
	game.tweens.remove(tweenPelota);
	tweenPelota=game.add.tween(pelota);
	auxTween= tweenPelota.to(auxCoordenada,duracionPelota, 'Linear', true, 0);
},

Win: function(){
  looser.visible=false;
  winner.visible=true;
  winner.bringToTop();
},

Looser: function(){
  looser.visible=true;
  winner.visible=false;
  looser.bringToTop();
},

acertarTiro: function(self){
	
          if(self.pelotaEntra){
              puntosUser++;
              self.AssertPoint(userPointY,triesP);
              self.Win(self);
              localStorage["TotalConvertidos"] = (parseInt(localStorage["TotalConvertidos"]) || 0) + 1;
              localStorage["TotalPartidaConvertidos"] = (parseInt(localStorage["TotalPartidaConvertidos"]) || 0) + 1;
              localStorage["RachaConvertidos"] = (parseInt(localStorage["RachaConvertidos"]) || 0) + 1;
              localStorage["RachaErrados"]=0
              if( parseInt(localStorage["RachaConvertidos"]) > parseInt(localStorage["MejorRachaConvertida"]) ){
                localStorage["MejorRachaConvertida"]= parseInt(localStorage["RachaConvertidos"]);
              }
			  
          }else{
              self.NoAssertPoint(userPointY,triesP);
              self.Looser(self);
              localStorage["TotalErrados"] = (parseInt(localStorage["TotalErrados"]) || 0) + 1;
              localStorage["TotalPartidaErrados"] = (parseInt(localStorage["TotalPartidaErrados"]) || 0) + 1;
              localStorage["RachaConvertidos"] = 0;
              localStorage["RachaErrados"] = (parseInt(localStorage["RachaErrados"]) || 0) + 1;
              if(parseInt(localStorage["RachaErrados"]) > parseInt(localStorage["PeorRachaErrados"])){
                localStorage["PeorRachaErrados"]=parseInt(localStorage["RachaErrados"]);
              }

         };

       
},

atajar: function(self){

          if(!self.pelotaEntra){

              self.NoAssertPoint(enemyPointY,triesA);
              self.Win(self);
              localStorage["TotalAtajados"] = (parseInt(localStorage["TotalAtajados"]) || 0) + 1;
              localStorage["RachaAtajados"] = (parseInt(localStorage["RachaAtajados"]) || 0) + 1;
              localStorage["TotalPartidaAtajados"] = (parseInt(localStorage["TotalPartidaAtajados"]) || 0) + 1;
              localStorage["RachaNoAtajados"] = 0;
              if( parseInt(localStorage["RachaAtajados"]) > parseInt(localStorage["MejorRachaAtajados"]) ){
                 localStorage["MejorRachaAtajados"]= parseInt(localStorage["RachaAtajados"]);
              }

          }else{

              self.AssertPoint(enemyPointY,triesA);
              self.Looser(self);
              puntosComputer++;
              localStorage["TotalNoAtajados"] = (parseInt(localStorage["TotalNoAtajados"]) || 0) + 1;
              localStorage["TotalPartidaNoAtajados"] = (parseInt(localStorage["TotalPartidaNoAtajados"]) || 0) + 1;
              localStorage["RachaAtajados"] = 0;

              localStorage["RachaNoAtajados"] = (parseInt(localStorage["RachaNoAtajados"]) || 0) + 1;
              if(parseInt(localStorage["RachaNoAtajados"]) > parseInt(localStorage["PeorRachaNoAtajados"])){
                localStorage["PeorRachaNoAtajados"]=parseInt(localStorage["RachaNoAtajados"]);
              }

         };

},

moverPelota: function(coor){
	var unaCoordenada={x:0,y:0};
	 var auxTween;
	 tweenPelota = game.add.tween(pelota);
	 
	if(coor==0||coor=="0"){
		//palo center
		var posAux = game.rnd.integerInRange(300,600);
		unaCoordenada={x:posAux, y:-500};
		auxTween= tweenPelota.to(unaCoordenada,duracionPelota, 'Linear', true, 0);
	}else
	if(coor==-1||coor=="-1"){
		//palo left
		var posAux = 200;
       unaCoordenada={x:posAux, y:-500};
	   auxTween= tweenPelota.to(unaCoordenada,duracionPelota, 'Linear', true, 0);
	}else
	if(coor==-2||coor=="-2"){
		//palo right
		var posAux = 700;
        unaCoordenada={x:posAux, y:-500};
		 auxTween= tweenPelota.to(unaCoordenada,duracionPelota, 'Linear', true, 0);
	}else
	if(coor==-3||coor=="-3"){
		//afuera right
		var posAux = game.rnd.integerInRange(-800,100);
        unaCoordenada={x:posAux, y:-500};
		 auxTween= tweenPelota.to(unaCoordenada,duracionPelota, 'Linear', true, 0);
	}else
	if(coor==-4||coor=="-4"){
		//afuera left
		var posAux = game.rnd.integerInRange(1000,700);
        unaCoordenada={x:posAux, y:-500};
		 auxTween= tweenPelota.to(unaCoordenada,duracionPelota, 'Linear', true, 0);
	} else{
		switch(coor){
			case 1: case "1":
			unaCoordenada=[{x:pelotaPosition.x,y:pelotaPosition.y},{x:437,y:291},{x:392,y:226},{x:345,y:153}];
			break;
			case 2: case "2":
			unaCoordenada=[ {x:pelotaPosition.x,y:pelotaPosition.y},{x:552,y:251},{x:551,y:193},{x:549,y:141}];
			break;
			case 3: case "3":
			unaCoordenada=[{x:pelotaPosition.x,y:pelotaPosition.y},{x:756,y:265},{x:755,y:207},{x:752,y:158}];
			break;
			case 4: case "4":
			unaCoordenada=[{x:pelotaPosition.x,y:pelotaPosition.y},{x:471,y:370},{x:416,y:297},{x:347,y:212}];
			break;
			case 5: case "5":
			unaCoordenada=[{x:pelotaPosition.x,y:pelotaPosition.y},{x:554,y:387},{x:553,y:311},{x:545,y:208}];
			break;
			case 6: case "6":
			unaCoordenada=[{x:pelotaPosition.x,y:pelotaPosition.y},{x:555,y:470},{x:741,y:316},{x:767,y:207}];
			break;
		}
		auxTween= tweenPelota.to({
			  x: [unaCoordenada[0].x, unaCoordenada[1].x, unaCoordenada[2].x, unaCoordenada[3].x],
			  y: [unaCoordenada[0].y, unaCoordenada[1].y, unaCoordenada[2].y, unaCoordenada[3].y],
		 }, duracionPelota,Phaser.Easing.LINEAR, true, 0).interpolation(function(v, k){
			  return Phaser.Math.bezierInterpolation(v, k);
		 }); 
   
	}
  
   
   
   pelota.play("girar");
   setTimeout(function(){pelota.animations.stop();},delayStopPelota);
   return auxTween;
},

ubicarArquero: function(resultadoServer, self){

    generator = resultadoServer;

	

	if(generator<=0){
		self.posArqueroI =game.rnd.integerInRange(0,5);
		self.posArquero= arquero.position;

	}else{
		self.posArquero=buttons.children[generator-1].position;
		self.posArqueroI =generator;
	}

},	

//Animaciones arquero
moveLeftDown: function(){

	arquero.animations.play('down-left');
},

moveLeftUp: function(){
	arquero.animations.play('up-left');
},

jump: function(){

	arquero.animations.play('up');
},
moveRightDown: function(){

	arquero.animations.play('down-right');
},

moveRightUp: function(){
	arquero.animations.play('up-right');

},

moveDown: function(){
	arquero.animations.play('down');
},
//fin animaciones arquero ////

Clicked: function(){
	clicked=0;
	this.pause=false;
},

mouseUpPateador:function(){
	
	if(!Phaser.Math.isEven(modo)&&!this.pause){
		this.EnviarJugadaServer(this);
	}
},

};
