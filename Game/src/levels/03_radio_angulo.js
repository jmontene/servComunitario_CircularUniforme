//Nivel de radio+angulo

Game.radio_angulo = function (game){
	this.time = 0;
	play = false;
	this.counter = 0;
   this.name = "radio_angulo";
	
	this.result = "Llega hasta el satélite";
	this.next = 'posicion';
   this.curNext = 'radio_angulo';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	};
	this.pop = null;
   
   this.preview = true;
   this.grid = true;
   this.gridD = true;
	
	this.prev = {
		radio : 0,
		angulo : 0,
		vel_angular : 0,
		acc_angular : 0
	}
   
    this.neededTries = 12;
    this.tutorial = true;
    this.correct = 0;
    this.error = 0;
    this.intP = 0;

};

Game.radio_angulo.prototype = {

	create: function (){
      // if(success < 1) this.tutorial = true;
      // else this.tutorial = false;
   
      if(success < 2) this.preview = true;
      else this.preview = false;
        
      if(success < 8) this.grid = true;
      else this.grid = false;
        
      if(success < 5) this.gridD = true;
      else this.gridD = false;
      
      this.popArgs = [
         [35,20, "¡Has Ganado!"],
         [60,20, "¡Ahora intentalo sin\n el marcador!"],
         [35,20, "¡Has Ganado!"],
         [35,20, "¡Has Ganado!"],
         [60,20, "¡Ahora intentalo sin\n las guías Diagonales!"],
         [35,20, "¡Has Ganado!"],
         [35,20, "¡Has Ganado!"],
         [60,20, "¡Ahora intentalo sin\n las guías!"],
         [35,20, "¡Has Ganado!"],
         [35,20, "¡Has Ganado!"],
         [35,20, "¡Has Ganado!"],
         [60,20, "Prepárate para el\n siguiente reto!!"]
      ];
        
      //background
        bg = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOff');
       bgGrid = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOn');
        
         if (!(this.gridD)) bgGrid = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridDiagOff') ;
        if (!(this.grid)) bgGrid = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOff') ;

      bgGrid.anchor.setTo(0.5,0.5);
      bgGrid.scale.setTo(0.55,0.55);
      bg.anchor.setTo(0.5,0.5);
      bg.scale.setTo(0.55,0.55);
        
        // Barra de Progreso
        
                hud= this.game.add.sprite(0,655,'hud');
        hud.scale.setTo(0.51,0.52);
        
        hudU= this.game.add.sprite(0,140,'hud');
        hudU.scale.setTo(0.51,-0.52);
        
        progress = this.game.add.sprite(100,40,'pborder');
        progress.scale.setTo(0.3,0.03);
        
        intP = this.correct*0.02;

        progressB = this.game.add.sprite(127,43,'pbar');
        progressB.scale.setTo(intP,0.03);
	
        err = this.game.add.sprite(800,10,'error');
        err.scale.setTo(0.1,0.1);
      
        
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
      targetImg = 'aim';
		mTarget = new Ally(targetImg,this.game.world.width,this.game.world.height,0.12,-1,earth,this.game);
		mTarget.sprite.anchor.setTo(0.5,0.5);
        mTarget.sprite.scale.setTo(0,0);
     if(this.preview) mTarget.sprite.scale.setTo(0.09,0.09);
		mTarget.sprite.scale.x *= -mTarget.dir;
		this.game.physics.enable(mTarget.sprite,Phaser.Physics.ARCADE);
		mTarget.initialize();
	
		//Crea los enemigos
        var eRadio = generator.integerInRange(150,300);
        while ( (eRadio < this.radio +30) && (eRadio > this.radio -30)) {
            eRadio = generator.integerInRange(150,300);
        }
        
        if (this.correct < 3) {
            eneRad = generator.integerInRange(0,4)*90;
        } else {
            eneRad = generator.integerInRange(90*curQuad,90*curQuad+90);
        }
    
		enemy = new
 Enemy('satelite',eneRad,eRadio,10,earth,this.game);
		enemy.sprite.anchor.setTo(0.5,0.5);
		enemy.sprite.scale.setTo(0.05,0.05);
		this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
		enemy.sprite.body.collideWorldBounds = true;

		button = this.game.add.button(475,730,'button',this.startGame,this,1,1,0); 
      mTarget.sprite.bringToTop();
	
		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
		ship = new Ally('shipSheet',420,100,0.12,-1,earth,this.game);
		ship.sprite.anchor.setTo(0.5,0.5);
		ship.sprite.scale.setTo(0.1,0.1);
		ship.sprite.scale.x *= -ship.dir;
		this.game.physics.enable(ship.sprite,Phaser.Physics.ARCADE);
		ship.initialize();
      ship.sprite.animations.add('teleport',[1,2,3]);
      ship.sprite.animations.add('teleportBack',[3,2,1]);
      ship.sprite.frame = 0;
	
		//Crear sliders
		this.sliders.angulo = new Slider(
            this.game,
            0,
            359,
            1,
            generator.integerInRange(90*curQuad,90*curQuad+90)
        );
		this.sliders.angulo.create(650,725,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"φ",30,7);
		this.prev.angulo = this.sliders.angulo.value;
		
		this.sliders.radio = new Slider(this.game,100,300,1,generator.integerInRange(100,300));
		this.sliders.radio.create(650,775,[0.03,0.03],[0.3,0.2],[0.2,0.2],15,"R",25,10);
		this.prev.radio = this.sliders.radio.value;
      
      //Crear boton de back
      var b = this.game.add.button(this.game.world.width-70,30,'back',goToMenu,this,1,0,0);
      b.anchor.setTo(0.05,0.05);
      b.scale.setTo(0.15,0.15);
		
		//Crear el popup
		var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
      var curArgs = this.popArgs[success];
		var t = new Item('text',0,-50,curArgs[2],[
			'40px Arial',
			'#ffffff',
			'center'
			]);
		this.pop = new Popup('panel',this.game.width/2,-150,curArgs[0],curArgs[1],[but,t],this.game);

      ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
      ship.change_radio(this.sliders.radio.value);
      
      this.resText = this.game.add.text(
         380,20,this.result,{
         font: '20px Arial',
         fill: '#FFFFFF',
         align: 'center'
         }
      );

    if(this.tutorial){
        var word = this.game.add.text(
            100,710,"Usa los sliders para modificar\nla posicion a la que\nmovera la nave",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
      arrowHint = this.game.add.sprite(850,550,'arrow');
      if (success>1) arrowHint.scale.setTo(0,0);
      else arrowHint.scale.setTo(0.25,0.25);
    }
            this.cor = this.game.add.text(
                150,16,"Éxitos \n"+this.correct+"/10",{
                    font: '20px Arial',
                    fill: '#FFFFFF',
                    align: 'center'
                }
            );
            this.err = this.game.add.text(
                820,36,"Errores \n"+this.error,{
                    font: '20px Arial',
                    fill: '#FFFFFF',
                    align: 'center'
                }
            );
            
        
      this.result = "Llega hasta el satélite";
      
      this.gameState = "teleport";
      this.coll = false;
      this.win = false;
      this.doGame = false;
      this.sTime = this.game.time.now;
            
	},

	update: function(){
		this.sliders.angulo.update();
		this.sliders.radio.update();
      
      mTarget.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
      mTarget.change_radio(this.sliders.radio.value);
      mTarget.move(0);
	
		if(this.doGame && !this.lost && !this.win){
			this.time++;
			this.result = "...";
         if(this.gameState == "teleport"){
            ship.sprite.animations.play('teleport');
            this.gameState = "moveIn";
         }else if(this.gameState == "moveIn" && ship.sprite.animations.getAnimation('teleport').isFinished){
            ship.change_angle(Phaser.Math.degToRad(this.sliders.angulo.value));
            ship.change_radio(this.sliders.radio.value);
            ship.move(0);
            this.gameState = "teleportBack";
         }else if(this.gameState == "teleportBack"){
            ship.sprite.animations.play('teleportBack');
            this.gameState = "checkColl";
         }else if(this.gameState == "checkColl" && ship.sprite.animations.getAnimation('teleportBack').isFinished){
            ship.sprite.frame = 0;
            if(!this.coll){
                this.lost = true;
                failFx = this.game.add.audio('fail');
                failFx.volume = 0.2;
                failFx.play();
                this.error++;
                this.err.setText("Errores\n"+this.error);
               this.sTime = this.game.time.now;
            }else{
                this.win = true;
                this.correct++;
               this.result = "Lo has logrado!";
               if(success == this.neededTries-1 && this.error == 0){
                  this.pop.text.setText("Perfecto!\nFelicitaciones!");
                  this.popArgs[this.neededTries-1] = [60,20, 
                  "Perfecto!\nFelicitaciones!"];
               }
               this.game.state.getCurrentState().pop.show();
            }
         }
      }else if(this.lost){
         if(this.game.time.now - this.sTime > 1000){
            this.result = "No llegaste al objetivo. Intenta de nuevo";
            this.lost = false;
            this.gameState = "teleport";
            this.doGame = false;
         }
		}else if(!this.win){
            this.time = 0;
			enemy.reset();
            ship.change_angle(Phaser.Math.degToRad(this.prev.angulo));
			ship.change_radio(this.prev.radio);
            ship.move(0);
		}
      
      this.updateTime();
      
      if(!this.coll){
         this.coll = this.game.physics.arcade.collide(ship.sprite, enemy.sprite, null, null, this);
      }
      
		this.resText.setText(this.result);
   },
   
   updateTime: function (){
      seconds = Math.floor((this.time) / 60);
      milliseconds = Math.floor(this.time) % 60;

      if (milliseconds < 10)
         milliseconds = '0' + milliseconds;
	
      if (seconds < 10)
         seconds = '0' + seconds;
	
    },
    
   startGame: function(){
      this.doGame =! this.doGame;
   }
}
