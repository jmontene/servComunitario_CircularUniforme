
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
		this.game.state.start('posicion');
	}
}

Game.won = function (game){
};

Game.won.prototype = {

   create: function(){
      this.endText = this.game.add.text(
         this.game.world.centerX,this.game.world.centerY-10,"Felicidades, has completado el juego!",{
         font: '50px Arial',
         fill: '#FFFFFF',
         align: 'center'
         }
      );
      this.endText.anchor.setTo(0.5,0.5);

      this.endButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY+80,'button',this.start,this,1,1,0);
      this.endButton.anchor.setTo(0.5,0.5);
   },
   
   start: function(){
      this.game.state.start('menu');
   }

}
