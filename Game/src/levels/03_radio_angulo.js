//Nivel de radio+angulo

Game.radio_angulo = function (game){
	this.time = 0;
	play = false;
	this.counter = 0;
   this.name = "radio_angulo";
	
	this.result = "Llega hasta el objetivo";
	this.next = 'menu';
   this.curNext = 'radio_angulo';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	};
	this.pop = null;
   
   this.preview = true;
	
	this.prev = {
		radio : 0,
		angulo : 0,
		vel_angular : 0,
		acc_angular : 0
	}
   
   this.neededTries = 5;
};

Game.radio_angulo.prototype = {

	create: function (){
   
      if(success < 2) this.preview = true;
      else this.preview = false;
	
		//La tierra (Siempre se crea en todos los niveles)
		earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
		earth.anchor.setTo(0.5,0.5);
		earth.scale.setTo(0.175,0.175);
		this.game.physics.enable(earth,Phaser.Physics.ARCADE);
		earth.body.immovable = true;
		earth.body.center.x = this.game.world.centerX
		earth.body.center.y = this.game.world.centerY
      
      //Target del misil
      var targetImg = "";
      if(this.preview) targetImg = 'aim';
		mTarget = new Ally(targetImg,this.game.world.width,this.game.world.height,0.12,-1,earth,this.game);
		mTarget.sprite.anchor.setTo(0.5,0.5);
      mTarget.sprite.scale.setTo(0.09,0.09);
		mTarget.sprite.scale.x *= -mTarget.dir;
		this.game.physics.enable(mTarget.sprite,Phaser.Physics.ARCADE);
		mTarget.initialize();
	
		//Crea los enemigos
		enemy = new Enemy('satelite',generator.angle(),generator.integerInRange(100,300),10,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.25,0.25);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;

		button = this.game.add.button(475,730,'button',onClick,this,1,1,0); 
      mTarget.sprite.bringToTop();
	
		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
		ship = new Ally('ship',420,100,0.12,-1,earth,this.game);
		ship.sprite.anchor.setTo(0.5,0.5);
		ship.sprite.scale.setTo(0.05,0.05);
		ship.sprite.scale.x *= -ship.dir;
		this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
		ship.initialize();
	
		//Crear sliders
		this.sliders.angulo = new Slider(this.game,0,359,1,360+Phaser.Math.radToDeg(ship.inicial_angle));
		this.sliders.angulo.create(650,700,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"φ");
		this.prev.angulo = this.sliders.angulo.value;
		
		this.sliders.radio = new Slider(this.game,100,500,1,200);
		this.sliders.radio.create(650,750,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"R");
		this.prev.radio = this.sliders.radio.value;
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
      var text = "Has ganado!!";
      var size = [35,20];
      if(success == 1){
         text = "Ahora intentalo sin\n la retícula!"
         size = [60,20]
      }
		var t = new Item('text',0,-50,text,[
			'40px Arial',
			'#ffffff',
			'center'
			]);
		this.pop = new Popup('panel',this.game.width/2,-150,size[0],size[1],[but,t],this.game);

            this.timeText = this.game.add.text(
	    10,10,"0",{
		font: '20px Arial',
		fill: '#FFFFFF',
		align: 'center'
	    });

	    console.log("Time: %f",this.time);
       	ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
			ship.change_radio(this.sliders.radio.value);

      this.lost = false;
      this.sTime = this.game.time.now;
            
	},

	update: function(){
		this.sliders.angulo.update();
		this.sliders.radio.update();
      
      mTarget.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
      mTarget.change_radio(this.sliders.radio.value);
      mTarget.move(0);
	
		if(play && !this.lost){
			this.time++;
			this.result = "...";
         ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
         ship.change_radio(this.sliders.radio.value);
         ship.move(0);
         var coll = this.game.physics.arcade.collide(ship.sprite, enemy.sprite,collide_ally, null, this);
         if(!coll){
            this.lost = true;
            this.sTime = this.game.time.now;
         }
      }else if(this.lost){
         //console.log(Phaser.Time.now);
         //console.log(this.sTime);
         if(this.game.time.now - this.sTime > 1000){
            this.loseGame();
            this.lost = false;
         }
		}else{
			this.time = 0;
			enemy.reset();
         ship.change_angle(Phaser.Math.degToRad(this.prev.angulo));
			ship.change_radio(this.prev.radio);
         ship.move(0);
		}
      
      this.updateTime();
      
		this.game.debug.text(this.result,375,50);
   },
   
   updateTime: function (){
      seconds = Math.floor((this.time) / 60);
      milliseconds = Math.floor(this.time)%60;

      if (milliseconds < 10)
         milliseconds = '0' + milliseconds;
	
      if (seconds < 10)
         seconds = '0' + seconds;
	
      this.timeText.setText(seconds + ':' + milliseconds);
    },
    
   loseGame: function(){
      this.result = "No llegaste al objetivo. Intenta de nuevo";
      onClick();
   }

}
