var Selectplayer = function(game) {};

Selectplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
    game.load.image('img-1', 'assets/images/test.png');
    game.load.image('img-2', 'assets/images/test2.png');
    game.load.image('img-3', 'assets/images/test3.png');
    game.load.image('img-4', 'assets/images/test4.png');
    game.load.image('img-5', 'assets/images/test5.png');
    game.load.image('img-6', 'assets/images/test6.png');
    game.load.image('img-7', 'assets/images/test7.png');
    game.load.image('img-8', 'assets/images/test8.png');
    game.load.image('img-9', 'assets/images/test9.png');
    game.load.image('img-10', 'assets/images/test10.png');
    game.load.image('test', 'assets/images/test10.png');
    game.load.image('left-corner', 'assets/images/left-corner.png');
    game.load.image('right-corner', 'assets/images/left-corner.png');
    game.load.image('volver', 'assets/images/arrow-back.png');
    game.load.image('menu', 'assets/images/menu.png');
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt RobotoBold', align: 'center', stroke: '#1b1464'};



    // aplicando el background de cada texto

      var 	myBitmap = this.game.add.bitmapData(300, 60);
      var  grd=myBitmap.context.createLinearGradient(0,0,0,30);
      grd.addColorStop(0,"#fbe43e");
      grd.addColorStop(0.9,"#fbe43e");
      grd.addColorStop(1,"#cea428");
      myBitmap.context.fillStyle=grd;
      myBitmap.context.fillRect(0,0,this.game.height,this.game.width);
      var background = this.game.add.sprite(100,this.optionCount*550-10, myBitmap);

    // aplicando el background de cada texto

    var txt = game.add.text(100, (this.optionCount * 550) , text, optionStyle);
    //txt.anchor.setTo(0.5);
    txt.stroke = "black";
    //txt.strokeThickness = 4;

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

      game.add.sprite(0, 0, 'rival-bg');
      game.add.sprite(0, 0, 'left-corner');
      a= game.add.sprite(this.game.width, 0, 'right-corner');
      a.scale.x = -1;


      volver= game.add.sprite(50, 50, 'volver');
      volver.inputEnabled = true;
      volver.events.onInputDown.add(this.GoBack,volver);

      menu= game.add.sprite(this.game.width-100, 50, 'menu');
      menu.inputEnabled = true;
      menu.events.onInputDown.add(this.GoBack,menu);



      search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
      search.visible=false;

      //creating the carrousel

      arrayimg=['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'];

      // imagen mas baja a la izquierda
      img5= game.add.sprite(350, 400, 'img-5');

      // imagen mas baja aa la derecha
      img4= game.add.sprite(350, 400, 'img-4');
      //imagen menos baja a la izquierda
      img3= game.add.sprite(350, 400, 'img-3');
      //imagen menos baja a la derecha
      img2= game.add.sprite(350, 400, 'img-2');
      //imagen central
      img1=game.add.sprite(350, 400, 'img-1');
      img6=game.add.sprite(750, 400, 'img-6');
      img7=game.add.sprite(750, 400, 'img-7');
      img8=game.add.sprite(750, 400,'img-8');
      img9=game.add.sprite(750, 400, 'img-9');
      img10=game.add.sprite(750, 400, 'img-10');
      img1.visible=false;
      img2.visible=false;
      img3.visible=false;
      img4.visible=false;
      img5.visible=false;
      img6.visible=false;
      img7.visible=false;
      img8.visible=false;
      img9.visible=false;
      img10.visible=false;
      img1.scale.setTo(.5,.5);
      img2.scale.setTo(.5,.5);
      img3.scale.setTo(.5,.5);
      img4.scale.setTo(.5,.5);
      img5.scale.setTo(.5,.5);
      img6.scale.setTo(.5,.5);
      img7.scale.setTo(.5,.5);
      img8.scale.setTo(.5,.5);
      img9.scale.setTo(.5,.5);
      img10.scale.setTo(.5,.5);


      arrayCr=[img1, img2, img3,img4 , img5, img6, img7, img8, img9, img10];


      self.setTo5(img10);
      self.setTo4(img3);
      self.setTo3(img9);
      self.setTo2(img2);
      self.setTo1(img1);


      this.addMenuOption('JUGAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


      // this.addMenuOption('Volver', function () {
      //   game.state.start("GameMenu");
      // });



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


moveToRight: function(s){


  console.log("MOVE TO RIGHT");

  self.getID(s);

  var carrousel=[];
  var j=i;

  while(carrousel.length <= 5) {

    if(j<arrayCr.length){

      carrousel.push(j);

    }else{

      j=0;

      carrousel.push(j);
    }

    j--;
  }

  console.log(carrousel);


},
  moveToLeft: function(s){


    self.getID(s);



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



},


setTo5: function(target){
  target.visible=true;

  s5= target;

  this.world.bringToTop(s5);

  //s5.position={x:350, y:400};
  //s5.alpha=.5;
  //s5.scale.setTo(.50,.50);
  s5.inputEnabled = true;
  s5.events.onInputDown.add(this.moveToLeft,s5);

  var tweenA= game.add.tween(target).to({x:350, y:400}, 500, 'Linear');
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
  //s4.position={x:750, y:400};
  //s4.alpha=.5;
  //s4.scale.setTo(.50,.50);
   s4.inputEnabled = true;
   s4.events.onInputDown.add(this.moveToLeft, s4);

   var tweenA= game.add.tween(target).to({x:750, y:400}, 500, 'Linear');
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
  //s3.position={x:400, y:350};
  //s3.alpha=.7;
  //s3.scale.setTo(.75,.75);
  s3.inputEnabled = true;
  s3.events.onInputDown.add(this.moveToLeft, s3);

  var tweenA= game.add.tween(target).to({x:400, y:350}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.75, y:.75}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:.7}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenC.start();
},

setTo2: function(target){
target.visible=true;
  s2= target;
  this.world.bringToTop(s2);
  //s2.position={x:650, y:350};
//  s2.alpha=.7;
//  s2.scale.setTo(.75,.75);
  s2.inputEnabled = true;
  s2.events.onInputDown.add(this.moveToLeft,s2);

  var tweenA= game.add.tween(target).to({x:650, y:350}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.75, y:.75}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:.7}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
  tweenC.start();
},

setTo1: function(target){
  target.visible=true;

  s1= target;
  //s1.position={x:500, y:300};
  this.world.bringToTop(s1);
  //s1.scale.setTo(1,1);
  //s2.alpha=1;
   var tweenA= game.add.tween(target).to({x:500, y:300}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:1, y:1}, 500, 'Linear');
  var tweenC =game.add.tween(target).to( {alpha:1}, 500, 'Linear');

   tweenA.start();
   tweenB.start();
   tweenC.start();




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

  console.log(i);

  return i;
},

GoBack: function(target){
  game.state.start("GameMenu");
},



}
