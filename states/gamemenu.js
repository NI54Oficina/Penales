var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 10,
    startX: 600
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX+300, 100, "Penales !", {
      font: 'bold 60pt BitterBold',
      fill: 'white',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

  },

  create: function () {

    self=this;


    game.add.sprite(0, 0, 'menu-bg').scale.setTo(.80,.80);

    var graphics = game.add.graphics(100, 100);

    self.createSoundGraphics();



    // this.addMenuOption('Selectplayer_2', function () {
    //   game.state.start("Selectplayer_2");
    // });

     this.addMenuOption('JUGAR', function () {
      game.state.start("Selectplayer");
    }).x=700;


    /*this.addMenuOption('DESAFÍO \ntwo', function () {

      game.state.start("Selectplayer_2");
    }).x=600;*/

    this.addMenuOption('ESTADÍSTICAS', function () {
      game.state.start("Stadistics");
    }).x=700;

    // this.addMenuOption('INSTRUCCIONES', function () {
    //   self.notification('INSTRUCCIONES', "asjanskjda aksjdnajksd askdkajsd asdaksjd asdakjsd asdaksjd asdkjajksd asdajksd aksdkajsnkd", [['Boton de Prueba', self.testGlobal],['Boton de Prueba', self.testGlobal],['Boton de Prueba', self.testGlobal]]);
    //
    // }).x=600;

      instrucciones= game.add.text(790, 490, "INSTRUCCIONES", { font: 'bold 18pt RobotoBold', fill: '#ffc400'});
      bottom=self.createLineGlobal(-80,instrucciones.height+10,270, false, 0xffc400);

      topLine=self.createLineGlobal(-80,-15, 270,false, 0xffc400);
      left=self.createLineGlobal(-80,-15,-80, false, 0xffc400,instrucciones.height+10 );
      right=self.createLineGlobal(270,-15,270, false, 0xffc400,instrucciones.height+10 );

      instrucciones.addChild(bottom);
      instrucciones.addChild(topLine);
      instrucciones.addChild(left);
      instrucciones.addChild(right);



      var onOver = function (target) {

      target.alpha=.4;


      };

      var onOut = function (target) {
        target.alpha=1;

      };

      instrucciones.inputEnabled = true;
      instrucciones.input.useHandCursor = true;
      instrucciones.events.onInputDown.add(function(){self.notification('INSTRUCCIONES',true);});

      instrucciones.events.onInputOver.add(onOver,self);
      instrucciones.events.onInputOut.add(onOut,self);


    // this.addMenuOption('GAMEOVER', function () {
    //   game.state.start("GameOver");
    // });


    //Creacion variables en localStorage


      localStorage["TotalPartidaAtajados"] = 0;
      localStorage["TotalPartidaConvertidos"] = 0;
      localStorage["TotalPartidaErrados"] = 0;
      localStorage["TotalPartidaNoAtajados"] = 0;
      localStorage["TotalPartidaUser"] = 0;
      localStorage["TotalPartidaComputer"] = 0;


    if(localStorage.getItem("PartidosGanados")===null){
       localStorage["PartidosGanados"] = 0;
       localStorage["PartidosPerdidos"] = 0;
       localStorage["TotalAtajados"] = 0;
       localStorage["TotalConvertidos"] = 0;
       localStorage["TotalErrados"] = 0;
       localStorage["TotalNoAtajados"] = 0;
       localStorage["RachaGanados"] = 0;
       localStorage["RachaPerdidos"] = 0;
       localStorage["MejorRachaConvertida"] = 0;
       localStorage["RachaConvertidos"] = 0;
       localStorage["MejorRachaAtajados"] = 0;
       localStorage["RachaAtajados"] = 0;
       localStorage["PeorRachaErrados"] = 0;
       localStorage["RachaErrados"] = 0;
       localStorage["PeorRachaNoAtajados"] = 0;
       localStorage["RachaNoAtajados"] = 0;


    }
 //self.notification("asdkjasndjansdnajskd askdjakjsdkajsdkjasndkjasd asjdkajsdjkasd kjasdjkashdjkaskdij");

  //Fin Creacion ariables en localStorage
	//game.world.setBounds(0, 0, 10000, 10000);
	//this.game.camera.x=0;
	//this.game.camera.y=0;
  },

  update:function(){
	//console.log("entra update")  ;

	//this.game.camera.x+=100;
	//this.game.camera.y=0;
  },

  render:function(){


	 //game.debug.cameraInfo(game.camera, 32, 32);
  },

  test:function(){
	  console.log("test entra");
  },

  listenerSearch: function (msg){



    this.test();
    console.log(msg);
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




};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
