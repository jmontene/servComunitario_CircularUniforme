
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
		title = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'menuBackground');
      title.scale.setTo(0.5,0.5);
      title.anchor.setTo(0.5,0.5);
		b = this.game.add.button(this.game.world.centerX+17,this.game.world.centerY-35,'menuButton',this.start,this,1,0,0);
      b.anchor.setTo(0.5,0.5);
      b.scale.setTo(0.5,0.5);
	},

	start: function(){
		this.game.state.start('radio_angulo')
	}
}
