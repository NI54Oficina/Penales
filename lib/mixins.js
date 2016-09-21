var mixins = {

  preload: function () {
      game.load.image('brillodown', 'assets/images/brillodown.png');
      game.load.image('brilloup', 'assets/images/brilloup.png');
  },

  addMenuOption: function(text, callback, className) {

    className || (className = this.menuConfig.className || 'default');




    var x = this.menuConfig.startX === "center" ?
      game.world.centerX :
      this.menuConfig.startX;

      // aplicando el background de cada texto

          var Boton =game.add.group();

          var   myBitmap = this.game.add.bitmapData(450, 70);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,35);


          grd.addColorStop(0,"#fbe43e");
          grd.addColorStop(0.9,"#fbe43e");
          grd.addColorStop(1,"#cea428");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

      // aplicando el background de cada texto


    var y = this.menuConfig.startY;
    var   background = this.game.add.sprite(x-50,(this.optionCount*80)+y-10, myBitmap);
    down= this.game.make.sprite(-15,45, 'brillodown');
    up= this.game.make.sprite(160,-15, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);

    // create
    var txt = game.add.text(
      x,
      (this.optionCount * 80) + y,
      text,
      style.navitem[className]
    );

    background.position.x= this.game.width/2-background.width/2;

    txt.position.x= this.game.width/2-txt.width/2;


    txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);



    txt.inputEnabled = true;
    background.inputEnabled=true;

    //new.RoundedRectangle(0, 0, 50, 50, 50);


    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem[className]);
    });


    Boton.add(background);
    Boton.add(txt);

    console.log(Boton);

    Boton.forEach(function(item) {
    item.events.onInputUp.add(callback);
}, this);



    this.optionCount ++;
  }
};
