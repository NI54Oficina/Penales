
var mixins = {



  /* Función para generar usuarios Demo y trabajar con ellos.
      Devuelve un array de objetos(los usuarios).
  */
  generateDemoUsers:function(){

    usuario={
      nombre:'FRANCISCO SERANTE',
      racha:  51,
      ganados:0,
      perdidos: 10,
      avatar:'img-1'

    };

    usuario2={
      nombre:'MELANIA MIRANDA',
      racha:  100,
      ganados:100,
      perdidos:100,
      avatar:'img-2'

    };

    usuario3={
      nombre:'CRISTIANO RONALDO',
      racha:  100,
      ganados:100,
      perdidos:100,
      avatar:'img-3'

    };

    usuario4={
      nombre:'DIEGO MARADONA',
      racha:  100,
      ganados:100,
      perdidos:100,
      avatar:'img-4'

    };

    usuarios=[usuario, usuario2,usuario3, usuario4];

    return usuarios;
  },

  /* Crea los botones ordenadamente en la pantalla.
    Usada solamente para la pantalla de GameMenu
  */

  addMenuOption: function(text, callback, className) {

    self=this;



    className || (className = this.menuConfig.className || 'default');

    var text = self.cortarPalabra(text);


    var x=0;
	  this.menuConfig.startX=100;

    // aplicando el background de cada texto

    var Boton =game.add.group();

    var   myBitmap = this.game.add.bitmapData(370, 90);
    var  grd=myBitmap.context.createLinearGradient(0,0,0,45);


    grd.addColorStop(0,"#0068db");
    grd.addColorStop(0.9,"#0259a3");
    grd.addColorStop(0.93,"#0259a3");
    // grd.addColorStop(0.55,"#003192");
    grd.addColorStop(1,"#013173");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

    // aplicando el background de cada texto

    var 	hoverBit = this.game.add.bitmapData(370, 90);
    var  hoverGra=myBitmap.context.createLinearGradient(0,0,0,90);
    hoverGra.addColorStop(1,"white");
    hoverBit.context.fillStyle=hoverGra;
    hoverBit.context.fillRect(0,0,this.game.height,this.game.width);
    hover = this.game.add.sprite(0,0, hoverBit);
    hover.alpha=0;


  	Boton.position.y=this.optionCount*130+this.menuConfig.startY+70;
  	Boton.position.x= this.menuConfig.startX;
    var y = 0;
    var   background = this.game.add.sprite(x-50,0, myBitmap);
    down= this.game.make.sprite(-20,60, 'brillodown');
    up= this.game.make.sprite(140,-11, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);

  	var testMask=game.add.graphics(0, 0);
  	testMask.beginFill(0xFFFF0B, 0.5);
  	testMask.drawRoundedRect(0, 0, 365, 85,10);
  	testMask.endFill();
  	Boton.add(testMask);
  	Boton.mask=  testMask;

    var txt = game.add.text(x, (this.optionCount * 150) + y,text[0],style.navitem[className]  );
    txt.setShadow(0,5, 'rgba(0,0,0,0.5)', 0);


    if(text[1]!= undefined){

    var childTxt = this.game.add.sprite(0,background.height/2-15,text[1]);

    childTxt.position.x=background.width-100+childTxt.width/2;


    background.addChild(childTxt);
    };

    txt.position.y= ((background.position.y+background.height/2))-txt.height/2;

    background.position.x= x;

    txt.position.x= background.position.x+background.width/2-txt.width/2;


    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);

    this.world.bringToTop(txt);

    var onOver = function (target) {
      txt.useHandCursor = true;
      hover.alpha=.2;

    };

    var onOut = function (target) {
      txt.useHandCursor = false;
      hover.alpha=0;

    };

    var onOverH = function (target) {
      target.alpha=.2;
    };

    var onOutH = function (target) {
      target.alpha=0;
    };



    Boton.add(background);


    Boton.add(txt);


        txt.events.onInputOver.add(onOver, self);
        txt.events.onInputOut.add(onOut,self);

	 Boton.add(hover);
        txt.events.onInputOver.add(onOver, Boton);
        txt.events.onInputOut.add(onOut,Boton);


        hover.events.onInputOver.add(onOverH, this);
        hover.events.onInputOut.add(onOutH, this);

    Boton.forEach(function(item) {
      item.inputEnabled = true;
      item.input.useHandCursor = true;
      item.events.onInputUp.add(callback);
    }, this);



    this.optionCount ++;

    return Boton;
  },


  /* Corta oraciones por un /n las devuelve en un array
  */

  cortarPalabra(target){

    var i=0;
    var subpalabra=target;

    var target=target.split('\n');

    return target;

  },




    /* Crea los botones ordenadamente en la pantalla.
        Usada solamente para la pantalla internas.
    */
addMenuOptionInnerPrueba: function(text, callback, x, y, align){
  var Boton =game.add.group();

if(align ==0){
  var optionStyle = { font: '35pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};
    Boton.position={y:this.optionCount*530};
}else if(align==1){
  var optionStyle = { font: '20pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};
      Boton.position={x:this.optionCount*350-100,y:530};
}




    var 	myBitmap = this.game.add.bitmapData(x, y);
    var  grd=myBitmap.context.createLinearGradient(0,0,0,y/2);
    grd.addColorStop(0,"#fbe43e");
    grd.addColorStop(0.9,"#fbe43e");
    grd.addColorStop(1,"#cea428");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
    var background = this.game.add.sprite(0,0, myBitmap);



    //capa de mouseHover

    var hoverBit = this.game.add.bitmapData(x, y);
    var  hoverGra=myBitmap.context.createLinearGradient(0,0,0,y);
    hoverGra.addColorStop(1,"white");
    hoverBit.context.fillStyle=hoverGra;
    hoverBit.context.fillRect(0,0,this.game.height,this.game.width);
    hover = this.game.add.sprite(0,0, hoverBit);
    hover.alpha=0;

    //
    var testMask=game.add.graphics(0, 0);
    testMask.beginFill(0xFFFF0B, 0.5);
    testMask.drawRoundedRect(0, 0,background.width ,y-10,5);
    testMask.endFill();
   //
    Boton.add(testMask);
     background.mask=testMask;
     hover.mask=testMask;


  //  background.position.x= this.game.width/2  - background.wid
    down= this.game.make.sprite(-20,35, 'brillodown');
    up= this.game.make.sprite(-10,-15, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);

    Boton.add(down);
    Boton.add(up);




  // aplicando el background de cada texto

  var txt = game.add.text(0, 15 , text, optionStyle);
  txt.setShadow(0,2, '#ffffbd ', 0);





  txt.position.x=background.width/2 - txt.width/2;
  // txt.position.y= background.height/2 - txt.heigth/2;

  // Boton.position.x=this.game.width/2 - background.width/2;
    // Boton.position.x=this.game.width/2 - background.width/2;

  this.world.bringToTop(txt);
  // this.world.bringToTop(hover);
  var onOverH = function (target) {
    target.alpha=.2;
  };

  var onOutH = function (target) {
    target.alpha=0;
  };

  var onOver = function (target) {
    // target.fill = "black";
    // target.stroke = "rgba(200,200,200,0.5)";
    txt.useHandCursor = true;
    hover.alpha=.2;
  };

  var onOut = function (target) {
    // target.fill = "#1b1464";
    // target.stroke = "#1b1464";
    txt.useHandCursor = false;
    hover.alpha=0;
  };
          Boton.add(background);
        Boton.add(txt);

  txt.events.onInputOver.add(onOver, this);
  txt.events.onInputOut.add(onOut, this);

        Boton.add(hover);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

  hover.events.onInputOver.add(onOverH, this);
  hover.events.onInputOut.add(onOutH, this);


  Boton.forEach(function(item) {
    item.inputEnabled = true;
    item.input.useHandCursor = true;
    item.events.onInputUp.add(callback);
    // item.events.onInputOver.add(onOver, this);
    // item.events.onInputOut.add(onOut, this);

  }, this);

  this.optionCount ++;




    return Boton;


},
  addMenuOptionInner: function(text, callback) {

        var optionStyle = { font: '35pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};

      // aplicando el background de cada texto

        var Boton =game.add.group();

        Boton.position={y:this.optionCount*530};

        var 	myBitmap = this.game.add.bitmapData(450, 80);
        var  grd=myBitmap.context.createLinearGradient(0,0,0,40);
        grd.addColorStop(0,"#fbe43e");
        grd.addColorStop(0.9,"#fbe43e");
        grd.addColorStop(1,"#cea428");
        myBitmap.context.fillStyle=grd;
        myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
        var background = this.game.add.sprite(0,0, myBitmap);

        //capa de mouseHover

        var 	hoverBit = this.game.add.bitmapData(450, 80);
        var  hoverGra=myBitmap.context.createLinearGradient(0,0,0,80);
        hoverGra.addColorStop(1,"white");
        hoverBit.context.fillStyle=hoverGra;
        hoverBit.context.fillRect(0,0,this.game.height,this.game.width);
        hover = this.game.add.sprite(0,0, hoverBit);
        hover.alpha=0;

        //


      //  background.position.x= this.game.width/2  - background.wid
        down= this.game.make.sprite(-20,45, 'brillodown');
        up= this.game.make.sprite(150,-15, 'brilloup');
        down.scale.setTo(0.5,0.5);
        up.scale.setTo(0.5,0.5);

        Boton.add(down);
        Boton.add(up);
        Boton.add(background);



      // aplicando el background de cada texto

      var txt = game.add.text(0, 10 , text, optionStyle);
      txt.setShadow(0,3, '#ffffbd ', 0);

      Boton.add(hover);
      Boton.add(txt);



      txt.position.x=background.width/2 - txt.width/2;

      Boton.position.x=this.game.width/2 - background.width/2;

      this.world.bringToTop(txt);
      // this.world.bringToTop(hover);

      var onOver = function (target) {
        // target.fill = "black";
        // target.stroke = "rgba(200,200,200,0.5)";
        txt.useHandCursor = true;
        hover.alpha=.2;
      };

      var onOut = function (target) {
        // target.fill = "#1b1464";
        // target.stroke = "#1b1464";
        txt.useHandCursor = false;
        hover.alpha=0;
      };


      txt.events.onInputOver.add(onOver, this);
      txt.events.onInputOut.add(onOut, this);

      hover.events.onInputOver.add(onOver, this);
      hover.events.onInputOut.add(onOut, this);


      Boton.forEach(function(item) {
        item.inputEnabled = true;
        item.input.useHandCursor = true;
        item.events.onInputUp.add(callback);

      }, this);

      this.optionCount ++;


         var testMask=game.add.graphics(0, 0);
         testMask.beginFill(0xFFFF0B, 0.5);
         testMask.drawRoundedRect(0, 0,background.width ,70,10);
         testMask.endFill();
        //
         Boton.add(testMask);
        background.mask=testMask;
        hover.mask=testMask;

        return Boton;



  },


  /* Crea la pantalla de Versus que aparece tipo splash antes de comenzar el juego.
     Devuelve todo en un grupo.
  */
  pantallaOponente: function (target) {
    self = target;

    screenOponente= game.add.group();
    screenOponente.width = this.game.width;
    screenOponente.height = this.game.height;


    background=self.createBackground(true);



    leftPlayer=game.add.sprite(-50,130, 'player');
    leftPlayer.scale.setTo(.8);
    leftPlayer.alpha=0;



    rightPlayer=game.add.sprite(this.game.width+50, 130, 'player');
    rightPlayer.scale.setTo(.8);
    rightPlayer.alpha=0;

    var textTitle = game.add.text(0, 250, "VS",{ font: '60px BitterBold', fill: 'white', align: 'center'});
    textTitle.position.x= this.game.width/2 - textTitle.width/2;
    textTitle.setShadow(-5, -5, 'rgba(0,0,0,0.5)', 15);


    var tweenA= game.add.tween(rightPlayer).to({x:this.game.width/2 + 120}, 200, 'Linear');
    var tweenB= game.add.tween(leftPlayer).to({x:this.game.width/2 - leftPlayer.width-100}, 200, 'Linear');
    var tweenC =game.add.tween(leftPlayer).to( {alpha:1}, 200, 'Linear');
    var tweenD =game.add.tween(rightPlayer).to( {alpha:1}, 200, 'Linear');

    tweenA.start();
    tweenB.start();
    tweenC.start();
    tweenD.start();

    var usuarios= self.generateDemoUsers(self);


    datos=game.add.group();
    datos.width=800;
    datos.height=200;

    puntajeStyle = { font: '15pt CondensedLight', fill: 'yellow'};
    var nombreDatos1 = game.add.text(330, 0, "RACHA ACTUAL",puntajeStyle);

    var numberDatos1 = game.add.text(130, 0,usuarios[1].racha,puntajeStyle);
    var datos1 = game.add.text(650, 0,usuarios[2].racha,puntajeStyle);
    var line1=self.createLineGlobal(0,30,800, true, 0x797979);

    var nombreDatos2 = game.add.text(320, 50, "PARTIDOS GANADOS",puntajeStyle);
    var numberDatos2 = game.add.text(130, 50, usuarios[1].ganados,puntajeStyle);
    var datos2 = game.add.text(650, 50,usuarios[2].ganados,puntajeStyle);
    var line2=self.createLineGlobal(0,80,800, true, 0x797979);


    var nombreDatos3 = game.add.text(320, 100, "PARTIDOS PERDIDOS",puntajeStyle);
    var numberDatos3 = game.add.text(130, 100, usuarios[1].perdidos,puntajeStyle);
    var datos3 = game.add.text(650, 100,usuarios[2].perdidos,puntajeStyle);
    var line3=self.createLineGlobal(0,130,800, true, 0x797979);


    datos.add(nombreDatos1);
    datos.add(nombreDatos2);
    datos.add(nombreDatos3);

    datos.add(numberDatos1);
    datos.add(numberDatos2);
    datos.add(numberDatos3);

    datos.add(datos1);
    datos.add(datos2);
    datos.add(datos3);

    datos.add(line1);
    datos.add(line2);
    datos.add(line3);

    datos.position={x: this.game.width/2 - datos.width/2, y: 450 };



    screenOponente.add(background);
    screenOponente.add(leftPlayer);
    screenOponente.add(rightPlayer);
    screenOponente.add(textTitle);
    screenOponente.add(datos);


    return screenOponente;

  },

/*  Crea Lineas horizontales(subrayado): recibe un X desde donde comienza la linea, hasta otro X,
    ,un Y que es constante,un booleno que determina si lleva o no sombra, y el codigo del color en hexagesimal.
    Devuelve un grupo con todo.

    hastaY es opcional---HABRIA QUE MODIFICARLO
*/

  createLineGlobal: function(desdeX,Y, hastaX, boolShadow, colorLineHexa, hastaY){

    var lineal= game.add.group();
    if(boolShadow){
      var graphicShadow = game.add.graphics(0, 0);
      graphicShadow.beginFill(0x000000);
      graphicShadow.lineStyle(5, 0x000000, 1);
      graphicShadow.moveTo(desdeX+1,Y-2);
      graphicShadow.lineTo(hastaX+1,Y-2);
      graphicShadow.endFill();
      graphicShadow.alpha=.1;
      lineal.add(graphicShadow);
    }

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(colorLineHexa);
    graphics.lineStyle(2, colorLineHexa, 1);
    graphics.moveTo(desdeX,Y);

    if(hastaY!=undefined){
      graphics.lineTo(hastaX,hastaY);
    }else{
      graphics.lineTo(hastaX,Y);
    }
    graphics.endFill();
    lineal.add(graphics);

    return lineal;

  },

  /* Activa y desactiva la Musica, utiliza las variables globales
      creadas en Splah.js
  */

  Musica: function(target){

    if(fondoMusic.mute ==true){
      target.loadTexture('musica-on', 0, false);

      fondoMusic.mute= false;
      fondoMusic.volume = 0.50;
      // fondoSonido.mute= false;

      activateSonido=true;

    }else{
      target.loadTexture('musica-off', 0, false);

      fondoMusic.mute= true;
      fondoMusic.volume = 0.50;
      // fondoSonido.mute= true;
      activateSonido=false;
    }

  },

  /*  Activa y desactiva el Sonido con una variable global y cambia los sprites,+

      creadas en Splah.js
  */

  Sonido: function(target){

    if(activateSonido){
      target.loadTexture('sonido-off', 0, false);

      activateSonido=false;
    }else{
      target.loadTexture('sonido-on', 0, false);

      activateSonido=true;
    }
  },

  /* Activa el sonido correspondiendo que debe ser enviado por parametro
  */
activateSound: function(target){
  if(activateSonido){
    fondoMusic.volume = 0.10;
    target.play();
    setTimeout(function(){
       fondoMusic.volume = 0.80;
    },1000);
  }
  return;
},



// Funcion de notificacion tipo modal.
//Recibe  un titulo, el texto interno, y la liosta de listas de nombre de boton+ funcion callback del mismo.
// parametro opcional

//type:: listaDeTuplasConNombreDeBotonYCallback -> [(nombreDeBoton, Callback)]

 notification(title,boolIns, text, listaDeTuplasConNombreDeBotonYCallback){

   var i=0;

   notificacionGroup= game.add.group();


     var notifBack = this.game.add.bitmapData(this.game.width,this.game.height);
     var  grd = notifBack.context.createLinearGradient(0,0,0,this.game.height);
     grd.addColorStop(0,"rgba(0,0,0,.7)");
     notifBack.context.fillStyle = grd;
     notifBack.context.fillRect(0,0,this.game.width,this.game.height);
     back=this.game.add.sprite(0,0,notifBack);
     back.inputEnabled=true;



  notificacionGroup.add(back);

      var splash = this.game.add.bitmapData(900,500);
      var  grd2 = splash.context.createLinearGradient(0,0,900,500);
      grd2.addColorStop(0,"#e8f3f9");
      grd2.addColorStop(1,"#e3f0fe");
      splash.context.fillStyle = grd2;
      splash.context.fillRect(0,0,this.game.width,this.game.height);
      board=this.game.add.sprite(0,0,splash);
      board.position={x:back.width/2-board.width/2, y:back.height/2-board.height/2};

  notificacionGroup.add(board);

      var x=game.add.text(50, 30, title, { font:  '35px AlfaSlab', fill: "#013884", align: "center"});
      x.setShadow(0, 2, ' #ffc400', 0);
      var line=self.createLineGlobal(20,75, 880, false, 0xffb204);
      x.position.x=board.width/2- x.width/2;

  board.addChild(x);
  board.addChild(line);

  if( text != undefined){
        var m=game.add.text(20, 100, text, { font:'20px CondensedLight', fill: "black", align: "left",wordWrap: true, wordWrapWidth:650});
        m.position.x=board.width/2- m.width/2;

   board.addChild(m);
  }


      if(listaDeTuplasConNombreDeBotonYCallback != undefined){
          var btns= self.generateButtonsInSplash(listaDeTuplasConNombreDeBotonYCallback);
          board.addChild(btns);
          btns.position = {x:board.width/2-btns.width/2, y:board.height-btns.height-20};

      }

      board.addChild(self.createLineGlobal(0,0, board.width, false, 0xffb204));
      board.addChild(self.createLineGlobal(0,board.height, board.width, false, 0xffb204));
      board.addChild(self.createLineGlobal(0,0,0, false, 0xffb204,board.height ));
      board.addChild(self.createLineGlobal(board.width,0,board.width, false, 0xffb204,board.height ));


            screen1=self.screen1();
            screen1.x=board.width/2-screen1.width/2;
            screen1.y=100;

            screen2=self.screen2();
            screen2.x=board.width/2-screen2.width/2;
            screen2.y=100;
            screen2.alpha=0;

            screen3=self.screen3();
            screen3.x=board.width/2-screen3.width/2;
            screen3.y=100;
            screen3.alpha=0;

            board.addChild(screen1);
            board.addChild(screen2);
            board.addChild(screen3);

      right=this.game.add.sprite(board.width-75, 100,'next-instrucciones');
      board.addChild(right);
      right.inputEnabled = true;
      right.input.useHandCursor = true;

      pantallas=[screen1, screen2, screen3];

      right.events.onInputDown.add(function(){

        left.visible=true;
      if(i < pantallas.length-1){
        i++;
        pantallas.forEach(function(element){game.add.tween(element).to( { alpha:0}, 100, 'Linear', true, 0, 0, false);}, this);
        game.world.bringToTop(pantallas[i]);
        game.add.tween(  pantallas[i]).to( { alpha:1}, 100, 'Linear', true, 0, 0, false);
        i==pantallas.length-1? right.visible=false:right.visible=true;

      }

      });


      left=this.game.add.sprite(50, 100,'prev-instrucciones');
      left.inputEnabled = true;
      left.input.useHandCursor = true;
      board.addChild(left);

      left.events.onInputDown.add(function(){
        right.visible=true;

      if(i > 0){
        i--;

        pantallas.forEach(function(element){game.add.tween(element).to( { alpha:0}, 100, 'Linear', true, 0, 0, false);}, this);
        game.world.bringToTop(pantallas[i]);
        game.add.tween(  pantallas[i]).to( { alpha:1}, 100, 'Linear', true, 0, 0, false);

        i==0? left.visible=false:left.visible=true;

      }

      });


      var exit=game.add.text(board.width+board.x-23, board.y-43, 'x', { font:  '40px CondensedLight', fill: 'white', align: "center"});
      exit.scale.setTo(1.3,1);
  notificacionGroup.add(exit);

  notificacionGroup.alpha=0;

  game.add.tween(notificacionGroup).to( { alpha: 1 }, 500, 'Linear', true, 0, 0, false);
  game.world.bringToTop(notificacionGroup);

      exit.inputEnabled = true;
      exit.input.useHandCursor = true;
      exit.events.onInputDown.add(function(){game.add.tween(notificacionGroup).to( { alpha: 0 }, 500, 'Linear', true, 0, 0, false); notificacionGroup.destroy();instrucciones.alpha=1});

 },




screen1: function(){

    group1=game.add.group();
      number=game.add.text(0, 0, '1', { font:  '45px AlfaSlab', fill: "#013884", align: "center"});
      number.setShadow(0, -3, '#ffffbd ', 0);
      group1.add(number);
    group1.add(game.add.text(0, 80, 'Seleccioná el rival al que vas a enfrentar', { font:  '25px TheSansRegular', fill: "#013884", align: "center",wordWrap: true, wordWrapWidth:600}));
    group1.add(this.game.add.sprite(0,number.height,'sombra-instrucciones'));

    father= this.game.add.sprite(0,120,'img-3');
    father.scale.setTo(.65,.65);
    a=this.game.add.sprite(father.width-10,130,'img-4');
    a.scale.setTo(.3,.3);
    b=this.game.add.sprite(father.width+father.width/2-15,130,'img-5');
    b.scale.setTo(.3,.3);
    c=this.game.add.sprite(father.width-10,father.height-10,'img-1');
    c.scale.setTo(.3,.3);
    d=this.game.add.sprite(father.width+father.width/2-15,father.height-10,'img-2');
    d.scale.setTo(.3,.3);


    group1.add(father);
     group1.add(a);
     group1.add(b);
     group1.add(c);
     group1.add(d);

    //  group1.add(e);

    group1.children[0].x=group1.width/2-group1.children[0].width/2;
    group1.children[1].x=group1.width/2-group1.children[1].width/2;
    group1.children[2].x=group1.width/2-group1.children[2].width/2;



    //  group1.add();


     return group1;
},

screen2: function(){

    group1=game.add.group();
    number=game.add.text(0, 0, '2', { font:  '45px AlfaSlab', fill: "#013884", align: "center"});
    number.setShadow(0, -3, '#ffffbd ', 0);
    group1.add(number);
    group1.add(game.add.text(0, 100, 'Mantené pulsado sobre uno de los seis lugares del arco a donde vas a apuntar\n\n Probabilidades', { font:  '25px TheSansRegular', fill: "#013884", align: "center",wordWrap: true, wordWrapWidth:600}));
    group1.add(this.game.add.sprite(0,number.height,'sombra-instrucciones'));

    father= this.game.add.sprite(160,250,'arco-n');
    father.scale.setTo(.5,.5);

    a= this.game.add.sprite(20,250,'arco-0');
    a.scale.setTo(.5,.5);

    group1.add(this.game.add.sprite(210,280,'flechas-instrucciones'));

    group1.add(father);
     group1.add(a);


    //  group1.add(e);

    group1.children[0].x=group1.width/2-group1.children[0].width/2;
    group1.children[1].x=group1.width/2-group1.children[1].width/2;
    group1.children[2].x=group1.width/2-group1.children[2].width/2;



    //  group1.add();

     return group1;
},

screen3: function(){

    group1=game.add.group();
    number=game.add.text(0, 0, '3', { font:  '45px AlfaSlab', fill: "#013884", align: "center"});
    number.setShadow(0, -3, '#ffffbd ', 0);
    group1.add(number);
    group1.add(game.add.text(0, 90, 'Soltá cuando el\n indicador esté en la zona verde de la barra', { font:  '25px TheSansRegular', fill: "#013884", align: "center",wordWrap: true, wordWrapWidth:600}));
    group1.add(this.game.add.sprite(0,number.height,'sombra-instrucciones'));

    father= this.game.add.sprite(0,200,'instrucciones');
    father.scale.setTo(.9,.9);


    group1.add(father);


    group1.add(game.add.text(380, 275, 'Presición', { font:  '17px CondensedRegular', fill: "#013884", align: "center"}));

    group1.children[0].x=group1.width/2-group1.children[0].width/2;
    group1.children[1].x=group1.width/2-group1.children[1].width/2;
    group1.children[2].x=group1.width/2-group1.children[2].width/2;



    //  group1.add();

     return group1;
},



 /* Crea Botones Con el diseño de los splash(o no) para las notificaciones.
 Recibe listas de listas del nombre del boton con la funcion callback del mismo.
 */
//type:: listaDeTupla -> [(nombreDeBoton, Callback)]

 generateButtonsInSplash: function(listaDeTupla){

       buttons= game.add.group();
       positionY=0;
       positionX=0;

       for(var i=0; i< listaDeTupla.length; i++ ){

              var nombreBoton= game.add.text( 15,15, listaDeTupla[i][0], { font:  '25px RobotoBold', fill: '#1b1464', align: "center"});
              nombreBoton.setShadow(0,3, '#ffffbd ', 0);
              var 	hoverBit = this.game.add.bitmapData(450, 80);
              var  hoverGra=hoverBit .context.createLinearGradient(0,0,0,80);
              hoverGra.addColorStop(1,"white");
              hoverBit.context.fillStyle=hoverGra;
              hoverBit.context.fillRect(0,0,this.game.height,this.game.width);
              hover = this.game.add.sprite(0,0, hoverBit);
              hover.alpha=0;



              var colorBoton = this.game.add.bitmapData(230,nombreBoton.height+20);


              var  grd = colorBoton.context.createLinearGradient(0,0,0,30);
              grd.addColorStop(0,"#fbe43e");
              grd.addColorStop(0.9,"#fbe43e");
              grd.addColorStop(1,"#cea428");
              colorBoton.context.fillStyle = grd;
              colorBoton.context.fillRect(0,0,230,nombreBoton.height+20);
              var boton=this.game.add.sprite(10+(positionX*255),positionY,colorBoton);
              nombreBoton.x=boton.width/2-nombreBoton.width/2;

              var testMask=game.add.graphics(0, 0);
              testMask.beginFill(0x000000, 0.1);
              testMask.drawRoundedRect(0, 0,230 ,nombreBoton.height+20,5);
              testMask.endFill();

              boton.addChild(testMask);
              boton.mask=testMask;



                  var onOver = function (target) {
                    hover.alpha=.2;
                  };

                  var onOut = function (target) {
                    hover.alpha=0;
                  };




              boton.inputEnabled = true;
              boton.input.useHandCursor = true;
              nombreBoton.inputEnabled = true;
              nombreBoton.input.useHandCursor = true;
              hover.inputEnabled = true;
              hover.input.useHandCursor = true;

              boton.events.onInputOver.add(onOver, this);
              boton.events.onInputOut.add(onOut, this);
              boton.events.onInputDown.add(listaDeTupla[i][1],this);
              boton.addChild(hover);
              boton.addChild(nombreBoton);

              buttons.add(boton);



              down= this.game.make.sprite(-15,nombreBoton.height-5, 'brillodown');
              up= this.game.make.sprite(0,-15, 'brilloup');
              down.scale.setTo(0.5,0.5);
              up.scale.setTo(0.5,0.5);
              boton.addChild(down);
              boton.addChild(up);

              boton.events.onInputOver.add(onOver, this);
              boton.events.onInputOut.add(onOut, this);
              boton.events.onInputDown.add(listaDeTupla[i][1],this);



              positionX++;

       }

       return buttons;

 },



 /* Crea la gráfica de los botones de Musica y Sonido
 */
  createSoundGraphics: function(){

    if( fondoMusic.mute == true){

      musica= game.add.sprite(this.game.width-110,40, 'musica-off');
      // musica.scale.setTo(1.20,1.2);
      activateSonido=false;

    }else{

      musica= game.add.sprite(this.game.width-110,40, 'musica-on');
      // musica.scale.setTo(1.20,1.2);
      activateSonido=true;

    }

    musica.inputEnabled = true;
    musica.input.useHandCursor = true;
    musica.events.onInputDown.add(this.Musica, musica);
    musica.events.onInputOver.add(this.MusicaOver, musica);
    musica.events.onInputOut.add(this.MusicaOut, musica);
    musica.fixedToCamera=true;

    exit= game.add.sprite(this.game.width-150,40, 'exit');
    exit.inputEnabled = true;
    exit.input.useHandCursor = true;
    exit.events.onInputDown.add(function(){window.location.href = urlExit;});
    exit.events.onInputOver.add(function(){exit.loadTexture('exit-hover', 0, false);});
    exit.events.onInputOut.add(function(){exit.loadTexture('exit', 0, false);});
    exit.fixedToCamera=true;

    if(modoMultiplayer){

        this.game.add.sprite(750, 35, 'creditos');
        game.add.text( 790,45, 'MIS CRÉDITOS: '+usuario["credits"], { font:  '16px TheSansRegular', fill: 'white'});

    }

    return;
  },

  /* Crea el titulo de las pantallas, el primer parametro es el Texto que debe ir,
     el segundo parametro es un booleano que determina si lleva o no subrayado.
     Devuelve todo en un grupo.
  */
  createGeneralTitle: function(text, boolSubrayado){

      titleObject= game.add.group();
      titleStyle = { font: '35px BitterBold', fill: 'white', align: 'center'};
      titulo= game.add.text(0,50, text, titleStyle );
      titulo.position.x= this.game.width/2- titulo.width/2;
      titleObject.add(titulo);

      if(boolSubrayado){
        var line = this.game.make.sprite(0,90, 'line');
        line.scale.setTo(.9,.7);
        line.position.x= this.game.width/2- line.width/2;

        titleObject.add(line);
      }
      titleObject.fixedToCamera=true;



      return titleObject;
  },

  /* Crea el fondo de las pantallas, el gradiente, los puntitos y la curva.
    Recibe un booleano para determinar si lleva o no la curva.
    Devuelve todo en un grupo.
  */

  createBackground: function(boolCurva){
    background= game.add.group();

    var gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
    var  grd = gameBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"black");
    grd.addColorStop(0.15,"#11224d");
    grd.addColorStop(0.4,"#0d4e88");
    grd.addColorStop(.5,"#0d4e88");
    grd.addColorStop(1,"#009ee1");
    gameBack.context.fillStyle = grd;
    gameBack.context.fillRect(0,0,this.game.width,this.game.height);
    back=this.game.add.sprite(0,0,gameBack);
    back.fixedToCamera=true;
    background.add(back);

    if(boolCurva){
      curva=game.add.sprite(0,0, 'curva');
      curva.scale.setTo(.9,.9);
      curva.position = {x:this.game.width/2-curva.width/2, y:this.game.height/2};
      curva.fixedToCamera=true;
      background.add(curva);
    }

    game.stage.disableVisibilityChange = true;
    dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
    dots.alpha = 0.3;
    dots.fixedToCamera = true;
    background.add(dots);



    return background;

  },


  /* Crea el header con las esquinas y botones respectivos.
    Recibe una funcion callback para el Boton a crear, y un booleando para
    determinar si lleva un background en el header con gradiente(sirve para las pantallas con scrolling).
  */
createHeader: function(callbackButton, boolGradiente){

  if(boolGradiente){

          var bitmap = this.game.add.bitmapData(this.game.width,200);
          var bit=bitmap.context.createLinearGradient(0,0,0,200);
          bit.addColorStop(0,"rgba(17,16,20,1)");
          bit.addColorStop(0.30,"rgba(17,36,80,1)");
          bit.addColorStop(0.40,"rgba(17,36,80,1)");
          bit.addColorStop(0.50,"rgba(20,43,90,1)");
          bit.addColorStop(0.80,"rgba(16,59,114,.5)");
          bit.addColorStop(0.90,"rgba(16,59,114,.2)");
          bit.addColorStop(1,"rgba(16,59,114,0)");
          bitmap.context.fillStyle=bit;
          bitmap.context.fillRect(0,0,this.game.width,this.game.height);
          header=this.game.add.sprite(0,0,bitmap);
          headerDot = game.add.tileSprite(0, 0,this.game.width,200,'puntitos');
          headerDot.alpha=.1;
          header.addChild(headerDot);
          header.fixedToCamera=true;
  }

  leftCorner=game.add.sprite(0, 0, 'left-corner');
  leftCorner.scale.setTo(.75,0.75);
  leftCorner.fixedToCamera=true;
  //a= game.add.sprite(this.game.width, 0, 'right-corner');
   // a.scale.setTo(-.75,0.75);
   //a.fixedToCamera=true;

   volver= game.add.sprite(40, 30, 'volver');
   volver.inputEnabled = true;
   volver.input.useHandCursor = true;
   volver.fixedToCamera=true;
   volver.events.onInputDown.add(callbackButton,volver);


   return;


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

       for(var i=0; i<data.length&&i<5;i++){
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

sortearFrase: function(num){

    failArquero=["No pudo ser...", "Entró...", "Gol..."];
    goodArquero=["Tapó el arquero", "Atajó", "Adivinó el arquero"];
    failAfuera=["¡Afuera!", "¡A la tribuna!", "A cualquier lado"];
    failPateador=[ "A las manos \ndel arquero","¡Brillante el arquero!",  "Muy mal pateado" ];
    goodPateador=["¡Gooool!", "¡Golazo!", "¡Adentro!"];

    frases=[failArquero,goodArquero, failPateador, goodPateador, failAfuera];

    return frases[num][game.rnd.integerInRange(0, frases[num].length-1)]
},


MusicaOver: function(target){

  if(fondoMusic.mute ==true){
    target.loadTexture('musica-off-over', 0, false);

  }else{
    target.loadTexture('musica-on-over', 0, false);

  };

},

MusicaOut: function(target){

  if(fondoMusic.mute ==true){
    target.loadTexture('musica-off', 0, false);

    }else{

    target.loadTexture('musica-on', 0, false);

  };
},

notificationDinamic: function( title, text, boolExitButton){

  var i=0;

  notificacionGroup= game.add.group();


    var notifBack = this.game.add.bitmapData(this.game.width,this.game.height);
    var  grd = notifBack.context.createLinearGradient(0,0,0,this.game.height);
    grd.addColorStop(0,"rgba(0,0,0,.3)");
    notifBack.context.fillStyle = grd;
    notifBack.context.fillRect(0,0,this.game.width,this.game.height);
    back=this.game.add.sprite(0,0,notifBack);
    back.inputEnabled=true;



 notificacionGroup.add(back);



     var x=game.add.text(50, 30, title, { font:  '35px AlfaSlab', fill: "#013884", align: "center"});
     x.setShadow(0, 2, ' #ffc400', 0);

     if( text != undefined){
           var m=game.add.text(20, 100, text, { font:'20px CondensedLight', fill: "black", align: "left",wordWrap: true, wordWrapWidth:600});

     }

     var splash = this.game.add.bitmapData(60+m.width+x.width,80+ m.height+x.height);
     var  grd2 = splash.context.createLinearGradient(0,0,40+m.width+x.width,60+ m.height+x.height);
     grd2.addColorStop(0,"#e8f3f9");
     grd2.addColorStop(1,"#e3f0fe");
     splash.context.fillStyle = grd2;
     splash.context.fillRect(0,0,this.game.width,this.game.height);
     board=this.game.add.sprite(0,0,splash);
     board.position={x:back.width/2-board.width/2, y:back.height/2-board.height/2};

    //  var line=;

      x.position.x=board.width/2- x.width/2;
      m.position.x=board.width/2- m.width/2;

     board.addChild(x);
     board.addChild(self.createLineGlobal(20,75,board.width-20,false, 0xffb204));
    board.addChild(self.createLineGlobal(0,0, board.width, false, 0xffb204));
    board.addChild(self.createLineGlobal(0,board.height, board.width, false, 0xffb204));
    board.addChild(self.createLineGlobal(0,0,0, false, 0xffb204,board.height ));
    board.addChild(self.createLineGlobal(board.width,0,board.width, false, 0xffb204,board.height ));
     board.addChild(m);

 notificacionGroup.add(board);

 if(boolExitButton){

         var exit=game.add.text(board.width+board.x-23, board.y-43, 'x', { font:  '40px CondensedLight', fill: 'white', align: "center"});
         exit.scale.setTo(1.3,1);
         notificacionGroup.add(exit);
         exit.inputEnabled = true;
         exit.input.useHandCursor = true;
         exit.events.onInputDown.add(function(){game.add.tween(notificacionGroup).to( { alpha: 0 }, 500, 'Linear', true, 0, 0, false); notificacionGroup.destroy();instrucciones.alpha=1});

 }



 notificacionGroup.alpha=0;
 game.world.bringToTop(notificacionGroup);
 return game.add.tween(notificacionGroup).to( { alpha: 1 }, 500, 'Linear', true, 0, 0, false);


},


testGlobal(){
  console.log("ENTRA FUNCION DE PRUEBA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}




};
