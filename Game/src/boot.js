
//El state Boot, es el primero que se corre y carga las imagenes

timer = new Date();
s = timer.getSeconds().toString();
m = timer.getMinutes().toString();
h = timer.getHours().toString();
generator = new Phaser.RandomDataGenerator([s, m, h]);
success = 0;
curQuad = 1;
startedM = false;

Game.boot = function (game) {
};

Game.boot.prototype = {

	preload: function () {
		this.load.image('preloadBar', 'assets/sprites/preloader_bar.png');  
	},

	create: function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('preloader');
	}
	
};

Game.menu = function (game) {
};


Game.menu.prototype = {
    
	create: function () {
        buttonFx = this.game.add.audio('buttonS');
        if (!startedM){
            music = this.game.add.audio('song');
            music.loopFull(0.2);
            startedM = true;
        }
        
		title = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'menuBackground'
        );
        title.scale.setTo(0.5, 0.5);
        title.anchor.setTo(0.5, 0.5);
		b = this.game.add.button(
            this.game.world.centerX + 17,
            this.game.world.centerY - 35,
            'menuButton',
            this.start,
            this,
            1,
            0,
            0
        );
        b.anchor.setTo(0.5, 0.5);
        b.scale.setTo(0.5, 0.5);
	},

	start: function () {
        buttonFx.play();
		this.game.state.start('selector');
	}
};

Game.selector = function (game) {
};

Game.selector.prototype = {

	create: function () {
	    b = this.game.add.button(
            this.game.world.centerX + 17,
            this.game.world.centerY - 200,
            'bt1',
            this.angulo,
            this,
            1,
            0,
            0
        );
        b.anchor.setTo(0.5, 0.5);
        b.scale.setTo(0.25, 0.25);
        b2 = this.game.add.button(
            this.game.world.centerX + 17,
            this.game.world.centerY - 35,
            'bt2',
            this.rad_ang,
            this,
            1,
            0,
            0
        );
        b2.anchor.setTo(0.5, 0.5);
        b2.scale.setTo(0.25, 0.25);
	    b3 = this.game.add.button(
            this.game.world.centerX + 17,
            this.game.world.centerY + 125,
            'bt3',
            this.posicion,
            this,
            1,
            0,
            0
        );
        b3.anchor.setTo(0.5, 0.5);
        b3.scale.setTo(0.25, 0.25);
	},

    angulo: function () {
        buttonFx.play();
	    this.game.state.start('angulo');
    },
    
    rad_ang: function () {
        buttonFx.play();
	    this.game.state.start('radio_angulo');
    },
    
    posicion: function () {
        buttonFx.play();
	    this.game.state.start('posicion');
    }
};

Game.won = function (game) {
};

Game.won.prototype = {

    create: function () {
       
        this.endText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY - 10,
            "Felicidades, has completado el juego!",
            {
                font: '50px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.endText.anchor.setTo(0.5, 0.5);

        this.endButton = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY + 80,
            'button',
            this.start,
            this,
            1,
            1,
            0
        );
        this.endButton.anchor.setTo(0.5, 0.5);
    },
   
    start: function () {
        buttonFx .play();
        this.game.state.start('menu');
    }

};
