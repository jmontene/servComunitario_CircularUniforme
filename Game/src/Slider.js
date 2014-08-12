Slider = function(game,min,max,jump,initValue) {
  this.game = game;
  
  this.sprites =
		{button:null,
		slide:null,
		};
		
  this.value = initValue;
  this.maxValue = max;
  this.minValue = min;
  this.jump = (min + jump - min) / (max - min);
}

Slider.prototype = {
  
  create: function(xCoord, yCoord, scaleX, scaleY) {
  
    this.sprites.slide = this.game.add.sprite(xCoord,yCoord,Slider.IDs.slide);
    this.sprites.slide.anchor.setTo(0,0.5);
    this.sprites.slide.scale.setTo(scaleX,scaleY);
	 
    this.sprites.button = this.game.add.sprite(xCoord,yCoord,Slider.IDs.button);
    this.sprites.button.anchor.setTo(0.5,0.5);
    this.sprites.button.scale.setTo(scaleX,scaleY);
	 
  },
  
  update: function() {
  
    if(this.game.input.mousePointer.isDown){
      if(Phaser.Rectangle.contains(new Phaser.Rectangle
				(this.sprites.slide.x,this.sprites.button.y-
				this.sprites.button.height/2,this.slide.width,this.button.height)
			,this.game.input.x,this.game.input.y))
		{
			this.changeValue(this.minValue + (this.maxValue - this.minValue) * 
				((this.game.input.x - this.sprites.slide.x)/this.slide.width));
      }
    }
	 
    this.sprites.button.x = (this.value <= this.minValue) ? this.sprites.slide.x : 
                    (this.value >= this.maxValue) ? 
						  this.sprites.slide.x + this.sprites.slide.width : 
                    this.sprites.slide.x + this.sprites.slide.width 
						  * this.valueToPercent();
  },
  
  valueToPercent: function() {
    return (this.value - this.minValue) / (this.maxValue - this.minValue);
  },
  
  changeValue: function(val) {
    this.value = Math.ceil((val <= this.minValue) ? this.minValue : 
                 (val >= this.maxValue) ? this.maxValue : val);
  }
  
};

Slider.IDs =
	{button:'slider_button',
	slide:'slider_slide'
	}

Slider.preload = function(game,folder){
	var path = 'assets/sprites/slider/' + folder;
	game.load.image(path + '/button.png', Slider.IDs.button);
	game.load.image(path + '/slide.png', Slider.IDs.slide);
}
	