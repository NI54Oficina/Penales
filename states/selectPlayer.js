var Selectplayer = function(game) {};

Selectplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  create: function(){
      self = this;
      indiceC=0;
      i=0;
      muttex=0;


      self.createBackground(true);
      self.createHeader(this.GoBack,false);
      self.createSoundGraphics();


      self.createGeneralTitle("SELECCIONAR RIVAL", false);


      // search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
      // search.visible=false;

      //creating the carrousel


      // imagen mas baja a la izquierda
      img5= game.add.sprite(145, 225, 'img-5');
  	  var shadowX=20;
  	  var shadowY=365;
      h5=img5.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));

      // imagen mas baja a la derecha
      img4= game.add.sprite(145, 225, 'img-4');
      h4=img4.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //imagen menos baja a la izquierda
      img3= game.add.sprite(145, 225, 'img-3');
      h3=img3.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //imagen menos baja a la derecha
      img2= game.add.sprite(145, 225, 'img-2');
      h2=img2.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //imagen central
      img1=game.add.sprite(145, 225, 'img-1');
      h1=img1.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));

      arrayCr=[img3, img4, img1,img2 , img5];

      for(var i=0; i<arrayCr.length; i++){

        var cover=game.add.graphics(0, 0);
        cover.beginFill(0x004c81,0.8);
        cover.drawRoundedRect(18, 19,arrayCr[i].width-52 ,arrayCr[i].height-52,35);
        cover.endFill();
        cv=arrayCr[i].addChild(cover);
      }



      img1.scale.setTo(.9, .9);
      wd= img1.width;
      img1.visible=false;
      img2.visible=false;
      img3.visible=false;
      img4.visible=false;
      img5.visible=false;

      img1.scale.setTo(.5,.5);
      img2.scale.setTo(.5,.5);
      img3.scale.setTo(.5,.5);
      img4.scale.setTo(.5,.5);
      img5.scale.setTo(.5,.5);

      img1.idk=1;
      img2.idk=2;
      img3.idk=3;
      img4.idk=4;
      img5.idk=5;




      self.setTo5(img2);
      self.setTo4(img1);
      self.setTo3(img5);
      self.setTo2(img4);
      self.setTo1(img3);


      jugar=self.createButton('JUGAR', function () {
       Emit("buscarPartida",s1.idk,"partidaEncontrada","listenerSearch",self);
     },400,75 ,'30pt RobotoBold');

     jugar.position={x:365,y:530};



  },

  listenerSearch: function (msg){

      // search.visible=false;

    console.log(msg);
       auxArray=JSON.parse(msg);

      console.log("Oponente Encontrado");


      this.game.state.states["Game"].partida=auxArray;
      this.game.state.states['Game'].perfil = auxArray.oponente;
      this.game.state.states['Game'].tiempoMaximo = auxArray.tiempomaximo;
      this.game.state.states['Game'].triesA= auxArray.IntentosOponente;
      this.game.state.states['Game'].triesP= auxArray.Intentoslocal;
      this.game.state.states['Game'].modo=auxArray.rol;

      game.state.start("Game");

  },

  moveToLeft: function(s){



    if(muttex==1){
      return;
    }

    muttex=1;


    self.getID(s);
    // golden.alpha=0;

    var carrousel=[];
    var j=i;

    while(carrousel.length <= 2) {

      if(j<arrayCr.length){
        carrousel.push(j);
      }else{
        j=0;
        carrousel.push(j);
      }
      j++;


    }
     j=i;
    while(carrousel.length <=4){

      if(j>0){
        carrousel.push(--j);
      }else{
        j=arrayCr.length-1;
          carrousel.push(j);
      }
    }



    a= carrousel[0];
    b= carrousel[1];
    c= carrousel[3];
    d= carrousel[2];
    e= carrousel[4];

    if(s.pos <4){
      self.setTo5(arrayCr[e]);
      self.setTo4(arrayCr[d]);
    }else{
      self.setTo4(arrayCr[d]);
      self.setTo5(arrayCr[e]);
    }
      self.setTo3(arrayCr[c]);
      self.setTo2(arrayCr[b]);
      self.setTo1(arrayCr[a]);

      muttex=0;

      game.world.bringToTop(jugar);
      // game.world.bringToTop(search);

},

setTo5: function(target){
  target.visible=true;


  s5= target;

  this.world.bringToTop(s5);

  s5.inputEnabled = true;
  s5.pos=1;
  s5.events.onInputDown.add(this.moveToLeft,s5);

  var tweenA= game.add.tween(target).to({x:145, y:225}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');
  var tweenD =game.add.tween(target.children[1]).to( {alpha:.8}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenD.start();

},

setTo4: function(target){
  target.visible=true;

  s4= target;
  this.world.bringToTop(s4);
   s4.inputEnabled = true;
   s4.pos=5;
   s4.events.onInputDown.add(this.moveToLeft, s4);

   var tweenA= game.add.tween(target).to({x:800, y:225}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');
   var tweenD =game.add.tween(target.children[1]).to( {alpha:.8}, 500, 'Linear');

   tweenA.start();
   tweenB.start();
   tweenD.start();
},

setTo3: function(target){
  target.visible=true;

  s3=target;
  this.world.bringToTop(s3);
  s3.inputEnabled = true;
  s3.pos=2;
  s3.events.onInputDown.add(this.moveToLeft, s3);

  var tweenA= game.add.tween(target).to({x:255, y:210}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.6, y:.6}, 500, 'Linear');
  var tweenD =game.add.tween(target.children[1]).to( {alpha:.3}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenD.start();

  // shadow3 = game.add.sprite(245, 193+s3.height, 'shadow');
  // shadow3.scale.setTo(.6,.6);

},

setTo2: function(target){
target.visible=true;
  s2= target;
  this.world.bringToTop(s2);
  s2.inputEnabled = true;
  s2.pos=4;
  s2.events.onInputDown.add(this.moveToLeft,s2);

  var tweenA= game.add.tween(target).to({x:650, y:210}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.6, y:.6}, 500, 'Linear');
  var tweenD =game.add.tween(target.children[1]).to( {alpha:.3}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenD.start();
},

setTo1: function(target){
  target.visible=true;

  s1= target;
  s1.pos=3;

  // console.log(s1.key);

  this.world.bringToTop(s1);
   var tweenA= game.add.tween(target).to({x:this.game.width/2- wd/2, y:150}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:0.9, y:.9}, 500, 'Linear');
   var tweenC =game.add.tween(target).to( {alpha:1}, 500, 'Linear');
   var tweenD =game.add.tween(target.children[1]).to( {alpha:0}, 500, 'Linear');

   tweenD.start();
   tweenA.start();
   tweenB.start();
   tweenC.start();



  //  tweenA.onComplete.addOnce(function(){
   //
  //    tweenD=game.add.tween(golden).to( {alpha:1}, 50, 'Linear');
  //    tweenD.start();
   //
   //
  //  });

   //
  //  this.world.bringToTop(golden);


},

setResult: function(auxValue){

   result=auxValue;
},

getResult: function(){
  return result;
},


getID: function(s){
  for( i=0; i<=arrayCr.length;i++){

    if(arrayCr[i].key==s.key){
      break;
    }

  };



  return i;
},

GoBack: function(target){
  game.state.start("GameMenu");
},



}

Phaser.Utils.mixinPrototype(Selectplayer.prototype, mixins);
