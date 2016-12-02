var Versus = function(game) {};

Versus.prototype = {

  create: function () {

    self = this;
    this.modo;

    this.createBackground(true);
    this.createSoundGraphics();


    modo=this.modo;

    velocidadMoneda=50;
	
	if(this.privada==1){
		//var op2={titulo:"Aceptar",callback:"emit",params:{code:"aceptar",params:{partida:1}}};
		Emit("aceptar",{privada:1});
	}

    //NombreSala;
	console.log(this.NombreSala);
    var tableroPuntos = game.add.graphics(this.game.width/2-165, 0);
    tableroPuntos.beginFill(0x000065,1);
    tableroPuntos.drawRoundedRect(0, 0,330,65,5);
    window.graphics = tableroPuntos;
    puntaje=game.add.text(70,10, this.NombreSala, { font: "35px CondensedRegular", fill: "#ffc418", align: "center"});
    puntaje.x= tableroPuntos.width/2-puntaje.width/2;
    tableroPuntos.addChild(puntaje);
    brilloTablero=game.add.sprite(130,50, 'brilloup');
    brilloTablero.scale.setTo(.3,.3);
    brilloTablero.alpha=.5;
    tableroPuntos.addChild(brilloTablero);

    timer = game.time.create();
    timerEvent = timer.add(Phaser.Timer.MINUTE * 0+ Phaser.Timer.SECOND * 60, this.endTimer, this);
    //timer.start();


    tiempo = game.add.text(0, 540, '5:00', { font: "30px BitterBold", fill: "white", align: "center", stroke:'yellow' });
    tiempo.stroke='#ffc400';
    tiempo.strokeThickness =3;
    tiempo.position.x= this.game.width/2 - tiempo.width/2;
	  tiempo.visible=false;





    var bmd = game.make.bitmapData(367, 482);

  	bmd.alphaMask(usuario["avatar"], 'player');

  	leftPlayer= game.add.image(-50, 180, bmd);

    leftPlayer.scale.setTo(.8);
    leftPlayer.alpha=0;



    rightPlayer=game.add.sprite(this.game.width+50, 180, 'player');
    rightPlayer.scale.setTo(.8);
    rightPlayer.alpha=0;

    textTitle = game.add.text(0, 250, "VS",{ font: '60px BitterBold', fill: 'white', align: 'center'});
    textTitle.position.x= this.game.width/2 - textTitle.width/2;
    textTitle.setShadow(-5, -5, 'rgba(0,0,0,0.5)', 15);

    var tweenA= game.add.tween(rightPlayer).to({x:this.game.width/2 + 120}, 200, 'Linear');
    var tweenB= game.add.tween(leftPlayer).to({x:this.game.width/2 - leftPlayer.width-100}, 200, 'Linear');
    var tweenC =game.add.tween(leftPlayer).to( {alpha:1}, 200, 'Linear');
    var tweenD =game.add.tween(rightPlayer).to( {alpha:1}, 200, 'Linear');

    tweenA.start();
    tweenB.start();
    tweenC.start();
    tweenD.start();

	listos=0;

    tweenD.onComplete.add(
      function(){

        goldenB=game.add.sprite(leftPlayer.x-10,leftPlayer.y-5, 'selector');
        goldenB.scale.setTo(.8,.8);


        goldenA=game.add.sprite(rightPlayer.x-10,rightPlayer.y-5, 'selector');
        goldenA.scale.setTo(.8,.8);

        try{
            var nikUser=game.add.text(250,380, usuario.nickname.toUpperCase(), { font: '27px CondensedBold', fill: 'white', align: 'center',wordWrap: true, wordWrapWidth:20});
        }catch(e){}

        nikUser.x=leftPlayer.x+(leftPlayer.width/2)- nikUser.width/2;
        load=game.add.sprite(820, 325, 'loading');
        load.pivot.x=33;
        load.pivot.y=33;
        tweenE=game.add.tween(load).to({angle: -359}, 1500, null, true, 0, Infinity);
        tweenE.start();

      }, this);

      var graphics = game.add.graphics(690, 525);
      graphics.beginFill(0x000000, 0.3);
      graphics.drawRoundedRect(0, 0, 270, 60,5);
      window.graphics = graphics;

      confirmacion=game.add.text(40, 20, "Buscando oponente...",{ font: '20px CondensedLight', fill: 'white', align: 'center'});
      confirmacion.x = graphics.width/2 - confirmacion.width/2;
      graphics.addChild(confirmacion);

      cancelar=self.createButton('CANCELAR', function () {
        console.log(modo);
        modo==1?game.state.start('Selectsala'):game.state.start('SelectsalaPrivada');

      });

     cancelar.position={x:175,y:530};


     comenzar=self.createButton('COMENZAR', function (){
		listos+=1;
		Emit("ready","");
        // timer.stop();
        //goldenA.addChild(game.add.sprite(goldenA.width, goldenA.height-50, 'accepted'));
        goldenB.addChild(  game.add.sprite(goldenB.width, goldenB.height-50, 'accepted'));
        comenzar.visible=false;
    		self.ambosListos();

      });
      comenzar.position={x:175,y:530};
      comenzar.visible=false;



  SuscribeServerEvent("oponente","empezarConteo",this,true);
	SuscribeServerEvent("oponenteListo","oponenteListo",this,true);
	SuscribeServerEvent("recibirLado","recibirLado",this,true);
	SuscribeServerEvent("resultadoPartida","setearResultado",this,true);

},

setearResultado: function(msg){
		//var resultadoArray;
	if(modoMultiplayer){
		//resultadoArray=msg;
		resultadoPartida=msg;
		triesA=5;
		triesP=5;
	}else{
		//var resultadoArray=JSON.parse(msg);
	}
	console.log("resultado array");
	console.log(resultadoPartida);
	//resultadoPartida= resultadoArray;

	this.game.state.states["GameOver"].puntosUser = resultadoPartida["golesUser"];
    this.game.state.states["GameOver"].puntosComputer = resultadoPartida["golesComputer"];
    this.game.state.states["GameOver"].oponente = oponente;
	this.game.state.start("GameOver");
},

oponenteListo:function(msg){
	listos+=1;
	goldenA.addChild(game.add.sprite(goldenA.width, goldenA.height-50, 'accepted'));
	this.ambosListos();
},

empezarConteo: function(msg){
	//oponente es un objeto global
	oponente= msg;
	//renderear aca avatar del oponente (cargarlo y mostrarlo)

  game.load.image('avatarOponente', oponente["avatar"]);

  game.load.onLoadComplete.addOnce(function(){

    var bmd = game.make.bitmapData(367, 482);

	oponente["avatar"]= "avatarOponente";

    bmd.alphaMask('avatarOponente', 'player');

    rightPlayer= game.add.image(this.game.width/2 + 120, 180, bmd);

	rightPlayer.scale.setTo(.8);

	goldenA=game.add.sprite(rightPlayer.x-10,rightPlayer.y-5, 'selector');
        goldenA.scale.setTo(.8,.8);

	console.log("avatar cargado");

	 var nikOpon=game.add.text(770,380, oponente.nickname.toUpperCase(), { font: '27px CondensedBold', fill: 'white', align: 'center',wordWrap: true, wordWrapWidth:20});
  nikOpon.x=rightPlayer.x+(rightPlayer.width/2)- nikOpon.width/2;

  }, this);

  game.load.start();

  var nikOpon=game.add.text(770,380, oponente.nickname.toUpperCase(), { font: '27px CondensedBold', fill: 'white', align: 'center',wordWrap: true, wordWrapWidth:20});
  nikOpon.x=rightPlayer.x+(rightPlayer.width/2)- nikOpon.width/2;

  timer.start();
  tiempo.visible=true;
  comenzar.visible=true;
  cancelar.visible=false;
  confirmacion.setText("Esperando confirmación");
  confirmacion.x = graphics.width/2 - confirmacion.width/2;

},

ambosListos:function(){
	if(listos<2)return;
	timer.stop();
	graphics.visible=false;
  textTitle.visible=false;
	tiempo.destroy();
},

recibirLado:function(msg){
	if(msg==1){ //chekeo de lo que el servidor eligio
		oponente["lado"]="local";
		oponente["pateador"]="pateador-local";
		oponente["arquero"]="arquero-local";
		usuario["lado"]="visitante";
		usuario["arquero"]="arquero-visitante";
		usuario["pateador"]="pateador-visitante";
	  }else{
		oponente["lado"]="visitante";
		oponente["pateador"]="pateador-visitante";
		oponente["arquero"]="arquero-visitante";
		usuario["lado"]="local";
		usuario["arquero"]="arquero-local";
		usuario["pateador"]="pateador-local";
	  }
	self.sortearMoneda(msg);
},


render: function () {
    if (timer.running) {
        tiempo.setText(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)));
  }
},

endTimer: function() {
    timer.stop();
    self.endScreen();
},

formatTime: function(s) {
    var minutes = ''+Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
},

endScreen: function(){
  modal=self.notificationDinamic("UPS!!","El tiempo de espera se ha agotado !", false);




  modal.onComplete.addOnce(function(){

      setTimeout(function(){game.state.start('Selectsala');},1500);
  });


},

sortearMoneda:function(msg){

  monedaRight=game.add.sprite(this.game.width/2, this.game.height/2-171/2, 'moneda-right');
  monedaRight.pivot.x=171/2;

  self.rotarMoneda(monedaRight,msg);


},

rotarMoneda(target,msg){

  t1=target;

  if(msg==1){ //chekeo de lo que el servidor eligio
    velocidadMoneda+=25;
  }else{
    velocidadMoneda+=20;
  }



  if(velocidadMoneda>350){
    velocidadMoneda=900;
  }

      if(target.scale.x==-1){

      monedaTween=game.add.tween(t1.scale).to( {x:1}, velocidadMoneda,'Linear');
    }else{

      monedaTween=game.add.tween(t1.scale).to( {x:-1}, velocidadMoneda,'Linear');
    }
    // console.log(velocidadMoneda);
    monedaTween.start();

    monedaTween.onComplete.addOnce(function(){
      if(velocidadMoneda>800){
        monedaTween.pause();
        self.identificarPuestos(target.scale.x);

      }else{
        self.rotarMoneda(t1,msg);
      }

     });

},


identificarPuestos: function(scale){

   if(scale==1){
     var t1= game.add.sprite(this.game.width/2-70, 420, 'ataja');
     var t2= game.add.sprite(this.game.width/2+70, 420, 'patea');
   }else{
     var t1=game.add.sprite(this.game.width/2-70, 420, 'patea');
     var t2=game.add.sprite(this.game.width/2+70, 420, 'ataja');
   }

   t1.pivot.x=t1.width/2;
   t2.pivot.x=t2.width/2;
   t1.pivot.y=t1.height/2;
   t2.pivot.y=t2.height/2;
   t1.scale.setTo(.1,.1);
   t2.scale.setTo(.1,.1);

     var tt1=game.add.tween(t1.scale).to( {x:.75,y:.75}, 500,'Linear');
     var tt2=game.add.tween(t2.scale).to( {x:.75,y:.75}, 500,'Linear');

     tt2.start();
     tt1.start();
	console.log(self.NombreSala);
     tt1.onComplete.addOnce(function(){

         setTimeout(function(){
<<<<<<< HEAD
           self.splashEntreTiempo();
		   console.log(self.NombreSala);
            this.game.state.states["Game"].NombreSala = self.NombreSala;
            game.state.start('Game');},5000);
=======

            this.game.state.states["Game"].NombreSala = NombreSala;
            game.state.start('Game');},2000);
>>>>>>> origin/master


     });

},

};

Phaser.Utils.mixinPrototype(Versus.prototype, mixins);
