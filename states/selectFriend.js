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
    placeHolder:'#FFFFFF'  ,
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

render: function(){

 },
inputFocus: function(sprite){
   sprite.canvasInput.focus();
 },
 createInput: function(x, y){
   var bmd = this.add.bitmapData(400, 50);
   var myInput = this.game.add.sprite(x, y, bmd);

   myInput.canvasInput = new CanvasInput({
     canvas: document.getElementById('game'),
     fontSize: 30,
     fontFamily: 'Arial',
     fontColor: '#FFFFFF',
     width: 400,
     padding: 8,
     borderWidth: 1,
     borderColor: '#000',
     borderRadius: 3,
     boxShadow: '1px 1px 0px #fff',
     innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
     placeHolder: 'Enter message here...'
   });
   myInput.inputEnabled = true;
   myInput.input.useHandCursor = true;
   myInput.events.onInputUp.add(this.inputFocus, this);

   return myInput;
 },



};

Phaser.Utils.mixinPrototype(Selectfriend.prototype, mixins);
