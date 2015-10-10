
	
function Tile(row,column,dimensions){
	this.width = dimensions.width;
	this.height = dimensions.height;
	this.spacing = dimensions.spacing;
	this.row = row || 0;
	this.column = column || 0;
	this.oddRow = (this.row%2) ? true : false;
	this.x = (this.oddRow) ? this.column*(this.width+this.spacing) : this.column*(this.width+this.spacing)+((this.width+this.spacing)/2);
	this.y = this.row*(this.height+this.spacing);
	this.adjacentTiles = [];
	this.virt = '';
	this.index = '';
	this.draw = function(index){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'black';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		if(index >= 0){
			VirtArenaControl.Graphics.ctx.fillStyle = 'white';
			VirtArenaControl.Graphics.ctx.fillText(index,this.x,this.y + this.height/3);
		}
	};
	this.drawPath = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '16px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'green';
		VirtArenaControl.Graphics.ctx.fillText('P',this.x,this.y + this.height/3);
	};
	this.drawHover = function(index){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'white';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		if(index >= 0){
			VirtArenaControl.Graphics.ctx.fillStyle = 'black';
			VirtArenaControl.Graphics.ctx.fillText(index,this.x,this.y + this.height/3);
		}
	};
	this.isOpen = function(){
		var tileIsOpen = true;
		if(this.virt) tileIsOpen = false;

		return tileIsOpen;
	};
	this.setPositionOnBoardChange = function(){
		this.x = (this.oddRow) ? this.column*(this.width+this.spacing) : this.column*(this.width+this.spacing)+((this.width+this.spacing)/2);
		this.y = this.row*(this.height+this.spacing);

		this.x += VirtArenaControl.Board.x + VirtArenaControl.Board.padding;
		this.y += VirtArenaControl.Board.y + VirtArenaControl.Board.padding;
	};
}

