var Versus = function(game) {};

Versus.prototype = {

  create: function () {

    self = this;

    //fondo

    this.createBackground(true);
    this.createSoundGraphics();

    timer = game.time.create();
    timerEvent = timer.add(Phaser.Timer.MINUTE * 0+ Phaser.Timer.SECOND * 5, this.endTimer, this);
    timer.start();


    tiempo = game.add.text(0, 350, '5:00', { font: "30px BitterBold", fill: "white", align: "center", stroke:'yellow' });
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

        rightPlayer.addChild(game.add.sprite(rightPlayer.width-10, rightPlayer.height-60, 'accepted'));
        leftPlayer.addChild(game.add.sprite(leftPlayer.width-10, leftPlayer.height-60, 'accepted'));
        comenzar.visible=false;
        graphics.visible=false;

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

     //

},

render: function () {
    // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
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

};

Phaser.Utils.mixinPrototype(Versus.prototype, mixins);
