var Stadistics = function(game) {};

Stadistics.prototype = {

  menuConfig: {
    startY: 260,
    startX: 500
  },

  preload: function () {
    this.optionCount = 1;
    
  },

  // addMenuOption: function(text, callback) {
  //   var optionStyle = { font: '30pt TheMinion', fill: '#FEFFD5', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
  //   var txt = game.add.text(100, (this.optionCount * 80) , text, optionStyle);
  //   txt.anchor.setTo(0.5);
  //   txt.stroke = "rgba(0,0,0,0";
  //   txt.strokeThickness = 4;
  //
  //   var onOver = function (target) {
  //     target.fill = "black";
  //     target.stroke = "rgba(200,200,200,0.5)";
  //     txt.useHandCursor = true;
  //   };
  //   var onOut = function (target) {
  //     target.fill = "#FEFFD5";
  //     target.stroke = "rgba(0,0,0,0)";
  //     txt.useHandCursor = false;
  //   };
  //
  //   txt.inputEnabled = true;
  //   txt.events.onInputUp.add(callback, this);
  //   txt.events.onInputOver.add(onOver, this);
  //   txt.events.onInputOut.add(onOut, this);
  //
  //   this.optionCount ++;
  //
  //
  // },

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

    self.createBackground(false);

    puntajeStyle = { font: '15pt CondensedLight', fill: '#ffff56'};
    puntajeStyle2 = { font: '15pt CondensedLight', fill: 'white'};
    titleStyle2 = { font: '20pt CondensedLight', fill: 'white'};


    var efiArq =(100/((parseInt(localStorage["totalAtajados"]) || 0) + (parseInt(localStorage["totalNoAtajados"]) || 0)))* (parseInt(localStorage["totalAtajados"]) || 0);
    var efiPat = (100/((parseInt(localStorage["totalConvertidos"]) || 0) + (parseInt(localStorage["totalErrados"]) || 0)))*(parseInt(localStorage["totalConvertidos"]) || 0);
    var efectividad = (parseInt(localStorage["partidosGanados"]) || 0) /(parseInt(localStorage["partidosPerdidos"]) || 0);

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


    group.position.y=200;


  	stats=[
    {key:"ganados",title:"PARTIDOS GANADOS"},
    {key:"perdidos",title:"PARTIDOS PERDIDOS"},
	{key:"rachaGanados",title:"RACHA GANADOS"},
    {key:"rachaPerdidos",title:"RACHA PERDIDOS"},
	{key:"rachaGanadosHistorica",title:"MEJOR RACHA GANADOS"},
    {key:"rachaPerdidosHistorica",title:"MEJOR RACHA PERDIDOS"},
	
    {key:"convertidos",title:"PENALES CONVERTIDOS"},
    {key:"errados",title:"PENALES ERRADOS"},
	{key:"rachaConvertidos",title:"RACHA ACTUAL DE PENALES CONVERTIDOS"},
	{key:"rachaErrados",title:"RACHA ACTUAL DE PENALES ERRADOS"},
	{key:"rachaConvertidosHistorica",title:"MEJOR RACHA DE PENALES PATEADOS"},
    {key:"rachaErradosHistorica",title:"PEOR RACHA DE PENALES PATEADOS"},
	
	{key:"atajados",title:"PENALES ATAJADOS"},
  	{key:"noAtajados",title:"PENALES ENCAJADOS"},

    
    
    


    {key:"rachaAtajados",title:"RACHA ACTUAL DE PENALES ATAJADOS"},
    {key:"rachaNoAtajados",title:"RACHA ACTUAL DE PENALES ENCAJADOS"},
    {key:"rachaAtajadosHistorica",title:"MEJOR RACHA DE PENALES ATAJADOS"},
    {key:"rachaNoAtajadosHistorica",title:"PEOR RACHA DE PENALES ENCAJADOS"}



    
    //{key:"Efectividad",title:"EFECTIVIDAD"},
    //{key: efiArq +"%" ,title:"EFICIENCIA COMO ARQUERO"},
    //{key: efiPat +"%" ,title:"EFICIENCIA COMO PATEADOR"}

  	];
    self.createLayoutStats(self,6);
    self.createLayoutStatsVariable('PENALES PATEADOS');
    self.createLayoutStatsVariable('PENALES ATAJADOS');
    //self.createLayoutStatsVariable('PARTIDOS');


     self.createHeader(this.GoBack,true);
     self.createSoundGraphics();

     textTitle= self.createGeneralTitle("ESTADISTICAS", true);

     group.position.x= this.game.width/2-group.width/2;

	  game.world.setBounds(0, 0, this.game.width,leftCorner.height+group.height+100+leftCorner.height);

  },

  isFloat: function(n,target) {
    return n === +n && n !== (n|0);
  },

  GoBack: function(target){
    game.state.start("GameMenu");
  },

  createLayoutStats: function(target,cuantity){

    statsBack= this.game.add.bitmapData(700,320);

    grd=statsBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"black");
    statsBack.context.fillStyle=grd;
    statsBack.context.fillRect(0,0,this.game.width,this.game.height);
    statsBackground=this.game.add.sprite(0,y,statsBack);
    statsBackground.alpha=.3;
    x=50;

    group.add(statsBackground);


    for(var a=0;a<cuantity;a++){

        try{
            var word=game.add.text(x, y+20, stats[n].title, puntajeStyle);
            var number=game.add.text(group.width-70,y+20,localStorage[stats[n].key], puntajeStyle);
            group.add(word);
            group.add(number);
            var line =self.createLineGlobal(0,word.height,600, true,0x797979 );
            word.addChild(line);

            y+=50;
            n++;

        }catch(e){

        }
    };
  y+=35;

},


createLayoutStatsVariable: function(text){

  statsBack= this.game.add.bitmapData(700,340);

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
  difBackground3=this.game.add.sprite(10,y+195 ,difBack);
  difBackground.alpha=.5;
  difBackground2.alpha=.5;
  difBackground3.alpha=.5;
  group.add(difBackground);
  group.add(difBackground2);
  group.add(difBackground3);

  for(var a=0;a<6;a++){

      try{


          var word=game.add.text(x, y, stats[n].title, puntajeStyle2);
          var number=game.add.text(group.width-70,y,localStorage[stats[n].key], puntajeStyle2);

          group.add(word);
          group.add(number);


          y+=40;
          n++;


      }catch(e){


       }
  };
y+=25;

},


}

Phaser.Utils.mixinPrototype(Stadistics.prototype, mixins);
