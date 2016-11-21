var Versus = function(game) {};

Versus.prototype = {

  create: function () {

    self = this;

    //fondo

    this.createBackground(true);
    this.createSoundGraphics();

    var tableroPuntos = game.add.graphics(this.game.width/2-165, 0);
    tableroPuntos.beginFill(0x000065,1);
    tableroPuntos.drawRoundedRect(0, 0,330,65,5);
    window.graphics = tableroPuntos;
    puntaje=game.add.text(70,10, '300 PUNTOS', { font: "35px CondensedRegular", fill: "#ffc418", align: "center"});
    puntaje.x= tableroPuntos.width/2-puntaje.width/2;
    tableroPuntos.addChild(puntaje);

    timer = game.time.create();
    timerEvent = timer.add(Phaser.Timer.MINUTE * 0+ Phaser.Timer.SECOND * 5, this.endTimer, this);
    timer.start();


    tiempo = game.add.text(0, 540, '5:00', { font: "30px BitterBold", fill: "white", align: "center", stroke:'yellow' });
    tiempo.stroke='#ffc400';
    tiempo.strokeThickness = 5;
    tiempo.position.x= this.game.width/2 - tiempo.width/2;

    //pantalla de seleccion
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



    cancelar=this.addMenuOptionInnerPrueba('CANCELAR', function () {

       game.state.start('Selectsala');

     },270,70, 1);

     cancelar.x=175;

     comenzar=this.addMenuOptionInnerPrueba('COMENZAR', function (){

        rightPlayer.addChild(game.add.sprite(rightPlayer.width-10, rightPlayer.height-65, 'accepted'));
        leftPlayer.addChild(game.add.sprite(leftPlayer.width-10, leftPlayer.height-65, 'accepted'));
        comenzar.visible=false;
        graphics.visible=false;
        console.log("sortearMone");
        self.sortearMoneda();

      },270,70, 1);
      comenzar.x=175;
      comenzar.visible=false;

      pruebaFuncional=game.add.sprite(50, 50, 'accepted');
      pruebaFuncional.inputEnabled=true;
      pruebaFuncional.events.onInputDown.add(function(){
        timer.stop();
        comenzar.visible=true;
        cancelar.visible=false;

      });
      pruebaFuncional.input.useHandCursor = true;



},

render: function () {
    if (timer.running) {
        tiempo.setText(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)));
  } else {

      tiempo.kill();
      tweenE.pause();
      load.kill();

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

  monedaRight=game.add.sprite(this.game.width/2-171/2, 300, 'moneda-right');
  monedaRight.pivot.x=171/2;
  monedaRight.y=171/2;
  monedaRight.alpha=1;
  monedaRight.render=0;
  monedaLeft=game.add.sprite(this.game.width/2-171/2, 300, 'moneda-left');
  monedaLeft.scale.setTo(-1,1);
  monedaLeft.pivot.x=171/2;
  monedaLeft.y=171/2;
  monedaLeft.alpha=0;
  monedaLeft.render=0;

  // self.rotarMonedaIzquierda(monedaLeft, monedaRight);
  // self.rotarMonedaDerecha(monedaRight, monedaLeft);

  self.rotarMonedaDerecha(monedaRight);

  console.log("girar");
},

rotarMonedaDerecha(target1, target2){

  // if(target1.reder==1){
  t1=target1;
  t2=target1;
    if(t1.render==0){
    t1.render=1;
    t2.render=0;
  }else{
    t1.render=0;
    t2.render=1;
  }


    // monedaRightTween.start();
    if(t1.render==1){
      // monedaRightTween2=game.add.tween(t1).to( {alpha:1}, 1000, 'Linear');
      monedaRightTween=game.add.tween(t1.scale).to( {x:0}, 1000, 'Linear');
    }else{
      // monedaRightTween2=game.add.tween(t1).to( {alpha:0}, 200, 'Linear');
      monedaRightTween=game.add.tween(t1.scale).to( {x:0}, 1000, 'Linear');
    }

    monedaRightTween.start();
    // monedaRightTween2.start();
    monedaRightTween.onComplete.addOnce(function(){
    self.rotarMonedaIzquierda(t2, t1);
     });
  // }

  console.log('1');

},

rotarMonedaIzquierda(target1, target2){

  t1=target1;
  t2=target2;
  if(t1.render==0){
  t1.render=1;
  t2.render=0;
}else{
  t1.render=0;
  t2.render=1;
}


    if(t1.render==1){
      // monedaLeftTween2=game.add.tween(t1).to( {alpha:1}, 200, 'Linear');
      monedaLeftTween=game.add.tween(t1.scale).to( {x:1}, 1000, 'Linear');
    }else{
      // monedaLeftTween2=game.add.tween(t1).to( {alpha:0}, 1000, 'Linear');
      monedaLeftTween=game.add.tween(t1.scale).to( {x:-1}, 1000, 'Linear');
    }

    monedaLeftTween.start();
    // monedaLeftTween2.start();
    // t2.alpha=0;

    monedaLeftTween.onComplete.addOnce(function(){
    self.rotarMonedaDerecha(t2, t1);
     });
     console.log('2');
},

rotarMonedaUnica: function(target){
  t=target;

  if(target.render==0){
    target.render=1;
    monedaTween=game.add.tween(t1.scale).to( {x:0}, 1000, 'Linear');
    console.log("en 0");

  }else if(target.render==1){
    target.render=2;
    monedaTween=game.add.tween(t1.scale).to( {x:-1}, 1000, 'Linear');
    console.log("en -1");
  }else{
    target.render=0;
    monedaTween=game.add.tween(t1.scale).to( {x:1}, 1000, 'Linear');
    console.log("en 1");
  }

  monedaTween.start()

  monedaTween.onComplete(function(){
    self.rotarMonedaUnica(t);
  });

}

};

Phaser.Utils.mixinPrototype(Versus.prototype, mixins);
