var mixins = {

  // preload: function () {
  //     game.load.image('brillodown', 'assets/images/brillodown.png');
  //     game.load.image('brilloup', 'assets/images/brilloup.png');
  //
  // },

  addMenuOption: function(text, callback, className) {



    className || (className = this.menuConfig.className || 'default');

    var text = self.cortarPalabra(text);



    // var x = this.menuConfig.startX === "center" ?
    //   game.world.centerX :
    //   this.menuConfig.startX;
    //

    var x=0;
	this.menuConfig.startX=100;


      // aplicando el background de cada texto

          var Boton =game.add.group();

          var   myBitmap = this.game.add.bitmapData(450, 120);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,60);


          grd.addColorStop(0,"#0068db");
          grd.addColorStop(0.9,"#0259a3");
          grd.addColorStop(0.93,"#0259a3");
          // grd.addColorStop(0.55,"#003192");
          grd.addColorStop(1,"#013173");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

      // aplicando el background de cada texto

	Boton.position.y=this.optionCount*150+this.menuConfig.startY -10;
	Boton.position.x= this.menuConfig.startX;
    var y = 0;
    var   background = this.game.add.sprite(x-50,0, myBitmap);
    down= this.game.make.sprite(-15,95, 'brillodown');
    up= this.game.make.sprite(160,-15, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);

	var testMask=game.add.graphics(0, 0);
	testMask.beginFill(0xFFFF0B, 0.5);
	testMask.drawRoundedRect(00, 0, background.width, background.height,10);
	testMask.endFill();
	Boton.add(testMask);
	Boton.mask=  testMask;

    var txt = game.add.text(x, (this.optionCount * 150) + y,text[0],style.navitem[className]  );
    txt.setShadow(0, -5, 'rgba(0,0,0,0.5)', 0);


    if(text[1]!= undefined){

    var  childTxt= txt.addChild(game.add.text(0,60, text[1],{
        fill: '#fcffaf',
        font: '25pt RobotoBold',
        align: 'center',
        srokeThickness: 4
      }));

      childTxt.position.x= txt.width/2 - childTxt.width/2;
       childTxt.setShadow(0, -1, 'rgba(0,0,0,0)', 0);
      txt.position.y=((((background.position.y+background.height/2)))-((txt.height+ childTxt.height)/2));

    }else{
      txt.position.y= ((background.position.y+background.height/2))-txt.height/2;
    };


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

    // if(target[1]===undefined){
    //   target.push(1);
    // }else{
    //   target.push(0);
    // }
 //console.log(target);
    return target;

  },




};
