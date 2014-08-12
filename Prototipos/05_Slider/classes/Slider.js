Slider = function(game,min,max,jump,initValue) {
  this.game = game;
  console.log(this.game);
  this.button = null;
  this.buttonID = null;
  this.slideID = null;
  this.slide = null;
  this.value = initValue;
  this.maxValue = max;
  this.minValue = min;
  this.jump = (min + jump - min) / (max - min);
}

Slider.prototype = {
  
  preload: function(sID, sPath, bID, bPath) {
    console.log(4);
    if(sPath != 'noPath'){
        this.game.load.image(bID, bPath);
        this.game.load.image(sID, sPath);
    }
    this.buttonID = bID;
    this.slideID = sID;
  },
  
  create: function(xCoord, yCoord, scaleX, scaleY) {
    this.slide = this.game.add.sprite(xCoord,yCoord,this.slideID);
    this.slide.anchor.setTo(0,0.5);
    this.slide.scale.setTo(scaleX,scaleY);
    this.button = this.game.add.sprite(xCoord,yCoord,this.buttonID);
    this.button.anchor.setTo(0.5,0.5);
    this.button.scale.setTo(scaleX,scaleY);
  },
  
  update: function() {
    if(this.game.input.mousePointer.isDown){
      if(Phaser.Rectangle.contains(new Phaser.Rectangle(this.slide.x,this.button.y-this.button.height/2,this.slide.width,this.button.height),this.game.input.x,this.game.input.y)){
        this.changeValue(this.minValue + (this.maxValue - this.minValue) * ((this.game.input.x - this.slide.x)/this.slide.width));
      }
    }
    this.button.x = (this.value <= this.minValue) ? this.slide.x : 
                    (this.value >= this.maxValue) ? this.slide.x + this.slide.width : 
                    this.slide.x + this.slide.width * this.valueToPercent();
    console.log(this.value);
  },
  
  valueToPercent: function() {
    return (this.value - this.minValue) / (this.maxValue - this.minValue);
  },
  
  changeValue: function(val) {
    this.value = Math.ceil((val <= this.minValue) ? this.minValue : 
                 (val >= this.maxValue) ? this.maxValue : val);
  }
};