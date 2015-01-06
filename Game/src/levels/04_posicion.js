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
    
    this.neededTries = 7;
    this.tutorial = true;
    this.rad = "0";
    this.ang = "0"

};

Game.posicion.prototype = {

    create: function (){

        //background
        bg = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+40,  'backgroundGridOn');
      
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
        this.objangle = generator.angle()
        this.objradio = generator.integerInRange(150,300)
	enemy = new Enemy('satelite',this.objangle,this.objradio,10,earth,this.game);
	enemy.sprite.anchor.setTo(0.5,0.5);
	enemy.sprite.scale.setTo(0.05,0.05);
	this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
	enemy.sprite.body.collideWorldBounds = true;
        enemy.sprite.visible = false;

        //Crea button
	button = this.game.add.button(475,730,'button',onClick,this,1,1,0);

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

        if(this.objangle<0)
            this.objangle = 360 + this.objangle
        
        this.obj = this.game.add.text(
            100,700,"R:"+this.objradio+" φ:"+this.objangle,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.rad = this.game.add.text(
            100,730,"R 0",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.ang = this.game.add.text(
            100,760,"φ 0",{
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
                
        this.result = "Intercepta el meteorito";
        
    },

    update: function(){
        if(!play){
            mTarget.sprite.input.enableDrag()
            
        }else{
            mTarget.sprite.input.disableDrag();
            toRadian(this,mTarget.getPosition());
            
            console.log(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true))
            if(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true)<9){
                enemy.sprite.visible=true
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
