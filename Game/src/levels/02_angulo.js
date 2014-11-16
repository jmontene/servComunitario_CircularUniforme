//Nivel de angulo

Game.angulo = function (game){
	this.time = 0;
	play = false;
	this.result = "Intercepta el meteorito";
   this.name = "angulo";
	this.next = 'menu';
   this.curNext = 'angulo';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	}
	this.pop = null;
   this.neededTries = 5;
};

Game.angulo.prototype = {

	create: function (){
	
		//La tierra (Siempre se crea en todos los niveles)
		earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
		earth.anchor.setTo(0.5,0.5);
		earth.scale.setTo(0.175,0.175);
		this.game.physics.enable(earth,Phaser.Physics.ARCADE);
		earth.body.immovable = true;
		earth.body.center.x = this.game.world.centerX;
		earth.body.center.y = this.game.world.centerY;
	
		//Crea los enemigos
		enemy = new Enemy('enemy',generator.angle(),250,5,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.25,0.25);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;

		button = this.game.add.button(475,730,'button',onClick,this,1,1,0);
	
		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
		ship = new Ally('ship',420,300,0.12,-1,earth,this.game);
		ship.sprite.anchor.setTo(0.5,0.5);
		ship.sprite.scale.setTo(0.05,0.05);
		ship.sprite.scale.x *= -ship.dir;
		this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
		ship.initialize();
	
		//Crear un slider
		this.sliders.angulo = new Slider(this.game,0,359,1,360+Phaser.Math.radToDeg(ship.inicial_angle));
		this.sliders.angulo.create(650,750,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"φ");
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
		var t = new Item('text',0,-50,"Has ganado!!",[
			'40px Arial',
			'#ffffff',
			'center'
			]);
      this.pop = new Popup('panel',this.game.width/2,-150,35,20,[but,t],this.game);
      this.timeText = this.game.add.text(
         10,10,"0",{
         font: '20px Arial',
         fill: '#FFFFFF',
         align: 'center'
         });

	    console.log("Time: %f",this.time);

	},

	update: function(){
		this.sliders.angulo.update()
	
		if(play){
			this.time++;
			enemy.move();
			this.result = "..."
			ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
		}else{
			this.time = 0;
			enemy.reset();
		}
	    this.updateTime();

		ship.move(0);
		this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
		this.game.physics.arcade.collide(ship.sprite, enemy.sprite, collide_ally, 
		null, this);
		this.game.debug.text(this.result,400,50);
        },
        updateTime: function (){
        seconds = Math.floor((this.time) / 60);
        milliseconds = Math.floor(this.time)%60;

        if (milliseconds < 10)
            milliseconds = '0' + milliseconds;
	
        if (seconds < 10)
            seconds = '0' + seconds;
	
        this.timeText.setText(seconds + ':' + milliseconds);
    }


}
