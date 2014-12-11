Game.preloader = function(game){
	this.preloadBar = null;
	this.ready = true;
};

Game.preloader.prototype = {

	preload: function(){
		
		this.preloadBar = this.add.sprite(this.world.centerX-200, this.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0,0.5);
		this.add.text(this.world.centerX-80,this.world.centerY-100,"Cargando...",{
				font: '30px Arial',
				fill: '#ffffff',
				align: 'center'
		});
		
		this.load.setPreloadSprite(this.preloadBar);
      
		this.load.image('earth', 'assets/sprites/tierra.png');
		this.load.image('enemy', 'assets/sprites/asteroid.png');
		this.load.spritesheet('execute','assets/sprites/executeSheet.png',1078,964);
		this.load.image('ship', 'assets/sprites/nave.png');
		this.load.image('title','assets/sprites/title.png');
		this.load.image('panel','assets/sprites/panel.png');
		this.load.spritesheet('button','assets/sprites/button_sprite1.png',64,64);
      this.load.image('missile','assets/sprites/cohete.png');
      this.load.image('missileprev','assets/sprites/coheteprev.png');
      this.load.image('aim','assets/sprites/aim.png');
      this.load.image('satelite','assets/sprites/satelite.png');
            
		Slider.preload(this,'space');
		
	},
	
	create: function(){
	},
	
	update: function(){
		if(this.ready){
			this.state.start('menu');
		}
	}
};
