var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
  },


  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Penales !", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },
  create: function () {
    var playSound = gameOptions.playSound,
        playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);


    var text = game.add.text(game.world.centerX-100, game.world.centerY+150, "Play Music", { font: 'bold 30pt TheMinion', fill: "black", align: "center" });



    text.inputEnabled = true;

    text.input.enableDrag();

    text.events.onInputDown.add(this.down,text);
    text.events.onInputOver.add(this.over, text);
    text.events.onInputOut.add(this.out, text);



    this.addMenuOption('Volver', function () {
      game.state.start("GameMenu");
    });

    this.addMenuOption('Estadisticas', function () {
      game.state.start("Stadistics");
    });

  },
    down: function(item) {

        if(music.mute ==true){
          item.text = "Play Music";
          music.mute = false;
        }else{
          item.text = "Mute Music";
          music.mute = true;
        }

      },

    over: function(target){
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      target.useHandCursor = true;
    } ,

    out: function(target){
      target.fill = "black";
      target.stroke = "rgba(0,0,0,0)";
      target.useHandCursor = false;
    },

};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
// Phaser.Utils.mixinPrototype(Stadistics.prototype, mixins);
