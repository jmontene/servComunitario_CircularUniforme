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
   this.preview = true;
};

Game.angulo.prototype = {

	create: function (){
   
      if(success < 2) this.preview = true;
      else this.preview = false;
      
		//La tierra (Siempre se crea en todos los niveles)
		earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
		earth.anchor.setTo(0.5,0.5);
		earth.scale.setTo(0.175,0.175);
		this.game.physics.enable(earth,Phaser.Physics.ARCADE);
		earth.body.immovable = true;
		earth.body.center.x = this.game.world.centerX;
		earth.body.center.y = this.game.world.centerY;

		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
      var prevImg = "";
      if(this.preview) prevImg = 'ship';
		prev = new Ally(prevImg,420,300,0.12,-1,earth,this.game);
		prev.sprite.anchor.setTo(0.5,0.5);
      prev.sprite.scale.setTo(0.05,0.05);
		prev.sprite.scale.x *= -prev.dir;
		this.game.physics.enable(prev.sprite,Phaser.Physics.ARCADE);
		prev.initialize();

      //Target del misil
		mTarget = new Ally('',this.game.world.width,this.game.world.height,0.12,-1,earth,this.game);
		mTarget.sprite.anchor.setTo(0.5,0.5);
      mTarget.sprite.scale.setTo(0.05,0.05);
		mTarget.sprite.scale.x *= -mTarget.dir;
		this.game.physics.enable(mTarget.sprite,Phaser.Physics.ARCADE);
		mTarget.initialize();      
      
      //Crear el misil
      missile = new Enemy('missile',90,20,80,earth,this.game);
      missile.sprite.scale.setTo(0.1,0.1);
      this.game.physics.enable(missile.sprite,Phaser.Physics.ARCADE);
      earth.bringToTop();
	
		//Crea los enemigos
		enemy = new Enemy('enemy',generator.angle(),400,10,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.25,0.25);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;
      prev.sprite.bringToTop();

		button = this.game.add.button(475,730,'button',onClick,this,1,1,0);
	
		//Crear un slider
		this.sliders.angulo = new Slider(this.game,0,359,1,0);
		this.sliders.angulo.create(650,750,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"φ");
      
      //Crear el texto del angulo
      this.angleText = this.game.add.text(
         earth.x-25,earth.y+50,'',{
         font: '30px Arial',
         fill: '#000000',
         align: 'center'
      });
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
      var text = "Has ganado!!"
      if(success == 1) text = "Ahora intentalo sin\n el indicador del misil!";
		var t = new Item('text',0,-50,text,[
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
		this.sliders.angulo.update();
      missile.change_angle(this.sliders.angulo.value);
	
		if(play){
			this.time++;
         this.angleText.setText(this.sliders.angulo.value + '°');
         this.game.physics.arcade.moveToObject(enemy.sprite,earth,enemy.speed);
         this.game.physics.arcade.moveToObject(missile.sprite,mTarget.sprite,missile.speed);
			this.result = "..."
		}else{
			this.time = 0;
			enemy.reset();
         missile.reset();
         mTarget.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
         prev.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
		}
	    this.updateTime();

		prev.move(0);
      mTarget.move(0);
		this.game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
		this.game.physics.arcade.collide(missile.sprite, enemy.sprite, collide_ally, 
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
