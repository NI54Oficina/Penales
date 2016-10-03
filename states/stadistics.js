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
     dots.fixedToCamera=true;

     game.stage.disableVisibilityChange = true;

     //fondo


               //prueba



    //fondo de los puintajes y prueba scrolling

    var titleStyle = { font: '40px BitterBold', fill: 'white', align: 'center'};
    var line = this.game.make.sprite(-200,45, 'line');
    //line.scale.setTo(0.8,0.8);
    var textTitle = game.add.text(game.world.centerX-150, 50, "ESTADÍSTICAS", titleStyle);
    textTitle.addChild(line);
    textTitle.fixedToCamera=true;
    puntajeStyle = { font: '15pt CondensedLight', fill: 'yellow'};
    puntajeStyle2 = { font: '15pt CondensedLight', fill: 'white'};
    titleStyle2 = { font: '20pt CondensedLight', fill: 'white'};


    var efiArq =(100/((parseInt(localStorage["TotalAtajados"]) || 0) + (parseInt(localStorage["TotalNoAtajados"]) || 0)))* (parseInt(localStorage["TotalAtajados"]) || 0);
    var efiPat = (100/((parseInt(localStorage["TotalConvertidos"]) || 0) + (parseInt(localStorage["TotalErrados"]) || 0)))*(parseInt(localStorage["TotalConvertidos"]) || 0);
    var efectividad = (parseInt(localStorage["PartidosGanados"]) || 0) /(parseInt(localStorage["PartidosPerdidos"]) || 0);

    if (isNaN(efiArq))efiArq=0;
    if (isNaN(efiPat))efiPat=0;
    if (isNaN(efectividad))efectividad=0;
    if (self.isFloat(efiArq,self))efiArq= Number(efiArq).toFixed(1);
    if (self.isFloat(efiPat,self))efiPat= Number(efiPat).toFixed(1);
    if (self.isFloat(efectividad,self))efectividad= efectividad.toFixed(1);

    y=20;
    n=0;
    positionY=0;

    group= game.add.group();

    group.position.x=200;
    group.position.y=200;


  	stats=[
    {key:"PartidosGanados",title:"PARTIDOS GANADOS"},
    {key:"PartidosPerdidos",title:"PARTIDOS PERDIDOS"},
    {key:"TotalAtajados",title:"PENALES ATAJADOS"},
    {key:"TotalConvertidos",title:"PENALES CONVERTIDOS"},
    {key:"TotalErrados",title:"PENALES ERRADOS"},
  	{key:"TotalNoAtajados",title:"PENALES NO ATAJADOS"},

    {key:"RachaConvertidos",title:"RACHA ACTUAL DE PENALES PATEADOS"},
    {key:"RachaErrados",title:"RACHA ACTUAL DE PENALES ERRADOS"},
    {key:"MejorRachaConvertida",title:"MEJOR RACHA HISTÓRICA DE PENALES PATEADOS"},
    {key:"PeorRachaErrados",title:"PEOR RACHA HISTÓRICA DE PENALES PATEADOS"},


    {key:"RachaAtajados",title:"RACHA ACTUAL DE PENALES ATAJADOS"},
    {key:"RachaNoAtajados",title:"RACHA ACTUAL DE PENALES NO ATAJADOS"},
    {key:"MejorRachaAtajados",title:"MEJOR RACHA HISTÓRICA DE PENALES ATAJADOS"},
    {key:"PeorRachaNoAtajados",title:"PEOR RACHA HISTÓRICA DE PENALES NO ATAJADOS"},



    {key:"RachaGanados",title:"RACHA GANADOS"},
    {key:"RachaPerdidos",title:"RACHA PERDIDOS"},
    {key:"Efectividad",title:"EFECTIVIDAD"},
    {key: efiArq +"%" ,title:"EFICIENCIA COMO ARQUERO"},
    {key: efiPat +"%" ,title:"EFICIENCIA COMO PATEADOR"}

  	];
    self.createLayoutStats(self);
    self.createLayoutStatsVariable('PENALES PATEADOS');
    self.createLayoutStatsVariable('PENALES ATAJADOS');
    self.createLayoutStatsVariable('PARTIDOS');

    //esquinas

    var leftCorner=game.add.sprite(0, 0, 'left-corner');
	  leftCorner.fixedToCamera=true;
    leftCorner.scale.setTo(.75,0.75)
    a= game.add.sprite(this.game.width, 0, 'right-corner');
	  a.fixedToCamera=true;
    a.scale.setTo(-.75,0.75)


    volver= game.add.sprite(40, 30, 'volver');
    volver.inputEnabled = true;
	  volver.fixedToCamera=true;
    volver.events.onInputDown.add(this.GoBack,volver);

    //esquina

	  game.world.setBounds(0, 0, this.game.width,a.height+group.height+100+leftCorner.height);

  },

  isFloat: function(n,target) {
    return n === +n && n !== (n|0);
  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },

  createLayoutStats: function(target){

    statsBack= this.game.add.bitmapData(700,320);

    grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"black");
    statsBack.context.fillStyle=grd;
    statsBack.context.fillRect(0,0,this.game.width,this.game.height);
    statsBackground=this.game.add.sprite(0,y,statsBack);
    statsBackground.alpha=.3;
    x=50;

    group.add(statsBackground);


    for(var a=0;a<6;a++){

        try{
            var word=game.add.text(x, y+20, stats[n].title, puntajeStyle);
            var number=game.add.text(group.width-70,y+20,localStorage[stats[n].key], puntajeStyle);
            group.add(word);
            group.add(number);
            var line =self.createLine(0,word.height,600);
            word.addChild(line);

            y+=50;
            n++;

        }catch(e){

        }
    };
  y+=50;

},

createLine: function(a, b,c){

  var graphics = game.add.graphics(0, 00);
  graphics.beginFill(0x797979);
  graphics.lineStyle(2, 0x797979, 1);
  graphics.moveTo(a,b);
  graphics.lineTo(c, b);
  graphics.endFill();
  return graphics;
},


createLayoutStatsVariable: function(text){

  statsBack= this.game.add.bitmapData(700,250);

  grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
  grd.addColorStop(0,"black");
  statsBack.context.fillStyle=grd;
  statsBack.context.fillRect(0,0,this.game.width,this.game.height);
  statsBackground=this.game.add.sprite(0,y,statsBack);
  statsBackground.alpha=.3;

  var difBack= this.game.add.bitmapData(680,30);
  var  grdd=statsBack.context.createLinearGradient(0,0,0,this.game.height );
  grdd.addColorStop(0,'#00396e');
  difBack.context.fillStyle=grdd;
  difBack.context.fillRect(0,0,this.game.width,this.game.height);



  x=50;

  group.add(statsBackground);

  var h=game.add.text(x, y+30, text, titleStyle2);
  h.position.x= group.width/2-h.width/2;
  group.add(h);
  y+=90;


  difBackground=this.game.add.sprite(10,y+35 ,difBack);
  difBackground2=this.game.add.sprite(10,y+115 ,difBack);
  difBackground.alpha=.5;
  difBackground2.alpha=.5;
  group.add(difBackground);
  group.add(difBackground2);

  for(var a=0;a<4;a++){

      try{


          var word=game.add.text(x, y, stats[n].title, puntajeStyle2);
          var number=game.add.text(group.width-70,y,localStorage[stats[n].key], puntajeStyle2);

          group.add(word);
          group.add(number);


          y+=40;
          n++;
        //  m+?

      }catch(e){


       }
  };
y+=50;

},


}
