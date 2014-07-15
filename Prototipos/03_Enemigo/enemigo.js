
//Creacion del juego
var game = new Phaser.Game(600,600,Phaser.AUTO,'',{preload : preload, create : create, update : update});

//Angulo (en radianes) y el radio
var time = 1;
var play = false;
var d = 1;
var result = "..."

function preload(){
    //Precargar imagen de la tierra y la ultraball
    game.load.image('earth', 'assets/earth.png');
    game.load.image('enemy', 'assets/asteroid.png');
    game.load.spritesheet('button','assets/button_sprite1.png',64,64);
    
}

function create(){
    
    //Crear el sprite de la tierra y centrarlo tanto con respecto a si mismo como
    //Con el mundo. Escalarlo a la mitad
    earth = game.add.sprite(game.world.centerX,game.world.centerY,'earth');
    earth.anchor.setTo(0.5,0.5);
    earth.scale.setTo(0.3,0.3);


    //Crear el boton que controla la pausa y el play
    button = game.add.button(0,0,'button',onClick,this,1,1,0);
    button.scale.setTo(0.5,0.5);
        
    //Crea el enemigo
    enemy = new Enemy('enemy',50,50,5);
    enemy.sprite.anchor.setTo(0.5,0.5);
    enemy.sprite.scale.setTo(0.25,0.25);

}

function update(){

    if(play){
	time ++;
	enemy.move()
    }else{
	time = 1;
	enemy.reset()
    }
    

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
    this.sprite.x = this.x
    this.sprite.y = this.y
}

Enemy.prototype.move = function(){
    this.sprite.x = this.sprite.x + this.dirx*this.d
    this.sprite.y = this.sprite.y + this.diry*this.d
}