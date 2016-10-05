var Singleplayer = function(game) {};

Singleplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },


    create: function(){
        self = this;
		game.kineticScrolling=game.plugins.add(Phaser.Plugin.KineticScrolling);

		game.kineticScrolling.configure({
			kineticMovement: true,
			timeConstantScroll: 325, //really mimic iOS
			horizontalScroll: false,
			verticalScroll: true,
			horizontalWheel: false,
			verticalWheel: true,
			deltaWheel: 40
		});

		 game.kineticScrolling.start();

     self.createBackground(false);

      y=20;
      n=0;
      positionY=0;

  		var oponentes= game.add.group();
      positionY=200;
      positionX=200;


      puntajeStyle = { font: '18pt CondensedRegular', fill: 'white'};
      nombreStyle = { font: '20pt CondensedBold', fill: 'white'};

      usuarios= self.generateDemoUsers(self);

      console.log(usuarios);
  		for(var a=0;a<usuarios.length;a++){
  			oponentes.add( self.createDataForPlayer(self, usuarios[a]));
  		}

     self.createHeader(this.GoBack,true);
     self.createSoundGraphics();
     var textTitle=self.createGeneralTitle("SELECCIONAR RIVAL", true);

    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
    search.visible=false;


		game.world.setBounds(0, 0, this.game.width,oponentes.height+100+leftCorner.height);


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

    GoBack: function(target){
      game.state.start("Multiplayer");
    },

    Menu: function(target){
      game.state.start("GameMenu");
    },

    createDataForPlayer: function(target, user){

	   var cuadradoUser= this.game.add.group();

     cuadradoUser.position={x:positionX,y:positionY};

    //creacion background

     var statsBack= this.game.add.bitmapData(700,200);
     var  grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
     grd.addColorStop(0,"black");
     statsBack.context.fillStyle=grd;
     statsBack.context.fillRect(0,0,this.game.width,this.game.height);
     statsBackground=this.game.add.sprite(0,0,statsBack);
     statsBackground.alpha=.3;

     //termina creacion de background

     //creacion 2

    var difBack= this.game.add.bitmapData(470,35);
    var  grdd=statsBack.context.createLinearGradient(0,0,0,this.game.height );
    grdd.addColorStop(0,'#00396e');
    difBack.context.fillStyle=grdd;
    difBack.context.fillRect(0,0,this.game.width,this.game.height);

    cuadradoUser.add(statsBackground);

    difBackground=this.game.add.sprite(cuadradoUser.width/3.2,115,difBack);
    difBackground.alpha=.7;


     //creacion 2

     cuadradoUser.add(difBackground);

     var player=this.game.add.sprite(20,5,user.avatar);

     console.log(player);
     player.scale.setTo(.5,.5);
    // player.position={x:statsBackground.position.x+20,y:statsBackground.position.y+statsBackground.height/2-player.height/2};
	   cuadradoUser.add(player);
     var txt1 = game.add.text(cuadradoUser.width/3,20,user.nombre, nombreStyle);
     var line=self.createLine(-15,txt1.height,455 );
     txt1.addChild(line);
     var txt2 = game.add.text(cuadradoUser.width/3,80,'RACHA ACTUAL DE PARTIDOS', puntajeStyle);
     var txt2a= game.add.text(cuadradoUser.width-60,80,user.racha, puntajeStyle);
     var txt3 = game.add.text(cuadradoUser.width/3,120,'TOTAL PARTIDOS GANADOS', puntajeStyle);
     var txt3a = game.add.text(cuadradoUser.width-60,120,' '+user.ganados, puntajeStyle);
     var txt4 = game.add.text(cuadradoUser.width/3,160,'TOTAL PARTIDOS PERDIDOS', puntajeStyle);
     var txt4a = game.add.text(cuadradoUser.width-60,160,user.perdidos, puntajeStyle);

    	cuadradoUser.add(txt1);
    	cuadradoUser.add(txt2);
    	cuadradoUser.add(txt4);
    	cuadradoUser.add(txt3);
      cuadradoUser.add(txt2a);
      cuadradoUser.add(txt4a);
      cuadradoUser.add(txt3a);


     positionY+=215;

     cuadradoUser.forEach(function(item) {
     item.inputEnabled = true;

     item.events.onInputDown.add(self.sendPlayer, item);
   });

	 return cuadradoUser;
 },

 createLine: function(a, b,c){

   var graphics = game.add.graphics(0, 00);
   graphics.beginFill(0x00396e);
   graphics.lineStyle(2, 0x00396e, 1);
   graphics.moveTo(a,b);
   graphics.lineTo(c, b);
   graphics.endFill();

   return graphics;

 },


 sendPlayer: function(grupo){

   var object={
     player: grupo.parent.children[2]
   };

   this.game.state.states["Multiplayer"].playerSelected= object;

   this.game.state.start("Multiplayer");

 }



  }

  Phaser.Utils.mixinPrototype(Singleplayer.prototype, mixins);
