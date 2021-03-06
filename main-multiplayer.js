// Global Variables

 var urlBase="";
 var urlConnect="tentativasServer.php";
 var urlExit ="http://dev.betest.com.ar/newgames/"
 if(!testLocal){
	 urlBase="http://dev.betest.com.ar/newgames/12pasos/";
	urlConnect="http://dev.betest.com.ar/server";
 }

 var modoMultiplayer=true;


var
  game = new Phaser.Game( 1136, 640, Phaser.AUTO, 'game',null,true),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;


Main.prototype = {

	init: function () {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

  preload: function () {
    game.load.image('background',    urlBase+'assets/multiplayer/images/fondo-cargando.png');
    game.load.image('cargando', urlBase+'assets/singleplayer/images/palabra-cargando.png');
    game.load.image('loading',  urlBase+'assets/general/images/loading.png');
    game.load.script('polyfill',   urlBase+'lib/polyfill.js');
    game.load.script('scrolls',   urlBase+'lib/scroll.js');
    game.load.script('utils',   urlBase+'lib/utils.js');
    game.load.script('splash',  urlBase+'states/Splash.js');
    game.load.script('global',   urlBase+'lib/global.js');
    game.load.script('input',   urlBase+'lib/phaser-input.js');

	game.state.onStateChange.add(function(){
		try{
			game.kineticScrolling.velocityWheelY=0;
			game.kineticScrolling.velocityWheelX=0;
			game.kineticScrolling.endMove();
			game.kineticScrolling.stop();

		}catch(error){

		};
	});
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
