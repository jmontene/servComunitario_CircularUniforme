
//El state Boot, es el primero que se corre y carga las imagenes

Game.boot = function (game){
};

Game.boot.prototype = {

    preload: function(){
	this.load.image('earth', 'assets/tierra.png');
	this.load.image('enemy', 'assets/asteroid.png');
	this.load.spritesheet('button','assets/button_sprite1.png',64,64);
	this.load.image('ball', 'assets/Nave.png');
	this.load.image('tittle','assets/tittle.png');
    },

    create: function(){
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.state.start('menu');
    }
}

Game.menu = function (game){
};

Game.menu.prototype = {

    create: function(){
	title = this.add.sprite(this.game.world.centerX-200,this.game.world.centerY-200,'tittle');

	this.game.add.button(this.game.world.centerX-50,this.game.world.centerY-50,'button',this.start,this,1,1,0);

    },

    start: function(){
	this.state.start('level1')
    }
}
