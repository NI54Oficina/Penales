var Multiplayer = function(game) {};

Multiplayer.prototype = {

preload: function () {
    this.optionCount = 1;
},

create: function(){
      self = this;

      txtstyle= { font: '25pt CondensedRegular', fill: 'white'};

      this.playerSelected;


      console.log(this.playerSelected);

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

      //fondo

      //esquinas
      leftCorner=game.add.sprite(0, 0, 'left-corner');
      leftCorner.scale.setTo(.75,0.75);
      a= game.add.sprite(this.game.width, 0, 'right-corner');
      a.scale.setTo(-.75,0.75);

      self.createSoundGraphics();


      volver= game.add.sprite(40, 30, 'volver');
      volver.inputEnabled = true;
      volver.events.onInputDown.add(this.GoBack,volver);

      //esquina

      //titulo

      self.createGeneralTitle("SELECCIONAR RIVAL", true);
      // var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
      // var line = this.game.make.sprite(-160,45, 'line');
      //
      // var textTitle = game.add.text(game.world.centerX-200, 50, "SELECCIONAR RIVAL", titleStyle);
      // textTitle.addChild(line);
      //titulo

      //pantalla de seleccion
      leftPlayer=game.add.sprite(-50,150, 'player');
      leftPlayer.scale.setTo(.9);
      leftPlayer.alpha=0;

      rightPlayer=game.add.sprite(this.game.width+50, 150, 'player');
      rightPlayer.scale.setTo(.9);
      rightPlayer.alpha=0;

      rightPlayer.inputEnabled=true;
      rightPlayer.events.onInputDown.add(this.SelectPlayer, leftPlayer);

      var tweenA= game.add.tween(rightPlayer).to({x:this.game.width/2 + 30}, 200, 'Linear');
      var tweenB= game.add.tween(leftPlayer).to({x:this.game.width/2 - leftPlayer.width-30}, 200, 'Linear');
      var tweenC =game.add.tween(leftPlayer).to( {alpha:1}, 200, 'Linear');
      var tweenD =game.add.tween(rightPlayer).to( {alpha:1}, 200, 'Linear');

      tweenA.start();
      tweenB.start();
      tweenC.start();
      tweenD.start();

      //modificacion de texto si selecciona el jugador o no;

      if( this.playerSelected!= undefined){
        var aleatorio = game.add.text(90,170, "ALEATORIO", txtstyle);
        leftPlayer.addChild(aleatorio);

        var imgPlayer=game.add.sprite(-5,0, this.playerSelected.player.key);
        imgPlayer.scale.setTo(.95,.95);
        rightPlayer.addChild(imgPlayer);


      }else{
        var aleatorio = game.add.text(90,170, "ALEATORIO", txtstyle);
        leftPlayer.addChild(aleatorio);
        var notaleatorio = game.add.text(90,170, "A ELECCIÓN", txtstyle);
        rightPlayer.addChild(notaleatorio);
      }

      //modificacion de texto si selecciona el jugador o no;

      //pantalla de seleccion

      this.addMenuOptionInner('COMENZAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


},

GoBack: function(target){
    game.state.start("GameMenu");
},

SelectPlayer: function(target){
    game.state.start("Singleplayer");
},

Menu: function(target){
    game.state.start("GameMenu");
},

listenerSearch: function (msg){

  	search.visible=false;
    console.log(msg);
  	auxArray=JSON.parse(msg);

  	console.log("Oponente Encontrado");

  	this.game.state.states["Game"].partida=auxArray;
  	this.game.state.states['Game'].perfil = auxArray.oponente;
  	this.game.state.states['Game'].tiempoMaximo = auxArray.tiempomaximo;
  	this.game.state.states['Game'].triesA= auxArray.IntentosOponente;
  	this.game.state.states['Game'].triesP= auxArray.Intentoslocal;
  	this.game.state.states['Game'].modo=auxArray.rol;

  	game.state.start("Game");

},

}

Phaser.Utils.mixinPrototype(Multiplayer.prototype, mixins);
