
	
function Button(){
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 40;
	this.text = '';
	this.hover = false;
	this.init = function(obj){
		var keys = Object.keys(obj);
		for(var i=0; i<keys.length; i++){
			this[keys[i]] = obj[keys[i]];
		}
	};
	this.draw = function(){
		if(this.disabled){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "12px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = '#444444';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#CCCCCC';
			VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
		} else if(this.hover){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "12px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
		} else {
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "12px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = '#666666';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
		}
	};
	this.onClick = {};
}

