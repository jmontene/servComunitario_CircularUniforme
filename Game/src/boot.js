
//El state Boot, es el primero que se corre y carga las imagenes

Game.boot = function (game){
};

Game.boot.prototype = {

	preload: function(){
		this.load.image('earth', 'assets/sprites/tierra.png');
		this.load.image('enemy', 'assets/sprites/asteroid.png');
		this.load.spritesheet('execute','assets/sprites/executeSheet.png',1078,964);
		this.load.image('ship', 'assets/sprites/nave.png');
		this.load.image('title','assets/sprites/title.png');
		this.load.spritesheet('button','assets/sprites/button_sprite1.png',64,64);
		Slider.preload(this,'space');
	},

	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('menu');
	}
	
}

Game.menu = function (game){
};

Game.menu.prototype = {

	create: function(){
		title = this.game.add.sprite(this.game.world.centerX-200,this.game.world.centerY-200,'title');
		this.game.add.button(this.game.world.centerX-50,this.game.world.centerY-50,'button',this.start,this,1,1,0);
	},

	start: function(){
		this.game.state.start('radio')
	}
}
