//Nivel de angulo

Game.angulo = function (game) {
	this.time = 0;
	var play = false;
	this.result = "Intercepta el meteorito";
    this.name = "angulo";
	this.next = 'radio_angulo';
    this.curNext = 'angulo';
	this.sliders = {
		radio : null,
		angulo : null,
		vel_angular : null,
		acc_angular : null
	};
	this.pop = null;
    this.neededTries = 10;
    this.preview = true;
    this.grid = true;
    this.gridD = true;
    this.tutorial = true;
    this.correct = 0;
    this.error = 0;
    this.intP = 0;

};

Game.angulo.prototype = {


	create: function () {

        this.popArgs = [
            [35, 20, "¡Has Ganado!"],
            [60, 20, "¡Ahora intentalo sin\n el marcador!"],
            [35, 20, "¡Has Ganado!"],
            [60, 20, "¡Ahora intentalo sin\n las guías Diagonales!"],
            [35, 20, "¡Has Ganado!"],
            [60, 20, "¡Ahora intentalo sin\n las guías!"],
            [35, 20, "¡Has Ganado!"],
            [35, 20, "¡Has Ganado!"],
            [35, 20, "¡Has Ganado!"],
            [60, 20, "Prepárate para el\n siguiente reto!!"]
        ];     
        
        if (success < 2) {
            this.preview = true;
        } else {
            this.preview = false;
        }
        
        if (success < 6) {
            this.grid = true;
        } else {
            this.grid = false;
        }
        
        if (success < 4) {
            this.gridD = true;
        } else {
            this.gridD = false;
        }
        
      //background
        
        bg = this.game.add.sprite(
            this.game.world.centerX - 7,
            this.game.world.centerY + 54,
            'backgroundGridOff'
        );
        
        bgGrid = this.game.add.sprite(
            this.game.world.centerX - 7,
            this.game.world.centerY + 54,
            'backgroundGridOn'
        );
        
        if (!(this.gridD)) {
            bgGrid = this.game.add.sprite(
                this.game.world.centerX - 7,
                this.game.world.centerY + 54,
                'backgroundGridDiagOff'
            );
        }
        
        if (!(this.grid)) {
            bgGrid = this.game.add.sprite(
                this.game.world.centerX - 7,
                this.game.world.centerY + 54,
                'backgroundGridOff'
            );
        }
        
        bg.anchor.setTo(0.5, 0.5);
        bg.scale.setTo(0.55, 0.55);
        bgGrid.anchor.setTo(0.5, 0.5);
        bgGrid.scale.setTo(0.55, 0.55);
        
        hud = this.game.add.sprite(0, 655, 'hud');
        hud.scale.setTo(0.51, 0.52);
        
        hudU = this.game.add.sprite(0, 140, 'hud');
        hudU.scale.setTo(0.51, -0.52);
        
        //Barra de Progreso
        
        progress = this.game.add.sprite(70, 40, 'pborder');
        progress.scale.setTo(0.3, 0.03);
        
        intP = this.correct * 0.024;

        progressB = this.game.add.sprite(97, 43, 'pbar');
        progressB.scale.setTo(intP, 0.03);
        
        err = this.game.add.sprite(800, 10, 'error');
        err.scale.setTo(0.1, 0.1);
      
		//La tierra (Siempre se crea en todos los niveles)
		earth = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'earth'
        );
		earth.anchor.setTo(0.5, 0.5);
		earth.scale.setTo(0.175, 0.175);
		this.game.physics.enable(earth, Phaser.Physics.ARCADE);
		earth.body.immovable = true;
		earth.body.center.x = this.game.world.centerX;
		earth.body.center.y = this.game.world.centerY;

		//Crear el sprite de la ultraball de la misma forma, excepto que su posicion
		//Y depende del radio
        prevImg = "";
        if (this.preview) {
            prevImg = 'missileprev';
        }
		prev = new Ally(
            prevImg,
            400,
            300,
            0.12,
            -1,
            earth,
            this.game
        );
		prev.sprite.anchor.setTo(0.5, 0.5);
        prev.sprite.scale.setTo(0.05, 0.05);
		prev.sprite.scale.x *= -prev.dir;
		this.game.physics.enable(prev.sprite, Phaser.Physics.ARCADE);
		prev.initialize();

      //Target del misil
		mTarget = new Ally(
            '',
            this.game.world.width,
            this.game.world.height,
            0.12,
            -1,
            earth,
            this.game
        );
		mTarget.sprite.anchor.setTo(0.5, 0.5);
        mTarget.sprite.scale.setTo(0.05, 0.05);
		mTarget.sprite.scale.x *= -mTarget.dir;
		this.game.physics.enable(mTarget.sprite, Phaser.Physics.ARCADE);
		mTarget.initialize();
      
      //Crear el misil

        missile = new Enemy(
            'missile',
            90,
            20,
            80,
            earth,
            this.game
        );
        missile.sprite.scale.setTo(0.05, 0.05);
        this.game.physics.enable(missile.sprite, Phaser.Physics.ARCADE);
        earth.bringToTop();
	
		//Crea los enemigos
		enemy = new Enemy(
            'enemy',
            generator.integerInRange(90 * curQuad, 90 * curQuad + 90),
            290,
            10,
            earth,
            this.game
        );
		enemy.sprite.anchor.setTo(0.5, 0.5);
		enemy.sprite.scale.setTo(0.25, 0.25);
		this.game.physics.enable(enemy.sprite, Phaser.Physics.ARCADE);

		enemy.sprite.body.collideWorldBounds = true;
        prev.sprite.bringToTop();

		button = this.game.add.button(
            475,
            730,
            'button',
            onClickWithCounter,
            this,
            1,
            1,
            0
        );

        //Crear el boton de back
        console.log(this.game);
        var b = this.game.add.button(
            this.game.world.width - 70,
            30,
            'back',
            goToMenu,
            this,
            1,
            0,
            0
        );
        b.anchor.setTo(0.05, 0.05);
        b.scale.setTo(0.15, 0.15);
        	

		//Crear un slider
		this.sliders.angulo = new Slider(
            this.game,
            0,
            359,
            1,
            0
        );
		this.sliders.angulo.create(650,
                                   750,
                                   [0.03, 0.03],
                                   [0.3, 0.2],
                                   [0.2, 0.2],
                                   15,
                                   "φ",
                                   30,
                                   7
                                  );
      
        //Crear el texto del angulo
        this.angleText = this.game.add.text(
            earth.x - 25,
            earth.y + 50,
            '',
            {
                font: '30px Arial',
                fill: '#000000',
                align: 'center'
            }
        );

		
		//Crear el popup
		var but = new Item(
            'button',
            0,
            40,
            'button',
            [nextLevel, this, 1, 1, 0]
        );
        var curArgs = this.popArgs[success];
        console.log(this.popArgs);
		var t = new Item('text', 0, -50, curArgs[2], [
			'40px Arial',
			'#ffffff',
			'center'

        ]
            );
        this.pop = new Popup(
            'panel',
            this.game.width / 2,
            -150,
            curArgs[0],
            curArgs[1],
            [but, t],
            this.game
        );
        this.timeText = this.game.add.text(
            10,
            10,
            "0",
            {
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.resText = this.game.add.text(
            400,
            20,
            this.result,
            {
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.result = "Intercepta el meteorito";
	    console.log("Time: %f", this.time);
	
        if (this.tutorial) {
            var word = this.game.add.text(
                100,
                730,
                "Usa el slider para modificar \n el angulo de lanzamiento",
                {

                    font: '20px Arial',
                    fill: '#FFFFFF',
                    align: 'center'
                }
            );
            arrowHint = this.game.add.sprite(850, 600, 'arrow');
            if (success > 1) {
                arrowHint.scale.setTo(0, 0);
            } else {
                arrowHint.scale.setTo(0.25, 0.25);
            }
        }
        
        this.cor = this.game.add.text(
            120,
            16,
            "Éxitos \n" + this.correct + "/10",
            {
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.err = this.game.add.text(
            820,
            36,
            "Errores \n" + this.error,
            {
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

    },


    update: function () {
        this.sliders.angulo.update();

        this.angleText.setText(this.sliders.angulo.value + '°');

        if (play) {
            this.time++;
            this.angleText.setText(this.sliders.angulo.value + '°');
            this.game.physics.arcade.moveToObject(enemy.sprite, earth, enemy.speed);
            this.game.physics.arcade.moveToObject(missile.sprite, mTarget.sprite, missile.speed);
            this.result = "...";
        } else {
            missile.change_angle(this.sliders.angulo.value);
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
        if (this.game.physics.arcade.collide(missile.sprite, enemy.sprite, null, null, this)) {
           if (success == this.neededTries-1 && this.error == 0) {
              this.pop.text.setText("Perfecto!\nFelicitaciones!");
              this.popArgs[this.neededTries - 1] = [60, 20, "Perfecto!\nFelicitaciones!"];
           }
           collide_ally.call(this);
        }
        this.resText.setText(this.result);

   },
        
   updateTime: function () {
      seconds = Math.floor((this.time) / 60);
      milliseconds = Math.floor(this.time) % 60;

      if (milliseconds < 10){
          milliseconds = '0' + milliseconds; 
      }
         
      if (seconds < 10) {
         seconds = '0' + seconds;
      }
      this.timeText.setText(seconds + ':' + milliseconds);
   }
}
