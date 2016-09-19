var mixins = {
  addMenuOption: function(text, callback, className) {

    className || (className = this.menuConfig.className || 'default');


    var x = this.menuConfig.startX === "center" ?
      game.world.centerX :
      this.menuConfig.startX;

      // aplicando el background de cada texto

          var 	myBitmap = this.game.add.bitmapData(300, 50);
          var  grd=myBitmap.context.createLinearGradient(0,0,0,25);


            grd.addColorStop(0,"#fbe43e");
              grd.addColorStop(0.9,"#fbe43e");
           grd.addColorStop(1,"#cea428");
          myBitmap.context.fillStyle=grd;
          myBitmap.context.fillRect(0,0,this.game.height,this.game.width);

         // aplicando el background de cada texto


    var y = this.menuConfig.startY;
    var   background = this.game.add.sprite(x-50,(this.optionCount*80)+y-10, myBitmap);
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

    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target) {
      target.setStyle(style.navitem.hover);
    });
    txt.events.onInputOut.add(function (target) {
      target.setStyle(style.navitem[className]);
    });

    this.optionCount ++;
  }
};
