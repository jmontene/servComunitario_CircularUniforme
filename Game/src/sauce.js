//Definicion de la clase Enemy
function Enemy(img,angle,distance,speed,target,game){
    this.game = game;
    this.target = target;
	var radAngle = Phaser.Math.degToRad(angle);
	var xPos = target.body.x + distance * Math.cos(radAngle);
	var yPos = target.body.y - distance * Math.sin(radAngle);

	this.sprite = game.add.sprite(xPos,yPos,img);
	this.sprite.anchor.setTo(0.5,0.5);
	this.initial = new Phaser.Point(xPos,yPos);
   this.dir = Phaser.Point.normalize(Phaser.Point.subtract(target,this.initial));

	this.speed = speed;
}

Enemy.prototype = {

	reset: function(){
		this.sprite.body.x = this.initial.x;
		this.sprite.body.y = this.initial.y;
	},

	move: function(){
		this.game.physics.arcade.moveToObject(this.sprite,this.target,this.speed);
	},
   
   change_angle: function(val){
      this.sprite.angle = -val+90;
   },

    getPosition: function(){
        return new Phaser.Point(this.sprite.body.x-this.target.x,
                                this.target.y-this.sprite.body.y)
    }
   
};

//Definicion de la clase Ally
function Ally(img,x,y,angle,dir,target,game){
	this.sprite = game.add.sprite(target.body.center.x,target.body.center.y,img);
	this.angle = angle;
	this.dir = dir;
	
	var pinitial = new Phaser.Point(x,y);
	this.radius = Phaser.Point.distance(pinitial,target.body.center);
	var v0 = Phaser.Point.subtract(pinitial,target.body.center)
	var v1 = new Phaser.Point(0,0)
	this.inicial_angle = Phaser.Point.angle(v0,v1)
	
	this.fix = null
	this.target = target;
};

Ally.prototype = {

	initialize: function(){
		this.sprite.body.collideWorldBounds = true;
	
		this.fix = new Phaser.Point(
			this.sprite.body.center.x - this.target.body.x,
			this.sprite.body.center.y - this.target.body.y
		)
	},

	change_angle: function(val){
		if(this.inicial_angle != val){
			this.inicial_angle = val;
			this.sprite.body.x = 
			(this.radius * Math.cos(this.inicial_angle))
			+ this.target.x-this.fix.x;
			this.sprite.body.y = 
			(this.radius * Math.sin(this.inicial_angle))
			+ this.target.y-this.fix.y;
		}
	},

	change_radio: function(val){
		if(this.radius != val){
			this.radius = val;
		}
	},
    
	move: function(time){
	    var dummy_angle = (this.dir*this.angle*(time/10)) + this.inicial_angle;
		
		this.sprite.body.x =
		(this.radius * Math.cos(dummy_angle)) +
		this.target.body.center.x-this.fix.x;
		
		this.sprite.body.y = -
		(this.radius * Math.sin(dummy_angle)) +
		this.target.body.center.y-this.fix.y;
	
		this.sprite.angle = -Phaser.Math.radToDeg(dummy_angle)+90;

	},

    getPosition: function(){
        return new Phaser.Point(this.sprite.body.x -this.target.x+this.fix.x,
                                this.target.y-this.fix.y-this.sprite.body.y)
    }
}
   

//Definicion de las colisiones
function collide_earth(earth, enemy){
	this.result = "Impacto. Intenta de Nuevo"
    this.error++;
    this.err.setText("Errores: "+this.error);
    onClick();
}

function collide_ally(earth, enemy){
	console.log("collide_Ally was called");
	this.result = "Lo has logrado!"
    onClick();
    this.game.state.getCurrentState().correct++;
    this.game.state.getCurrentState().pop.show();    
}

function collide_find(mTarget, ally){
	console.log("collide_find was called");
	this.result = "Lo has logrado!"
	onClick();
//	this.game.state.getCurrentState().pop.show();
}


function nextLevel(){
   state = this.game.state.getCurrentState();
   console.log(state);
   success += 1;
   curQuad += 1;
   if(success != state.neededTries){
      state.curNext = state.name;
   }else{
      success = 0;
      state.curNext = state.next;
   }
   console.log(this.game.state.getCurrentState());
	this.game.state.start(this.game.state.getCurrentState().curNext);
}

//Se activa cuando se le da click al boton
function onClick () {
	play =! play;
	if(play){
		button.setFrames(0,0,1);
	}else{
		button.setFrames(1,1,0);
	}
}
function onClickWithCounter () {
	play =! play;
	if(play){
	    button.setFrames(0,0,1);
        }else{
	    button.setFrames(1,1,0);
            this.game.state.getCurrentState().error++;
            this.game.state.getCurrentState().err.setText("Errores: "+this.error);
	}
}

function goToMenu() {
    success = 0;
    curQuad = 1;
    this.correct = 0;
    this.error = 0;
    console.log(success);
    this.game.state.start('menu');
}

function toRadian (state,pos) {
    // var x = pos.x - state.game.world.centerX
    // var y = state.game.world.centerY-pos.y

    var x = pos.x
    var y = pos.y
    
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
    
    // console.log("%i,%i",x,y)
    // console.log(radio)
    // console.log(Phaser.Math.radToDeg(angle))
    state.rad.setText("R: "+Math.round(radio))
    state.ang.setText("φ: "+Math.round(Phaser.Math.radToDeg(angle)))
}

