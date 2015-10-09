
	
function Tile(row,column){
	this.row = row || 0;
	this.column = column || 0;
	this.oddRow = (this.row%2) ? true : false;
	this.x = (this.oddRow) ? this.column*34 : this.column*34+17;
	this.y = this.row*34;
	this.width = 30;
	this.height = 30;
	this.adjacentTiles = [];
	this.virt = '';
	this.index = '';
	this.draw = function(index){
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'black';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		if(index >= 0){
			VirtArenaControl.Graphics.ctx.fillStyle = 'white';
			VirtArenaControl.Graphics.ctx.fillText(index,this.x,this.y+this.height/3);
		}
	};
	this.drawPath = function(){
		VirtArenaControl.Graphics.ctx.font = '16px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'green';
		VirtArenaControl.Graphics.ctx.fillText('P',this.x,this.y+this.height/3);
	};
	this.drawHover = function(index){
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'white';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		if(index >= 0){
			VirtArenaControl.Graphics.ctx.fillStyle = 'black';
			VirtArenaControl.Graphics.ctx.fillText(index,this.x,this.y+this.height/3);
		}
	};
	this.isOpen = function(){
		var tileIsOpen = true;
		if(this.virt) tileIsOpen = false;

		return tileIsOpen;
	};
}

