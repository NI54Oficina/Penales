var Anims = function(game) {};

Anims.prototype = {

  preload: function () {

    this.optionCount = 1;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('sky', 'assets/images/tribuna_atras.png');
    game.load.image('frente', 'assets/images/tribuna_frente.png');
    game.load.spritesheet('button', 'assets/images/boton.png', 300, 300);
    game.load.image('assert', 'assets/images/green-button.png', 150,150);
    game.load.image('noassert', 'assets/images/red-button.png', 150,150);
    game.load.image('orange-button', 'assets/images/orange-button.png', 150,150);
    game.load.image('yellow-button', 'assets/images/yellow-button.png', 150,150);
    game.load.image('triangle', 'assets/images/puntero.png', 150,150);
    game.load.image('barra', 'assets/images/barra-p.png', 150,150);
    //game.load.spritesheet('pateador-local', 'assets/images/jugadorTest.png', 318, 210);
    game.load.spritesheet('tribunaAtras', 'assets/images/gente1.png');
    game.load.spritesheet('tribunaAdelante', 'assets/images/gente2.png');
    game.load.image('pasto', 'assets/images/pasto.png');
    game.load.spritesheet('pelota', 'assets/images/pelota.png', 40, 40);
    game.load.image('arco-0', 'assets/images/arco-0.png');
	game.load.atlas('arco', 'assets/images/arcos-sprite.png', 'assets/images/arcos-sprite.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    //game.load.spritesheet('arquero-local', 'assets/images/arquero-test-1.png', 318, 210);
    //game.load.spritesheet('arquero-local', 'assets/images/arquero-test-1.png', 318, 210);
	 game.load.atlas('arquero-local', 'assets/images/out.png', 'assets/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	 game.load.atlas('pateador-local', 'assets/images/pateador-test.png', 'assets/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.image('barraVertical', 'assets/images/barra_vertical.png');
    game.load.spritesheet('arquero-visitante', 'assets/images/arquero2.png', 116, 110);
    game.load.spritesheet('pateador-visitante', 'assets/images/pateador2.png', 105, 130);
    
	game.load.image('fondo1', 'assets/images/fondo-game1.png', 759, 150);
	game.load.image('fondo2', 'assets/images/fondo-game2.png', 378, 150);
	game.load.image('fondo3', 'assets/images/fondo-game3.png', 1136, 491);

  },

  create: function () {
    console.log("Entra create game");
    self = this;
    triesA=this.triesA;

    triesP=this.triesP;

	counterBarra=0;


	this.pause=true;
	
    
    presicionText=0;
	rangoDePresicion=40;
    counter=this.tiempoMaximo;
	perfilElegido= this.perfil;

    console.log("MODO: "+ this.modo);
    console.log("PERFIL: "+this.perfil);
    console.log("TIEMPO MAXIMO: "+this.tiempoMaximo);

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

   
	

    this.drawArquero();

	this.drawPelota();

	this.drawPlayer(this);

	
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onDown.add(this.up, this);

    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onDown.add(this.down, this);

    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onDown.add(this.dright, this);
	
	key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    key4.onDown.add(this.uright, this);
	
	key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
    key5.onDown.add(this.dleft, this);
	
	key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
    key6.onDown.add(this.uleft, this);
	
	key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    key7.onDown.add(this.derrota, this);
	
	key8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
    key8.onDown.add(this.festejo, this);
	
	key9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
    key9.onDown.add(this.festejo2, this);
	
	key9 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
    key9.onDown.add(this.idle, this);
	
},

up: function(){
	localStorage["currentArquero"]= "up";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},
down: function(){
	localStorage["currentArquero"]= "down";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

dright: function(){
	localStorage["currentArquero"]= "down-right";
	localStorage["arqueroX"]=220;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},
uright: function(){
	localStorage["currentArquero"]= "up-right";
	localStorage["arqueroX"]=220;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

uleft: function(){
	localStorage["currentArquero"]= "up-left";
	localStorage["arqueroX"]=-220;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

dleft: function(){
	localStorage["currentArquero"]= "down-left";
	localStorage["arqueroX"]=-220;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

derrota: function(){
	localStorage["currentArquero"]= "derrota";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

festejo: function(){
	localStorage["currentArquero"]= "festejo";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

festejo2: function(){
	localStorage["currentArquero"]= "festejo2";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},

idle: function(){
	localStorage["currentArquero"]= "idle";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
},


drawBackground: function(){
	tribunaAtras = game.add.sprite(0,0, 'tribunaAtras');
    tweenTribuna1= game.add.tween(tribunaAtras);
    tweenTribuna1.to( {x:0, y:20}, 500, 'Linear', true, 0, false).yoyo(true);

    tribunaAdelante = game.add.sprite(0,0, 'tribunaAdelante');
    tweenTribuna2= game.add.tween(tribunaAdelante);
    tweenTribuna2.to( {x:0, y:-10}, 300, 'Linear', true, 0, false).yoyo(true);
	
	fondo1 = game.add.sprite(0,0, 'fondo1');
	fondo1 = game.add.sprite(759,0, 'fondo2');
	fondo1 = game.add.sprite(0,150, 'fondo3');
	
	arco= game.add.sprite(0,80, 'arco-0');
	arco= game.add.sprite(270,80, 'arco',"i00.png");
	arco= game.add.sprite(456,80, 'arco',"c00.png");
	arco= game.add.sprite(642,80, 'arco',"d00.png");

    presicionText = game.add.text(10, 355, 'Tiempo: 00:00', { font: " 20px TheMinion", fill: "black", align: "center" });
	presicionText.visible=false;
},

drawArquero:function(){
	arquero= game.add.sprite(320,100, 'arquero-local',"test");
	arquero.scale.setTo(1,1);
    arquero.frame = 0;
   
   
	arquero.animations.add('idle', [00,01,02,03,04], 10, false);
    arquero.animations.add('down-left', [18,19,20,23,24,26,25,19,18,01,00], 10, false);
    arquero.animations.add('up-left',  [18,19,20,21,22,23,24,26,25,19,18,01,00], 10, false);
    arquero.animations.add('down', [10,08,09,08,10,15,02,01,00], 10, false);
    arquero.animations.add('up',  [03,04,11,12,13,14,13,12,11,04,03,02], 13, false);
	arquero.animations.add('up-right',  [15,16,17,17,16,08,09,08,10,15,02,01,00], 10, false);
	arquero.animations.add('down-right', [05,06,07,08,09,08,10,15,02,01,00], 8, false);
	arquero.animations.add('derrota', [27,28,29,30,31], 8, false);
	arquero.animations.add('festejo', [32,33,34,35,34,33], 8, false);
	arquero.animations.add('festejo2', [36,37,38], 8, false);
	var animacionTest='idle';
	localStorage["currentArquero"]= "up";
	localStorage["arqueroX"]=0;
	localStorage["arqueroY"]=0;
	localStorage["arqueroSpeed"]=500;
	setTimeout(function(){
		arquero.play(localStorage["currentArquero"]);
		arquero.play(localStorage["currentArquero"]);
			tweenArquero = game.add.tween(arquero);
			tweenArquero.to({x:localStorage["arqueroX"],y:localStorage["arqueroY"]}, localStorage["arqueroSpeed"], 'Linear', true, 0);
	},2000);
	
	setInterval(function(){
		arquero.x=320;
		arquero.y=100;
		
		setTimeout(function(){
			//arquero.play("down-left");
			arquero.play(localStorage["currentArquero"]);
			tweenArquero = game.add.tween(arquero);
			tweenArquero.to({x:localStorage["arqueroX"],y:localStorage["arqueroY"]}, localStorage["arqueroSpeed"], 'Linear', true, 0);
		},2000);
	},6000);
    arquero.visible=true;
},

drawPelota:function(){
	pelota= game.add.sprite(555,470 ,'pelota');
	pelota.scale.setTo(0.9,0.9);
	 
	pelota.animations.add("girar",[0,1,2],30,true);
},

drawPlayer:function(self){
	player = game.add.sprite(318,210, 'pateador-local');
	playerIPos=  new Phaser.Point();
	playerIPos.x= 100;
	playerIPos.y=350;
	player.scale.setTo(1.3,1.3);
	player.x=playerIPos.x;
	player.y=playerIPos.y;
	player.frame = 0;
	//animacion player
	//player.animations.add('right', [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39], 12, true);
	player.animations.add('right', [04,05,06,07,08,09,10,11,12,13,14,15,00,01,02], 9, false);
	//player.animations.add('idle', [1,9,16,19,16,9,1], 3, true);
	player.animations.add('idle', [00,01,02,01], 12 , true);
	player.animations.add('derrota', [15,16,17,18,19,20,21,22], 12 , false);
	player.animations.add('festejo', [23,24,25,26,27,28,29,30,31,32], 12 , false);
	player.visible=true;
	player.play("idle");
	if(true){
	setTimeout(function(){
	self.patear(self);
		setTimeout(function(){
		movimientoPelota= self.moverPelota({x:300, y:-500});
		},800);
	},1000);
	
	setInterval(function(){
			player.x=playerIPos.x;
		player.y=playerIPos.y;
		pelota.x=555;
		pelota.y=470;
		if(localStorage["currentArquero"]== "festejo"){
			player.play("festejo");
		}else if(localStorage["currentArquero"]== "derrota"){
			player.play("derrota");
		}else if(localStorage["currentArquero"]== "idle"){
			player.play("idle");
		}else{
		
		player.frame = 0;
		self.patear(self);
		setTimeout(function(){
			movimientoPelota= self.moverPelota({x:300, y:-500});
		},800);
		}
		
	},6000);
	}else{
		player.play("idle");
	}
},

  setPlayersMode2: function(self){

    player.visible=true;
    self.setArquero(self);
    buttons.visible=false;
	console.log("entra aquiiii???????");
    self.EnviarJugadaServer(self);

  },

  setArquero: function(){
    arquero.visible=true;
    arquero.frame=0;
	arqueroPiso=180;
    arquero.position.x =500;
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



  patear: function(){
    tweenPlayer = game.add.tween(player);

    setTimeout(function(){tweenPlayer.to({x:260, y:300},700, 'Linear', true, 0);},200); 

    player.animations.play('right');
  },



moverPelota: function(unaCoordenada){
  tweenPelota = game.add.tween(pelota);
  
   var auxTween;
   console.log("id elegido en mover pelota es "+this.idElegido);
   if(this.idElegido<4){
		auxTween= tweenPelota.to({x:[pelota.x,unaCoordenada.x+50,unaCoordenada.x],y:[pelota.y,unaCoordenada.y]},400, "Linear", true, 0).interpolation(function(v, k){
			return Phaser.Math.bezierInterpolation(v, k);
		});
   }else{
	   auxTween= tweenPelota.to(unaCoordenada,500, 'Linear', true, 0);
   }
   
   pelota.play("girar");
   setTimeout(function(){pelota.animations.stop();},600);
   return auxTween;
},

ubicarArquero: function(resultadoServer, self){

    generator = resultadoServer.computer;

	console.log("COMPUTER ID: " +generator);

	if(generator==0){
		self.posArqueroI =game.rnd.integerInRange(0,5);
		self.posArquero= arquero.position;

	}else{
		self.posArquero=buttons.children[generator-1].position;
		self.posArqueroI =generator;
	}

},	



};
