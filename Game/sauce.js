//Definicion de la clase Enemy
function Enemy(img,x,y,d,target,game){
    this.sprite = game.add.sprite(x,y,img);
    this.initial = new Phaser.Point(x,y);
    this.dir =
	Phaser.Point.normalize(Phaser.Point.subtract(target,this.initial));
    this.d = d;
}

Enemy.prototype = {

    reset: function(){
	this.sprite.body.x = this.initial.x;
	this.sprite.body.y = this.initial.y;
    },

    move: function(){
	this.sprite.body.x = this.sprite.body.x + this.dir.x*this.d;
	this.sprite.body.y = this.sprite.body.y + this.dir.y*this.d;
    }
};

//Definicion de la clase Ally
function Ally(img,x,y,angle,dir,target,game){
    var spdummy = game.add.sprite(target.body.center.x,target.body.center.y,img);
    this.sprite = spdummy;
    this.angle = angle;
    this.dir = dir;
    
    var pinitial = new Phaser.Point(x,y);
    this.radius = Phaser.Point.distance(pinitial,target.body.center);
    var v0 = Phaser.Point.subtract(pinitial,target.body.center)
    var v1 = new Phaser.Point(0,0)
    this.inicial_angle = Phaser.Point.angle(v0,v1)
    
    // this.fix = new Phaser.Point(spdummy.body.center.x - target.body.center.x,
    // 				spdummy.body.center.y - target.body.center.y)

    this.fix = null
    this.target = target;
}

Ally.prototype = {

    initialize: function(){
	this.sprite.body.collideWorldBounds = true;
	
	this.fix = new Phaser.Point(
	    this.sprite.body.center.x - this.target.body.x,
	    this.sprite.body.center.y - this.target.body.y)

    },

    change_angle: function(val){
	if(this.angle != val){
	    this.angle = val;
	    this.sprite.body.x = 
		(this.radius * Math.cos(this.angle + this.inicial_angle))
		+ this.target.x-this.fix.x;
	    this.sprite.body.y = 
		(this.radius * Math.sin(this.angle + this.inicial_angle))
		+ this.target.y-this.fix.y;
	}
    },

    change_radio: function(val){
	if(this.radius != val){
	    this.radius = val;
	}
    },
    
    move: function(time){
	var dummy_angle = (this.dir*this.angle*time) + this.inicial_angle;
    
	this.sprite.body.x =
	    (this.radius * Math.cos(dummy_angle)) +
	    this.target.body.center.x-this.fix.x;
	this.sprite.body.y = 
	     (this.radius * Math.sin(dummy_angle)) +
	    this.target.body.center.y-this.fix.y;
    
	this.sprite.angle = Phaser.Math.radToDeg(dummy_angle)+90;

    }
}

//Definicion de las colisiones
function collide_earth(earth, enemy){
    result = ":("
    console.log(result);
    onClick();
    this.state.start('menu')
}

function collide_ally(earth, enemy){
    result = ":)"
    console.log(result);
    onClick();
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

//Esta funcion lee el valor del slider
function sliderChange(val){
    dummyradio = val;
    //Aqui se obtiene el valor del label que indica el valor del slider y se
    //cambia
    document.getElementById('sliderStatus').innerHTML = val;
}
