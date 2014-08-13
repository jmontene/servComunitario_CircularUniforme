Slider = function(game,min,max,jump,initValue) {
  this.game = game;
  
  this.sprites =
		{button:null,
		slide:null,
		monitor:null
		};
		
  this.value = initValue;
  this.maxValue = max;
  this.minValue = min;
  this.text = null;
  this.jump = (min + jump - min) / (max - min);
}

Slider.prototype = {
  
	create: function(xCoord, yCoord, scaleB, scaleS, scaleM, fontSize) {
  
		this.sprites.slide = this.game.add.sprite(xCoord,yCoord,Slider.IDs.slide);
		this.sprites.slide.anchor.setTo(0,0.5);
		this.sprites.slide.scale.setTo(scaleS[0],scaleS[1]);
		
		this.sprites.monitor = this.game.add.sprite(xCoord+this.sprites.slide.width,yCoord,Slider.IDs.monitor);
		this.sprites.monitor.anchor.setTo(0,0.5);
		this.sprites.monitor.scale.setTo(scaleM[0],scaleM[1]); 
		
		this.sprites.button = this.game.add.sprite(xCoord,yCoord,Slider.IDs.button);
		this.sprites.button.anchor.setTo(0.5,0.5);
		this.sprites.button.scale.setTo(scaleB[0],scaleB[1]);
		
		this.text = this.game.add.text(xCoord+this.sprites.slide.width+this.sprites.monitor.width/2.2,yCoord - this.sprites.monitor.height/5,this.initValue,{
			font: fontSize + 'px Arial',
			fill: '#ffffff',
			align: 'center'
		});
		
		this.text.anchor.setTo(0.6,0.5);
		
	},
  
	update: function() {
	
		this.text.setText(this.value);
	
		if(this.game.input.mousePointer.isDown){
			if(Phaser.Rectangle.contains(new Phaser.Rectangle
				(this.sprites.slide.x,this.sprites.button.y-
				this.sprites.button.height/2,this.sprites.slide.width,this.sprites.button.height)
				,this.game.input.x,this.game.input.y))
			{
				this.changeValue(this.minValue + (this.maxValue - this.minValue) * 
					((this.game.input.x - this.sprites.slide.x)/this.sprites.slide.width));
			}
		}
	 
		this.sprites.button.x = (this.value <= this.minValue) ? this.sprites.slide.x : 
			(this.value >= this.maxValue) ? this.sprites.slide.x + this.sprites.slide.width : 
			this.sprites.slide.x + this.sprites.slide.width * this.valueToPercent();
			
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
	slide:'slider_slide',
	monitor:'slider_monitor'
	}

Slider.preload = function(game,folder){

	var path = 'assets/sprites/slider/' + folder;
	game.load.image(Slider.IDs.button,path + '/button.png');
	game.load.image(Slider.IDs.slide, path + '/slide.png');
	game.load.image(Slider.IDs.monitor,path + '/monitor.png');
	
}
	