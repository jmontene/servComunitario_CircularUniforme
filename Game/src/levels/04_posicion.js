//Nivel de posicion

Game.posicion = function (game){
    this.time = 0;
    play = false;
    this.counter = 0;
    this.name = "posicion";
    
    this.result = "Encuentra el satélite";
    this.next = 'won';
    this.curNext = 'posicion';
    this.sliders = {
	radio : null,
	angulo : null,
	vel_angular : null,
	acc_angular : null
    };
    this.pop = null;
    
    this.preview = true;
    this.grid = true;
    
    this.prev = {
	radio : 0,
	angulo : 0,
	vel_angular : 0,
	acc_angular : 0
    }
    
    this.neededTries = 10;
    this.tutorial = true;
    this.rad = "0";
    this.ang = "0";
    this.correct = 0;
    this.error = 0;

};

Game.posicion.prototype = {

    create: function (){
    
        success = 9;
         
        if(success < 1) this.preview = true;
        else this.preview = false;
        
        //background
        bg = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOn');
        
        if (!(this.grid)) bg = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+40,'backgroundGridOff');

        bg.anchor.setTo(0.5,0.5);
        bg.scale.setTo(0.55,0.55);

        
	//La tierra (Siempre se crea en todos los niveles)
	earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
	earth.anchor.setTo(0.5,0.5);
	earth.scale.setTo(0.175,0.175);
	this.game.physics.enable(earth,Phaser.Physics.ARCADE);
	earth.body.immovable = true;
	earth.body.center.x = this.game.world.centerX
	earth.body.center.y = this.game.world.centerY

   	//Crea los enemigos
        this.objangle = generator.integerInRange(90*curQuad,90*curQuad+90)
        this.objradio = generator.integerInRange(150,300)
	enemy = new Enemy('satelite',this.objangle,this.objradio,10,earth,this.game);
	enemy.sprite.anchor.setTo(0.5,0.5);
	enemy.sprite.scale.setTo(0.05,0.05);
	this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
	enemy.sprite.body.collideWorldBounds = true;
        enemy.sprite.visible = false;
        if(this.preview){
	    prev = new Enemy('sateliteprev',this.objangle,this.objradio,10,earth,this.game);
	    prev.sprite.anchor.setTo(0.5,0.5);
	    prev.sprite.scale.setTo(0.05,0.05);
            prev.sprite.visible = false;
            enemy.sprite.visible = true;
            enemy.sprite.alpha = 0.5;
        }

        //Crea button
	button = this.game.add.button(475,730,'button',onClick,this,1,1,0);
        
        this.popArgs = [
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"]
        ];
        
        //Crear el popup
	var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
        var curArgs = this.popArgs[success];
	var t = new Item('text',0,-50,curArgs[2],[
	    '40px Arial',
	    '#ffffff',
	    'center'
	]);
	this.pop = new Popup('panel',this.game.width/2,-150,curArgs[0],curArgs[1],[but,t],this.game);

        //Crea AIM
        targetImg = 'aim';
	mTarget = new Ally(targetImg,this.game.world.width,this.game.world.height,0.12,-1,earth,this.game);
	mTarget.sprite.anchor.setTo(0.5,0.5);
        mTarget.sprite.scale.setTo(0.09,0.09);
	mTarget.sprite.scale.x *= -mTarget.dir;
        mTarget.sprite.inputEnabled = true;
        mTarget.sprite.input.enableDrag();
	this.game.physics.enable(mTarget.sprite,Phaser.Physics.ARCADE);
	mTarget.initialize();
   
   //Crear boton de back
   var b = this.game.add.button(this.game.world.width-30,30,'back',goToMenu,this,1,0,0);
   b.anchor.setTo(0.05,0.05);
   b.scale.setTo(0.25,0.25);

        if(this.objangle<0)
            this.objangle = 360 + this.objangle
        
        this.obj = this.game.add.text(
            380,40,"Sus coordenadas son R:"+this.objradio+" φ:"+this.objangle,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.game.add.text(
            100,730,"Desliza el marcador hasta\nlas coordenadas del satélite",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.game.add.text(
            730,710,"Elegiste las coordenadas",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        
        
        this.rad = this.game.add.text(
            840,730,"R: 0",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.ang = this.game.add.text(
            840,750,"φ: 0",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.cor = this.game.add.text(
            840,20,"Éxitos: "+this.correct+"/10",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.err = this.game.add.text(
            840,40,"Errores: "+this.error,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );


        this.resText = this.game.add.text(
            430,20,this.result,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
                
    },

    update: function(){
        if(!play){
            mTarget.sprite.input.enableDrag()
            
        }else{
            mTarget.sprite.input.disableDrag();
            toRadian(this,mTarget.getPosition());
            
            console.log(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true))
            if(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true)<36){
                enemy.sprite.visible=true
                this.correct++;
                if(success == this.neededTries-1 && this.error == 0){
                  this.pop.text.setText("Perfecto!\nFelicitaciones!");
                  this.popArgs[this.neededTries-1] = [60,20, 
                  "Perfecto!\nFelicitaciones!"];
                }
                this.game.state.getCurrentState().pop.show();
            }else{
                this.error++;
                if(this.preview){
	            prev.sprite.visible = true;
                }
                this.err.setText("Errores: "+this.error);
            }
            
            button.setFrames(1,1,0);
            play =! play;
        }
        
    },
    
    updateTime: function (){
        seconds = Math.floor((this.time) / 60);
        milliseconds = Math.floor(this.time)%60;

        if (milliseconds < 10)
            milliseconds = '0' + milliseconds;
	
        if (seconds < 10)
            seconds = '0' + seconds;
	
        this.timeText.setText(seconds + ':' + milliseconds);
    },
    
    startGame: function(){
        this.doGame =! this.doGame;
    }
}
