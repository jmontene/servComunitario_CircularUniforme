
//El state Boot, es el primero que se corre y carga las imagenes

Game.boot = function (game){
};

Game.boot.prototype = {

    preload: function(){
	this.load.image('earth', 'assets/blue_circle.png');
	this.load.image('enemy', 'assets/asteroid.png');
	this.load.spritesheet('button','assets/button_sprite1.png',64,64);
	this.load.image('ball', 'assets/ultra.png');
    },

    create: function(){
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.state.start('level1');
    }
}
