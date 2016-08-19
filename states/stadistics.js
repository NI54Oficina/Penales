var Stadistics = function(game) {};

Stadistics.prototype = {

  create: function(){
      game.add.sprite(0, 0, 'gameover-bg');
      var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
      var textTitle = game.add.text(game.world.centerX-250, 100, "Estadisticas", titleStyle);
      var puntajeStyle = { font: 'bold 15pt TheMinion', fill: 'black'};


      var a = game.add.text(500, 200, "Partidos Ganados: "+ localStorage["PartidosGanados"], puntajeStyle);
      var b = game.add.text(500, 220, "Partidos Perdidos: "+ localStorage["PartidosPerdidos"], puntajeStyle);
      var c = game.add.text(500, 240, "Total Atajados: "+ localStorage["TotalAtajados"], puntajeStyle);
      var d = game.add.text(500, 260, "Total Convertidos: "+ localStorage["TotalConvertidos"], puntajeStyle);
      var e = game.add.text(500, 280, "Total Errados: "+localStorage["TotalErrados"], puntajeStyle);
      var f = game.add.text(500, 300, "Total No Atajados: "+localStorage["TotalNoAtajados"], puntajeStyle);
      var g = game.add.text(500, 320, "Racha Ganados: "+localStorage["RachaGanados"], puntajeStyle);
      var h = game.add.text(500, 340, "Racha Perdidos: "+ localStorage["RachaPerdidos"], puntajeStyle);
      var i = game.add.text(500, 360, "Racha Atajados: "+localStorage["RachaAtajados"], puntajeStyle);
      var j = game.add.text(500, 380, "Racha Convertidos: "+localStorage["RachaConvertidos"], puntajeStyle);
      var k = game.add.text(500, 400, "Racha Errados: "+localStorage["RachaErrados"], puntajeStyle);
      var l = game.add.text(500, 420, "Racha No Atajados: "+localStorage["RachaNoAtajados"] , puntajeStyle);
      var m = game.add.text(500, 440, "Mejor Racha Atajados: "+localStorage["MejorRachaAtajados"], puntajeStyle);
      var n = game.add.text(500, 460, "Mejor Racha Convertida: "+localStorage["MejorRachaConvertida"], puntajeStyle);
      var o = game.add.text(500, 480, "Peor Racha Errados: "+localStorage["PeorRachaErrados"], puntajeStyle);
      var p = game.add.text(500, 500, "Peor Racha No Atajados: "+localStorage["PeorRachaNoAtajados"], puntajeStyle);
  },
}
