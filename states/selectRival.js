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
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#FEFFD5', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(100, (this.optionCount * 80) , text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;

    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(0,0,0,0)";
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


      search= game.add.text(200, 200, 'Buscando oponente', { font: " 60px TheMinion", fill: "red", align: "center" });
      search.visible=false;

      //creating the carrousel

      arrayimg=['img-1', 'img-2', 'img-3', 'img-4', 'img-5', 'img-6', 'img-7', 'img-8', 'img-9', 'img-10'];

      // imagen mas baja a la izquierda
      img5= game.add.sprite(0, 0, 'img-5');
      // imagen mas baja aa la derecha
      img4= game.add.sprite(0, 0, 'img-4');
      //imagen menos baja a la izquierda
      img3= game.add.sprite(0, 0, 'img-3');
      //imagen menos baja a la derecha
      img2= game.add.sprite(0, 0, 'img-2');
      //imagen central
      img1=game.add.sprite(0, 0, 'img-1');
      img6=game.add.sprite(0, 0, 'img-6');
      img7=game.add.sprite(0, 0, 'img-7');
      img8=game.add.sprite(0, 0,'img-8');
      img9=game.add.sprite(0, 0, 'img-9');
      img10=game.add.sprite(0, 0, 'img-10');


      arrayCr=[img1, img2, img3,img4 , img5, img6, img7, img8, img9, img10];
      //arrayCr.visible=false;


      self.setTo5(img10);
      self.setTo4(img3);
      self.setTo3(img9);
      self.setTo2(img2);
      self.setTo1(img1);


      //end carrousel



      this.addMenuOption('JUGAR', function () {
        search.visible=true;
        Emit("buscarPartida"," ","partidaEncontrada","listenerSearch",self);

      });


      this.addMenuOption('Volver', function () {
        game.state.start("GameMenu");
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
    console.log("MOVE TO LEFT");

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

    console.log(carrousel);



      self.setTo5(arrayCr[e]);
      self.setTo4(arrayCr[d]);
      self.setTo3(arrayCr[c]);
      self.setTo2(arrayCr[b]);
      self.setTo1(arrayCr[a]);


      //  var tweenA= game.add.tween(target).to( s1.position, 2000, 'Linear');
      //  var tweenB =game.add.tween(target.scale).to( {x:1, y:1}, 2000, 'Linear');

       //tweenA.start();
     //tweenB.start();


},


setTo5: function(target){

  s5= target;

  //s5.position={x:350, y:400};
  s5.alpha=.5;
  //s5.scale.setTo(.50,.50);
  s5.inputEnabled = true;
  s5.events.onInputDown.add(this.moveToLeft,s5);

  var tweenA= game.add.tween(target).to({x:350, y:400}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');

  tweenA.start();
  tweenB.start();

},

setTo4: function(target){

  s4= target;
  //s4.position={x:750, y:400};
  s4.alpha=.5;
  //s4.scale.setTo(.50,.50);
   s4.inputEnabled = true;
   s4.events.onInputDown.add(this.moveToLeft, s4);

   var tweenA= game.add.tween(target).to({x:750, y:400}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:.50, y:.50}, 500, 'Linear');

   tweenA.start();
   tweenB.start();

},

setTo3: function(target){

  s3=target;
  //s3.position={x:400, y:350};
  s3.alpha=.7;
  //s3.scale.setTo(.75,.75);
  s3.inputEnabled = true;
  s3.events.onInputDown.add(this.moveToLeft, s3);

  var tweenA= game.add.tween(target).to({x:400, y:350}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.75, y:.75}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
},

setTo2: function(target){

  s2= target;
  //s2.position={x:650, y:350};
  s2.alpha=.7;
//  s2.scale.setTo(.75,.75);
  s2.inputEnabled = true;
  s2.events.onInputDown.add(this.moveToLeft,s2);

  var tweenA= game.add.tween(target).to({x:650, y:350}, 500, 'Linear');
  var tweenB =game.add.tween(target.scale).to( {x:.75, y:.75}, 500, 'Linear');

  tweenA.start();
  tweenB.start();
},

setTo1: function(target){

  s1= target;
  //s1.position={x:500, y:300};
  this.world.bringToTop(s1);
  //s1.scale.setTo(1,1);
  s2.alpha=1;
   var tweenA= game.add.tween(target).to({x:500, y:300}, 500, 'Linear');
   var tweenB =game.add.tween(target.scale).to( {x:1, y:1}, 500, 'Linear');

   tweenA.start();
 tweenB.start();




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



}
