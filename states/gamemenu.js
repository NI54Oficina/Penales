var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 500
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Penales !", {
      font: 'bold 60pt TheMinion',
      fill: 'white',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    self=this;

    // if (music.name !== "dangerous" && playMusic) {
    //   music.stop();
    //   music = game.add.audio('dangerous');
    //   music.loop = true;
    //   music.play();
    // }


    var 	gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
    var  grd=gameBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"#1a1750");
    grd.addColorStop(0.3,"#1a1750");
    grd.addColorStop(1,"#009ee1");
    gameBack.context.fillStyle=grd;
    gameBack.context.fillRect(0,0,this.game.width,this.game.height);
    this.game.add.sprite(0,0,gameBack);

    game.stage.disableVisibilityChange = true;
    curva=game.add.sprite(0,0, 'curva');
    curva.position={x:this.game.width/2-curva.width/2, y:this.game.height/2}
    game.add.existing(this.titleText);
    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
    search.visible=false;



    this.addMenuOption('CLÁSICO', function () {

      game.state.start("Selectplayer");
      // search.visible=true;
      // Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);
      //self.ListenerLogin(self);
    });
    // this.addMenuOption('Options', function () {
    //   game.state.start("Options");
    // });



    this.addMenuOption('DESAFÍO', function () {
      game.state.start("Singleplayer");
    });

    this.addMenuOption('ESTADÍSTICAS', function () {
      game.state.start("Stadistics");
    });


    //Creacion variables en localStorage


            localStorage["TotalPartidaAtajados"] = 0;
            localStorage["TotalPartidaConvertidos"] = 0;
            localStorage["TotalPartidaErrados"] = 0;
            localStorage["TotalPartidaNoAtajados"] = 0;
            localStorage["TotalPartidaUser"] = 0;
            localStorage["TotalPartidaComputer"] = 0;


          if(localStorage.getItem("PartidosGanados")===null){
             localStorage["PartidosGanados"] = 0;
             localStorage["PartidosPerdidos"] = 0;
             localStorage["TotalAtajados"] = 0;
             localStorage["TotalConvertidos"] = 0;
             localStorage["TotalErrados"] = 0;
             localStorage["TotalNoAtajados"] = 0;
             localStorage["RachaGanados"] = 0;
             localStorage["RachaPerdidos"] = 0;
             localStorage["MejorRachaConvertida"] = 0;
             localStorage["RachaConvertidos"] = 0;
             localStorage["MejorRachaAtajados"] = 0;
             localStorage["RachaAtajados"] = 0;
             localStorage["PeorRachaErrados"] = 0;
             localStorage["RachaErrados"] = 0;
             localStorage["PeorRachaNoAtajados"] = 0;
             localStorage["RachaNoAtajados"] = 0;


          }

  //Fin Creacion ariables en localStorage

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


};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
