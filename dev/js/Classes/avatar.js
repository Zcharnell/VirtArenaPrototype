
	
function Avatar(obj){
	this.x = 0;
	this.y = 0;
	this.width = 80;
	this.height = 80;
	this.text = '';
	this.unit = '';
	this.hover = false;
	this.selected = false;
	this.activating = false;
	// this.init = function(obj){
	var keys = Object.keys(obj);
	for(var i=0; i<keys.length; i++){
		this[keys[i]] = obj[keys[i]];
	}
	// };

	this.draw = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "center";
		VirtArenaControl.Graphics.ctx.font = "18px Arial";
		VirtArenaControl.Graphics.ctx.fillStyle = '#333333';
		VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
		VirtArenaControl.Graphics.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);

		if(this.activating) {
			VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(50,255,50)';
			VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(50,255,50,0.7)',20,0,1);
		}
		if(this.selected) {
			VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(200,220,255)';
			VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(200,220,255,0.7)',20,0,1);
		}  
		if(this.hover) {
			VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(150,170,200)';
			VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(150,170,200,0.7)',20,0,1);
		}
	};
	this.onClick = function(){
		VirtArenaControl.ObjectController.selectUnit(this.unit);
	};
}
