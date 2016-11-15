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

	//reemplazar por imagen de boca
    playerOne = curva=game.add.sprite(350,70, usuario["avatar"]);
    playerOne.scale.setTo(.3, .3);
    playerTwo = curva=game.add.sprite(650,70, this.oponente.imagen);
    playerTwo.scale.setTo(.3, .3);
   //self.syncVariables();
   self = this;
   console.log(resultadoPartida);
   localStorage["PartidosGanados"];
   localStorage["PartidosPerdidos"];

    //seteadas en cero por el momento;
    //puntosUser=0;
    //puntosComputer=0;

    //Cuando Setermine la edicion volver a declarar sin inicializar.

    localStorage["TotalPartidaUser"] = puntosUser;
    localStorage["TotalPartidaComputer"] = puntosComputer;

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


    var botones=self.generateButtonsInSplash([ ['VOLVER A JUGAR', self.Restart],['MENU', self.MainMenu]]);

    botones.position= {x:this.game.width/2 - botones.width/2-20, y:this.game.height-botones.height*2}


    var puntajeStyle = { font: 'bold 16pt CondensedLight', fill: '#ffff56'};
    var partidaStyle = { font: 'bold 35pt CondensedLight', fill: 'white'};



    if(puntosUser > puntosComputer){

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

    //  game.add.text(10, 200, "Partidos Ganados: "+ localStorage["PartidosGanados"], puntajeStyle);
    //  game.add.text(10, 220, "Partidos Perdidos: "+ localStorage["PartidosPerdidos"], puntajeStyle);


    // var word=game.add.text(x, y, stats[n].title, puntajeStyle2);
    // var number=game.add.text(group.width-70,y,localStorage[stats[n].key], puntajeStyle2);
    mm=240;
      xx=230;

	var n=1;
	game.add.text(250, mm, "Total", { font: 'bold 15pt CondensedLight', fill: 'white'});
	//game.add.text(850, mm,stats[n].point, { font: 'bold 15pt CondensedLight', fill: 'white'});
	game.add.text(550, mm,resultadoPartida.puntosNuevos+' pts.', { font: 'bold 15pt CondensedLight', fill: 'white'});
	mm+=40;
      xx+=40;
	$.each(resultadoPartida.detalle,function(index,value){
		if(n==0){
        game.add.text(250, mm, index, { font: 'bold 15pt CondensedLight', fill: 'white'});
        //game.add.text(850, mm,stats[n].point, { font: 'bold 15pt CondensedLight', fill: 'white'});
        game.add.text(550, mm,value[1]+' pts.', { font: 'bold 15pt CondensedLight', fill: 'white'});
         self.checkValue(value[0], 700, mm);

      }else{
        game.add.text(250, mm, index, puntajeStyle);
        //game.add.text(550, mm,stats[n].point, puntajeStyle);
        game.add.text(850, mm,value[1]+' pts.', puntajeStyle);
        self.createLineGlobal(150,xx,950, false, 0x797979);
        self.checkValue(value[0], 700, mm);

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

  checkValue: function(data, x, y){


     switch($.type(data)){
       case "string":
       if(data.length!=0){
         console.log("es string");
         this.game.add.sprite(x+15, y, 'estrella').scale.setTo(0.5,.5);
         game.add.text(x+35, y+2, data, { font: " 15px CondensedLight", fill: "#fff03a", align: "center" })
       }

       break;
       case "array":
         console.log(data);

         for(var i=0; i<data.length;i++){
           if(data[i]=="0"){
             this.game.add.sprite(x, y, 'noassert').scale.setTo(.9,.9);

            }else{
              this.game.add.sprite(x, y, 'assert').scale.setTo(.9,.9);

            }
              x+=20;
         }

       break;
     }

     return;
  },


};


Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
