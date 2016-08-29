var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#FEFFD5', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 400, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;

    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#FEFFD5";
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
   self = this;
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




    game.add.sprite(0, 0, 'gameover-bg');

    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};

    var text = game.add.text(game.world.centerX, 100, "Fin del Juego", titleStyle);

    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
    search.visible=false;

    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    text.anchor.set(0.5);

    this.addMenuOption('Play Again', function (e) {
      search.visible=true;
      Emit("buscarPartida"," ","listenerSearch",self);
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


    var efiParArq = (100/((parseInt(localStorage["TotalPartidaAtajados"]) || 0) + (parseInt(localStorage["TotalPartidaNoAtajados"]) || 0)))*(parseInt(localStorage["TotalPartidaAtajados"]) || 0);
    var efiParPat = (100/((parseInt(localStorage["TotalPartidaConvertidos"]) || 0) + (parseInt(localStorage["TotalPartidaErrados"]) || 0)))*(parseInt(localStorage["TotalPartidaConvertidos"]) || 0);
    var efiArq = (100/((parseInt(localStorage["TotalAtajados"]) || 0) + (parseInt(localStorage["TotalNoAtajados"]) || 0)))* (parseInt(localStorage["TotalAtajados"]) || 0);
    var efiPat = (100/((parseInt(localStorage["TotalConvertidos"]) || 0) + (parseInt(localStorage["TotalErrados"]) || 0)))*(parseInt(localStorage["TotalConvertidos"]) || 0);
    var efectividad = (parseInt(localStorage["PartidosGanados"]) || 0) /(parseInt(localStorage["PartidosPerdidos"]) || 0);


     if (isNaN(efiArq))efiArq=0;
     if (isNaN(efiPat))efiPat=0;
     if (isNaN(efectividad))efectividad=0;
     if (isNaN(efiParArq))efiParArq=0;
     if (isNaN(efiParPat))efiParPat=0;
     if (self.isFloat(efiArq,self))efiArq= efiArq.toFixed(1);
     if (self.isFloat(efiPat,self))efiPat= efiPat.toFixed(1);
     if (self.isFloat(efiParPat,self))efiParPat= efiParPat.toFixed(1);
     if (self.isFloat(efiParArq,self))efiParArq= efiParArq.toFixed(1);
     if (self.isFloat(efectividad,self))efectividad= efectividad.toFixed(1);

     game.add.text(500, 320, localStorage["TotalPartidaUser"], puntajeStyle);
     game.add.text(520, 320, "- "+localStorage["TotalPartidaComputer"], puntajeStyle);

     game.add.text(10, 200, "Partidos Ganados: "+ localStorage["PartidosGanados"], puntajeStyle);
     game.add.text(10, 220, "Partidos Perdidos: "+ localStorage["PartidosPerdidos"], puntajeStyle);
     game.add.text(10, 240, "Total Atajados: "+ localStorage["TotalAtajados"], puntajeStyle);
     game.add.text(10, 260, "Total Convertidos: "+ localStorage["TotalConvertidos"], puntajeStyle);
     game.add.text(10, 280, "Total Errados: "+localStorage["TotalErrados"], puntajeStyle);
     game.add.text(10, 300, "Total No Atajados: "+localStorage["TotalNoAtajados"], puntajeStyle);
     game.add.text(10, 320, "Racha Ganados: "+localStorage["RachaGanados"], puntajeStyle);
     game.add.text(10, 340, "Racha Perdidos: "+ localStorage["RachaPerdidos"], puntajeStyle);
     game.add.text(10, 360, "Racha Atajados: "+localStorage["RachaAtajados"], puntajeStyle);
     game.add.text(10, 380, "Racha Convertidos: "+localStorage["RachaConvertidos"], puntajeStyle);
     game.add.text(10, 400, "Racha Errados: "+localStorage["RachaErrados"], puntajeStyle);
     game.add.text(10, 420, "Racha No Atajados: "+localStorage["RachaNoAtajados"] , puntajeStyle);
     game.add.text(10, 440, "Mejor Racha Atajados: "+localStorage["MejorRachaAtajados"], puntajeStyle);
      game.add.text(10, 460, "Mejor Racha Convertida: "+localStorage["MejorRachaConvertida"], puntajeStyle);
      game.add.text(700, 200, "Peor Racha Errados: "+localStorage["PeorRachaErrados"], puntajeStyle);
      game.add.text(700, 220, "Peor Racha No Atajados: "+localStorage["PeorRachaNoAtajados"], puntajeStyle);
      game.add.text(700, 240, "Efectividad: "+ efectividad , puntajeStyle);
      game.add.text(700, 260, "Eficiencia como arquero: "+ efiArq +"%" , puntajeStyle);
      game.add.text(700, 280, "Eficiencia como pateador: "+ efiPat +"%" , puntajeStyle);

    game.add.text(10, 480, "Total en partida no atajados: "+ localStorage["TotalPartidaNoAtajados"] , partidaStyle);
    game.add.text(10, 500, "Total en partida Errados: "+ localStorage["TotalPartidaErrados"] , partidaStyle);
    game.add.text(10, 520, "Total en partida convertidos "+localStorage["TotalPartidaConvertidos"], partidaStyle);
    game.add.text(10, 540, "Total en partida atajados: "+localStorage["TotalPartidaAtajados"] , partidaStyle);
    game.add.text(10, 560, "Eficiencia como arquero en partida: "+ efiParArq +"%" , partidaStyle);
    game.add.text(10, 580, "Eficiencia como pateador en partida: "+ efiParPat +"%" , partidaStyle);

    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
    search.visible=false;



  },

  isFloat: function(n,self) {
    return n === +n && n !== (n|0);
  },

  listenerSearch: function(){
      search.visible=false;
        game.state.start("Game");
  },


};
