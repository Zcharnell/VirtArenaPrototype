
	
function Button(){
	this.x = 600;
	this.y = 200;
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
		if(this.hover){
			VirtArenaControl.Graphics.ctx.font = "12px Arial";
			var offset = VirtArenaControl.Graphics.ctx.measureText(this.text).width/2;
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2-offset,this.y+this.height/2);
		} else {
			VirtArenaControl.Graphics.ctx.font = "12px Arial";
			var offset = VirtArenaControl.Graphics.ctx.measureText(this.text).width/2;
			VirtArenaControl.Graphics.ctx.fillStyle = '#666666';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2-offset,this.y+this.height/2);
		}
	};
	this.onClick = {};
}

