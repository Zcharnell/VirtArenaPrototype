
	
function Button(){
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 40;
	this.text = '';
	this.circle = false;
	this.hover = false;
	this.selected = false;
	this.init = function(obj){
		var keys = Object.keys(obj);
		for(var i=0; i<keys.length; i++){
			this[keys[i]] = obj[keys[i]];
		}
	};
	this.draw = function(){
		if(this.disabled){
			this.drawShape("#444444","#000000","#CCCCCC","12px Arial");
		} else if(this.selected) {
			this.drawShape("#FFFFFF","#000000","#000000","12px Arial");
		} else if(this.hover){
			this.drawShape("#CCCCCC","#000000","#000000","12px Arial");
		} else {
			this.drawShape("#666666","#000000","#FFFFFF","12px Arial");
		}
	};
	this.drawShape = function(fillColor,strokeColor,textColor,font){
		if(this.circle) this.drawCircle(fillColor,strokeColor,textColor,font);
		else this.drawRect(fillColor,strokeColor,textColor,font);
	};

	this.drawRect = function(fillColor,strokeColor,textColor,font){
		VirtArenaControl.Graphics.ctx.textAlign = "center";
		VirtArenaControl.Graphics.ctx.font = font;
		VirtArenaControl.Graphics.ctx.fillStyle = fillColor;
		VirtArenaControl.Graphics.ctx.strokeStyle = strokeColor;
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.fillStyle = textColor;
		VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
	};
	this.drawCircle = function(fillColor,strokeColor,textColor,font){
		// VirtArenaControl.Graphics.ctx.textAlign = "center";
		// VirtArenaControl.Graphics.ctx.font = font;
		VirtArenaControl.Graphics.ctx.fillStyle = fillColor;
		VirtArenaControl.Graphics.ctx.strokeStyle = strokeColor;
		// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		// VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		// VirtArenaControl.Graphics.ctx.fillStyle = textColor;
		// VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
		VirtArenaControl.Graphics.ctx.beginPath();
		VirtArenaControl.Graphics.ctx.arc(this.x+this.width/2, this.y+this.height/2, this.radius, 0, 2 * Math.PI, false);
		VirtArenaControl.Graphics.ctx.fill();
		VirtArenaControl.Graphics.ctx.stroke();
	};
	this.onClick = {};
}

/*

context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();

*/
