
	
function Button(){
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 40;
	this.text = '';
	this.circle = false;
	this.hover = false;
	this.hoverVars = {
		x:0,
		y:0,
		radius:0,
		maxRadius:0
	};
	this.selectedVars = {
		x:0,
		y:0,
		radius:0,
		maxRadius:0
	}
	this.selected = false;
	this.hasTooltip = false;
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
			this.drawShape("#FFFFFF","#000000","#000000","12px Arial",this.selectedVars);
		} else if(this.hover){
			this.drawShape("#CCCCCC","#000000","#000000","12px Arial",this.hoverVars);
		} else {
			this.drawShape("#666666","#000000","#FFFFFF","12px Arial");
		}
	};
	this.drawShape = function(fillColor,strokeColor,textColor,font,misc){
		if(this.circle) this.drawCircle(fillColor,strokeColor,textColor,font,misc);
		else this.drawRect(fillColor,strokeColor,textColor,font,misc);
	};

	this.drawRect = function(fillColor,strokeColor,textColor,font,misc){
		VirtArenaControl.Graphics.ctx.textAlign = "center";
		VirtArenaControl.Graphics.ctx.font = font;
		VirtArenaControl.Graphics.ctx.fillStyle = fillColor;
		VirtArenaControl.Graphics.ctx.strokeStyle = strokeColor;
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.fillStyle = textColor;
		VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
	};
	this.drawCircle = function(fillColor,strokeColor,textColor,font,misc){
		// VirtArenaControl.Graphics.ctx.textAlign = "center";
		// VirtArenaControl.Graphics.ctx.font = font;
		var misc = misc || {};
		VirtArenaControl.Graphics.ctx.fillStyle = fillColor;
		VirtArenaControl.Graphics.ctx.strokeStyle = strokeColor;
		// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		// VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		// VirtArenaControl.Graphics.ctx.fillStyle = textColor;
		// VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
		var radius = misc.radius || this.radius;
		VirtArenaControl.Graphics.ctx.beginPath();
		VirtArenaControl.Graphics.ctx.arc(this.x+this.radius, this.y+this.radius, radius, 0, 2 * Math.PI, false);
		if(this.image){
			var image = (this.hover || this.selected) ? this.imageHover : this.image;
			VirtArenaControl.Graphics.ctx.drawImage(image,this.x+this.radius-radius,this.y+this.radius-radius,radius*2,radius*2);
			if(!this.hover && !this.selected) VirtArenaControl.Graphics.ctx.stroke();
			if(this.disabled){
				VirtArenaControl.Graphics.ctx.globalAlpha = 0.5;
				VirtArenaControl.Graphics.ctx.fillColor = "rgba(0,0,0,0.4)";
				VirtArenaControl.Graphics.ctx.fill();
				VirtArenaControl.Graphics.ctx.globalAlpha = 1;
			}
		} else {
			VirtArenaControl.Graphics.ctx.fill();
			VirtArenaControl.Graphics.ctx.stroke();
		}
	};
	this.onClick = {};

	this.getTooltip = function(){
		return false;
	};
}

/*

context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();

*/
