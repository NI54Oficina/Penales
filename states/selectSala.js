var Selectsala = function(game) {};

Selectsala.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  create: function(){
      self = this;
      indiceC=0;
      i=0;
      muttex=0;


      self.createBackground(false);
      self.createHeader(self.GoBack,false);
      self.createSoundGraphics();
      self.createGeneralTitle("SALAS", true);

      var graphics = game.add.graphics(200, 200);
      graphics.lineStyle(5, 0xcea428, 1);
      graphics.drawRoundedRect(0, 0, 300, 100,5);
      window.graphics = graphics;
      graphics.inputEnabled=true;




},

GoBack: function(target){
  game.state.start("GameMenu");
},




}

Phaser.Utils.mixinPrototype(Selectsala.prototype, mixins);
