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

      this.game.add.sprite(0,0,gameBack).fixedToCamera=true;
      dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
      dots.alpha=0.3;

      game.stage.disableVisibilityChange = true;

      //fondo

      //esquinas

      var leftCorner=game.add.sprite(0, 0, 'left-corner');
	  leftCorner.fixedToCamera=true;
      a= game.add.sprite(this.game.width, 0, 'right-corner');
	  a.fixedToCamera=true;
      a.scale.x = -1;


      volver= game.add.sprite(50, 50, 'volver');
      volver.inputEnabled = true;
	  volver.fixedToCamera=true;
      volver.events.onInputDown.add(this.GoBack,volver);

      menu= game.add.sprite(this.game.width-100, 50, 'menu');
	  menu.fixedToCamera=true;
      menu.inputEnabled = true;
      menu.events.onInputDown.add(this.GoBack,menu);

      //esquina

      // fondo de los puntaje y prueba scrolling

      // tatsBack= this.game.add.bitmapData(700,300);
      //
      // grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
      // grd.addColorStop(0,"black");
      // statsBack.context.fillStyle=grd;
      // statsBack.context.fillRect(0,0,this.game.width,this.game.height);
      // statsBackground=this.game.add.sprite(300,300,statsBack);
      // statsBackground.alpha=.3;
      // statsBackground.position={x: this.game.width/2- statsBackground.width/2,y:200};

      //fondo de los puintajes y prueba scrolling

      var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
      var line = this.game.make.sprite(-200,45, 'line');
      //line.scale.setTo(0.8,0.8);
      var textTitle = game.add.text(game.world.centerX-150, 50, "ESTADÍSTICAS", titleStyle);
      textTitle.addChild(line);
      puntajeStyle = { font: '15pt CondensedLight', fill: 'yellow'};

      var efiArq =(100/((parseInt(localStorage["TotalAtajados"]) || 0) + (parseInt(localStorage["TotalNoAtajados"]) || 0)))* (parseInt(localStorage["TotalAtajados"]) || 0);
      var efiPat = (100/((parseInt(localStorage["TotalConvertidos"]) || 0) + (parseInt(localStorage["TotalErrados"]) || 0)))*(parseInt(localStorage["TotalConvertidos"]) || 0);
      var efectividad = (parseInt(localStorage["PartidosGanados"]) || 0) /(parseInt(localStorage["PartidosPerdidos"]) || 0);

      if (isNaN(efiArq))efiArq=0;
      if (isNaN(efiPat))efiPat=0;
      if (isNaN(efectividad))efectividad=0;
      if (self.isFloat(efiArq,self))efiArq= Number(efiArq).toFixed(1);
      if (self.isFloat(efiPat,self))efiPat= Number(efiPat).toFixed(1);
      if (self.isFloat(efectividad,self))efectividad= efectividad.toFixed(1);
      // x=statsBackground.position.x+50;
      // xx= statsBackground.position.x + statsBackground.width-80;
      y=220;
      n=0;

      group= game.add.group();


  //     // a=game.add.text(x, y, "PARTIDOS GANADOS", puntajeStyle);
  //     // abis=game.add.text(xx, y,localStorage["PartidosGanados"], puntajeStyle);
  //     // b=game.add.text(x, y+50, "PARTIDOS GANADOS", puntajeStyle);
  //     // bbis=game.add.text(xx, y+50,localStorage["PartidosPerdidos"], puntajeStyle);
  //     // c=game.add.text(x,y+100, "PENALES ATAJADOS", puntajeStyle);
  //     // cbis=game.add.text(xx, y+100, localStorage["TotalAtajados"], puntajeStyle);
  //     // d=game.add.text(x, y+150, "PENALES CONVERTIDOS", puntajeStyle);
  //     // dbis=game.add.text(xx, y+150, localStorage["TotalConvertidos"], puntajeStyle);
  //     // e=game.add.text(x, y+200, "PENALES ERRADOS", puntajeStyle);
  //     // ebis=game.add.text(xx, y+200, localStorage["TotalErrados"], puntajeStyle);
  //
	//
	// group.add(a)
	// group.add(abis)
	// group.add(b)
	// group.add(bbis)
	// group.add(c)
	// group.add(cbis)
	// group.add(d)
	// group.add(dbis)
	// group.add(e)
	// group.add(ebis)

      // group.add(game.add.text(x, y+250, "Total No Atajados: "+localStorage["TotalNoAtajados"], puntajeStyle));
      //  group.add(game.add.text(x, y+300, "Racha Ganados: "+localStorage["RachaGanados"], puntajeStyle));
      //  group.add(game.add.text(x, y+350, "Racha Perdidos: "+ localStorage["RachaPerdidos"], puntajeStyle));
      // group.add( game.add.text(x, y+400, "Racha Atajados: "+localStorage["RachaAtajados"], puntajeStyle));
      //  group.add(game.add.text(x, y+450, "Racha Convertidos: "+localStorage["RachaConvertidos"], puntajeStyle));
      //  group.add(game.add.text(x, y+500, "Racha Errados: "+localStorage["RachaErrados"], puntajeStyle));
      // game.add.text(x,y+30, "Racha No Atajados: "+localStorage["RachaNoAtajados"] , puntajeStyle);
      // game.add.text(x, y+30, "Mejor Racha Atajados: "+localStorage["MejorRachaAtajados"], puntajeStyle);
      // game.add.text(x, y+30, "Mejor Racha Convertida: "+localStorage["MejorRachaConvertida"], puntajeStyle);
      // game.add.text(x, y+30, "Peor Racha Errados: "+localStorage["PeorRachaErrados"], puntajeStyle);
      // game.add.text(x, y+30, "Peor Racha No Atajados: "+localStorage["PeorRachaNoAtajados"], puntajeStyle);
      // game.add.text(x, y+30, "Efectividad: "+ efectividad , puntajeStyle);
      // game.add.text(x, y+30, "Eficiencia como arquero: "+ efiArq +"%" , puntajeStyle);
      // game.add.text(x,y+30, "Eficiencia como pateador: "+ efiPat +"%" , puntajeStyle);

	stats=[
  {key:"PartidosGanados",title:"PARTIDOS GANADOS"},
  {key:"PartidosPerdidos",title:"PARTIDOS PERDIDOS"},
  {key:"TotalAtajados",title:"PENALES ATAJADOS"},
  {key:"TotalConvertidos",title:"PENALES CONVERTIDOS"},
  {key:"TotalErrados",title:"PENALES ERRADOS"},
	{key:"TotalNoAtajados",title:"PENALES NO ATAJADOS"},
	{key:"RachaGanados",title:"RACHA GANADOS"},
  {key:"RachaPerdidos",title:"RACHA PERDIDOS"},
  {key:"RachaAtajados",title:"RACHA ATAJADOS:"},
  {key:"RachaConvertidos",title:"RACHA CONVERTIDOS"},
  {key:"RachaErrados",title:"RACHA ERRADOS"},
  {key:"RachaNoAtajados",title:"RACHA NO ATAJADOS"},
  {key:"MejorRachaAtajados",title:"MEJOR RACHA ATAJADOS"},
  {key:"MejorRachaConvertida",title:"MEJOR RACHA CONVERTIDA"},
  {key:"PeorRachaErrados",title:"PEOR RACHA ERRADOS"},
  {key:"PeorRachaNoAtajados",title:"PEOR RACHA NO ATAJADOS"},
  {key:"Efectividad",title:"EFECTIVIDAD"},
  {key: efiArq +"%" ,title:"EFICIENCIA COMO ARQUERO"},
  {key: efiPat +"%" ,title:"EFICIENCIA COMO PATEADOR"}

	];
    self.createLayoutStats(self,200);
    self.createLayoutStats(self,600);

	console.log(group.height);
	game.world.setBounds(0, 0, this.game.width,a.height+group.height+100+leftCorner.height);
  },

  isFloat: function(n,target) {
    return n === +n && n !== (n|0);
  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },


  createLayoutStats: function(target, yy){

    statsBack= this.game.add.bitmapData(700,320);

    grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"black");
    statsBack.context.fillStyle=grd;
    statsBack.context.fillRect(0,0,this.game.width,this.game.height);
    statsBackground=this.game.add.sprite(300,300,statsBack);
    statsBackground.alpha=.3;
    statsBackground.position={x: this.game.width/2- statsBackground.width/2,y:yy};
    x=statsBackground.position.x+50;


    y=yy+20;

    for(var a=0;a<6;a++){

       var word=game.add.text(x, y, stats[n].title+'                                                                                  '+ localStorage[stats[n].key], puntajeStyle);
       group.add(word);
       self.createLine(x, y+word.height, word.width+x );


         y+=50;
         n++;


    };

  n=a;

},

createLine: function(a, b,c){

  var graphics = game.add.graphics(0, 00);
    graphics.beginFill(0x797979);
    graphics.lineStyle(2, 0x797979, 1);
    graphics.moveTo(a,b);
    graphics.lineTo(c, b);
    graphics.endFill();

}



}
