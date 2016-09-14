var Selectplayer = function(game) {};

Selectplayer.prototype = {

  preload: function () {
    this.optionCount = 1;
    game.load.image('img-1', 'assets/images/test.png');
    game.load.image('img-2', 'assets/images/test2.png');
    game.load.image('img-3', 'assets/images/test3.jpg');
    game.load.image('img-4', 'assets/images/test4.jpg');
    game.load.image('img-5', 'assets/images/test5.jpg');
    game.load.image('img-6', 'assets/images/test6.jpg');
    game.load.image('img-7', 'assets/images/test7.jpg');
    game.load.image('img-8', 'assets/images/test8.jpg');
    game.load.image('img-9', 'assets/images/test9.jpg');
    game.load.image('img-10', 'assets/images/test4.jpg');
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


      arrayCr=[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
      arrayCr.visible=false;


      self.setTo5(img9);
      self.setTo4(img3);
      self.setTo3(img10);
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

  carrousel: function(){

    s5= arrayCr[arrayCr.length-indiceC-1];
    s5.position={x:350, y:400};
    s5.alpha=.5;
    s5.scale.setTo(.50,.50);
    s5.inputEnabled = true;
     s5.events.onInputDown.add(this.actionOnClick, s5);

    s4= arrayCr[indiceC+2];
    s4.position={x:750, y:400};
    s4.alpha=.5;
    s4.scale.setTo(.50,.50);
     s4.inputEnabled = true;
     s4.events.onInputDown.add(this.actionOnClick, s4);


    s3= arrayCr[arrayCr.length-indiceC-2];
    s3.position={x:400, y:350};
    s3.alpha=.7;
    s3.scale.setTo(.75,.75);
    s3.inputEnabled = true;
     s3.events.onInputDown.add(this.actionOnClick, s3);

    s2= arrayCr[indiceC+1];
    s2.position={x:650, y:350};
    s2.alpha=.7;
    s2.scale.setTo(.75,.75);
    s2.inputEnabled = true;
    s2.events.onInputDown.add(this.actionOnClick, s2);

    s1= arrayCr[indiceC];
    s1.position={x:500, y:300};
    this.world.bringToTop(s1);



    console.log(s2);




        //
        // //imagen mas baja a la izquierda
        // s5= game.add.sprite(300, 400, arrayimg[arrayimg.length-2]);
        // s5.scale.setTo(.50,.50);
        // s5.alpha=.3;
        // s5.id=5;
        //
        // // imagen mas baja aa la derecha
        // s4= game.add.sprite(800, 400, arrayimg[2]);
        // s4.scale.setTo(.50,.50);
        // s4.alpha=.3;
        // s4.id=4;
        //
        // //imagen menos baja a la izquierda
        // s3= game.add.sprite(400, 350, arrayimg[1]);
        // s3.scale.setTo(.75,.75);
        // s3.alpha=.5;
        // s3.id=3;
        //
        // //imagen menos baja a la derecha
        // s2= game.add.sprite(650, 350, arrayimg[arrayimg.length-1]);
        // s2.scale.setTo(.75,.75);
        // s2.alpha=.5;
        // s2.id=2;
        // s2.inputEnabled = true;
        // s2.events.onInputDown.add(this.actionOnClick, s2);
        // // console.log(img2.key);
        //
        //
        // //imagen central
        // s1= game.add.sprite(500, 300, arrayimg[0]);
        // img1.id=1;




  },


  actionOnClick: function(s){

    for(var i=0; i<=arrayCr.length;i++){

      if(arrayCr[i].key==s.key){
        break;
      }

    }
    console.log(i);
    console.log("step1");

    if(i<= arrayCr.length){

      console.log(i);

        console.log("enter if");

        self.setTo5(arrayCr[i+2]);
        self.setTo4(arrayCr[i+1]);
        self.setTo3(arrayCr[i+3]);
        self.setTo2(arrayCr[i+4]);
        self.setTo1(arrayCr[i]);



      //  game.add.tween(target).to( s1.position, 2000, 'Linear');
      //  game.add.tween(target.scale).to( {x:1, y:1}, 2000, 'Linear');

       //tween.start();



    }
  console.log("step2");

  //  self.world.bringToTop(target);
},


setTo5: function(target){

  if(typeof s5 !== 'undefined'){
    s5.destroy()
  }
  s5= target;
  s5.position={x:350, y:400};
  s5.alpha=.5;
  s5.scale.setTo(.50,.50);
  s5.inputEnabled = true;
   s5.events.onInputDown.add(this.actionOnClick,s5);

},

setTo4: function(target){
  if(typeof s4 !== 'undefined'){
    s4.destroy()
  }
  s4= target;
  s4.position={x:750, y:400};
  s4.alpha=.5;
  s4.scale.setTo(.50,.50);
   s4.inputEnabled = true;
   s4.events.onInputDown.add(this.actionOnClick, s4);
},

setTo3: function(target){

  if(typeof s3 !== 'undefined'){
    s3.destroy()
  }
  s3=target;
  s3.position={x:400, y:350};
  s3.alpha=.7;
  s3.scale.setTo(.75,.75);
  s3.inputEnabled = true;
  s3.events.onInputDown.add(this.actionOnClick, s3);
},

setTo2: function(target){
  if(typeof s2 !== 'undefined'){
    s2.destroy()
  }

  s2= target;
  s2.position={x:650, y:350};
  s2.alpha=.7;
  s2.scale.setTo(.75,.75);
  s2.inputEnabled = true;
  s2.events.onInputDown.add(this.actionOnClick,s2);
},

setTo1: function(target){
  if(typeof s1 !== 'undefined'){
    s1.destroy()
  }
  //self.setResult(target);
  s1= target;
  s1.position={x:500, y:300};
  this.world.bringToTop(s1);
  s1.scale.setTo(1,1);

},

setResult: function(auxValue){

   result=auxValue;
},

getResult: function(){
  return result;
},



}
