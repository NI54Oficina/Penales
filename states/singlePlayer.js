var Singleplayer = function(game) {};

Singleplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
    game.load.image('left-corner', 'assets/images/left-corner.png');
    game.load.image('right-corner', 'assets/images/left-corner.png');
    game.load.image('volver', 'assets/images/arrow-back.png');
    game.load.image('menu', 'assets/images/menu.png');
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt RobotoBold', align: 'center', stroke: '#1b1464'};



    // aplicando el background de cada texto

      var 	myBitmap = this.game.add.bitmapData(300, 60);
      var  grd=myBitmap.context.createLinearGradient(0,0,0,30);
      grd.addColorStop(0,"#fbe43e");
      grd.addColorStop(0.9,"#fbe43e");
      grd.addColorStop(1,"#cea428");
      myBitmap.context.fillStyle=grd;
      myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
      var background = this.game.add.sprite(100,this.optionCount*550-10, myBitmap);

    // aplicando el background de cada texto

    var txt = game.add.text(100, (this.optionCount * 550) , text, optionStyle);
    //txt.anchor.setTo(0.5);
    txt.stroke = "black";
    //txt.strokeThickness = 4;

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

        game.add.sprite(0, 0, 'single-bg');
        game.add.sprite(0, 0, 'left-corner');
        a= game.add.sprite(this.game.width, 0, 'right-corner');
        a.scale.x = -1;


        volver= game.add.sprite(50, 50, 'volver');
        volver.inputEnabled = true;
        volver.events.onInputDown.add(this.GoBack,volver);

        menu= game.add.sprite(this.game.width-100, 50, 'menu');
        menu.inputEnabled = true;
        menu.events.onInputDown.add(this.GoBack,menu);



        search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
        search.visible=false;



        this.addMenuOption('COMENZAR', function () {
          search.visible=true;
          Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

        });

        //
        // this.addMenuOption('Menu', function () {
        //   game.state.start("GameMenu");
        //
        // });
        //
        //
        //
        // this.addMenuOption('Volver', function () {
        //   game.state.start("GameMenu");
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
      game.state.start("GameMenu");
    },

  }
