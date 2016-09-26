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

        //fondo de participantes

        y=200;
        puntajeStyle = { font: '15pt CondensedLight', fill: 'white'};
        usuario={
          nombre:'pepe',
          racha: ['racha actual', 51],
          ganados:['Total ganados',5],
          perdidos: ['Total Perdidos',10]
        }
        self.createDataForPlayer(self, usuario);
        self.createDataForPlayer(self, usuario);
        self.createDataForPlayer(self, usuario);


        //fondo de participantes



        //titulo
        var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
        var line = this.game.make.sprite(-160,45, 'line');

        var textTitle = game.add.text(game.world.centerX-200, 50, "SELECCIONAR RIVAL", titleStyle);
        textTitle.addChild(line);
        //titulo



        search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
        search.visible=false;


        //
        // this.addMenuOption('COMENZAR', function () {
        //   search.visible=true;
        //   Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);
        //
        // });


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

     var statsBack= this.game.add.bitmapData(700,300);
     var  grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
     grd.addColorStop(0,"black");
     statsBack.context.fillStyle=grd;
     statsBack.context.fillRect(0,0,this.game.width,this.game.height);
     statsBackground=this.game.add.sprite(y,y,statsBack);
     statsBackground.alpha=.3;
     statsBackground.position={x: this.game.width/2- statsBackground.width/2,y:y};
     var player=this.game.add.sprite(0,0,'img-1');
     player.scale.setTo(.7,.7);
     player.position={x:statsBackground.position.x+20,y:statsBackground.position.y+statsBackground.height/2-player.height/2}

     var txt1 = game.add.text(statsBackground.position.x+statsBackground.width/2,y+20,user.nombre, puntajeStyle);
     var txt2 = game.add.text(statsBackground.position.x+statsBackground.width/2,y+50,'RACHA ACTUAL DE PARTIDOS:        ' +user.racha, puntajeStyle);
     var txt4 = game.add.text(statsBackground.position.x+statsBackground.width/2,y+80,'TOTAL PARTIDOS GANADOS:        ' +user.ganados, puntajeStyle);
     var txt5 = game.add.text(statsBackground.position.x+statsBackground.width/2,y+110,'TOTAL PARTIDOS PERDIDOS:        ' +user.perdidos, puntajeStyle);


     y+=350;

     console.log(y);
   }

  }
