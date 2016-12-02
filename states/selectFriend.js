var Selectfriend = function(game) {};

Selectfriend.prototype = {

  create: function () {

    game.add.plugin(Fabrique.Plugins.InputField);

    self = this;



    this.createBackground(false);
    this.createSoundGraphics();
    self.createGeneralTitle("BUSCAR AMIGO", true);

    var graphics = game.add.graphics(160, 250);
    graphics.lineStyle(3, 0xFFFFFF, 1);
    graphics.beginFill(0xFFFFFF, .3);
    graphics.drawRoundedRect(0, 0, 800,70,5);
    window.graphics = graphics;


    input = game.add.inputField(170, 265,{
    font: '25px CondensedRegular',
    fill: '#FFFFFF',
    fillAlpha:0,
    width: 770,
    padding: 8,
    borderWidth: 1,
    cursorColor:'#FFFFFF' ,
    placeHolderColor:'#FFFFFF'  ,
    borderRadius: 5,
    placeHolder: 'Nombre de usuario'
    });



    self.createButton("CANCELAR", function(){game.state.start('GameMenu');}).position={x:280,y:450};
	var auxThis=this;
    self.createButton("SIGUIENTE",function(){
		//game.state.start('SelectsalaPrivada');

			Emit("buscar",input.value,"rbusqueda","resultado",auxThis);
		}
		).position={x:580,y:450};

    //Funcion que llama a la revancha

    self.solicitudRevancha();

},

resultado:function(msg){
	console.log("resultado "+msg);
	if(msg==1){
		console.log(input.value);
		console.log("cambia de pantalla");
		this.game.state.states["SelectsalaPrivada"].desafiado=input.value;
		game.state.start('SelectsalaPrivada');
	}
},


 solicitudRevancha: function(){

     screen=game.add.group();
     var notifBack = this.game.add.bitmapData(this.game.width,this.game.height);
     var  grd = notifBack.context.createLinearGradient(0,0,0,this.game.height);
     grd.addColorStop(0,"rgba(0,0,0,.5)");
     notifBack.context.fillStyle = grd;
     notifBack.context.fillRect(0,0,this.game.width,this.game.height);
     back=this.game.add.sprite(0,0,notifBack);
     back.inputEnabled=true;
     screen.add(back);

     animation=self.notificationDinamic("ACABAN DE PEDIR REVANCHA", "Te animás?", false,true);
      screen.add(notificacionGroup);
     animation.onComplete.addOnce(function(){


          a= self.createButton('RECHAZAR', function () {screen.destroy()});
          a.position={x:290,y:350};
          screen.add(a);

          b=self.createButton('ACEPTAR', function () {});
          b.position={x:580,y:350};
          screen.add(b);



     })

 },






};

Phaser.Utils.mixinPrototype(Selectfriend.prototype, mixins);
