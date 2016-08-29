var Splash = function () {};

    Splash.prototype = {

    loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('options', 'states/Options.js');
    game.load.script('Stadistics', 'states/stadistics.js');
  },

  loadBgm: function () {

    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },

  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/menu-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/menu-bg.jpg');

  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(391/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Cargando...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Options",Options);
    game.state.add("Stadistics",Stadistics);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function () {
    this.status.setText('Cargando');
    this.addGameStates();
    this.addGameMusic();
	  Emit("login"," ","logueado",this);
  },

  test:function(){
	  console.log("test entra");
  },

  logueado: function(msg){

	  console.log("logueado");
	  console.log(msg);
	  this.test();
	  game.state.start("GameMenu");

  },

};
