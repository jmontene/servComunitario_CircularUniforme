//Creacion del juego
var game = new Phaser.Game(600,600,Phaser.AUTO,'',{preload : preload, create : create, update : update});

//Angulo (en radianes) y el radio
var time = 1;
var play = false;
var d = 1;
var result = "..."
var dummyradio = 0;

function preload(){
    //Precargar imagen de la tierra y la ultraball
    game.load.image('earth', 'assets/blue_circle.png');
    game.load.image('enemy', 'assets/asteroid.png');
    game.load.spritesheet('button','assets/button_sprite1.png',64,64);
    game.load.image('ball', 'assets/ultra.png');
    
}

function create(){
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Crear el sprite de la tierra y centrarlo tanto con respecto a si mismo como
    //Con el mundo. Escalarlo a la mitad
    earth = game.add.sprite(game.world.centerX,game.world.centerY,'earth');
    earth.anchor.setTo(0.5,0.5);
    earth.scale.setTo(0.3,0.3);
    game.physics.enable(earth,Phaser.Physics.ARCADE);
    earth.body.immovable = true;
    earth.body.center.x = 300
    earth.body.center.y = 300
    
    
    //Crea el enemigo
    enemy = new Enemy('enemy',50,50,5);
    enemy.sprite.anchor.setTo(0.5,0.5);
    enemy.sprite.scale.setTo(0.25,0.25);

    game.physics.enable(enemy.sprite,Phaser.Physics.ARCADE);
    enemy.sprite.body.collideWorldBounds = true;

    //Crear el boton que controla la pausa y el play
    button = game.add.button(0,0,'button',onClick,this,1,1,0);
    button.scale.setTo(0.5,0.5);
    
    //Crear el sprite de la ultraball de la misma forma, excepto que su posicion
    //Y depende del radio
    ball = new Ally('ball',earth.body.center.x,earth.body.center.y,0.12,200);
    ball.sprite.anchor.setTo(0.5,0.5);
    ball.sprite.scale.setTo(0.05,0.05);
    game.physics.enable(ball.sprite,Phaser.Physics.ARCADE);
    ball.sprite.body.collideWorldBounds = true;
    ball.set_fix(ball.sprite.body.center.x-earth.body.center.x,
		 ball.sprite.body.center.y-earth.body.center.y)    

    console.log("game center, x = %d y = %d",game.world.centerX,game.world.centerY)
    console.log("blue ball center, x = %d y = %d",earth.body.center.x,earth.body.center.y)
    console.log("ultra ball center, x = %d y = %d",ball.sprite.body.center.x,ball.sprite.body.center.y)


}

function update(){

    if(play){
	time ++;
	enemy.move();
	
	result = "..."
    }else{
	time = 1;
	enemy.reset();
	ball.change_radio(dummyradio);
    }
    ball.move(time);
    game.physics.arcade.collide(earth, enemy.sprite, collide_earth, null, this);
    game.physics.arcade.collide(ball.sprite, enemy.sprite, collide_ally, 
				null, this);
    game.debug.text(result,300,50);
}

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

//Definicion de la clase Enemy
function Enemy(img,x,y,d){
    this.sprite = game.add.sprite(x,y,img);
    this.x = x
    this.y = y
    this.d = d

    dirx = earth.x - this.x
    diry = earth.y - this.y
    norm = Math.sqrt((dirx*dirx)+(diry*diry));
    
    this.dirx = dirx/norm
    this.diry = diry/norm    
}

Enemy.prototype.reset = function(){
    this.sprite.body.x = this.x
    this.sprite.body.y = this.y
}

Enemy.prototype.move = function(){
    this.sprite.body.x = this.sprite.body.x + this.dirx*this.d
    this.sprite.body.y = this.sprite.body.y + this.diry*this.d
}

//Definicion de la clase Ally
function Ally(img,x,y,angle,radius){
    spdummy = game.add.sprite(x,y,img);
    this.sprite = spdummy
    this.angle = angle;
    this.radius = radius;
    this.xfix = 0;
    this.yfix = 0;
}

Ally.prototype.set_fix = function(x,y){
    this.xfix = x;
    this.yfix = y;
}

Ally.prototype.change_angle = function(val){
    if(this.angle != val){
	this.angle = val;
	this.sprite.body.x = (this.radius * Math.cos(this.angle)) + earth.x-this.xfix;
	this.sprite.body.y = (this.radius * Math.sin(this.angle)) + earth.y-this.yfix;
    }
}

Ally.prototype.change_radio = function(val){
    if(this.radius != val){
	this.radius = val;
	this.sprite.body.x = (this.radius * Math.cos(this.angle)) + earth.body.center.x-this.xfix;
	this.sprite.body.y = (this.radius * Math.sin(this.angle)) + earth.body.center.y-this.yfix;
    }
}    

Ally.prototype.move = function(time){
    this.sprite.body.x = (this.radius * Math.cos(this.angle*time)) + earth.body.center.x-this.xfix;
    this.sprite.body.y = (this.radius * Math.sin(this.angle*time)) + earth.body.center.y-this.yfix;
}   

//Esta funcion lee el valor del slider
function sliderChange(val){
    dummyradio = val;
    //Aqui se obtiene el valor del label que indica el valor del slider y se
    //cambia
    document.getElementById('sliderStatus').innerHTML = val;
}
