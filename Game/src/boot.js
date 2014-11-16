
//El state Boot, es el primero que se corre y carga las imagenes

timer = new Date();
s = timer.getSeconds().toString();
m = timer.getMinutes().toString();
h = timer.getHours().toString();
generator = new Phaser.RandomDataGenerator([s,m,h]);
success = 0;

Game.boot = function (game){
};

Game.boot.prototype = {

	preload: function(){
		this.load.image('preloadBar','assets/sprites/preloader_bar.png');
	},

	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('preloader');
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
		this.game.state.start('angulo')
	}
}
