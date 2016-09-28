// Global Variables
var
  game = new Phaser.Game( 1136, 640, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;




Main.prototype = {

  preload: function () {
    game.load.image('stars',    'assets/images/sky.png');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('scrolls',   'lib/scroll.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
    game.load.script('global',   'lib/global.js');
	game.state.onStateChange.add(function(){
		try{
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
