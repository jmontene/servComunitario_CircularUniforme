
Game.level1 = function (game){
    this.time = 1;
    play = false;
    result = "level1";
    dummyradio = 0;
};

Game.level1.prototype = {

    create: function (){
	
	earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
	earth.anchor.setTo(0.5,0.5);
	earth.scale.setTo(0.175,0.175);
	this.game.physics.enable(earth,Phaser.Physics.ARCADE);
	earth.body.immovable = true;
	earth.body.center.x = this.game.world.centerX
	earth.body.center.y = this.game.world.centerY
	
	
	//Crea el enemigo
	enemy = new Enemy('enemy',400,50,5,earth,this.game);
	enemy.sprite.anchor.setTo(0.5,0.5);
	enemy.sprite.scale.setTo(0.03,0.03);
	this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
	enemy.sprite.body.collideWorldBounds = true;
	
	//Crear el boton que controla la pausa y el play
	button = this.game.add.button(0,0,'button',onClick,this,1,1,0);
	button.scale.setTo(0.5,0.5);
	
	//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
	//Y depende del radio
	ball = new Ally('ball',300,375,0.12,1,earth,this.game);
	ball.sprite.anchor.setTo(0.5,0.5);
	ball.sprite.scale.setTo(0.05,0.05);
	ball.sprite.scale.x *= -ball.dir;
	this.game.physics.enable(ball.sprite,Phaser.Physics.ARCADE);
	ball.initialize();    

	console.log("this.game center, x = %d y = %d",this.game.world.centerX,this.game.world.centerY)
	console.log("blue ball center, x = %d y = %d",earth.body.center.x,earth.body.center.y)
	console.log("ultra ball center, x = %d y = %d",ball.sprite.body.center.x,ball.sprite.body.center.y)
		
    },

    update: function(){

	if(play){
	    this.time ++;
	    enemy.move();
	    result = "..."
	}else{
	    this.time = 0;
	    enemy.reset();
	    ball.change_radio(dummyradio);
	}
	ball.move(this.time);	    
	
	this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, 
					 null, this);
	this.game.physics.arcade.collide(ball.sprite, enemy.sprite, collide_ally,
					 null, this);
	this.game.debug.text(result,300,50);
    }
}
