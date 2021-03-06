
Game.radio = function (game){
	this.time = 0;
	play = false;
	this.result = "radio";
	dummyradio = 0;
	this.next = 'angulo';
	this.sliders = {
		angulo : null,
		radio : null,
		vel_angular : null,
		acc_angular : null
	}
	this.pop = null;
};

Game.radio.prototype = {

	create: function (){
	
		//La tierra (Siempre se crea en todos los niveles)
		earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
		earth.anchor.setTo(0.5,0.5);
		earth.scale.setTo(0.175,0.175);
		this.game.physics.enable(earth,Phaser.Physics.ARCADE);
		earth.body.immovable = true;
		earth.body.center.x = this.game.world.centerX
		earth.body.center.y = this.game.world.centerY
	
		//Crea los enemigos
		enemy = new Enemy('enemy',180,300,2,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.25,0.25);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;
 
		button = this.game.add.button(375,500,'button',onClick,this,1,1,0);
	
		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
	    ship = new Ally('ship',400,450,0.5,1,earth,this.game);
		ship.sprite.anchor.setTo(0.5,0.5);
		ship.sprite.scale.setTo(0.05,0.05);
		ship.sprite.scale.x *= ship.dir;
		this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
		ship.initialize();
	
		//Crear un slider
		this.sliders.radio = new Slider(this.game,105,286,1,ship.radius);
		this.sliders.radio.create(600,550,[0.0235,0.0235],[0.15,0.15],[0.15,0.15],15,"R");
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
		var t = new Item('text',0,-50,"Has ganado!!",[
			'40px Arial',
			'#ffffff',
			'center'
			]);
	    this.pop = new Popup('panel',this.game.width/2,-150,35,20,[but,t],this.game);

            //Crea el tiempo
            this.timeText = this.game.add.text(
	    10,10,"0",{
		font: '20px Arial',
		fill: '#FFFFFF',
		align: 'center'
	    });

	console.log("Time: %f",this.time);

   },

	update: function(){
		this.sliders.radio.update();
		dummyradio = this.sliders.radio.value;
	
		if(play){
			this.time++;
			enemy.move();
			this.result = "..."
		}else{
			this.time = 0;
			enemy.reset();
			ship.change_radio(dummyradio);
		}
            
	    ship.move(this.time);
            this.updateTime();
                      
	    this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
	    this.game.physics.arcade.collide(ship.sprite, enemy.sprite, collide_ally, 
			                     null, this);
	    this.game.debug.text(this.result,375,50);
	},

    updateTime: function (){
        seconds = Math.floor((this.time) / 60);
        milliseconds = Math.floor(this.time)%60;

        if (milliseconds < 10)
            milliseconds = '0' + milliseconds;
	
        if (seconds < 10)
            seconds = '0' + seconds;
	
        this.timeText.setText(seconds + ':' + milliseconds);
    }
}
