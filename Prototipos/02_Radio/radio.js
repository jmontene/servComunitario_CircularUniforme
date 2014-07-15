
//Creacion del juego
var game = new Phaser.Game(750,750,Phaser.AUTO,'',{preload : preload, create : create, update : update});

//Angulo (en radianes) y el radio
var angle = 0.1;
var radius = 200;
var time = 1;
var play = false;

function preload(){
    //Precargar imagen de la tierra y la ultraball
    game.load.image('earth', 'assets/earth.png');
    game.load.image('ball', 'assets/ultra.png');
    game.load.spritesheet('button','assets/button_sprite1.png',64,64);
}

function create(){
    //Crear el sprite de la tierra y centrarlo tanto con respecto a si mismo como
    //Con el mundo. Escalarlo a la mitad
    earth = game.add.sprite(game.world.centerX,game.world.centerY,'earth');
    earth.anchor.setTo(0.5,0.5);
    earth.scale.setTo(0.3,0.3);
    
    
    //Crear el sprite de la ultraball de la misma forma, excepto que su posicion
    //Y depende del radio
    ball = game.add.sprite(game.world.centerX,game.world.centerY - radius, 'ball');
    ball.anchor.setTo(0.5,0.5);
    ball.scale.setTo(0.05,0.05);

    button = game.add.button(0,0,'button',onClick,this,1,1,0);
    button.scale.setTo(0.5,0.5);
}

function update(){
    if(play){
	time ++;
    }else{
	time = 1;
    }

    //Las posiciones X y Y de la ultraball dependen del radio y el angulo del
    //Movimiento, con un offset de la posicion de la tierra
    ball.x = (radius * Math.cos(angle*time)) + earth.x;
    ball.y = (radius * Math.sin(angle*time)) + earth.y;

}

//Esta funcion lee el valor del slider
function sliderChange(val){
    radius = val;
    //Aqui se obtiene el valor del label que indica el valor del slider y se
    //cambia
    document.getElementById('sliderStatus').innerHTML = val;
}

function onClick () {
    play =! play;
    if(play){
	button.setFrames(0,0,1);
    }else{
	button.setFrames(1,1,0);
    }

}