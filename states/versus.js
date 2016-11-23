var Versus = function(game) {};

Versus.prototype = {

  create: function () {

    self = this;


    this.createBackground(true);
    this.createSoundGraphics();

    velocidadMoneda=50;

      act=false;

    var tableroPuntos = game.add.graphics(this.game.width/2-165, 0);
    tableroPuntos.beginFill(0x000065,1);
    tableroPuntos.drawRoundedRect(0, 0,330,65,5);
    window.graphics = tableroPuntos;
    puntaje=game.add.text(70,10, usuario['puntos']+' PUNTOS', { font: "35px CondensedRegular", fill: "#ffc418", align: "center"});
    puntaje.x= tableroPuntos.width/2-puntaje.width/2;
    tableroPuntos.addChild(puntaje);
    brilloTablero=game.add.sprite(130,50, 'brilloup');
    brilloTablero.scale.setTo(.3,.3);
    brilloTablero.alpha=.5;
    tableroPuntos.addChild(brilloTablero);




    tiempo = game.add.text(0, 540, '5:00', { font: "30px BitterBold", fill: "white", align: "center", stroke:'yellow' });
    tiempo.stroke='#ffc400';
    tiempo.strokeThickness = 5;
    tiempo.position.x= this.game.width/2 - tiempo.width/2;
    tiempo.visible=false;

    leftPlayer=game.add.sprite(-50,180, 'player');
    leftPlayer.scale.setTo(.8);
    leftPlayer.alpha=0;



    rightPlayer=game.add.sprite(this.game.width+50, 180, 'player');
    rightPlayer.scale.setTo(.8);
    rightPlayer.alpha=0;

    var textTitle = game.add.text(0, 250, "VS",{ font: '60px CondensedRegular', fill: 'white', align: 'center'});
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

    tweenD.onComplete.add(
      function(){

        goldenB=game.add.sprite(leftPlayer.x-10,leftPlayer.y-5, 'selector');
        goldenB.scale.setTo(.8,.8);


        goldenA=game.add.sprite(rightPlayer.x-10,rightPlayer.y-5, 'selector');
        goldenA.scale.setTo(.8,.8);


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

      graphics.addChild(game.add.text(40, 20, "Esperando confirmación",{ font: '20px CondensedLight', fill: 'white', align: 'center'}));



    cancelar=self.createButton('CANCELAR', function () {

        game.state.start('Selectsala');

      });

     cancelar.position={x:175,y:530};







     comenzar=self.createButton('COMENZAR', function (){

		Emit("ready","");
        // timer.stop();
        //goldenA.addChild(game.add.sprite(goldenA.width, goldenA.height-50, 'accepted'));
		goldenB.addChild(  game.add.sprite(goldenB.width, goldenB.height-50, 'accepted'));
        /*
        comenzar.visible=false;
        graphics.visible=false;
        textTitle.visible=false;
        self.sortearMoneda();*/

      });
      comenzar.position={x:175,y:530};
      comenzar.visible=false;

      //borrarBoton

      pruebaFuncional=game.add.sprite(50, 50, 'accepted');
      pruebaFuncional.inputEnabled=true;
      pruebaFuncional.events.onInputDown.add(function(){
        // timer.stop();
        comenzar.visible=true;
        cancelar.visible=false;

      });
      pruebaFuncional.input.useHandCursor = true;

    //BorrarBoton
	SuscribeServerEvent("oponente","empezarConteo",this,true);
	SuscribeServerEvent("oponenteListo","oponenteListo",this,true);
	
},

empezarConteo: function(msg){
	oponente= msg;
	console.log("empezar Conteooooooo");
  timer = game.time.create();
  timerEvent = timer.add(Phaser.Timer.MINUTE * 0+ Phaser.Timer.SECOND * 40, this.endTimer, this);
  act=true;
  timer.start();
  tiempo.visible=true;
  comenzar.visible=true;
  cancelar.visible=false;
},

oponenteListo:function(msg){
	goldenA.addChild(game.add.sprite(goldenA.width, goldenA.height-50, 'accepted'));
},

render: function () {

  if(act){
    if (timer.running) {
		tiempo.setText(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)));
  } else {

      tiempo.kill();
      tweenE.pause();
      load.kill();

    }
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
  modal=self.notificationDinamic("UPS !","El tiempo de espera se ha agotado !", false);

  modal.onComplete.addOnce(function(){
		
      setTimeout(function(){game.state.start('Selectsala');},1500);
  });


},

sortearMoneda:function(){

  monedaRight=game.add.sprite(this.game.width/2, this.game.height/2-171/2, 'moneda-right');
  monedaRight.pivot.x=171/2;

  self.rotarMoneda(monedaRight);


},

rotarMoneda(target){

  t1=target;

  if(1){ //chekeo de lo que el servidor eligio
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
    console.log(velocidadMoneda);
    monedaTween.start();

    monedaTween.onComplete.addOnce(function(){
      if(velocidadMoneda>800){
        monedaTween.pause();
        self.identificarPuestos(target.scale.x);

      }else{
        self.rotarMoneda(t1);
      }

     });

},


identificarPuestos: function(scale){

   if(scale==1){
     game.add.sprite(this.game.width/2-90, 420, 'ataja').scale.setTo(.75,.75);
     game.add.sprite(this.game.width/2+50, 420, 'patea').scale.setTo(.75,.75);
   }else{
     game.add.sprite(this.game.width/2-90, 420, 'patea').scale.setTo(.75,.75);
     game.add.sprite(this.game.width/2+50, 420, 'ataja').scale.setTo(.75,.75);
   }

     setTimeout(function(){
        Emit("buscarPartida",JSON.stringify(solicitud));
        game.state.start('Game')
      },1000);
},

};

Phaser.Utils.mixinPrototype(Versus.prototype, mixins);
