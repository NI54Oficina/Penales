var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'blue', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 400, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;

    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "blue";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function () {


   //self.syncVariables();
   localStorage["PartidosGanados"];
   localStorage["PartidosPerdidos"];

    puntosUser;
    puntosComputer;

    localStorage["TotalPartidaUser"] = puntosUser;
    localStorage["TotalPartidaComputer"] = puntosComputer;

    ganaste="Ganaste";
    perdiste="Perdiste";
    empate="Empate";
    ganados=0;
    perdidos=0;


    // self.setPuntajesTotales();

    game.add.sprite(0, 0, 'gameover-bg');

    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};

    var text = game.add.text(game.world.centerX, 100, "Fin del Juego", titleStyle);

    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    text.anchor.set(0.5);

    this.addMenuOption('Play Again', function (e) {
      this.game.state.start("Game");
    });

    this.addMenuOption('Main Menu', function (e) {
      this.game.state.start("GameMenu");
    })


    var puntajeStyle = { font: 'bold 15pt TheMinion', fill: 'white'};
    var partidaStyle = { font: 'bold 15pt TheMinion', fill: 'black'};







    if(puntosUser > puntosComputer){

      resultado = game.add.text(420, 250, 'Ganaste', { font: " 60px TheMinion", fill: "white", align: "center" });
      localStorage["PartidosGanados"]=  (parseInt(localStorage["PartidosGanados"]) || 0) + 1;
      localStorage["RachaGanados"] = (parseInt(localStorage["RachaGanados"]) || 0) + 1;
      localStorage["RachaPerdidos"] = 0;


    }else{

      resultado = game.add.text(420, 250, 'Perdiste', { font: " 60px TheMinion", fill: "white", align: "center" });
      localStorage["PartidosPerdidos"]= (parseInt(localStorage["PartidosPerdidos"]) || 0) + 1;
      localStorage["RachaGanados"] = 0;
      localStorage["RachaPerdidos"] = (parseInt(localStorage["RachaPerdidos"]) || 0) + 1;

    };


    var efiArq = Math.floor((100/((parseInt(localStorage["TotalPartidaAtajados"]) || 0) + (parseInt(localStorage["TotalPartidaNoAtajados"]) || 0)))*(parseInt(localStorage["TotalPartidaAtajados"]) || 0));
    var efiPat = Math.floor((100/((parseInt(localStorage["TotalPartidaConvertidos"]) || 0) + (parseInt(localStorage["TotalPartidaErrados"]) || 0)))*(parseInt(localStorage["TotalPartidaConvertidos"]) || 0));

    var q = game.add.text(500, 320, localStorage["TotalPartidaUser"], puntajeStyle);
    var r = game.add.text(520, 320, "- "+localStorage["TotalPartidaComputer"], puntajeStyle);
    var s = game.add.text(10, 470, "Total en partida no atajados: "+ localStorage["TotalPartidaNoAtajados"] , partidaStyle);
    var t = game.add.text(10, 490, "Total en partida Errados: "+ localStorage["TotalPartidaErrados"] , partidaStyle);
    var u = game.add.text(10, 510, "Total en partida convertidos "+localStorage["TotalPartidaConvertidos"], partidaStyle);
    var v = game.add.text(10, 530, "Total en partida atajados: "+localStorage["TotalPartidaAtajados"] , partidaStyle);
    var a = game.add.text(10, 550, "Eficiencia como arquero: "+ efiArq +"%" , partidaStyle);
    var b = game.add.text(10, 570, "Eficiencia como arquero: "+ efiPat +"%" , partidaStyle);
  



  },


};
