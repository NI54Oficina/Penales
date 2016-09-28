var Singleplayer = function(game) {};

Singleplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {

          var optionStyle = { font: '40pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};

        // aplicando el background de cada texto

          var 	myBitmap = this.game.add.bitmapData(540, 80);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,40);
          grd.addColorStop(0,"#fbe43e");
          grd.addColorStop(0.9,"#fbe43e");
          grd.addColorStop(1,"#cea428");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
          var background = this.game.add.sprite(100,this.optionCount*530-10, myBitmap);

        // aplicando el background de cada texto

        var txt = game.add.text(100, 0 , text, optionStyle);
        txt.position.y= background.position.y+ background.height/2 - txt.height/2;

        down= this.game.make.sprite(-20,55, 'brillodown');
        up= this.game.make.sprite(200,-15, 'brilloup');
        down.scale.setTo(0.5,0.5);
        up.scale.setTo(0.5,0.5);
        background.addChild(down);
        background.addChild(up);



        txt.position.x=this.game.width/2 - txt.width/2;
        background.position.x=this.game.width/2 - background.width/2;

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

        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount ++;



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
        //fondo
        var 	gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
        var  grd=gameBack.context.createLinearGradient(0,0,0,this.game.height);
        grd.addColorStop(0,"black");
        grd.addColorStop(0.15,"#1a1750");
        grd.addColorStop(0.3,"#1a1750");
        grd.addColorStop(1,"#009ee1");
        gameBack.context.fillStyle=grd;
        gameBack.context.fillRect(0,0,this.game.width,this.game.height);
        this.game.add.sprite(0,0,gameBack).fixedToCamera=true;;

        game.stage.disableVisibilityChange = true;
        curva=game.add.sprite(0,0, 'curva');
        curva.position={x:this.game.width/2-curva.width/2, y:this.game.height/2};
		curva.fixedToCamera=true;
        dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
        dots.alpha=0.3;
        //fondo
        //esquinas
        var leftCorner= game.add.sprite(0, 0, 'left-corner');
		leftCorner.fixedToCamera=true;
        a= game.add.sprite(this.game.width, 0, 'right-corner');
        a.scale.x = -1;
		a.fixedToCamera=true;


        volver= game.add.sprite(50, 50, 'volver');
        volver.inputEnabled = true;
        volver.events.onInputDown.add(this.GoBack,volver);
		volver.fixedToCamera=true;

        menu= game.add.sprite(this.game.width-100, 50, 'menu');
        menu.inputEnabled = true;
        menu.events.onInputDown.add(this.Menu,menu);
		menu.fixedToCamera=true;

        //esquina

        //fondo de participantes

        y=20;
        n=0;
        positionY=0;

		var oponentes= game.add.group();
    positionY=200;
    positionX=200;



        puntajeStyle = { font: '18pt CondensedRegular', fill: 'white'};
        nombreStyle = { font: '20pt CondensedBold', fill: 'white'};
        usuario={
          nombre:'FRANCISCO SERANTE',
          racha:  51,
          ganados:5,
          perdidos: 10

        };


    		for(var a=0;a<4;a++){
    			oponentes.add( self.createDataForPlayer(self, usuario));
    		}

        //fondo de participantes

        //titulo

        var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
        var line = this.game.make.sprite(-160,45, 'line');

        var textTitle = game.add.text(game.world.centerX-200, 50, "SELECCIONAR RIVAL", titleStyle);
        textTitle.addChild(line);

        //titulo



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

     var statsBack= this.game.add.bitmapData(700,300);
     var  grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
     grd.addColorStop(0,"black");
     statsBack.context.fillStyle=grd;
     statsBack.context.fillRect(0,0,this.game.width,this.game.height);
     statsBackground=this.game.add.sprite(0,0,statsBack);
     statsBackground.alpha=.3;

     //termina creacino de background

     //creacion 2

    var difBack= this.game.add.bitmapData(420,30);
    var  grdd=statsBack.context.createLinearGradient(0,0,0,this.game.height );
    grdd.addColorStop(0,'#1B1464');
    difBack.context.fillStyle=grdd;
    difBack.context.fillRect(0,0,this.game.width,this.game.height);

    cuadradoUser.add(statsBackground);

    difBackground=this.game.add.sprite(cuadradoUser.width/2.6,120,difBack);
    difBackground.alpha=.8;


     //creacion 2


     cuadradoUser.add(difBackground);

     var player=this.game.add.sprite(20,25,'img-1');
     player.scale.setTo(.7,.7);
    // player.position={x:statsBackground.position.x+20,y:statsBackground.position.y+statsBackground.height/2-player.height/2};
	   cuadradoUser.add(player);
     var txt1 = game.add.text(cuadradoUser.width/2.5,20,user.nombre, nombreStyle);
     var line=self.createLine(0,txt1.height,400 );
     txt1.addChild(line);
     var txt2 = game.add.text(cuadradoUser.width/2.5,80,'RACHA ACTUAL DE PARTIDOS', puntajeStyle);
     var txt2a= game.add.text(cuadradoUser.width-40,80,user.racha, puntajeStyle);
     var txt3 = game.add.text(cuadradoUser.width/2.5,120,'TOTAL PARTIDOS GANADOS', puntajeStyle);
     var txt3a = game.add.text(cuadradoUser.width-40,120,+user.ganados, puntajeStyle);
     var txt4 = game.add.text(cuadradoUser.width/2.5,160,'TOTAL PARTIDOS PERDIDOS', puntajeStyle);
    var txt4a = game.add.text(cuadradoUser.width-40,160,user.perdidos, puntajeStyle);

    	cuadradoUser.add(txt1);
    	cuadradoUser.add(txt2);
    	cuadradoUser.add(txt4);
    	cuadradoUser.add(txt3);
      cuadradoUser.add(txt2a);
      cuadradoUser.add(txt4a);
      cuadradoUser.add(txt3a);


     positionY+=350;


	 return cuadradoUser;
 },

 createLine: function(a, b,c){

   var graphics = game.add.graphics(0, 00);
     graphics.beginFill(0x1B1464);
     graphics.lineStyle(2, 0x1B1464, 1);
     graphics.moveTo(a,b);
     graphics.lineTo(c, b);
     graphics.endFill();

   return graphics;

 }



  }
