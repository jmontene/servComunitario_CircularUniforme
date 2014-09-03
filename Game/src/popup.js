Item = function(type,x,y,content,attributes){
	this.type = type;
	this.x = x;
	this.y = y;
	this.content = content;
	this.attr = attributes;
}

Popup = function(img,x,y,xScale,yScale,itemList,game){

	Phaser.Group.call(this,game);
	this.initY = y;

	this.container = this.create(0,0,img);
	this.container.scale.setTo(xScale,yScale);
	this.container.anchor.setTo(0.5,0.5);
	
	for(i=0;i<itemList.length;++i){
		var cur = itemList[i];
		if(cur.type == 'text'){
			var p = this.game.add.text(this.x+cur.x,this.y+cur.y,cur.content,{
				font: cur.attr[0],
				fill: cur.attr[1],
				align: cur.attr[2]
			});
			p.anchor.setTo(0.5,0.5);
			this.add(p);
		}else if(cur.type == 'button'){
			var b = this.game.add.button(this.x+cur.x,this.y+cur.y,cur.content,
			cur.attr[0],cur.attr[1],cur.attr[2],cur.attr[3],cur.attr[4]);
			b.anchor.setTo(0.5,0.5);
			this.add(b);
		}
	}
	
	this.x = x;
	this.y = y;	
}

Popup.prototype = Object.create(Phaser.Group.prototype);
Popup.constructor = Popup;

Popup.prototype.show = function(){
	this.game.add.tween(this).to({y:this.game.height/2},1000,Phaser.Easing.Bounce.Out,true);
	console.log("show was called");
};
	
Popup.prototype.hide = function(){
	this.game.add.tween(this).to({y:this.initY},200,Phaser.Easing.Linear.NONE,true);
};