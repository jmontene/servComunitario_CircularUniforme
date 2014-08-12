//Definicion de la clase Enemy
function Enemy(img,x,y,d,target,game){
    this.sprite = game.add.sprite(x,y,img);
    this.x = x
    this.y = y
    this.d = d

    dirx = target.x - this.x
    diry = target.y - this.y
    norm = Math.sqrt((dirx*dirx)+(diry*diry));
    
    this.dirx = dirx/norm
    this.diry = diry/norm    
}

Enemy.prototype = {

    reset: function(){
	this.sprite.body.x = this.x
	this.sprite.body.y = this.y
    },

    move: function(){
	this.sprite.body.x = this.sprite.body.x + this.dirx*this.d
	this.sprite.body.y = this.sprite.body.y + this.diry*this.d
    }
};

//Definicion de la clase Ally
function Ally(img,angle,radius,target,game){
    spdummy = game.add.sprite(target.body.center.x,target.body.center.y,img);
    this.sprite = spdummy
    this.angle = angle;
    this.radius = radius;
    this.xfix = 0;
    this.yfix = 0;
    this.target = target;
}

Ally.prototype = {

    set_fix: function(x,y){
	this.xfix = x;
	this.yfix = y;
    },

    change_angle: function(val){
	if(this.angle != val){
	    this.angle = val;
	    this.sprite.body.x = 
		(this.radius * Math.cos(this.angle)) + this.target.x-this.xfix;
	    this.sprite.body.y = 
		(this.radius * Math.sin(this.angle)) + this.target.y-this.yfix;
	}
    },

    change_radio: function(val){
	if(this.radius != val){
	    this.radius = val;
	    this.sprite.body.x =
		(this.radius * Math.cos(this.angle)) +
		this.target.body.center.x-this.xfix;
	    this.sprite.body.y =
		(this.radius * Math.sin(this.angle)) +
		this.target.body.center.y-this.yfix;
	}
    },
    
    move: function(time){
	this.sprite.body.x =
	    (this.radius * Math.cos(this.angle*time)) +
	    this.target.body.center.x-this.xfix;
	this.sprite.body.y = (this.radius * Math.sin(this.angle*time)) +
	    this.target.body.center.y-this.yfix;
    }
}

//Definicion de las colisiones
function collide_earth(earth, enemy){
    result = ":("
    console.log(result);
    onClick();
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
