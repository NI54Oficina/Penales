var Stadistics = function(game) {};

Stadistics.prototype = {

  menuConfig: {
    startY: 260,
    startX: 500
  },

  preload: function () {
    this.optionCount = 1;
    game.load.image('left-corner', 'assets/images/left-corner.png');
    game.load.image('right-corner', 'assets/images/left-corner.png');
    game.load.image('volver', 'assets/images/arrow-back.png');
    game.load.image('menu', 'assets/images/menu.png');
    game.load.image('puntitos', 'assets/images/fondo_trama.png');
    game.load.image('line', 'assets/images/titulo_linea.png');
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
      dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
      dots.alpha=0.3;
      game.stage.disableVisibilityChange = true;

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
      menu.events.onInputDown.add(this.GoBack,menu);

      //esquina

      var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
      var line = this.game.make.sprite(-200,45, 'line');
      //line.scale.setTo(0.8,0.8);
      var textTitle = game.add.text(game.world.centerX-150, 50, "ESTADÍSTICAS", titleStyle);
      textTitle.addChild(line);
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




  },

  isFloat: function(n,target) {
    return n === +n && n !== (n|0);
  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },


}
