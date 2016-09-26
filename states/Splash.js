var Splash = function () {};

    Splash.prototype = {

    loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
  //  game.load.script('options', 'states/Options.js');
    game.load.script('Stadistics', 'states/stadistics.js');
    game.load.script('Multiplayer','states/multiPlayer.js' );
    game.load.script('Singleplayer','states/singlePlayer.js' );
    game.load.script('Selectplayer','states/selectRival.js' );
    game.load.script('Anims','states/AnimTests.js' );
  },

  loadBgm: function () {

    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },

  loadImages: function () {

    game.load.image('menu-bg', 'assets/images/bg-menu.png');
    game.load.image('options-bg', 'assets/images/menu-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/menu-bg.jpg');
    game.load.image('stats-bg', 'assets/images/bg-stats.jpg');
    game.load.image('rival-bg', 'assets/images/bg-rival.jpg');
    game.load.image('multi-bg', 'assets/images/bg-multi.jpg');
    game.load.image('single-bg', 'assets/images/bg-single.jpg');

    game.load.image('img-1', 'assets/images/bt_escudo.png');
    game.load.image('img-2', 'assets/images/bt_escudos_02.png');
    game.load.image('img-3', 'assets/images/bt_escudos_03.png');
    game.load.image('img-4', 'assets/images/bt_escudos_04.png');
    game.load.image('img-5', 'assets/images/bt_escudos_05.png');
    // game.load.image('img-6', 'assets/images/bt_escudo.png');
    // game.load.image('img-7', 'assets/images/bt_escudo.png');
    // game.load.image('img-8', 'assets/images/bt_escudo.png');
    // game.load.image('img-9', 'assets/images/bt_escudo.png');
    // game.load.image('img-10', 'assets/images/bt_escudo.png');
    game.load.image('test', 'assets/images/test10.png');
    game.load.image('left-corner', 'assets/images/left-corner.png');
    game.load.image('right-corner', 'assets/images/left-corner.png');
    game.load.image('volver', 'assets/images/arrow-back.png');
    game.load.image('menu', 'assets/images/menu.png');
    game.load.image('puntitos', 'assets/images/fondo_trama.png');
    game.load.image('golden', 'assets/images/bt_golden.png');
    game.load.image('shadow', 'assets/images/bt_reflex.png');
    game.load.image('curva', 'assets/images/fondo_curva.png');

    game.load.image('brillodown', 'assets/images/brillodown.png');
    game.load.image('brilloup', 'assets/images/brilloup.png');

    game.load.image('line', 'assets/images/titulo_linea.png');
    game.load.image('player', 'assets/images/bt_anon.png');



  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion',"BitterBold","CondensedLight","RobotoRegular","RobotoBold"],
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
  //  this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
  //  game.state.add("Options",Options);
    game.state.add("Stadistics",Stadistics);
    game.state.add("Selectplayer",Selectplayer);
    game.state.add("Singleplayer",Singleplayer);
    game.state.add("Multiplayer",Multiplayer);
    game.state.add("Anims",Anims);
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function () {
    this.status.setText('Cargando');
    this.addGameStates();
  //this.addGameMusic();
	  Emit("login"," ","loginConfirmed","logueado",this);
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
