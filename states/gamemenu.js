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

    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);
    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
    search.visible=false;



    this.addMenuOption('Start', function () {
      self.ListenerLogin(self);
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });

    this.addMenuOption('Stadistics', function () {
      game.state.start("Stadistics");
    });

    //Creacion ariables en localStorage


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


  ListenerLogin: function (){
    search.visible=true;
    console.log("Esperando oponente");
    setTimeout(function(){
        game.state.start("Game");
        console.log("Oponente Encontrado");},2000);

        return;
  },

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
