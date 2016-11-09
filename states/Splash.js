
var Splash = function () {};

    Splash.prototype = {

    loadScripts: function () {
    game.load.script('style', urlBase+'lib/style.js');
    game.load.script('mixins', urlBase+'lib/mixins.js');
    game.load.script('WebFont', urlBase+'vendor/webfontloader.js');
    game.load.script('gamemenu',urlBase+'states/GameMenu.js');
    game.load.script('game', urlBase+'states/Game.js');
    game.load.script('gameover',urlBase+'states/GameOver.js');
    //  game.load.script('options', 'states/Options.js');
    game.load.script('Versus', urlBase+'states/versus.js');
    game.load.script('Stadistics', urlBase+'states/stadistics.js');
    game.load.script('Selectplayer_2',urlBase+'states/selectPlayer_2.js' );
    game.load.script('Selectplayer_3',urlBase+'states/selectPlayer_3.js' );
    game.load.script('Selectplayer',urlBase+'states/selectPlayer.js' );
    game.load.script('Anims',urlBase+'states/AnimTests.js' );
  },

  loadSound: function () {

    game.load.audio('musica', urlBase+'assets/general/sound/Fondo_1.mp3');
    game.load.audio('musica_2', urlBase+'assets/general/sound/Fondo_2.mp3');
    game.load.audio('musica_errar', urlBase+'assets/general/sound/Fondo_errar_1.mp3');
    game.load.audio('musica_sin_canto', urlBase+'assets/general/sound/Fondo_SinCanto_1.mp3');
    game.load.audio('sonido_ganado', urlBase+'assets/general/sound/Ganador.mp3');
    game.load.audio('sonido_perdido', urlBase+'assets/general/sound/Perdedor.mp3');
    game.load.audio('sonido_gol', urlBase+'assets/general/sound/Gol.mp3');
    game.load.audio('sonido_gol_1', urlBase+'assets/general/sound/Gol_2.mp3');
    game.load.audio('sonido_patada', urlBase+'assets/general/sound/Patada_1.mp3');

    game.load.audio('musica_loading', urlBase+'assets/general/sound/Loading.mp3');
    game.load.audio('musica_end', urlBase+'assets/general/sound/Partido_end.mp3');
    game.load.audio('musica_start', urlBase+'assets/general/sound/Partido_start.mp3');
    game.load.audio('musica_singleplayer', urlBase+'assets/general/sound/Fondo_singlePlayer.mp3');
    //faltar temrinar de aplicar.

  },

  loadImages: function () {

    game.load.image('menu-bg', urlBase+'assets/singleplayer/images/bg-menu.png');
    game.load.image('img-1', urlBase+'assets/singleplayer/images/bt_escudo.png');
    game.load.image('img-2', urlBase+'assets/singleplayer/images/bt_escudos_02.png');
    game.load.image('img-3', urlBase+'assets/singleplayer/images/bt_escudos_03.png');
    game.load.image('img-4', urlBase+'assets/singleplayer/images/bt_escudos_04.png');
    game.load.image('img-5', urlBase+'assets/singleplayer/images/bt_escudos_05.png');
    game.load.image('golden', urlBase+'assets/general/images/bt_golden.png');
    game.load.image('shadow', urlBase+'assets/general/images/bt_reflex.png');
    game.load.image('selected', urlBase+'assets/general/images/bt_seleccion.png');
    game.load.image('selector', urlBase+'assets/general/images/bt_selector.png');

    //Sprites fondo
    game.load.image('left-corner', urlBase+'assets/general/images/left-corner.png');
    game.load.image('right-corner', urlBase+'assets/general/images/left-corner.png');
    game.load.image('volver', urlBase+'assets/general/images/arrow-back.png');
    game.load.image('menu', urlBase+'assets/general/images/menu.png');
    game.load.image('puntitos', urlBase+'assets/general/images/fondo_trama.png');
    game.load.image('curva', urlBase+'assets/general/images/fondo_curva.png');
    game.load.image('curva_alta', urlBase+'assets/general/images/fondo_curva_alta.png');

    game.load.image('brillodown', urlBase+'assets/general/images/brillodown.png');
    game.load.image('brilloup', urlBase+'assets/general/images/brilloup.png');
    game.load.image('two', urlBase+'assets/general/images/dos-jugadores.png');
    game.load.image('one', urlBase+'assets/general/images/un-jugador.png');

    game.load.image('line', urlBase+'assets/general/images/titulo_linea.png');
    game.load.image('player', urlBase+'assets/general/images/bt_anon.png');

    game.load.image('musica-on', urlBase+'assets/general/images/musica-on.png');
    game.load.image('musica-off', urlBase+'assets/general/images/musica-off.png');
    game.load.image('sonido-on', urlBase+'assets/general/images/sonido-on.png');
    game.load.image('sonido-off', urlBase+'assets/general/images/sonido-off.png');




    //Sprites de GamePlay

    game.load.spritesheet('button', urlBase+'assets/general/images/boton.png', 300, 300);
    game.load.image('assert', urlBase+'assets/general/images/green-button.png', 150,150);
    game.load.image('noassert', urlBase+'assets/general/images/red-button.png', 150,150);
    game.load.image('orange-button', urlBase+'assets/general/images/orange-button.png', 150,150);
    game.load.image('yellow-button', urlBase+'assets/general/images/yellow-button.png', 150,150);
    game.load.image('triangle', urlBase+'assets/general/images/puntero.png', 150,150);
    game.load.spritesheet('pelota', urlBase+'assets/general/images/pelota.png', 40, 40);
    game.load.spritesheet('pelota-sombra', urlBase+'assets/general/images/sombraPelota.png', 40, 40);
    game.load.image('arco-0', urlBase+'assets/general/images/arco-0.png');
    game.load.atlas('arco', urlBase+'assets/general/images/arcos-sprite.png', 'assets/general/images/arcos-sprite.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-local', urlBase+'assets/general/images/out.png', 'assets/general/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-local', urlBase+'assets/general/images/pateador-test.png', 'assets/general/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('arquero-visitante', urlBase+'assets/general/images/out2.png', 'assets/general/images/out.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('pateador-visitante', urlBase+'assets/general/images/pateador-test2.png', 'assets/general/images/pateador-test.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.image('fondo1', urlBase+'assets/general/images/fondo-game1.png', 759, 150);
    game.load.image('fondo2', urlBase+'assets/general/images/fondo-game2.png', 378, 150);
    game.load.image('fondo3', urlBase+'assets/general/images/fondo-game3.png', 1136, 491);
    game.load.image('tablero', urlBase+'assets/general/images/tablero.png');
    game.load.image('ataja', urlBase+'assets/general/images/quien-ataja.png');
    game.load.image('patea', urlBase+'assets/general/images/quien-patea.png');
    game.load.image('linea-potencia', urlBase+'assets/general/images/linea-potencia.png');


  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ["BitterBold","CondensedLight","RobotoRegular","RobotoBold"],
        urls: [urlBase+'assets/general/style/stylesheet.css']
      }
    }
  },

  init: function () {


    this.loadingBar = game.make.sprite(game.world.centerX, 400, "loading");
    // this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 550, 'CARGANDO...', {font: '35px BitterBold' , fill: 'white'});
    utils.centerGameObjects([ this.status]);

  },

  preload: function () {

    game.add.sprite(0, 0, 'background');

    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
   // this.load.setPreloadSprite(this.loadingBar);
	
	this.loadingBar.pivot.x=33;
	this.loadingBar.pivot.y=33;
	this.add.tween(this.loadingBar)  .to({angle: -359}, 1000, null, true, 0, Infinity);

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
    fondoMusic.volume = 0.80;
    fondoMusic.play();


    // fondoSonido = game.add.audio('musica_2');
    // fondoSonido.loop = true;
    // fondoSonido.mute = true;
    // fondoSonido.volume = 0.05;
    // fondoSonido.play();


    musica_2= game.add.audio('musica_2');
    musica_sin_canto= game.add.audio('musica_sin_canto');
    musica_errar= game.add.audio('musica_errar');
    musica_end= game.add.audio('musica_end');
    musica_start= game.add.audio('musica_start');
    sonido_ganado= game.add.audio('sonido_ganado');
    sonido_perdido= game.add.audio('sonido_perdido');
    sonido_gol= game.add.audio('sonido_gol');
    sonido_gol_1= game.add.audio('sonido_gol_1');
    sonido_patada = game.add.audio('sonido_patada');

    fondoSonidoP=[sonido_patada];
    activateSonido=false;


  },

  create: function () {



    this.status.setText('CARGANDO');
    this.addGameStates();
    this.addGameMusic();

    // this.game.time.events.add(Phaser.Timer.SECOND * 10.0, function() {
    //         var tween = this.add.tween(this.loadingBar)
    //             .to({angle: 45}, 750, Phaser.Easing.Linear.none);
    //
    //       tween.onComplete.add(function() {
    //            //  this.logo.destroy();
    //                Emit("login"," ","loginConfirmed","logueado",this);
    //         }, this);
    //
    //       tween.start();
    //     }, this);



    var cargado;
    var done=false;
	var context=this;
   $(document).ready(function(){

     fuentes=['CondensedRegular','CondensedBold','CondensedLight', 'BitterBold', 'RobotoBold', 'RobotoRegular'];

	
	var interval=setInterval(function(){
		if(!done){
			chechFuentes(fuentes);
		}else{
			clearInterval(interval);
			 Emit("login"," ","loginConfirmed","logueado",context);
		}
	},1000);
     /* while (!done) {
       chechFuentes(fuentes);
      }*/




   });

   function onMyCoolFontLoaded (fontname){
     cargado++;
// console.log(cargado);
   };

   function chechFuentes(fuentes){

     cargado=0

     for(var i=0; i<fuentes.length; i++){
           FontDetect.onFontLoaded (fuentes[i], onMyCoolFontLoaded);

     }


           if(cargado==fuentes.length){
             console.log("FUENTES CARGADAS")
             done=true;

           }else{
             console.log("NO CARGARON TODAS LAS FUENTES");
             // chechFuentes(fuentes);
             done=false;

           }

   };








  },


  test:function(){
	  console.log("test entra");
  },

  logueado: function(msg){
		game.state.start("GameMenu");
	  console.log("logueado");
	  usuario=msg;
	  console.log(msg);
	  this.test();


  },

};

// Phaser.Utils.mixinPrototype(Splash.prototype, mixins);
