var Splash = function () {};

    Splash.prototype = {

    loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
  //  game.load.script('options', 'states/Options.js');general/
    game.load.script('Versus', 'states/versus.js');
    game.load.script('Stadistics', 'states/stadistics.js');
    game.load.script('Selectplayer_2','states/selectPlayer_2.js' );
    game.load.script('Selectplayer_3','states/selectPlayer_3.js' );
    game.load.script('Selectplayer','states/selectPlayer.js' );
    game.load.script('Anims','states/AnimTests.js' );
  },

  loadSound: function () {

    game.load.audio('musica', 'assets/general/sound/Fondo_1.mp3');
    game.load.audio('musica_2', 'assets/general/sound/Fondo_2.mp3');
    game.load.audio('musica_errar', 'assets/general/sound/Fondo_errar_1.mp3');
    game.load.audio('musica_sin_canto', 'assets/general/sound/Fondo_SinCanto_1.mp3');
    game.load.audio('sonido_ganado', 'assets/general/sound/Ganador.mp3');
    game.load.audio('sonido_perdido', 'assets/general/sound/Perdedor.mp3');
    game.load.audio('sonido_gol', 'assets/general/sound/Gol.mp3');
    game.load.audio('sonido_gol_1', 'assets/general/sound/Gol_2.mp3');
    game.load.audio('sonido_patada', 'assets/general/sound/Patada_1.mp3');

    game.load.audio('musica_loading', 'assets/general/sound/Loading.mp3');
    game.load.audio('musica_end', 'assets/general/sound/Partido_end.mp3');
    game.load.audio('musica_start', 'assets/general/sound/Partido_start.mp3');
    game.load.audio('musica_singleplayer', 'assets/general/sound/Fondo_singlePlayer.mp3');
    //faltar temrinar de aplicar.

  },

  loadImages: function () {

    game.load.image('menu-bg', 'assets/general/images/bg-menu.png');
    game.load.image('stats-bg', 'assets/general/images/bg-stats.jpg');
    game.load.image('rival-bg', 'assets/general/images/bg-rival.jpg');
    game.load.image('multi-bg', 'assets/general/images/bg-multi.jpg');
    game.load.image('single-bg', 'assets/general/images/bg-single.jpg');

    game.load.image('img-1', 'assets/general/images/bt_escudo.png');
    game.load.image('img-2', 'assets/general/images/bt_escudos_02.png');
    game.load.image('img-3', 'assets/general/images/bt_escudos_03.png');
    game.load.image('img-4', 'assets/general/images/bt_escudos_04.png');
    game.load.image('img-5', 'assets/general/images/bt_escudos_05.png');
    game.load.image('golden', 'assets/general/images/bt_golden.png');
    game.load.image('shadow', 'assets/general/images/bt_reflex.png');
    game.load.image('selected', 'assets/general/images/bt_seleccion.png');
    game.load.image('selector', 'assets/general/images/bt_selector.png');

    //Sprites fondo
    game.load.image('left-corner', 'assets/general/images/left-corner.png');
    game.load.image('right-corner', 'assets/general/images/left-corner.png');
    game.load.image('volver', 'assets/general/images/arrow-back.png');
    game.load.image('menu', 'assets/general/images/menu.png');
    game.load.image('puntitos', 'assets/general/images/fondo_trama.png');
    game.load.image('curva', 'assets/general/images/fondo_curva.png');

    game.load.image('brillodown', 'assets/general/images/brillodown.png');
    game.load.image('brilloup', 'assets/general/images/brilloup.png');
    game.load.image('two', 'assets/general/images/dos-jugadores.png');
    game.load.image('one', 'assets/general/images/un-jugador.png');

    game.load.image('line', 'assets/general/images/titulo_linea.png');
    game.load.image('player', 'assets/general/images/bt_anon.png');

    game.load.image('musica-on', 'assets/general/images/musica-on.png');
    game.load.image('musica-off', 'assets/general/images/musica-off.png');
    game.load.image('sonido-on', 'assets/general/images/sonido-on.png');
    game.load.image('sonido-off', 'assets/general/images/sonido-off.png');



    //Sprites de GamePlay

    game.load.spritesheet('button', 'assets/general/images/boton.png', 300, 300);
    game.load.image('assert', 'assets/general/images/green-button.png', 150,150);
    game.load.image('noassert', 'assets/general/imgeneral/ages/red-button.png', 150,150);
    game.load.image('orange-button', 'assets/general/images/orange-button.png', 150,150);
    game.load.image('yellow-button', 'assets/general/images/yellow-button.png', 150,150);
    game.load.image('triangle', 'assets/general/images/puntero.png', 150,150);
    game.load.spritesheet('pelota', 'assets/general/images/pelota.png', 40, 40);
    game.load.spritesheet('pelota-sombra', 'assets/general/images/sombraPelota.png', 40, 40);
    game.load.image('arco-0', 'assets/general/images/arco-0.png');
    game.load.atlas('arco', 'assets/general/images/arcos-sprite.png', 'assets/general/images/arcos-sprite.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-local', 'assets/general/images/out.png', 'assets/general/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-local', 'assets/general/images/pateador-test.png', 'assets/general/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-visitante', 'assets/general/images/out2.png', 'assets/general/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-visitante', 'assets/general/images/pateador-test2.png', 'assets/general/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.image('fondo1', 'assets/general/images/fondo-game1.png', 759, 150);
    game.load.image('fondo2', 'assets/general/images/fondo-game2.png', 378, 150);
    game.load.image('fondo3', 'assets/general/images/fondo-game3.png', 1136, 491);




  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion',"BitterBold","CondensedLight","RobotoRegular","RobotoBold"],
        urls: ['assets/general/style/theminion.css']
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
    this.loadSound();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
  //  game.state.add("Options",Options);
    game.state.add("Stadistics",Stadistics);
    game.state.add("Versus",Versus);
    game.state.add("Selectplayer",Selectplayer);
    game.state.add("Selectplayer_3",Selectplayer_3);
    game.state.add("Selectplayer_2",Selectplayer_2);
    game.state.add("Anims",Anims);
  },

  addGameMusic: function () {
    fondoMusic = game.add.audio('musica');
    fondoMusic.loop = true;
    fondoMusic.mute=true;
    fondoMusic.play();


    fondoSonido = game.add.audio('musica_2');
    fondoSonido.loop = true;
    fondoSonido.mute = true;
    fondoSonido.play();

    musica_2= game.add.audio('musica_2');
    musica_sin_canto= game.add.audio('musica_sin_canto');
    musica_errar= game.add.audio('musica_errar');
    sonido_ganado= game.add.audio('sonido_ganado');
    sonido_perdido= game.add.audio('sonido_perdido');
    sonido_gol= game.add.audio('sonido_gol');
    sonido_gol_1= game.add.audio('sonido_gol_1');
    sonido_patada = game.add.audio('sonido_patada');

    fondoSonidoP=[sonido_patada];
    activateSonido=false;


  },

  create: function () {
    this.status.setText('Cargando');
    this.addGameStates();
    this.addGameMusic();
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
