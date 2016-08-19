var Stadistics = function(game) {};

Stadistics.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#FEFFD5', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(100, (this.optionCount * 80) , text, optionStyle);
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

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function(){
      self = this;

      game.add.sprite(0, 0, 'gameover-bg');
      var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
      var textTitle = game.add.text(game.world.centerX-250, 100, "Estadisticas", titleStyle);
      var puntajeStyle = { font: 'bold 15pt TheMinion', fill: 'white'};

      var efiArq =(100/((parseInt(localStorage["TotalAtajados"]) || 0) + (parseInt(localStorage["TotalNoAtajados"]) || 0)))* (parseInt(localStorage["TotalAtajados"]) || 0);
      var efiPat = (100/((parseInt(localStorage["TotalConvertidos"]) || 0) + (parseInt(localStorage["TotalErrados"]) || 0)))*(parseInt(localStorage["TotalConvertidos"]) || 0);
      var efectividad = (parseInt(localStorage["PartidosGanados"]) || 0) /(parseInt(localStorage["PartidosPerdidos"]) || 0);

      if (isNaN(efiArq))efiArq=0;
      if (isNaN(efiPat))efiPat=0;
      if (isNaN(efectividad))efectividad=0;
      if (self.isFloat(efiArq,self))efiArq= Number(efiArq).toFixed(1);
      if (self.isFloat(efiPat,self))efiPat= Number(efiPat).toFixed(1);
      if (self.isFloat(efectividad,self))efectividad= efectividad.toFixed(1);

      game.add.text(50, 200, "Partidos Ganados: "+ localStorage["PartidosGanados"], puntajeStyle);
      game.add.text(50, 220, "Partidos Perdidos: "+ localStorage["PartidosPerdidos"], puntajeStyle);
      game.add.text(50, 240, "Total Atajados: "+ localStorage["TotalAtajados"], puntajeStyle);
      game.add.text(50, 260, "Total Convertidos: "+ localStorage["TotalConvertidos"], puntajeStyle);
      game.add.text(50, 280, "Total Errados: "+localStorage["TotalErrados"], puntajeStyle);
      game.add.text(50, 300, "Total No Atajados: "+localStorage["TotalNoAtajados"], puntajeStyle);
      game.add.text(50, 320, "Racha Ganados: "+localStorage["RachaGanados"], puntajeStyle);
      game.add.text(50, 340, "Racha Perdidos: "+ localStorage["RachaPerdidos"], puntajeStyle);
      game.add.text(50, 360, "Racha Atajados: "+localStorage["RachaAtajados"], puntajeStyle);
      game.add.text(50, 380, "Racha Convertidos: "+localStorage["RachaConvertidos"], puntajeStyle);
      game.add.text(600, 200, "Racha Errados: "+localStorage["RachaErrados"], puntajeStyle);
      game.add.text(600, 220, "Racha No Atajados: "+localStorage["RachaNoAtajados"] , puntajeStyle);
      game.add.text(600, 240, "Mejor Racha Atajados: "+localStorage["MejorRachaAtajados"], puntajeStyle);
      game.add.text(600, 260, "Mejor Racha Convertida: "+localStorage["MejorRachaConvertida"], puntajeStyle);
      game.add.text(600, 280, "Peor Racha Errados: "+localStorage["PeorRachaErrados"], puntajeStyle);
      game.add.text(600, 300, "Peor Racha No Atajados: "+localStorage["PeorRachaNoAtajados"], puntajeStyle);
      game.add.text(600, 320, "Efectividad: "+ efectividad , puntajeStyle);
      game.add.text(600, 340, "Eficiencia como arquero: "+ efiArq +"%" , puntajeStyle);
      game.add.text(600, 360, "Eficiencia como pateador: "+ efiPat +"%" , puntajeStyle);



      this.addMenuOption('Volver', function () {
        game.state.start("GameMenu");
      });



  },

  isFloat: function(n,target) {
    return n === +n && n !== (n|0);
  },
}
