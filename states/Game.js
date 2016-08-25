var Game = function(game) {};

Game.prototype = {



  preload: function () {

    this.optionCount = 1;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('sky', 'assets/images/tribuna_atras.png');
    game.load.image('frente', 'assets/images/tribuna_frente.png');
    game.load.spritesheet('button', 'assets/images/boton.png', 300, 300);
    game.load.image('assert', 'assets/images/green-button.png', 150,150);
    game.load.image('noassert', 'assets/images/red-button.png', 150,150);
    game.load.image('orange-button', 'assets/images/orange-button.png', 150,150);
    game.load.image('yellow-button', 'assets/images/yellow-button.png', 150,150);
    game.load.image('triangle', 'assets/images/puntero.png', 150,150);
    game.load.image('barra', 'assets/images/barra-p.png', 150,150);
    game.load.spritesheet('pateador-local', 'assets/images/pateador.png', 105, 130);
    game.load.spritesheet('tribunaAtras', 'assets/images/gente1.png');
    game.load.spritesheet('tribunaAdelante', 'assets/images/gente2.png');
    game.load.image('pasto', 'assets/images/pasto.png');
    game.load.spritesheet('pelota', 'assets/images/pelota.png', 65, 65);
    game.load.image('arco', 'assets/images/arco.png');
    game.load.spritesheet('arquero-local', 'assets/images/arquero.png', 116, 110);
    game.load.image('barraVertical', 'assets/images/barra_vertical.png');
    game.load.spritesheet('arquero-visitante', 'assets/images/arquero2.png', 116, 110);
    game.load.spritesheet('pateador-visitante', 'assets/images/pateador2.png', 105, 130);

  },



  create: function () {

    self = this;
    self.ListenerComienzo(self);


     timer = game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

     var display1="Fallaste!";
     var display2="Ganaste!";
     presicion= 0;
     presicionText=0;
     rangoDePresicion=40;
     counter=15;
     array=[];


     //Modo aleatorio de settear quien comienza la partida, arquero o pateador
     modo=game.rnd.integerInRange(0,1);
     //Modo aleatorio de settear quien comienza la partida, arquero o pateador

     puntosComputer=0;
     puntosUser=0;
     enAlargue=false;



     buttons= game.add.group();


     clicked =0;
     game.add.sprite(0, 0, 'sky');
     tribunaAtras = game.add.sprite(0,0, 'tribunaAtras');
     tweenTribuna1= game.add.tween(tribunaAtras);
     tweenTribuna1.to( {x:0, y:20}, 500, 'Linear', true, 0, false).yoyo(true);

     tribunaAdelante = game.add.sprite(0,0, 'tribunaAdelante');
     tweenTribuna2= game.add.tween(tribunaAdelante);
     tweenTribuna2.to( {x:0, y:-10}, 300, 'Linear', true, 0, false).yoyo(true);


     game.add.sprite(0,130, 'frente');
     game.add.sprite(0,350, 'pasto');

     arco= game.add.sprite(320,130, 'arco');


     presicionText = game.add.text(10, 355, 'Tiempo: 00:00', { font: " 20px TheMinion", fill: "black", align: "center" });
     presicionText.visible=false;

     equipoUnoText = game.add.text(10, 160, 'Equipo 1', { font: " 20px TheMinion", fill: "black", align: "center" });
     equipoDosText = game.add.text(10, 260, 'Equipo 2', { font: " 20px TheMinion", fill: "black", align: "center" });

     barra = game.add.sprite(450,600,'barra');
     barra.scale.setTo(0.30,0.20);

     focus = game.add.sprite(440,600, 'triangle');
     focus.scale.setTo(0.05,0.05);


     beginBarra = barra.position.x;
     centerBarra = barra.position.x + barra.width/2 -focus.width/2 ;
     endBarra = barra.position.x + barra.width - focus.width/2;

     presA = game.add.sprite(centerBarra-rangoDePresicion,590, 'barraVertical');
     presA.scale.setTo(0.10,0.05);
     presB = game.add.sprite(centerBarra+rangoDePresicion,590, 'barraVertical');
     presB.scale.setTo(0.10,0.05);

     barra.visible=false;
     focus.visible=false;
     presB.visible=false;
     presA.visible=false;



      perfil1 = {
                id:1,
                efectividad:2,
                tiros:[ [0,0,1,2,2,0],
                        [0,2,1,1,2,0],
                        [0,2,1,1,2,0],
                        [0,2,1,1,2,0],
                        [0,1,1,1,2,2] ]
                };

    perfil2 = {
                id:2,
                efectividad:5,
                tiros:[ [0,1,1,1,2,0],
                        [0,1,1,1,2,0],
                        [2,1,1,1,2,0],
                        [0,0,1,1,2,0],
                        [0,2,1,1,2,0] ]
            };


  perfil3 = {
              id:3,
              efectividad:10,
              tiros:[ [0,0,1,2,2,0],
                      [0,2,1,1,2,0],
                      [0,0,1,1,2,0],
                      [0,2,1,1,2,0],
                      [0,0,1,1,2,2] ]
                      };

  perfil4 = {
              id:4,
              efectividad:20,
              tiros:[ [0,1,1,1,2,0],
                      [0,1,1,1,2,0],
                      [0,1,1,1,2,0],
                      [0,0,1,1,2,0],
                      [0,0,1,1,2,0] ]
            };


    perfiles=[perfil1,perfil2, perfil3, perfil4];


     velocidad=2000;

    arquero= game.add.sprite(500,250, 'arquero-local');
    arquero.frame = 0;
    arquero.animations.add('up-right', [6], 10, false);
    arquero.animations.add('up', [1], 10, false);
    arquero.animations.add('down', [2], 10, false);
    arquero.animations.add('up-left', [5], 10, false);
    arquero.animations.add('down-left', [3], 10, false);
    arquero.animations.add('down-right', [4], 10, false);

    arquero.visible=false;

     pelota= game.add.sprite(535,500 ,'pelota');

     player = game.add.sprite(240,450, 'pateador-local');
     player.frame = 0;
     player.animations.add('right', [1,2], 20, true);
     player.visible=true;



     transparentObject = game.add.button(0,0);

     transparentObject.scale.setTo(game.world.width, game.world.height);
     transparentObject.alpha =0;

     transparentObject.visible=false;



      var auxID=1;

      for (var i = 1; i < 3; i++)
      {
          for(var j=0; j < 3; j++){

            auxButton = game.add.button((j*120)+400, (i*90)+80, 'button', function(self){}, this, 50, 50, 0);
            auxButton.id=auxID++;


            auxButton.events.onInputDown.add(this.actionOnClick,auxButton);

            auxButton.scale.setTo(0.25,0.25);

            buttons.add(auxButton);
            buttons.visible=true;
            game.world.bringToTop(buttons);


          };



      };

        if(Phaser.Math.isEven(modo)){
        triesA=1;
        triesP=0;
        self.modificarBotones(self);

        }else{
        triesA=0;
        triesP=1;

        }

        self.cambiarRopa(self);


        looser = game.add.text(350, 350, display1, { font: 'bold 60pt TheMinion',fill: 'red' });
        looser.visible=false;
        winner = game.add.text(350, 350, display2, {  font: 'bold 60pt TheMinion',fill: 'red' });
        winner.visible=false;

        points= game.add.group();
        perfilElegido= self.setEnemy(self);






      },

      updateCounter: function () {

        counter--;

        presicionText.setText('Tiempo: 00:0' + counter);
          if(counter< 6){
            presicionText.visible=true;

          }else{
            presicionText.visible=false;
          };

          if (counter==-1) {
            self.failScore(self);
            counter=0;
            presicionText.visible=false;

          };


      },



  moveLeftDown: function(){

  arquero.animations.play('down-left');
  },

  moveLeftUp: function(){
    arquero.animations.play('up-left');
  },

  jump: function(){

  arquero.animations.play('up');
  },
  moveRightDown: function(){

  arquero.animations.play('down-right');
  },

  moveRightUp: function(){
    arquero.animations.play('up-right');

  },

  moveDown: function(){
    arquero.animations.play('down');
  },


  setBarraPresicion: function(){

    barra.visible=true;
    focus.visible=true;
    presA.visible=true;
    presB.visible=true;
    tweenTribuna1.pause();
    tweenTribuna2.pause();


  },


  setResult: function(auxValue){

     result=auxValue;
  },

  getResult: function(){
    return result;
  },

  setPlayersMode1: function(){


    player.visible=true;
    focus.position.x=440;
    focus.position.y=600;
    tweenFocus = game.add.tween(focus);
    tweenFocus.to( {x:endBarra, y:600}, velocidad, 'Linear', true, 0, false).yoyo(true);
    velocidad=velocidad-400;
    self.setArquero(self);
    transparentObject.visible=true;
    buttons.visible=false;
    transparentObject.events.onInputDown.addOnce(this.ListenerPateador,self);
  },


  setArquero: function(){
    arquero.visible=true;
    arquero.frame=0;
    arquero.position.x =500;
    arquero.position.y =250;
  },

 cambiarRopa: function(){
     if(Phaser.Math.isEven(modo)){
       player.loadTexture('pateador-visitante', 0, false);
       arquero.loadTexture('arquero-visitante', 0, false);
     }else{
       player.loadTexture('pateador-local', 0, false);
       arquero.loadTexture('arquero-local', 0, false);
     }
 },

  setPlayersMode2: function(){


    player.visible=true;
    self.setArquero(self);
    buttons.visible=false;
      setTimeout(function(){
        self.ListenerArquero(self);
      },500);
  },

  actionOnClick: function(target) {

    if(clicked==1){
      return;
    }

    clicked=1;
    self.setResult(target);

    if(Phaser.Math.isEven(modo)){

      self.setPlayersMode2(self);

    }else{

      self.setBarraPresicion(self);
      self.setPlayersMode1(self);

    };

  },



  restart: function(self){

    counter=15;
    modo++;

    if(Phaser.Math.isEven(modo)){
      triesA++;

      self.modificarBotones(self);
    }else{
      triesP++;
      self.botonesRojos(self);
    }

    setTimeout(function(){
      presicionText = game.add.text(10, 355, 'Tiempo: 00:00', { font: " 20px TheMinion", fill: "black", align: "center" });
      presicionText.visible=false;
      winner.visible=false;
      looser.visible=false;
      barra.visible=false;
      presA.visible=false;
      presB.visible=false;
      focus.visible=false;
      buttons.visible=true;
      player.position.x=240;
      player.position.y=450;
      player.frame=0;
      game.tweens.remove(tweenPelota);

      try{
        game.tweens.remove(tweenFocus);
        game.tweens.remove(tweenArquero);

      }
      catch(e){}


      arquero.animations.stop();
      arquero.frame=0;
      arquero.visible=false;

      self.cambiarRopa(self);
      pelota.position.x=535;
      pelota.position.y=500;
      clicked=0;


    },1000);

  self.ListenerGetJugada(self);


  },

  patear: function(){
    tweenPlayer = game.add.tween(player);

    tweenPlayer.to({x:460, y:440},500, 'Linear', true, 0);

    player.animations.play('right');
  },

  stopPlayer: function(){
    player.animations.stop();
    player.frame=2;
  },

  NoAssertPoint: function(ubiPuntaje, tries){
    var point= game.add.sprite(10+tries*40,ubiPuntaje, 'noassert');
    point.scale.setTo(0.10,0.10);
    points.add(point);

  },


  AssertPoint: function(ubiPuntaje, tries){
    var point= game.add.sprite(10+tries*40, ubiPuntaje, 'assert');
    point.scale.setTo(0.10,0.10);
    points.add(point);
  },

  seMueveArquero: function(self){

      tweenArquero = game.add.tween(arquero);
      tweenArquero.to(posArquero, 300, 'Linear', true, 0);

        switch(posArqueroI){

          case 1:
          arquero.animations.play('up-left');
          break;

          case 2:
          arquero.animations.play('up');
          break;

          case 3:
          arquero.animations.play('up-right');
          break;

          case 4:
          arquero.animations.play('down-left');
          break;

          case 5:
          arquero.animations.play('down');
          break;

          case 6:
          arquero.animations.play('down-right');
          break;

        }

    },

    desempatar:function(){
      enAlargue=true;
      desempateText= game.add.text(600, 10, 'Alargue. Desempate', { font: " 20px TheMinion", fill: "black", align: "right" });
      points.removeAll(true);
      setTimeout(function(){self.restart(self);},200);
      triesA=0;
      triesP=0;

    },

    terminarJuego: function(){
      this.game.state.states["GameOver"].puntosUser = puntosUser;
      this.game.state.states["GameOver"].puntosComputer = puntosComputer;

      self.ListenerTerminarJuego(self);

      this.game.state.start("GameOver")
    },

    checkIntentos: function(){

      if( triesA  >= 5 &&  triesP  >= 5 ){

        if(self.esEmpate(self)){
          setTimeout(function(){self.desempatar(self);},200);

        }else{
          self.ListenerGetJugada(self);
          setTimeout(function(){self.terminarJuego(self);},500);

        };

      }else{


        if(!enAlargue){

                setTimeout(function(){self.restart(self);},200);
        }else{


              if(triesA >=1 && triesP>=1){

                if(puntosUser!=puntosComputer){
                  self.ListenerGetJugada(self);
                  setTimeout(function(){self.terminarJuego(self);}
                    ,500);

                }else{
                  setTimeout(function(){self.desempatar(self);},500);

                }

              }else{
                setTimeout(function(){self.restart(self);},200);

              }


        }


      };

    },



  ListenerPateador: function(target){

    self.establecerParametros(self);

      setTimeout(function(){

        self.stopPlayer(self);



        self.ubicarArquero(perfilElegido.efectividad, self);

        win=false;

        if(self.getResult().id != generator){
           win=true;
        };


        if( rangoDePresicion > presicion && presicion > -rangoDePresicion){

            self.acertarTiro(self);
           }else{

            self.errarTiro(self);

         };

      },500);

  },


  ListenerArquero: function(target){

    self.establecerParametros(self);

    setTimeout(function(){

      self.stopPlayer(self);

      posArqueroI=self.getResult().id;

      posArquero= self.getResult().position;

      arrayMaso= self.getMaso(self);

      generator = self.generarRiesgo(arrayMaso,self);


      win=false;

      if(posArqueroI == generator){
         win=true;
      };

      generatorFailTry= game.rnd.integerInRange(0,1);

      if( generatorFailTry==1){

          self.atajar(self);

         }else{

          self.noAtajar(self);

       };


    },500);

  },


    failScore: function(){
      presicionText.destroy();

      if(clicked==1){
        return;
      }

      buttons.visible=false;
      self.setArquero(self);

      clicked=1;

      self.patear(self);

      setTimeout(function(){

        self.stopPlayer(self);
        self.ubicarArquero(perfilElegido.efectividad,self);

        if(Phaser.Math.isEven(modo)){
          generatorFailTry= game.rnd.integerInRange(0,1);

          if(generatorFailTry==1){
            var movimientoPelota= self.moverPelota(posArquero);
          }else{
            posAux = game.rnd.integerInRange(-800,800);
            var movimientoPelota= self.moverPelota({x:posAux, y:-500});
          };

        }else{

          self.seMueveArquero(self);
          posAux = game.rnd.integerInRange(-800,800);

          var movimientoPelota= self.moverPelota({x:posAux, y:-500});
        }


         movimientoPelota.onComplete.addOnce(function(){

              if(Phaser.Math.isEven(modo)){

                if(generatorFailTry==0){

                  self.NoAssertPoint(300,triesA);
                  self.Win(self);

                }else{

                  self.AssertPoint(300,triesA);
                  self.Looser(self);
                  puntosComputer++;

                  localStorage["TotalNoAtajados"] = (parseInt(localStorage["TotalNoAtajados"]) || 0) + 1;
                  localStorage["TotalPartidaNoAtajados"] = (parseInt(localStorage["TotalPartidaNoAtajados"]) || 0) + 1;
                  localStorage["RachaAtajados"] = 0;

                  localStorage["RachaNoAtajados"] = (parseInt(localStorage["RachaNoAtajados"]) || 0) + 1;
                  if(parseInt(localStorage["RachaNoAtajados"]) > parseInt(localStorage["PeorRachaNoAtajados"])){
                    localStorage["PeorRachaNoAtajados"]=parseInt(localStorage["RachaNoAtajados"]);
                  }

                }


              }else{
                self.NoAssertPoint(200,triesP);
                self.Looser(self);
                localStorage["TotalErrados"] = (parseInt(localStorage["TotalErrados"]) || 0) + 1;
                localStorage["TotalPartidaErrados"] = (parseInt(localStorage["TotalPartidaErrados"]) || 0) + 1;
                localStorage["RachaConvertidos"] = 0;
                localStorage["RachaErrados"] = (parseInt(localStorage["RachaErrados"]) || 0) + 1;
                if(parseInt(localStorage["RachaErrados"]) > parseInt(localStorage["PeorRachaErrados"])){
                  localStorage["PeorRachaErrados"]=parseInt(localStorage["RachaErrados"]);
                }

              }

                self.checkIntentos(self);
            });

      },500);

    },


    Win: function(){
      looser.visible=false;
      winner.visible=true;
    },

    Looser: function(){
      looser.visible=true;
      winner.visible=false;
    },

    acertarTiro: function(self){

      coordinate=self.getResult().position;

      self.seMueveArquero(self);

      var movimientoPelota=self.moverPelota(coordinate);

      movimientoPelota.onComplete.addOnce(function(){

          if(win){
              puntosUser++;
              tweenTribuna1.resume();
              tweenTribuna2.resume();
              self.AssertPoint(200,triesP);
              self.Win(self);
              localStorage["TotalConvertidos"] = (parseInt(localStorage["TotalConvertidos"]) || 0) + 1;
              localStorage["TotalPartidaConvertidos"] = (parseInt(localStorage["TotalPartidaConvertidos"]) || 0) + 1;
              localStorage["RachaConvertidos"] = (parseInt(localStorage["RachaConvertidos"]) || 0) + 1;
              localStorage["RachaErrados"]=0
              if( parseInt(localStorage["RachaConvertidos"]) > parseInt(localStorage["MejorRachaConvertida"]) ){
                localStorage["MejorRachaConvertida"]= parseInt(localStorage["RachaConvertidos"]);
              }



          }else{
              self.NoAssertPoint(200,triesP);
              self.Looser(self);
              localStorage["TotalErrados"] = (parseInt(localStorage["TotalErrados"]) || 0) + 1;
              localStorage["TotalPartidaErrados"] = (parseInt(localStorage["TotalPartidaErrados"]) || 0) + 1;
              localStorage["RachaConvertidos"] = 0;
              localStorage["RachaErrados"] = (parseInt(localStorage["RachaErrados"]) || 0) + 1;
              if(parseInt(localStorage["RachaErrados"]) > parseInt(localStorage["PeorRachaErrados"])){
                localStorage["PeorRachaErrados"]=parseInt(localStorage["RachaErrados"]);
              }

         };

        self.checkIntentos(self);
       });
    },

    atajar: function(self){

      coordinate= buttons.children[generator-1].position;

      self.seMueveArquero(self);

      var movimientoPelota=self.moverPelota(coordinate);

      movimientoPelota.onComplete.addOnce(function(){

          if(win){

              tweenTribuna1.resume();
              tweenTribuna2.resume();
              self.NoAssertPoint(300,triesA);
              self.Win(self);
              localStorage["TotalAtajados"] = (parseInt(localStorage["TotalAtajados"]) || 0) + 1;
              localStorage["RachaAtajados"] = (parseInt(localStorage["RachaAtajados"]) || 0) + 1;
              localStorage["TotalPartidaAtajados"] = (parseInt(localStorage["TotalPartidaAtajados"]) || 0) + 1;
              localStorage["RachaNoAtajados"] = 0;
              if( parseInt(localStorage["RachaAtajados"]) > parseInt(localStorage["MejorRachaAtajados"]) ){
                 localStorage["MejorRachaAtajados"]= parseInt(localStorage["RachaAtajados"]);
              }



          }else{


              self.AssertPoint(300,triesA);
              self.Looser(self);
              puntosComputer++;
              localStorage["TotalNoAtajados"] = (parseInt(localStorage["TotalNoAtajados"]) || 0) + 1;
              localStorage["TotalPartidaNoAtajados"] = (parseInt(localStorage["TotalPartidaNoAtajados"]) || 0) + 1;
              localStorage["RachaAtajados"] = 0;

              localStorage["RachaNoAtajados"] = (parseInt(localStorage["RachaNoAtajados"]) || 0) + 1;
              if(parseInt(localStorage["RachaNoAtajados"]) > parseInt(localStorage["PeorRachaNoAtajados"])){
                localStorage["PeorRachaNoAtajados"]=parseInt(localStorage["RachaNoAtajados"]);
              }

         };

        self.checkIntentos(self);
       });
    },



  errarTiro: function(){

      if(presicion > 0){
        posAux = game.rnd.integerInRange(600,800);
      }else{
        posAux = game.rnd.integerInRange(-800,200);
      }

     self.seMueveArquero(self);
     var movimientoPelota=self.moverPelota({x:posAux, y:-500});

     movimientoPelota.onComplete.addOnce(function(){
       self.NoAssertPoint(200,triesP);
       self.Looser(self);
       localStorage["TotalErrados"] = (parseInt(localStorage["TotalErrados"]) || 0) + 1;
       localStorage["TotalPartidaErrados"] = (parseInt(localStorage["TotalPartidaErrados"]) || 0) + 1;
       localStorage["RachaConvertidos"] = 0;
       localStorage["RachaErrados"] = (parseInt(localStorage["RachaErrados"]) || 0) + 1;
       if(parseInt(localStorage["RachaErrados"]) > parseInt(localStorage["PeorRachaErrados"])){
         localStorage["PeorRachaErrados"]=parseInt(localStorage["RachaErrados"]);
       }


       self.checkIntentos(200,triesP);


     });

  },

  noAtajar: function(){

     posAux = game.rnd.integerInRange(-800,800);

     self.seMueveArquero(self);
     var movimientoPelota=self.moverPelota({x:posAux, y:-500});

     movimientoPelota.onComplete.addOnce(function(){

       tweenTribuna1.resume();
       tweenTribuna2.resume();
       self.NoAssertPoint(300,triesA);
       self.Win(self);
       self.checkIntentos(300,triesA);

     });

  },




moverPelota: function(unaCoordenada){
  tweenPelota = game.add.tween(pelota);
   var auxTween= tweenPelota.to(unaCoordenada,500, 'Linear', true, 0);
   return auxTween;
},

establecerParametros: function(){
  presicionText.destroy();

  transparentObject.visible=false;
  try{
    tweenFocus.pause();
  }
  catch(i){
  }

  self.patear(self);

  presicion =  centerBarra - focus.position.x ;

  looser.visible=false;

  winner.visible=false;
},


esEmpate: function(){
  if(puntosUser==puntosComputer)return true;
  return false;
},

getMaso: function(){
  if(Phaser.Math.isEven(modo)){
    return array[triesA-1];
  }else{
      return array[triesP-1];
  }

},

generarRiesgo: function(arrai, target){


  var arrayNuevo = [];

      for(var i =1 ; i<7; i++){

              if(arrai[i-1] == 1){
                  for (var j=1; j < 3; j++) {
                  arrayNuevo.push(i);
                  }

              }else if(arrai[i-1]==2){
                  for (var j=1; j < 4; j++) {
                    arrayNuevo.push(i);
                    }
              }else{

                  arrayNuevo.push(i);

              };
      }

      var longitud = arrayNuevo.length;
      var pos = game.rnd.integerInRange(0,longitud-1);
      return arrayNuevo[pos];

},

modificarBotones: function(){
  var barray = self.getMaso(self);

  for(var i=1; i<7; i++){
    if(barray[i-1]==0){
        buttons.children[i-1].loadTexture('orange-button', 0, false);


    }else if(barray[i-1]==1){
        buttons.children[i-1].loadTexture('yellow-button', 0, false);
    }

  }

},


botonesRojos:function(){
  for(var i=0; i<6; i++){

        buttons.children[i].loadTexture('button', 0, false);
  }
},


calculoChancesAtajar: function(efec, target){

    var chanceAtajar = game.rnd.integerInRange(1,efec);

    if(chanceAtajar==1){

      var gen= self.getResult().id;


    }else {

      var gen = game.rnd.integerInRange(1,6);

    }

    return gen;
},


ubicarArquero: function(efec, target){


  if(Phaser.Math.isEven(modo)){
    while(generator==5){
        generator = game.rnd.integerInRange(1,6);

        break;
    }
  }else{
    generator = self.calculoChancesAtajar(efec,self);

    }


  for(var i=0; i<6 ; i++ ){

     if(buttons.children[i].id == generator){
     posArqueroI= buttons.children[i].id;
     break;
      }

  };

  posArquero=buttons.children[i].position;
},


setEnemy: function(){
  var id= game.rnd.integerInRange(1,4);

  array= perfiles[id-1].tiros;

  return perfiles[id-1];

},

ListenerComienzo: function(){
  setTimeout(function(){

      console.log("Comienzo Partida");},2000);


},

ListenerGetJugada: function(){

  setTimeout(function(){

      console.log("Recibiendo Jugada");},2000);

},

ListenerTerminarJuego: function(){
  setTimeout(function(){

      console.log("Recibiendo Resultado Partida");},2000);


}




};
