var Multiplayer = function(game) {};

Multiplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {

          var optionStyle = { font: '40pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};

        // aplicando el background de cada texto

          var Boton =game.add.group();
          Boton.position={x:100,y:this.optionCount*530}

          var 	myBitmap = this.game.add.bitmapData(540, 80);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,40);
          grd.addColorStop(0,"#fbe43e");
          grd.addColorStop(0.9,"#fbe43e");
          grd.addColorStop(1,"#cea428");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
          var background = this.game.add.sprite(0,0, myBitmap);
          down= this.game.make.sprite(-20,55, 'brillodown');
          up= this.game.make.sprite(200,-15, 'brilloup');
          down.scale.setTo(0.5,0.5);
          up.scale.setTo(0.5,0.5);
          background.addChild(down);
          background.addChild(up);

          // var testMask=game.add.graphics(0, 0);
          // testMask.beginFill(0xFFFF0B, 0.5);
          // testMask.drawRoundedRect(0, 0,background.width, background.height,10);
          // testMask.endFill();
          // Boton.add(testMask);
          // Boton.mask=testMask;
          Boton.add(background);

        // aplicando el background de cada texto

        var txt = game.add.text(0, 10 , text, optionStyle);


        Boton.add(txt);

        //txt.position.y= background.position.y+ background.height/2 - txt.height/2;


        txt.position.x=Boton.width/2 - txt.width/2;
        Boton.position.x=this.game.width/2 - Boton.width/2;

        var onOver = function (target) {
          target.fill = "black";
          target.stroke = "rgba(200,200,200,0.5)";
          txt.useHandCursor = true;
        };

        var onOut = function (target) {
          target.fill = "#1b1464";
          target.stroke = "#1b1464";
          txt.useHandCursor = false;
        };


        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);


        Boton.forEach(function(item) {
          item.inputEnabled = true;
        item.events.onInputUp.add(callback);

    }, this);

        this.optionCount ++;
        return Boton;


  },

  create: function(){
      self = this;

      //fondo
      var 	gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
      var  grd=gameBack.context.createLinearGradient(0,0,0,this.game.height);
      grd.addColorStop(0,"black");
      grd.addColorStop(0.15,"#1a1750");
      grd.addColorStop(0.3,"#1a1750");
      grd.addColorStop(1,"#009ee1");
      gameBack.context.fillStyle=grd;
      gameBack.context.fillRect(0,0,this.game.width,this.game.height);
      this.game.add.sprite(0,0,gameBack);

      game.stage.disableVisibilityChange = true;
      curva=game.add.sprite(0,0, 'curva');
      curva.position={x:this.game.width/2-curva.width/2, y:this.game.height/2};
      dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
      dots.alpha=0.3;
      //fondo




      //esquinas
      game.add.sprite(0, 0, 'left-corner');
      a= game.add.sprite(this.game.width, 0, 'right-corner');
      a.scale.x = -1;


      volver= game.add.sprite(50, 50, 'volver');
      volver.inputEnabled = true;
      volver.events.onInputDown.add(this.GoBack,volver);

      menu= game.add.sprite(this.game.width-100, 50, 'menu');
      menu.inputEnabled = true;
      menu.events.onInputDown.add(this.Menu,menu);

      //esquina

      //titulo
      var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
      var line = this.game.make.sprite(-160,45, 'line');

      var textTitle = game.add.text(game.world.centerX-200, 50, "SELECCIONAR RIVAL", titleStyle);
      textTitle.addChild(line);
      //titulo

      //pantalla de seleccion
      leftPlayer=game.add.sprite(-50,150, 'player');
      leftPlayer.scale.setTo(.9);
      leftPlayer.alpha=0;
      rightPlayer=game.add.sprite(this.game.width+50, 150, 'player');
      rightPlayer.scale.setTo(.9);
      rightPlayer.alpha=0;

      // leftPlayer.position.x= this.game.width/2 - leftPlayer.width-30;
      // rightPlayer.position.x=this.game.width/2 + 30;
      rightPlayer.inputEnabled=true;

      rightPlayer.events.onInputDown.add(this.SelectyPlayer, leftPlayer);

      var tweenA= game.add.tween(rightPlayer).to({x:this.game.width/2 + 30}, 200, 'Linear');
      var tweenB= game.add.tween(leftPlayer).to({x:this.game.width/2 - leftPlayer.width-30}, 200, 'Linear');
      var tweenC =game.add.tween(leftPlayer).to( {alpha:1}, 200, 'Linear');
      var tweenD =game.add.tween(rightPlayer).to( {alpha:1}, 200, 'Linear');

      tweenA.start();
      tweenB.start();
      tweenC.start();
      tweenD.start();


      //pantalla de seleccion

      this.addMenuOption('COMENZAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },

  SelectyPlayer: function(target){
    game.state.start("Singleplayer");
  },

  Menu: function(target){
    game.state.start("GameMenu");
  },
  test:function(){
	  console.log("test entra");
  },

  listenerSearch: function (msg){

	search.visible=false;
	this.test();
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
