
Game.level1 = function (game){
    this.time = 0;
    play = false;
    this.result = "level1";
    dummyradio = 0;
    this.next = 'level2'
};

Game.level1.prototype = {

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
	enemy = new Enemy('enemy',50,400,5,earth,this.game);
	enemy.sprite.anchor.setTo(0.5,0.5);
	enemy.sprite.scale.setTo(0.25,0.25);
	this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
	enemy.sprite.body.collideWorldBounds = true;

	button = this.game.add.button(375,500,'button',onClick,this,1,1,0);
//	button.scale.setTo(0.75,0.75);

	
	//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
	//Y depende del radio
	ship = new Ally('ship',400,450,0.12,1,earth,this.game);
	ship.sprite.anchor.setTo(0.5,0.5);
	ship.sprite.scale.setTo(0.05,0.05);
	ship.sprite.scale.x *= ship.dir;
	this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
	ship.initialize();
		
	console.log("this.game center, x = %d y = %d",this.game.world.centerX,this.game.world.centerY)
	console.log("earth center, x = %d y = %d",earth.body.center.x,earth.body.center.y)
	console.log("ship center, x = %d y = %d",ship.sprite.body.center.x,ship.sprite.body.center.y)
	
	//Crear un slider
	radio = new Slider(this.game,105,286,1,ship.radius);
	radio.create(600,550,[0.0235,0.0235],[0.15,0.15],[0.15,0.15],15,"R");
    },

    update: function(){
	radio.update();
	dummyradio = radio.value;
	
	if(play){
	    this.time ++;
	    enemy.move();
	    this.result = "..."
	}else{
	    this.time = 0;
	    enemy.reset();
	    ship.change_radio(dummyradio);
	}
	
	ship.move(this.time);
	this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
	this.game.physics.arcade.collide(ship.sprite, enemy.sprite, collide_ally, 
		null, this);
	this.game.debug.text(this.result,375,50);
    }

}
