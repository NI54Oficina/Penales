var Selectplayer = function(game) {};

Selectplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#FEFFD5', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(100, (this.optionCount * 80) , text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;

    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function(){
      self = this;

      game.add.sprite(0, 0, 'rival-bg');

      this.addMenuOption('Volver', function () {
        game.state.start("GameMenu");
      });



  },

}
