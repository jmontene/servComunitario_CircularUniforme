
//El state Boot, es el primero que se corre y carga las imagenes

Game.boot = function (game){
};

Game.boot.prototype = {

	preload: function(){
		this.load.image('earth', 'assets/sprites/tierra.png');
		this.load.image('enemy', 'assets/sprites/asteroid.png');
		this.load.spritesheet('execute','assets/sprites/executeSheet.png',1078,964);
		this.load.image('ship', 'assets/sprites/nave.png');
		Slider.preload(this,'space');
	},

	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('level1');
	}
}
