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

},

GoBack: function(target){
  game.state.start("GameMenu");
},




}

Phaser.Utils.mixinPrototype(Selectsala.prototype, mixins);
