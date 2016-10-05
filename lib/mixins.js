var mixins = {


//Genera usuarios demo para poder sacar los datos.
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
      perdidos:0,
      avatar:'img-2'

    };

    usuario3={
      nombre:'CRISTIANO RONALDO',
      racha:  100,
      ganados:100,
      perdidos:0,
      avatar:'img-3'

    };

    usuario4={
      nombre:'DIEGO MARADONA',
      racha:  100,
      ganados:100,
      perdidos:0,
      avatar:'img-4'

    };

    usuarios=[usuario, usuario2,usuario3, usuario4];

    return usuarios;
  },


// funcion para la creacion ordenada de botones de inicio solamente para la pantalla de incio

  addMenuOption: function(text, callback, className) {



    className || (className = this.menuConfig.className || 'default');

    var text = self.cortarPalabra(text);


    var x=0;
	  this.menuConfig.startX=100;

    // aplicando el background de cada texto

    var Boton =game.add.group();

    var   myBitmap = this.game.add.bitmapData(450, 100);
    var  grd=myBitmap.context.createLinearGradient(0,0,0,50);


    grd.addColorStop(0,"#0068db");
    grd.addColorStop(0.9,"#0259a3");
    grd.addColorStop(0.93,"#0259a3");
    // grd.addColorStop(0.55,"#003192");
    grd.addColorStop(1,"#013173");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

    // aplicando el background de cada texto

  	Boton.position.y=this.optionCount*130+this.menuConfig.startY -10;
  	Boton.position.x= this.menuConfig.startX;
    var y = 0;
    var   background = this.game.add.sprite(x-50,0, myBitmap);
    down= this.game.make.sprite(-15,74, 'brillodown');
    up= this.game.make.sprite(160,-13, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);

  	var testMask=game.add.graphics(0, 0);
  	testMask.beginFill(0xFFFF0B, 0.5);
  	testMask.drawRoundedRect(0, 0, background.width, background.height,10);
  	testMask.endFill();
  	Boton.add(testMask);
  	Boton.mask=  testMask;

    var txt = game.add.text(x, (this.optionCount * 150) + y,text[0],style.navitem[className]  );
    txt.setShadow(-3, -3, 'rgba(0,0,0,0.5)', 5);


    if(text[1]!= undefined){

    var childTxt = this.game.add.sprite(background.width-80,background.height/2-20,text[1]);

    childTxt.scale.setTo(1.5,1.5);

    background.addChild(childTxt);
    };

    txt.position.y= ((background.position.y+background.height/2))-txt.height/2;

    background.position.x= x;

    txt.position.x= background.position.x+background.width/2-txt.width/2;


    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);

    this.world.bringToTop(txt);


    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem[className]);
    });


    Boton.add(background);
    Boton.add(txt);

    Boton.forEach(function(item) {
      item.inputEnabled = true;
      item.events.onInputUp.add(callback);
    }, this);



    this.optionCount ++;

    return Boton;
  },


  cortarPalabra(target){

    var i=0;
    var subpalabra=target;

    var target=target.split('\n');

    return target;

  },



// funcion para los botones ordenados pero de las pantallas

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


      Boton.add(txt);


      txt.position.x=background.width/2 - txt.width/2;

      Boton.position.x=this.game.width/2 - background.width/2;

      this.world.bringToTop(txt);

      var onOver = function (target) {
        target.fill = "black";
        target.stroke = "rgba(200,200,200,0.5)";
        txt.useHandCursor = true;
      };

      var onOut = function (target) {
        target.fill = "#1b1464";
        target.stroke = "#1b1464";
        txt.useHandCursor = false;
      };


      txt.events.onInputOver.add(onOver, this);
      txt.events.onInputOut.add(onOut, this);


      Boton.forEach(function(item) {
        item.inputEnabled = true;
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

        return Boton;



  },



};
