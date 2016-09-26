var Selectplayer = function(game) {};

Selectplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {

      var optionStyle = { font: '40pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'};

    // aplicando el background de cada texto

      var 	myBitmap = this.game.add.bitmapData(540, 80);
      var  grd=myBitmap.context.createLinearGradient(0,0,0,40);
      grd.addColorStop(0,"#fbe43e");
      grd.addColorStop(0.9,"#fbe43e");
      grd.addColorStop(1,"#cea428");
      myBitmap.context.fillStyle=grd;
      myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
      var background = this.game.add.sprite(100,this.optionCount*530-10, myBitmap);

    // aplicando el background de cada texto

    var txt = game.add.text(100, 0 , text, optionStyle);
    txt.position.y= background.position.y+ background.height/2 - txt.height/2;

    down= this.game.make.sprite(-20,55, 'brillodown');
    up= this.game.make.sprite(200,-15, 'brilloup');
    down.scale.setTo(0.5,0.5);
    up.scale.setTo(0.5,0.5);
    background.addChild(down);
    background.addChild(up);



    txt.position.x=this.game.width/2 - txt.width/2;
    background.position.x=this.game.width/2 - background.width/2;

    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#1b1464";
      target.stroke = "#1b1464";
      txt.useHandCursor = false;
    };

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  create: function(){
      self = this;
      indiceC=0;
      i=0;
      muttex=0;

      //fondo
      var 	gameBack = this.game.add.bitmapData(this.game.width,this.game.height);
      var  grd=gameBack.context.createLinearGradient(0,0,0,this.game.height);
      grd.addColorStop(0,"black");
      grd.addColorStop(0.15,"#1a1750");
      grd.addColorStop(0.3,"#1a1750");
      grd.addColorStop(1,"#009ee1");
      gameBack.context.fillStyle=grd;
      gameBack.context.fillRect(0,0,this.game.width,this.game.height);
      this.game.add.sprite(0,0,gameBack);

      game.stage.disableVisibilityChange = true;
      curva=game.add.sprite(0,0, 'curva');
      curva.position={x:this.game.width/2-curva.width/2, y:this.game.height/2};
      dots = game.add.tileSprite(0, 0, this.game.width,this.game.height,'puntitos');
      dots.alpha=0.3;
      //fondo



      game.add.sprite(0, 0, 'left-corner');
      a= game.add.sprite(this.game.width, 0, 'right-corner');
      a.scale.x = -1;


      volver= game.add.sprite(50, 50, 'volver');
      volver.inputEnabled = true;
      volver.events.onInputDown.add(this.GoBack,volver);

      menu= game.add.sprite(this.game.width-100, 50, 'menu');
      menu.inputEnabled = true;
      menu.events.onInputDown.add(this.GoBack,menu);

      titulo= game.add.text(0,50, 'SELECCIONAR RIVAL', { font: " 40px BitterBold", fill: "white", align:'center' });
      titulo.position.x= this.game.width/2- titulo.width/2;




      search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
      search.visible=false;

      //creating the carrousel

      //arrayimg=['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'];

      // imagen mas baja a la izquierda
      img5= game.add.sprite(145, 225, 'img-5');
	  var shadowX=20;
	  var shadowY=365;
      h5=img5.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));

      // imagen mas baja aa la derecha
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

      //
      // img6=game.add.sprite(800, 225, 'img-6');
      // h6=img6.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //
      // img7=game.add.sprite(800, 225, 'img-7');
      // h7=img7.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //
      // img8=game.add.sprite(800, 225,'img-8');
      // h8=img8.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //
      // img9=game.add.sprite(800, 225, 'img-9');
      // h9=img9.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));
      //
      // img10=game.add.sprite(800, 225, 'img-10');
      // h10=img10.addChild(game.make.sprite(shadowX,shadowY, 'shadow'));


      img1.scale.setTo(.9, .9);
      wd= img1.width;
      img1.visible=false;
      img2.visible=false;
      img3.visible=false;
      img4.visible=false;
      img5.visible=false;
      // img6.visible=false;
      // img7.visible=false;
      // img8.visible=false;
      // img9.visible=false;
      // img10.visible=false;

      img1.scale.setTo(.5,.5);
      img2.scale.setTo(.5,.5);
      img3.scale.setTo(.5,.5);
      img4.scale.setTo(.5,.5);
      img5.scale.setTo(.5,.5);
      // img6.scale.setTo(.5,.5);
      // img7.scale.setTo(.5,.5);
      // img8.scale.setTo(.5,.5);
      // img9.scale.setTo(.5,.5);
      // img10.scale.setTo(.5,.5);


        golden=game.add.sprite(this.game.width/2- wd/2, 150, 'golden');
        golden.scale.setTo(0.9,0.9);
        golden.alpha=0;


      arrayCr=[img1, img2, img3,img4 , img5];


      self.setTo5(img5);
      self.setTo4(img3);
      self.setTo3(img4);
      self.setTo2(img2);
      self.setTo1(img1);


      this.addMenuOption('JUGAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


  },

  listenerSearch: function (msg){

      search.visible=false;

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


// moveToRight: function(s){
//
//
//
//   golden.destroy();
//
//
//   self.getID(s);
//
//   var carrousel=[];
//   var j=i;
//
//   while(carrousel.length <= 5) {
//
//     if(j<arrayCr.length){
//
//       carrousel.push(j);
//
//     }else{
//
//       j=0;
//
//       carrousel.push(j);
//     }
//
//     j--;
//   }
//
//
//
//
// },
  moveToLeft: function(s){

    if(muttex==1){
      return;
    }

    muttex=1;


    self.getID(s);
    golden.alpha=0;



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





      self.setTo5(arrayCr[e]);
      self.setTo4(arrayCr[d]);
      self.setTo3(arrayCr[c]);
      self.setTo2(arrayCr[b]);
      self.setTo1(arrayCr[a]);

      muttex=0;

},


setTo5: function(target){
  target.visible=true;

  s5= target;

  this.world.bringToTop(s5);

  s5.inputEnabled = true;
  s5.events.onInputDown.add(this.moveToLeft,s5);

  var tweenA= game.add.tween(target).to({x:145, y:225}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:.5}, 500, 'Linear');

    tweenA.start();
    tweenB.start();
    tweenC.start();



},

setTo4: function(target){
  target.visible=true;

  s4= target;
  this.world.bringToTop(s4);
   s4.inputEnabled = true;
   s4.events.onInputDown.add(this.moveToLeft, s4);

   var tweenA= game.add.tween(target).to({x:800, y:225}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');
   var tweenC =game.add.tween(target).to( {alpha:.5}, 500, 'Linear');

   tweenA.start();
   tweenB.start();
   tweenC.start();



},

setTo3: function(target){
  target.visible=true;

  s3=target;
  this.world.bringToTop(s3);
  s3.inputEnabled = true;
  s3.events.onInputDown.add(this.moveToLeft, s3);

  var tweenA= game.add.tween(target).to({x:255, y:210}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.6, y:.6}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:.7}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenC.start();

  // shadow3 = game.add.sprite(245, 193+s3.height, 'shadow');
  // shadow3.scale.setTo(.6,.6);

},

setTo2: function(target){
target.visible=true;
  s2= target;
  this.world.bringToTop(s2);
  s2.inputEnabled = true;
  s2.events.onInputDown.add(this.moveToLeft,s2);

  var tweenA= game.add.tween(target).to({x:650, y:210}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.6, y:.6}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:.7}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenC.start();
},

setTo1: function(target){
  target.visible=true;

  s1= target;

  this.world.bringToTop(s1);
   var tweenA= game.add.tween(target).to({x:this.game.width/2- wd/2, y:150}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:0.9, y:.9}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:1}, 500, 'Linear');


   tweenA.onComplete.addOnce(function(){
     tweenD=game.add.tween(golden).to( {alpha:1}, 50, 'Linear');
     tweenD.start();


   });



   tweenA.start();
   tweenB.start();
   tweenC.start();

   this.world.bringToTop(golden);




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
