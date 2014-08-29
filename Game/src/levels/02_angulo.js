//Nivel de angulo

Game.angulo = function (game){
	this.time = 0;
	play = false;
	this.result = "angulo";
	this.next = 'menu';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	}
};

Game.angulo.prototype = {

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
	
		//Crear un slider
		this.sliders.angulo = new Slider(this.game,0,359,1,360+Phaser.Math.radToDeg(ship.inicial_angle));
		this.sliders.angulo.create(600,550,[0.0235,0.0235],[0.15,0.15],[0.15,0.15],15,"φ");
	},

	update: function(){
		this.sliders.angulo.update()
	
		if(play){
			this.time++;
			enemy.move();
			this.result = "..."
			ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
		}else{
			this.time = 0;
			enemy.reset();
		}
	
		ship.move(0);
		this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
		this.game.physics.arcade.collide(ship.sprite, enemy.sprite, collide_ally, 
		null, this);
		this.game.debug.text(this.result,375,50);
   }

}
