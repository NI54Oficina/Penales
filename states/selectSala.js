var Selectsala = function(game) {};

Selectsala.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  create: function(){
      self = this;
      indiceC=0;
      i=0;
      muttex=0;
      salaSelected=0;

      self.createBackground(false);
      self.createHeader(self.GoBack,false);
      self.createSoundGraphics();
      self.createGeneralTitle("SALAS", true);

      //valor que me deberia devolver el servidor para saber el nivel de la sala
      levelSala=2;

      levelsBlue=['btn-b-1','btn-b-2','btn-b-3'];
      levelsYelow=['btn-a-1','btn-a-2','btn-a-3'];
      //generales
            x1=245;
            y1=200;

            x2=595;
            y2=200;

            x3=245;
            y3=350;

            x4=595;
            y4=350;

            gameBack = this.game.add.bitmapData(300,100);
            grd = gameBack.context.createLinearGradient(0,0,0,100);
            grd.addColorStop(0,"#01447d");
            gameBack.context.fillStyle = grd;
            gameBack.context.fillRect(0,0,this.game.width,this.game.height);


      //primer bloque

      back=this.game.add.sprite(x1+1,y1+1,gameBack);
      back.inputEnabled=true;
      back.events.onInputDown.add(self.ReplaceColor, back);
      back.input.useHandCursor = true;
      back.addChild(game.add.text(15,20, 'CLÁSICO', {font:'35px CondensedRegular', fill:'#cea428'}));
      back.addChild(game.add.text(15,60, 'CANTIDAD DE JUGADORES', {font:'20px CondensedRegular', fill:'#fff03a'}));
      back.addChild(this.game.add.sprite(245,55,'sala-yellow'));

      n=40

      for(var j=0; j< levelSala; j++){

        for(var i=0; i<2;i++){
          back.addChild(this.game.add.sprite(250,n,levelsYelow[j]));
          n=n-10;
        }
      }

      back.id=1;


      var graphics = game.add.graphics(x1, y1);
      graphics.lineStyle(5, 0xcea428, 1);
      graphics.drawRoundedRect(0, 0, 300, 100,5);
      window.graphics = graphics;
      graphics.inputEnabled=true;

      //segunda bloque

      back2=this.game.add.sprite(x2+1,y2+1,gameBack);
      back2.inputEnabled=true;
      back2.events.onInputDown.add(self.ReplaceColor, back2);
      back2.input.useHandCursor = true;
      back2.addChild(game.add.text(15,20, '300 pts.', {font:'35px CondensedRegular', fill:'#cea428'}));
      back2.addChild(game.add.text(15,60, 'CANTIDAD DE JUGADORES', {font:'20px CondensedRegular', fill:'#fff03a'}));
      back2.addChild(this.game.add.sprite(245,55,'sala-yellow'));

      n=40

      for(var j=0; j< levelSala; j++){

        for(var i=0; i<2;i++){
          back2.addChild(this.game.add.sprite(250,n,levelsYelow[j]));
          n=n-10;
        }
      }

      back2.id=2;

      var graphics2 = game.add.graphics(x2, y2);
      graphics2.lineStyle(5, 0xcea428, 1);
      graphics2.drawRoundedRect(0, 0, 300, 100,5);
      window.graphics = graphics2;
      graphics2.inputEnabled=true;


      //tercer bloque

      back3=this.game.add.sprite(x3+1,y3+1,gameBack);
      back3.inputEnabled=true;
      back3.events.onInputDown.add(self.ReplaceColor, back3);
      back3.input.useHandCursor = true;
      back3.addChild(game.add.text(15,20, '500 pts.', {font:'35px CondensedRegular', fill:'#cea428'}));
      back3.addChild(game.add.text(15,60, 'CANTIDAD DE JUGADORES', {font:'20px CondensedRegular', fill:'#fff03a'}));
      back3.addChild(this.game.add.sprite(245,55,'sala-yellow'));

      n=40

      for(var j=0; j< levelSala; j++){

        for(var i=0; i<2;i++){
          back3.addChild(this.game.add.sprite(250,n,levelsYelow[j]));
          n=n-10;
        }
      }


      back3.id=3;


      var graphics3 = game.add.graphics(x3, y3);
      graphics3.lineStyle(5, 0xcea428, 1);
      graphics3.drawRoundedRect(0, 0, 300, 100,5);
      window.graphics = graphics3;
      graphics3.inputEnabled=true;

      //cuarto bloque

      back4=this.game.add.sprite(x4+1,y4+1,gameBack);
      back4.inputEnabled=true;
      back4.events.onInputDown.add(self.ReplaceColor, back4);
      back4.input.useHandCursor = true;
      back4.addChild(game.add.text(15,20, '1000 pts.', {font:'35px CondensedRegular', fill:'#cea428'}));
      back4.addChild(game.add.text(15,60, 'CANTIDAD DE JUGADORES', {font:'20px CondensedRegular', fill:'#fff03a'}));
      back4.addChild(this.game.add.sprite(245,55,'sala-yellow'));

      n=40

      for(var j=0; j< levelSala; j++){

        for(var i=0; i<2;i++){
          back4.addChild(this.game.add.sprite(250,n,levelsYelow[j]));
          n=n-10;
        }
      }

      back4.id=4;

      var graphics = game.add.graphics(x4, y4);
      graphics.lineStyle(5, 0xcea428, 1);
      graphics.drawRoundedRect(0, 0, 300, 100,5);
      window.graphics = graphics;
      graphics.inputEnabled=true;

      // ver de cambiar lo de arriba.

      arrayBlock=[back, back2, back3, back4];

      self.createButton('CANCELAR', function () {

         game.state.start('GameMenu');

       }).position={x:290,y:530};


      jugar=self.createButton('JUGAR',function () {

         //aca hacer el envio de mensajes con el server para poder jugar.
         // las salas son 1,2,3,4, si recibe 0 es porque no selecciono ninguna sala.

        if(salaSelected!=0){
    			var solicitud= {};
    			//solicitud.id= usuario["id"];
    			solicitud.tipo= salaSelected;
    			Emit("buscarPartida",JSON.stringify(solicitud));
    			game.state.start('Versus');
        }




  });
  jugar.position={x:580,y:530};

  jugar.visible=false;

  var gameBack = this.game.add.bitmapData(270,70);
  var  grd = gameBack.context.createLinearGradient(0,0,0,30);
  grd.addColorStop(0,"#fbe43e");
  grd.addColorStop(0.9,"#fbe43e");
  grd.addColorStop(1,"#cea428");
  gameBack.context.fillStyle = grd;
  gameBack.context.fillRect(0,0,this.game.width,this.game.height);
  back=this.game.add.sprite(580,530,gameBack);

  var txt = game.add.text(0, 0 , 'JUGAR', { font: '20pt RobotoBold', align: 'center',fill:'#1b1464' ,stroke: '#1b1464'});
  txt.setShadow(0,2, '#ffffbd ', 0);

  txt.position.x=back.width/2 - txt.width/2;
  txt.position.y=back.height/2 - txt.height/2 -5;

  back.addChild(txt);
  back.inputEnabled = true;
  back.input.useHandCursor = true;
  back.alpha=0.5;


  var testMask=game.add.graphics(580, 530);
  testMask.beginFill(0xFFFF0B, 0.5);
  testMask.drawRoundedRect(0, 0,back.width ,60,5);
  testMask.endFill();
  back.mask=testMask;








},

GoBack: function(target){

  game.state.start("GameMenu");
},

ReplaceColor: function(target){
    salaSelected=target.id;

  for(var i=0; i< arrayBlock.length; i++){
    gameBack = this.game.add.bitmapData(300,100);
   grd = gameBack.context.createLinearGradient(0,0,0,100);
   grd.addColorStop(0,"#01447d");
   gameBack.context.fillStyle = grd;
   gameBack.context.fillRect(0,0,this.game.width,this.game.height);
   arrayBlock[i].loadTexture(gameBack, 0, false);


     arrayBlock[i].children[0].fill='#cea428';
     arrayBlock[i].children[1].fill='#fff03a';
     arrayBlock[i].children[2].loadTexture('sala-yellow', 0, false);

     y

     for(var y=3; y< arrayBlock[i].children.length; y++){

       for(var k=0; k<levelSala ; k++){

             for(var j=0; j<2;j++){

               arrayBlock[i].children[y].loadTexture(levelsYelow[k], 0, false);
              //  console.log(levelsYelow[k]);

             }

         }
     }




  }


    gameBack = this.game.add.bitmapData(300,100);
    grd = gameBack.context.createLinearGradient(0,0,0,100);
    grd.addColorStop(0,"#fff03a");
    gameBack.context.fillStyle = grd;
    gameBack.context.fillRect(0,0,this.game.width,this.game.height);
    target.loadTexture(gameBack, 0, false);

    var i=0
    for(i; i < 2; i++){
        target.children[i].fill='#01447d';
    }

    target.children[i].loadTexture('sala-blue', 0, false);

    i++;

    for(i; i< target.children.length; i++){

      for(var k=0; k<levelSala ; k++){

            for(var j=0; j<2;j++){

              target.children[i].loadTexture(levelsBlue[k], 0, false);
              // console.log(levelsBlue[k]);
            }

        }
    }

    back.visible=false;
    jugar.visible=true;

},


mandarWarning: function(){
   self.notificationDinamic("UPS !", "No has selecionado ninguna sala!", true)
},




}

Phaser.Utils.mixinPrototype(Selectsala.prototype, mixins);
