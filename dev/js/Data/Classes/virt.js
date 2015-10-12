
function Virt(){
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 0;
	this.capacity = 0;
	this.supply = 0;
	
	// this.draw = function(){
	// 	if(this.name === VirtArenaControl.ObjectController.selectedUnit.name) {
	// 		VirtArenaControl.Graphics.ctx.textAlign = "center";
	// 		VirtArenaControl.Graphics.ctx.font = "30px Arial";
	// 		VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
	// 		VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Virts.teams[this.team].color;
	// 		VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
	// 		VirtArenaControl.Graphics.ctx.fillRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
	// 		VirtArenaControl.Graphics.ctx.fillStyle = 'white';
	// 		VirtArenaControl.Graphics.ctx.fillText(this.name[0],this.tile.x+this.tile.width/2,this.tile.y+this.tile.height*0.75);
	// 	} else {
	// 		VirtArenaControl.Graphics.ctx.textAlign = "center";
	// 		VirtArenaControl.Graphics.ctx.font = "30px Arial";
	// 		VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Virts.teams[this.team].color;
	// 		VirtArenaControl.Graphics.ctx.strokeStyle = VirtArenaControl.Virts.teams[this.team].color;
	// 		VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
	// 		var fillText = {
	// 			text:this.name[0],
	// 			x:this.tile.x+this.tile.width/2,
	// 			y:this.tile.y+this.tile.height*0.75,
	// 			color:'#9F9F9F',
	// 			blur:5,
	// 			offsetX:0,
	// 			offsetY:1
	// 		}
	// 		VirtArenaControl.Graphics.fillTextWithShadow(fillText.text,fillText.x,fillText.y,fillText.color,fillText.blur,fillText.offsetX,fillText.offsetY);
	// 		VirtArenaControl.Graphics.ctx.strokeStyle = "#999";
	// 		VirtArenaControl.Graphics.ctx.lineWidth = 1;
	// 		VirtArenaControl.Graphics.ctx.strokeText(fillText.text,fillText.x,fillText.y);
	// 	}
	// };
}

Virt.prototype = new Unit();





