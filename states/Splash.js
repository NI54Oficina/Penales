var Splash = function () {};

    Splash.prototype = {

    loadScripts: function () {
    game.load.script('style', 'general/lib/style.js');
    game.load.script('mixins', 'general/lib/mixins.js');
    game.load.script('WebFont', 'general/vendor/webfontloader.js');
    game.load.script('gamemenu','general/states/GameMenu.js');
    game.load.script('game', 'general/states/Game.js');
    game.load.script('gameover','general/states/GameOver.js');
  //  game.load.script('options', 'states/Options.js');
    game.load.script('Versus', 'general/states/versus.js');
    game.load.script('Stadistics', 'general/states/stadistics.js');
    game.load.script('Multiplayer','general/states/multiPlayer.js' );
    game.load.script('Singleplayer','general/states/singlePlayer.js' );
    game.load.script('Selectplayer','general/states/selectRival.js' );
    game.load.script('Anims','general/states/AnimTests.js' );
  },

  loadSound: function () {

    game.load.audio('musica', 'general/assets/sound/Fondo_1.mp3');
    game.load.audio('musica_2', 'general/assets/sound/Fondo_2.mp3');
    game.load.audio('musica_errar', 'general/assets/sound/Fondo_errar_1.mp3');
    game.load.audio('musica_sin_canto', 'general/assets/sound/Fondo_SinCanto_1.mp3');
    game.load.audio('sonido_ganado', 'general/assets/sound/Ganador.mp3');
    game.load.audio('sonido_perdido', 'general/assets/sound/Perdedor.mp3');
    game.load.audio('sonido_gol', 'general/assets/sound/Gol.mp3');
    game.load.audio('sonido_gol_1', 'general/assets/sound/Gol_2.mp3');
    game.load.audio('sonido_patada', 'general/assets/sound/Patada_1.mp3');

    game.load.audio('musica_loading', 'general/assets/sound/Loading.mp3');
    game.load.audio('musica_end', 'general/assets/sound/Partido_end.mp3');
    game.load.audio('musica_start', 'general/assets/sound/Partido_start.mp3');
    game.load.audio('musica_singleplayer', 'general/assets/sound/Fondo_singlePlayer.mp3');
    //faltar temrinar de aplicar.

  },

  loadImages: function () {

    game.load.image('menu-bg', 'general/assets/images/bg-menu.png');
    game.load.image('stats-bg', 'general/assets/images/bg-stats.jpg');
    game.load.image('rival-bg', 'general/assets/images/bg-rival.jpg');
    game.load.image('multi-bg', 'general/assets/images/bg-multi.jpg');
    game.load.image('single-bg', 'general/assets/images/bg-single.jpg');

    game.load.image('img-1', 'general/assets/images/bt_escudo.png');
    game.load.image('img-2', 'general/assets/images/bt_escudos_02.png');
    game.load.image('img-3', 'general/assets/images/bt_escudos_03.png');
    game.load.image('img-4', 'general/assets/images/bt_escudos_04.png');
    game.load.image('img-5', 'general/assets/images/bt_escudos_05.png');
    game.load.image('golden', 'general/assets/images/bt_golden.png');
    game.load.image('shadow', 'general/assets/images/bt_reflex.png');
    game.load.image('selected', 'general/assets/images/bt_seleccion.png');
    game.load.image('selector', 'general/assets/images/bt_selector.png');

    //Sprites fondo
    game.load.image('left-corner', 'general/assets/images/left-corner.png');
    game.load.image('right-corner', 'general/assets/images/left-corner.png');
    game.load.image('volver', 'general/assets/images/arrow-back.png');
    game.load.image('menu', 'general/assets/images/menu.png');
    game.load.image('puntitos', 'general/assets/images/fondo_trama.png');
    game.load.image('curva', 'general/assets/images/fondo_curva.png');

    game.load.image('brillodown', 'general/assets/images/brillodown.png');
    game.load.image('brilloup', 'general/assets/images/brilloup.png');
    game.load.image('two', 'general/assets/images/dos-jugadores.png');
    game.load.image('one', 'general/assets/images/un-jugador.png');

    game.load.image('line', 'general/assets/images/titulo_linea.png');
    game.load.image('player', 'general/assets/images/bt_anon.png');

    game.load.image('musica-on', 'general/assets/images/musica-on.png');
    game.load.image('musica-off', 'general/assets/images/musica-off.png');
    game.load.image('sonido-on', 'general/assets/images/sonido-on.png');
    game.load.image('sonido-off', 'general/assets/images/sonido-off.png');



    //Sprites de GamePlay

    game.load.spritesheet('button', 'general/assets/images/boton.png', 300, 300);
    game.load.image('assert', 'general/assets/images/green-button.png', 150,150);
    game.load.image('noassert', 'general/assets/images/red-button.png', 150,150);
    game.load.image('orange-button', 'general/assets/images/orange-button.png', 150,150);
    game.load.image('yellow-button', 'general/assets/images/yellow-button.png', 150,150);
    game.load.image('triangle', 'general/assets/images/puntero.png', 150,150);
    game.load.spritesheet('pelota', 'general/assets/images/pelota.png', 40, 40);
    game.load.spritesheet('pelota-sombra', 'general/assets/images/sombraPelota.png', 40, 40);
    game.load.image('arco-0', 'general/assets/images/arco-0.png');
    game.load.atlas('arco', 'general/assets/images/arcos-sprite.png', 'assets/images/arcos-sprite.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-local', 'general/assets/images/out.png', 'assets/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-local', 'general/assets/images/pateador-test.png', 'assets/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-visitante', 'general/assets/images/out2.png', 'assets/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-visitante', 'general/assets/images/pateador-test2.png', 'assets/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.image('fondo1', 'general/assets/images/fondo-game1.png', 759, 150);
    game.load.image('fondo2', 'general/assets/images/fondo-game2.png', 378, 150);
    game.load.image('fondo3', 'general/assets/images/fondo-game3.png', 1136, 491);




  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion',"BitterBold","CondensedLight","RobotoRegular","RobotoBold"],
        urls: ['general/assets/style/theminion.css']
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
    game.state.add("Singleplayer",Singleplayer);
    game.state.add("Multiplayer",Multiplayer);
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
