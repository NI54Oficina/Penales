var mixins = {

  preload: function () {
      game.load.image('brillodown', 'assets/images/brillodown.png');
      game.load.image('brilloup', 'assets/images/brilloup.png');
  },

  addMenuOption: function(text, callback, className) {



    className || (className = this.menuConfig.className || 'default');

    var text = self.cortarPalabra(text);



    var x = this.menuConfig.startX === "center" ?
      game.world.centerX :
      this.menuConfig.startX;

      // aplicando el background de cada texto

          var Boton =game.add.group();

          var   myBitmap = this.game.add.bitmapData(450, 120);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,35);


          grd.addColorStop(0,"#fbe43e");
          grd.addColorStop(0.9,"#fbe43e");
          grd.addColorStop(1,"#cea428");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

      // aplicando el background de cada texto


    var y = this.menuConfig.startY;
    var   background = this.game.add.sprite(x-50,(this.optionCount*150)+y-10, myBitmap);
    down= this.game.make.sprite(-15,45, 'brillodown');
    up= this.game.make.sprite(160,-15, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);


    var txt = game.add.text(x, (this.optionCount * 150) + y,text[0],style.navitem[className]  );


    if(text[1]!= undefined){

    var  childTxt= txt.addChild(game.add.text(0,60, text[1],{
        fill: '#1b1464',
        font: '25pt RobotoBold',
        align: 'center',
        srokeThickness: 4
      }));

      childTxt.position.x= txt.width/2 - childTxt.width/2;
      txt.position.y=((((background.position.y+background.height/2)))-((txt.height+ childTxt.height)/2));

    }else{
      txt.position.y= ((background.position.y+background.height/2))-txt.height/2;
    };


    background.position.x= this.game.width/2-background.width/2;

    txt.position.x= this.game.width/2-txt.width/2;

    // console.log(txt);
    // console.log(childTxt.height);


    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);



    txt.inputEnabled = true;
    background.inputEnabled=true;
    this.world.bringToTop(txt);

    //new.RoundedRectangle(0, 0, 50, 50, 50);


    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem[className]);
    });


    Boton.add(background);
    Boton.add(txt);



    Boton.forEach(function(item) {
    item.events.onInputUp.add(callback);
}, this);



    this.optionCount ++;
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
