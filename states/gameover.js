var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },


  create: function () {

    self.createBackground(false);
    fondoMusic.mute= true;
    activateSonido=false;

    curva=game.add.sprite(0,0, 'curva_alta');
    curva.scale.setTo(0.45,0.5);
    curva.position = {x:this.game.width/2-curva.width/2, y:150};
    curva.fixedToCamera=true;
    background.add(curva);


	if(!modoMultiplayer){
    playerTwo =game.add.sprite(650,70, oponente["avatar"]);
    playerTwo.scale.setTo(.3, .3);
    console.log(playerTwo.height +' '+ playerTwo.width);
	}else{
		var bmd = game.make.bitmapData(367, 482);

		//	And create an alpha mask image by combining pic and mask from the cache
		console.log(oponente["avatar"]);
		bmd.alphaMask(oponente["avatar"], 'player');


		playerTwo= game.add.image(650, 70, bmd);
		playerTwo.scale.setTo(.3,.3);
	}


	 if(modoMultiplayer){
	var bmd = game.make.bitmapData(367, 482);


	bmd.alphaMask(usuario["avatar"], 'player');


	var auxImg= game.add.image(350, 70, bmd);
	auxImg.scale.setTo(.3,.3);

	}else{
		playerTwo = game.add.sprite(350,70, usuario["avatar"]);
		playerTwo.scale.setTo(.3, .3);
	}

    // test

   //self.syncVariables();
   self = this;

   console.log(resultadoPartida);
   localStorage["PartidosGanados"];
   localStorage["PartidosPerdidos"];



    localStorage["TotalPartidaUser"] = this.puntosUser;
    localStorage["TotalPartidaComputer"] = this.puntosComputer;

    ganaste="Ganaste";
    perdiste="Perdiste";
    empate="Empate";
    ganados=0;
    perdidos=0;

    //VARIABLES DE Prueba

    stats=[
    {key:"puntosBocaFan",title:"PUNTOS BOCA FAN", point:''},
    {key:"TotalAtajados",title:"PENALES ATAJADOS",point:5},
    {key:"TotalConvertidos",title:"PENALES CONVERTIDOS", point:5},
    {key:"RachaAtajados",title:"VALLA INVICTO", point:5},
    {key:"RachaAtajados",title:"DELANTERA LETAL", point:5},

    ];

    //VARIABLES DE PRUEBA

	//Variable global resultadoPartida tiene los puntos ganados en esta partida (puntosNuevos), un array con los puntos detallados con key-->value (detalle), los puntos totales actualizados(puntosTotales).
	console.log(resultadoPartida);


    var titleStyle = { font: 'bold 60pt CondensedLight', fill: '#FDFFB5', align: 'center'};

    search= game.add.text(0, 200, 'Buscando oponente', { font: "bold 60px RobotoBold", fill: "#fff03a" });
    search.x= game.world.width/2-search.width/2;
    search.visible=false;


    this.addMenuOptionInnerPrueba('MENU', function () {

     self.MainMenu();

   },270, 70, 1);

  if(modoMultiplayer){
    this.btnRevancha=this.addMenuOptionInnerPrueba('REVANCHA    ', function () {
		Emit("revancha",{msg:1});
		 this.game.state.start("Versus");
       console.log("Quiero revancha");

     },270,70, 1);


     timer = game.time.create();
     timerEvent = timer.add(Phaser.Timer.MINUTE * 0+ Phaser.Timer.SECOND * 20, this.endTimer, this);
     timer.start();

     this.tiempo = game.add.text(810,545, '20', { font: '20pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464' });
     this.tiempo.setShadow(0,2, '#ffffbd ', 0);
     this.tiempo.visible=true;


	
  }else{
    this.addMenuOptionInnerPrueba('VOLVER A JUGAR', function () {

       self.Restart();

     },270,70, 1);
  }

console.log("entra 1");

    // botones.position= {x:this.game.width/2 - botones.width/2-20, y:this.game.height-botones.height*2}


    var puntajeStyle = { font: 'bold 16pt CondensedLight', fill: '#ffff56'};
    var partidaStyle = { font: 'bold 35pt CondensedLight', fill: 'white'};



    if(this.puntosUser > this.puntosComputer){

      // resultado = game.add.text(420, 250, 'Ganaste', { font: " 60px TheMinion", fill: "white", align: "center" });
      localStorage["PartidosGanados"]=  (parseInt(localStorage["PartidosGanados"]) || 0) + 1;
      localStorage["RachaGanados"] = (parseInt(localStorage["RachaGanados"]) || 0) + 1;
      localStorage["RachaPerdidos"] = 0;


    }else{

      // resultado = game.add.text(420, 250, 'Perdiste', { font: " 60px TheMinion", fill: "white", align: "center" });
      localStorage["PartidosPerdidos"]= (parseInt(localStorage["PartidosPerdidos"]) || 0) + 1;
      localStorage["RachaGanados"] = 0;
      localStorage["RachaPerdidos"] = (parseInt(localStorage["RachaPerdidos"]) || 0) + 1;

    };

console.log("entra 2");
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

     game.add.text(520, 100, localStorage["TotalPartidaUser"], partidaStyle);
     game.add.text(550, 100, "- "+localStorage["TotalPartidaComputer"], partidaStyle);

    mm=240;
      xx=230;

	var n=1;
	game.add.text(250, mm, "Total", { font: 'bold 15pt CondensedLight', fill: 'white'});

	game.add.text(850, mm,resultadoPartida.puntosNuevos+' pts.', { font: 'bold 15pt CondensedLight', fill: 'white'});
	mm+=40;
      xx+=40;
	 var puntosObj;

	$.each(resultadoPartida.detalle,function(index,value){
		if(n==0){
        game.add.text(250, mm, index, { font: 'bold 15pt CondensedLight', fill: 'white'});
		 var auxT=game.add.text(900, mm,value[1]+' pts.', puntajeStyle);
		auxT.anchor.set(1,0);
		auxT.align="right";
         self.checkValue(value[0], 700, mm);

      }else{
        game.add.text(250, mm-3, index, puntajeStyle);

        var auxT=game.add.text(900, mm-3,value[1]+' pts.', puntajeStyle);
		auxT.anchor.set(1,0);
		auxT.align="right";
        self.createLineGlobal(200,xx,950, false, 0x797979);
        self.checkValue(value[0], 700, mm+4);

      }

	  n++;
	   mm+=40;
      xx+=40;
	});

    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px CondensedLight", fill: "red", align: "center" });
    search.visible=false;

  },

  isFloat: function(n,self) {
    return n === +n && n !== (n|0);
  },

  listenerSearch: function(msg){
      search.visible=false;
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

  Restart: function(){
    search.visible=true;
    Emit("buscarPartida",this.oponente.id,"partidaEncontrada","listenerSearch",self);
  },

  MainMenu: function(){
    this.game.state.start("GameMenu");
  },

  render: function () {
	if (timer.running) {
          this.tiempo.setText(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)));
    }
  },

  endTimer: function() {
      timer.stop();
      //self.MainMenu();
	  self.btnRevancha.visible=false;
	  self.tiempo.visible=false;
  },

  formatTime: function(s) {
      var minutes = ''+Math.floor(s / 60);
      var seconds = (s - minutes * 60);
      return seconds;
  },


};


Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
