//Nivel de posicion

Game.posicion = function (game){
    this.time = 0;
    play = false;
    this.counter = 0;
    this.name = "posicion";
    
    this.result = "Encuentra el satélite";
    this.next = 'won';
    this.curNext = 'posicion';
    this.sliders = {
	radio : null,
	angulo : null,
	vel_angular : null,
	acc_angular : null
    };
    this.pop = null;
    
    this.preview = true;
    this.grid = true;
    
    this.prev = {
	radio : 0,
	angulo : 0,
	vel_angular : 0,
	acc_angular : 0
    }
    
    this.neededTries = 8;
    this.tutorial = true;
    this.rad = "0";
    this.ang = "0";
    this.rmeh = "0";
    this.ameh = "0";
    this.correct = 0;
    this.error = 0;
    this.intP = 0;
    this.aimSoft;

};

Game.posicion.prototype = {
    
    create: function (){
  	
        if(success < 2) this.preview = true;

        else this.preview = false;
        
        
        //background
         bg = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOff');
       bgGrid = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOn');
        
        if (!(this.grid)) bgGrid = this.game.add.sprite(this.game.world.centerX-7,this.game.world.centerY+54,  'backgroundGridOff') ;

      bgGrid.anchor.setTo(0.5,0.5);
      bgGrid.scale.setTo(0.55,0.55);
      bg.anchor.setTo(0.5,0.5);
      bg.scale.setTo(0.55,0.55);
    
        hud= this.game.add.sprite(0,655,'hud');
        hud.scale.setTo(0.51,0.52);
        
        hudU= this.game.add.sprite(0,140,'hud');
        hudU.scale.setTo(0.51,-0.52);
        
       //Barra de Progreso
        
        progress = this.game.add.sprite(70,40,'pborder');
        progress.scale.setTo(0.3,0.03);
        
        intP = this.correct*0.024;

        progressB = this.game.add.sprite(97,43,'pbar');
        progressB.scale.setTo(intP,0.03);
        
        err = this.game.add.sprite(800,10,'error');
        err.scale.setTo(0.1,0.1);
     
        this.aimSoft = this.game.add.sprite(0,0,'aimS');
        this.aimSoft.scale.setTo(0,0);
        //this.aimSoft.anchor.setTo(0.5,0.5);
        
        
	//La tierra (Siempre se crea en todos los niveles)
	earth = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'earth');
	earth.anchor.setTo(0.5,0.5);
	earth.scale.setTo(0.175,0.175);
	this.game.physics.enable(earth,Phaser.Physics.ARCADE);
	earth.body.immovable = true;
	earth.body.center.x = this.game.world.centerX
	earth.body.center.y = this.game.world.centerY

   	//Crea los enemigos
      if(curQuad > 3) curQuad = 0;
        this.objangle = generator.integerInRange(90*curQuad,90*curQuad+90)
        this.objradio = generator.integerInRange(150,300)
	enemy = new Enemy('satelite',this.objangle,this.objradio,10,earth,this.game);
	enemy.sprite.anchor.setTo(0.5,0.5);
	enemy.sprite.scale.setTo(0.05,0.05);
	this.game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
	enemy.sprite.body.collideWorldBounds = true;
        enemy.sprite.visible = false;

        //Crea button
	button = this.game.add.button(475,730,'button',onClick,this,1,1,0);
        
        this.popArgs = [
            [35,20, "¡Has Ganado!"],
            [60,20, "¡Ahora intentalo sin\n coordenas en tiempo real!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [35,20, "¡Has Ganado!"],
            [80,20, "Felicidades! Luego intenta\n hacerlo sin errores!"]
        ];
        
        //Crear el popup
	var but = new Item('button',0,40,'button',[nextLevel,this,1,1,0]);
        var curArgs = this.popArgs[success];
	var t = new Item('text',0,-50,curArgs[2],[
	    '40px Arial',
	    '#ffffff',
	    'center'
	]);
        
        arrowHint = this.game.add.sprite(500, 280, 'arrow');
        if (this.correct > 0) {
            arrowHint.scale.setTo(0, 0);
        } else {
            arrowHint.scale.setTo(0.2, 0.2);
        }
        
	this.pop = new Popup('panel',this.game.width/2,-150,curArgs[0],curArgs[1],[but,t],this.game);
        

        
        //Crea AIM
        targetImg = 'aim';
	mTarget = new Ally(targetImg,this.game.world.width,this.game.world.height,0.12,-1,earth,this.game);
	mTarget.sprite.anchor.setTo(0.5,0.5);
        mTarget.sprite.scale.setTo(0.09,0.09);
	mTarget.sprite.scale.x *= -mTarget.dir;
        mTarget.sprite.inputEnabled = true;
        mTarget.sprite.input.enableDrag();
	this.game.physics.enable(mTarget.sprite,Phaser.Physics.ARCADE);
	mTarget.initialize();
   
    if (this.preview) mTarget.sprite.events.onDragUpdate.add(this.updateCoord,this);
        
   //Crear boton de back

    var b = this.game.add.button(this.game.world.width-70,30,'back',goToMenu,this,1,0,0);
    b.anchor.setTo(0.05,0.05);
    b.scale.setTo(0.15,0.15);


        if(this.objangle<0)
            this.objangle = 360 + this.objangle
        
        this.obj = this.game.add.text(
            355,40,"Sus coordenadas son R:"+this.objradio+" φ:"+this.objangle,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.game.add.text(
            100,730,"Desliza el marcador hasta\nlas coordenadas del satélite",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.game.add.text(
            750,690,"Coordenadas\n Tiempo Real      Anteriores",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        
        this.rmeh = this.game.add.text(
            780, 740,"R: ???" ,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        
         this.ameh = this.game.add.text(
            780, 758,"φ: ???",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        
        this.rad = this.game.add.text(
            930,740,"R: 0",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        this.ang = this.game.add.text(
            930,758,"φ: 0",{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );

        this.cor = this.game.add.text(
            120,16,"Éxitos \n"+this.correct+"/10",{

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


        this.resText = this.game.add.text(
            400,20,this.result,{
                font: '20px Arial',
                fill: '#FFFFFF',
                align: 'center'
            }
        );
        
                
    },

    update: function(){
        if(!play){
            mTarget.sprite.input.enableDrag();
            
        }else{
            mTarget.sprite.input.disableDrag();
            toRadian(this,mTarget.getPosition());
            this.aimSoft.position.setTo(mTarget.sprite.body.x,mTarget.sprite.body.y);
            this.aimSoft.scale.setTo(0.09,0.09);
            
            console.log(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true))
            if(Phaser.Point.distance(enemy.sprite.body.center,mTarget.sprite.body.center,true)<36){
                enemy.sprite.visible=true
                this.correct++;
                if(success == this.neededTries-1 && this.error == 0){
                  this.pop.text.setText("Perfecto!\nFelicitaciones!");
                  this.popArgs[this.neededTries-1] = [60,20, 
                  "Perfecto!\nFelicitaciones!"];
                }
                if(curQuad > 3) curQuad = 0;
                this.game.state.getCurrentState().pop.show();
            }else{
                failFx = this.game.add.audio('fail');
                failFx.volume = 0.2;
                failFx.play();
                this.error++;

                this.err.setText("Errores\n"+this.error);
            }
            
            button.setFrames(1,1,0);
            play =! play;


        }
        
    },
    
    updateCoord: function (){
        
        var x = mTarget.getPosition().x
        var y = mTarget.getPosition().y

        var radio = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        var angle = 0;
        if(x<0)
            angle = Math.atan(y/x) + Math.PI
        if(x==0 && y>0)
            angle = Math.PI/2
        if(x==0 && y<0)
            angle = (3*Math.PI)/2
        if(y>=0 && x>0)
            angle = Math.atan(y/x)
        if(y<0 && x>0)
            angle = Math.atan(y/x) + 2*Math.PI
            
        this.rmeh.setText("R: "+Math.round(radio));
        this.ameh.setText("φ: "+Math.round(Phaser.Math.radToDeg(angle)));
            
    },
    
    startGame: function(){
        this.doGame =! this.doGame;
    }
}
