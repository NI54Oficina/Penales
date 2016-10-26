var Selectplayer_2 = function(game) {};

Selectplayer_2.prototype = {

preload: function () {
    this.optionCount = 1;
},

create: function(){
      self = this;

      txtstyle= { font: '25pt CondensedRegular', fill: 'white'};

      this.playerSelected;

      self.createBackground(true);
      self.createHeader(this.GoBack,false);
      self.createSoundGraphics();
      self.createGeneralTitle("SELECCIONAR RIVAL", true);

      //titulo

      //modificacion de texto si selecciona el jugador o no;

      if( this.playerSelected!= undefined){

        leftPlayer=game.add.sprite(-50,150, 'player');
        leftPlayer.scale.setTo(.9);
        leftPlayer.alpha=0;

        var aleatorio = game.add.text(90,170, "ALEATORIO", txtstyle);
        leftPlayer.addChild(aleatorio);

        rightPlayer=game.add.sprite(this.game.width+50, 142,this.playerSelected.player.key);
        rightPlayer.scale.setTo(.9);
        rightPlayer.alpha=0;

        rightPlayer.inputEnabled=true;
        rightPlayer.events.onInputDown.add(this.SelectPlayer, leftPlayer);

        var borderSelected=game.add.sprite(0,0, 'selected');
        rightPlayer.addChild(borderSelected);

      }else{
        leftPlayer=game.add.sprite(-50,150, 'player');
        leftPlayer.scale.setTo(.9);
        leftPlayer.alpha=0;

        rightPlayer=game.add.sprite(this.game.width+50, 150, 'player');
        rightPlayer.scale.setTo(.9);
        rightPlayer.alpha=0;

        rightPlayer.inputEnabled=true;
        rightPlayer.events.onInputDown.add(this.SelectPlayer, leftPlayer);

        var aleatorio = game.add.text(90,170, "ALEATORIO", txtstyle);
        leftPlayer.addChild(aleatorio);
        var notaleatorio = game.add.text(90,170, "A ELECCIÓN", txtstyle);
        rightPlayer.addChild(notaleatorio);
      }

      // fin modificacion de texto si selecciona el jugador o no;



      var tweenA= game.add.tween(rightPlayer).to({x:this.game.width/2 + 30}, 200, 'Linear');
      var tweenB= game.add.tween(leftPlayer).to({x:this.game.width/2 - leftPlayer.width-30}, 200, 'Linear');
      var tweenC =game.add.tween(leftPlayer).to( {alpha:1}, 200, 'Linear');
      var tweenD =game.add.tween(rightPlayer).to( {alpha:1}, 200, 'Linear');

      tweenA.start();
      tweenB.start();
      tweenC.start();
      tweenD.start();


      this.addMenuOptionInner('COMENZAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


},

GoBack: function(target){
    game.state.start("GameMenu");
},

SelectPlayer: function(target){
    game.state.start("Selectplayer_3");
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

Phaser.Utils.mixinPrototype(Selectplayer_2.prototype, mixins);
