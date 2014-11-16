//Nivel de radio+angulo

Game.radio_angulo = function (game){
	this.time = 0;
	play = false;
	this.counter = 0;
	
	this.result = "radio_angulo";
	this.next = 'menu';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	};
	this.pop = null;
	
	this.prev = {
		radio : 0,
		angulo : 0,
		vel_angular : 0,
		acc_angular : 0
	}
	
	this.win = false;
};

Game.radio_angulo.prototype = {

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
		enemy = new Enemy('enemy',180,300,5,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.25,0.25);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;

		button = this.game.add.button(375,500,'button',onClick,this,1,1,0);
	
		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
		ship = new Ally('ship',420,100,0.12,-1,earth,this.game);
		ship.sprite.anchor.setTo(0.5,0.5);
		ship.sprite.scale.setTo(0.05,0.05);
		ship.sprite.scale.x *= -ship.dir;
		this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
		ship.initialize();
	
		//Crear sliders
		this.sliders.angulo = new Slider(this.game,0,359,1,360+Phaser.Math.radToDeg(ship.inicial_angle));
		this.sliders.angulo.create(600,550,[0.0235,0.0235],[0.15,0.15],[0.15,0.15],15,"φ");
		this.prev.angulo = this.sliders.angulo.value;
		
		this.sliders.radio = new Slider(this.game,100,500,1,200);
		this.sliders.radio.create(600,450,[0.0235,0.0235],[0.15,0.15],[0.15,0.15],15,"R");
		this.prev.radio = this.sliders.radio.value;
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
		var t = new Item('text',0,-50,"Has ganado!!",[
			'40px Arial',
			'#ffffff',
			'center'
			]);
		this.pop = new Popup('panel',this.game.width/2,-150,35,20,[but,t],this.game);
	    this.win = false;

            this.timeText = this.game.add.text(
	    10,10,"0",{
		font: '20px Arial',
		fill: '#FFFFFF',
		align: 'center'
	    });

	    console.log("Time: %f",this.time);

            
	},

	update: function(){
		//console.log(this.pop);
		this.sliders.angulo.update();
		this.sliders.radio.update();
	
		if(play){
			this.time++;
			this.counter++;
			this.result = "...";
			ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
			ship.change_radio(this.sliders.radio.value);
			if(this.counter >= 20 && !(this.win)){
				ship.change_angle(Phaser.Math.degToRad(this.prev.angulo));
				ship.change_radio(this.prev.radio);
				onClick();
			}
		}else{
			this.time = 0;
			this.counter = 0;
			enemy.reset();
		}
	    this.updateTime();

		ship.move(0);
		
		if(!(this.win)) 
			this.game.physics.arcade.collide(ship.sprite, enemy.sprite, this.winner, null, this);
		this.game.debug.text(this.result,375,50);
   },
	
	winner : function(ship,enemy){
		this.win = true;
		collide_ally.call(this,ship,enemy);
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