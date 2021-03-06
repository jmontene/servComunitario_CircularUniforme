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
  
    create: function(xCoord, yCoord, scaleB, scaleS, scaleM, fontSize,type,typeSize,offset) {
      xCoord = xCoord-50;
  		this.sprites.monitor = this.game.add.sprite(xCoord,yCoord,Slider.IDs.monitor);
		this.sprites.monitor.anchor.setTo(0,0.5);
		this.sprites.monitor.scale.setTo(0.27,0.27); 
         
		this.sprites.slide = this.game.add.sprite(xCoord+this.sprites.monitor.width-3,yCoord,Slider.IDs.slide);
		this.sprites.slide.anchor.setTo(0,0.5);
		this.sprites.slide.scale.setTo(0.4,0.27);
        
      this.sprites.info = this.game.add.sprite(xCoord+this.sprites.monitor.width+this.sprites.slide.width-10,yCoord,Slider.IDs.info);
		this.sprites.info.anchor.setTo(0,0.5);
		this.sprites.info.scale.setTo(0.29,0.29);
		
		
		this.sprites.button = this.game.add.sprite(xCoord,yCoord,Slider.IDs.button);
		this.sprites.button.anchor.setTo(0.5,0.5);
		this.sprites.button.scale.setTo(scaleB[0],scaleB[1]);
		
		this.text = this.game.add.text(xCoord+this.sprites.monitor.width/2+1,yCoord+3,this.initValue,{
			font: fontSize + 'px Arial',
			fill: '#ffffff',
			align: 'center'
		});
		
		this.text.anchor.setTo(0.6,0.5);
		this.text.anchor.setTo(0.6,0.5);
      
      var heightOffset = (typeof offset !== 'undefined' ? offset : 0);
        
	   this.type = this.game.add.text(
			xCoord+this.sprites.slide.width+this.sprites.monitor.width+this.sprites.info.width/2-8,
			yCoord - this.sprites.info.height/4.2 + heightOffset,this.initValue,{
				font: (typeof typeSize !== 'undefined' ? typeSize : 20) + 'px Arial',
				fill: '#ffffff',
				align: 'center'
			});
	    
		this.type.anchor.setTo(0.6,0.5);
	   this.type.setText(type);
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

Slider.IDs = {
   button:'slider_button',
	slide:'slider_slide',
	monitor:'slider_monitor',
   info:'slider_info'
}

Slider.preload = function(game,folder){

	var path = 'assets/sprites/slider/' + folder;
	game.load.image(Slider.IDs.button,path + '/button.png');
	game.load.image(Slider.IDs.monitor,path + '/newMonitor.png');
   game.load.image(Slider.IDs.info, path + '/newInfo.png');
   game.load.image(Slider.IDs.slide, path + '/newSlide.png');
	
}
	
