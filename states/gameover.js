var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },


  create: function () {

    self.createBackground(false);

    curva=game.add.sprite(0,0, 'curva_alta');
    curva.scale.setTo(0.45,0.5);
    curva.position = {x:this.game.width/2-curva.width/2, y:150};
    curva.fixedToCamera=true;
    background.add(curva);

    playerOne = curva=game.add.sprite(350,70, 'img-1');
    playerOne.scale.setTo(.3, .3);
    playerTwo = curva=game.add.sprite(650,70, 'img-2');
    playerTwo.scale.setTo(.3, .3);
   //self.syncVariables();
   self = this;
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

    ];

    //VARIABLES DE PRUEBA


    var titleStyle = { font: 'bold 60pt CondensedLight', fill: '#FDFFB5', align: 'center'};

    search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px CondensedLight", fill: "red", align: "center" });

    search.visible=false;


    // this.addMenuOptionInner('Play Again', function (e) {
    //   search.visible=true;
    //   Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);
    // });

    // this.addMenuOptionInner('Main Menu', function (e) {
    //   this.game.state.start("GameMenu");
    // })

    var botones=self.generateButtonsInSplash([ ['VOLVER A JUGAR', self.Restart],['MENU', self.MainMenu]]);

    botones.position= {x:this.game.width/2 - botones.width/2-20, y:this.game.height-botones.height*2}


    var puntajeStyle = { font: 'bold 16pt CondensedLight', fill: 'yellow'};
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
      xx=220;
    for(var n=0; n< stats.length; n++){

      if(n==0){
        game.add.text(250, mm, stats[n].title, { font: 'bold 15pt CondensedLight', fill: 'white'});
        game.add.text(850, mm,stats[n].point, { font: 'bold 15pt CondensedLight', fill: 'white'});
        game.add.text(550, mm,localStorage[stats[n].key]+' pts.', { font: 'bold 15pt CondensedLight', fill: 'white'});


      }else{
        game.add.text(250, mm, stats[n].title, puntajeStyle);
        game.add.text(550, mm,stats[n].point, puntajeStyle);
        game.add.text(850, mm,localStorage[stats[n].key]+' pts.', puntajeStyle);
        self.createLineGlobal(150,xx,950, false, 0x797979);

      }

      mm+=60;
      xx+=60;

    }

    //   game.add.text(300, 250, "PUNTOS BOCAFAN: 0 ", { font: 'bold 15pt CondensedLight', fill: 'white'});
    //       game.add.text(300, 250,localStorage[stats[n].key], puntajeStyle);
    //       self.createLineGlobal(200,280,900, false, 0x797979);
    //  game.add.text(300, 310, "PENALES ATAJADOS: "+ localStorage["TotalAtajados"], puntajeStyle);
    //       self.createLineGlobal(200,340,900, false, 0x797979);
    //  game.add.text(300, 370, "PENALES CONVERTIDOS: "+ localStorage["TotalConvertidos"], puntajeStyle);
    //       self.createLineGlobal(200,400,900, false, 0x797979);
     //
    //  game.add.text(300, 420, "PREMIOS ", puntajeStyle);

    //  game.add.text(10, 280, "Total Errados: "+localStorage["TotalErrados"], puntajeStyle);
    //  game.add.text(10, 300, "Total No Atajados: "+localStorage["TotalNoAtajados"], puntajeStyle);
    //  game.add.text(10, 320, "Racha Ganados: "+localStorage["RachaGanados"], puntajeStyle);
    //  game.add.text(10, 340, "Racha Perdidos: "+ localStorage["RachaPerdidos"], puntajeStyle);
    //  game.add.text(10, 360, "Racha Atajados: "+localStorage["RachaAtajados"], puntajeStyle);
    //  game.add.text(10, 380, "Racha Convertidos: "+localStorage["RachaConvertidos"], puntajeStyle);
    //  game.add.text(10, 400, "Racha Errados: "+localStorage["RachaErrados"], puntajeStyle);
    //  game.add.text(10, 420, "Racha No Atajados: "+localStorage["RachaNoAtajados"] , puntajeStyle);
    //  game.add.text(10, 440, "Mejor Racha Atajados: "+localStorage["MejorRachaAtajados"], puntajeStyle);
    //   game.add.text(10, 460, "Mejor Racha Convertida: "+localStorage["MejorRachaConvertida"], puntajeStyle);
    //   game.add.text(700, 200, "Peor Racha Errados: "+localStorage["PeorRachaErrados"], puntajeStyle);
    //   game.add.text(700, 220, "Peor Racha No Atajados: "+localStorage["PeorRachaNoAtajados"], puntajeStyle);
    //   game.add.text(700, 240, "Efectividad: "+ efectividad , puntajeStyle);
    //   game.add.text(700, 260, "Eficiencia como arquero: "+ efiArq +"%" , puntajeStyle);
    //   game.add.text(700, 280, "Eficiencia como pateador: "+ efiPat +"%" , puntajeStyle);
    //
    // game.add.text(10, 480, "Total en partida no atajados: "+ localStorage["TotalPartidaNoAtajados"] , partidaStyle);
    // game.add.text(10, 500, "Total en partida Errados: "+ localStorage["TotalPartidaErrados"] , partidaStyle);
    // game.add.text(10, 520, "Total en partida convertidos "+localStorage["TotalPartidaConvertidos"], partidaStyle);
    // game.add.text(10, 540, "Total en partida atajados: "+localStorage["TotalPartidaAtajados"] , partidaStyle);
    // game.add.text(10, 560, "Eficiencia como arquero en partida: "+ efiParArq +"%" , partidaStyle);
    // game.add.text(10, 580, "Eficiencia como pateador en partida: "+ efiParPat +"%" , partidaStyle);

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
    Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);
  },

  MainMenu: function(){
    this.game.state.start("GameMenu");
  },


};


Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);
