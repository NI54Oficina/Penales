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

   // self.solicitudRevancha();
  self. notificationWithButton("TEST",'hola chau hola chau hola chau hola',[],1000);
  // : function( title, text, lista, tiempoDeEspera){
   //type Lista ::listaDeTuplasConNombreDeBotonYCallbackYparametros
   //
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









};

Phaser.Utils.mixinPrototype(Selectfriend.prototype, mixins);
