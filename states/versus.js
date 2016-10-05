var Versus = function(game) {};

Versus.prototype = {



  init: function () {

  },

  create: function () {
    self = this;

    //fondo

    var 	gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
    var  grd=gameBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"black");
    grd.addColorStop(0.15,"#11224d");
    grd.addColorStop(0.4,"#0d4e88");
    grd.addColorStop(.5,"#0d4e88");
    grd.addColorStop(1,"#009ee1");
    gameBack.context.fillStyle=grd;
    gameBack.context.fillRect(0,0,this.game.width,this.game.height);
    this.game.add.sprite(0,0,gameBack);

    game.stage.disableVisibilityChange = true;
    curva=game.add.sprite(0,0, 'curva');
    curva.position={x:this.game.width/2-curva.width/2, y:this.game.height/2};
    dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
    dots.alpha=0.3;
    dots.fixedToCamera=true;

    //fin fondo

    volver= game.add.sprite(40, 30, 'volver');
    volver.inputEnabled = true;
    volver.events.onInputDown.add(this.GoBack,volver);

    //pantalla de seleccion
    leftPlayer=game.add.sprite(-50,130, 'player');
    leftPlayer.scale.setTo(.8);
    leftPlayer.alpha=0;

    rightPlayer=game.add.sprite(this.game.width+50, 130, 'player');
    rightPlayer.scale.setTo(.8);
    rightPlayer.alpha=0;

    var textTitle = game.add.text(0, 250, "VS",{ font: '60px BitterBold', fill: 'white', align: 'center'});
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

    var usuarios= self.generateDemoUsers(self);

    console.log(usuarios);

    datos=game.add.group();
    datos.width=700;
    datos.height=200;
    puntajeStyle = { font: '15pt CondensedLight', fill: 'yellow'};
    var nombreDatos1 = game.add.text(300, 0, "RACHA ACTUAL",puntajeStyle);
    var numberDatos1 = game.add.text(30, 0,usuarios[1].racha,puntajeStyle);
    var datos1 = game.add.text(650, 0,usuarios[2].racha,puntajeStyle);
    var line1=self.createLine(0,30,700);

    var nombreDatos2 = game.add.text(290, 50, "PARTIDOS GANADOS",puntajeStyle);
    var numberDatos2 = game.add.text(30, 50, usuarios[1].ganados,puntajeStyle);
    var datos2 = game.add.text(650, 50,usuarios[2].ganados,puntajeStyle);
    var line2=self.createLine(0,80,700);


    var nombreDatos3 = game.add.text(290, 100, "PARTIDOS PERDIDOS",puntajeStyle);
    var numberDatos3 = game.add.text(30, 100, usuarios[1].perdidos,puntajeStyle);
    var datos3 = game.add.text(650, 100,usuarios[2].perdidos,puntajeStyle);
    var line3=self.createLine(0,130,700);

    datos.add(nombreDatos1);
    datos.add(nombreDatos2);
    datos.add(nombreDatos3);

    datos.add(numberDatos1);
    datos.add(numberDatos2);
    datos.add(numberDatos3);

    datos.add(datos1);
    datos.add(datos2);
    datos.add(datos3);

    datos.add(line1);
    datos.add(line2);
    datos.add(line3);


    datos.position={x: this.game.width/2 - datos.width/2, y: 450 };


  },

  createLine: function(a, b,c){

    var graphics = game.add.graphics(0, 00);
    graphics.beginFill(0x797979);
    graphics.lineStyle(2, 0x797979, 1);
    graphics.moveTo(a,b);
    graphics.lineTo(c, b);
    graphics.endFill();

    return graphics;

  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },

};

Phaser.Utils.mixinPrototype(Versus.prototype, mixins);
