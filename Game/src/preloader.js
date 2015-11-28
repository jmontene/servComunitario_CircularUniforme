Game.preloader = function (game) {
	this.preloadBar = null;
	this.ready = true;
};

Game.preloader.prototype = {

	preload: function () {
		
		this.preloadBar = this.add.sprite(
            this.world.centerX - 200,
            this.world.centerY,
            'preloadBar'
        );
		this.preloadBar.anchor.setTo(0, 0.5);
		this.add.text(this.world.centerX - 80, this.world.centerY - 100, "Cargando...", {
            font: '30px Arial',
            fill: '#ffffff',
            align: 'center'
		});
		
		this.load.setPreloadSprite(this.preloadBar);
      
		this.load.image('earth', 'assets/sprites/tierra.png');
		this.load.image('enemy', 'assets/sprites/Enemy.png');
		this.load.spritesheet('execute', 'assets/sprites/executeSheet.png', 1078, 964);
        this.load.spritesheet('shipSheet', 'assets/sprites/naveSheet.png', 587, 587);
		this.load.image('ship', 'assets/sprites/nave.png');
		this.load.image('panel', 'assets/sprites/panel.png');
		this.load.spritesheet('button', 'assets/sprites/button_sheet.png', 64, 64);
        this.load.image('missile', 'assets/sprites/cohete.png');
        this.load.image('missileprev', 'assets/sprites/coheteprev.png');
        this.load.image('aim', 'assets/sprites/aim.png');
        this.load.image('aimS', 'assets/sprites/aimSoft.png');
        this.load.image('satelite', 'assets/sprites/Satellite.png');
        this.load.image('sateliteprev', 'assets/sprites/Satelliteprev.png');

        this.load.image('menuBackground', 'assets/sprites/menuBackground.png');
        this.load.spritesheet('menuButton', 'assets/sprites/menuButtonSheet.png', 421, 401);
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('backgroundGridOn', 'assets/sprites/backgroundGridRealOn.png');
        this.load.image('backgroundGridOff', 'assets/sprites/backgroundGridOff.png');
        this.load.image('backgroundGridDiagOff', 'assets/sprites/backgroundGridDiagOff.png');
        this.load.image('pborder', 'assets/sprites/ProgressBorder.png');
        this.load.image('pbar', 'assets/sprites/progress.png');
        this.load.image('error', 'assets/sprites/enemyInfo.png');
        this.load.image('hud', 'assets/sprites/hudDown.png');
            
        this.load.spritesheet('bt1', 'assets/sprites/level1ButtonSheet.png', 421, 401);
        this.load.spritesheet('bt2', 'assets/sprites/level2ButtonSheet.png', 421, 401);
        this.load.spritesheet('bt3', 'assets/sprites/level3ButtonSheet.png', 421, 401);
        this.load.spritesheet('back', 'assets/sprites/ExitButton.png', 421, 401);
        this.load.image('arrow', 'assets/sprites/Arrow.png');
                
        this.game.load.audio('song', 'assets/audio/song3.ogg');
        this.load.audio('buttonS', 'assets/audio/button.ogg');
        this.load.audio('win', 'assets/audio/success.ogg');
        this.load.audio('fail', 'assets/audio/denied.ogg');
         
	    Slider.preload(this, 'space');

		
	},
	
	create: function () {
	},
	
	update: function () {
		if (this.ready) {
			this.state.start('menu');
		}
	}
};
