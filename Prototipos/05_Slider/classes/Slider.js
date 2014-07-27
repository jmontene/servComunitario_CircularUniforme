Slider = function(game,min,max,jump,initValue) {
  this.game = game;
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
    this.game.load.image(bID, bPath);
    this.game.load.image(sID, sPath);
    this.buttonID = bID;
    this.slideID = sID;
  },
  
  create: function(xCoord, yCoord) {
    this.slide = game.add.sprite(xCoord,yCoord,this.slideID);
    this.slide.anchor.setTo(0,0.5);
    this.button = game.add.sprite(xCoord,yCoord,this.buttonID);
    this.button.anchor.setTo(0.5,0.5);
  },
  
  update: function() {
    if(this.game.input.mousePointer.isDown){
      if(Phaser.Rectangle.contains(new Phaser.Rectangle(this.slide.x,this.slide.y-90,this.slide.width,this.button.height*200),this.game.input.x,this.game.input.y)){
        this.changeValue(this.minValue + this.maxValue * ((this.game.input.x - this.slide.x)/this.slide.width));
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
    this.value = (val <= this.minValue) ? this.minValue : 
                 (val >= this.maxValue) ? this.maxValue : val;
  }
};