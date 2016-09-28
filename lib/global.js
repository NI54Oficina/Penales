
function   addMenuOption(text, callback) {

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



  };
