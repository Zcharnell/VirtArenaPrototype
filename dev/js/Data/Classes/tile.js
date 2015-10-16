
	
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
	this.unit = '';
	this.index = '';
	this.moveCost = 0;
	this.rangeForWeapon = 0;
	this.range = 0;
	this.targetFor = '';
	this.draw = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'black';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
	};
	this.drawIndex = function(index){
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		if(this.hover) VirtArenaControl.Graphics.ctx.fillStyle = 'black';
		else VirtArenaControl.Graphics.ctx.fillStyle = 'white';

		if(index >= 0){
			VirtArenaControl.Graphics.ctx.fillText(index,this.x,this.y + this.height/3);
		}
	};
	this.drawPath = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '16px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'green';
		VirtArenaControl.Graphics.ctx.fillText('P',this.x,this.y + this.height/3);
	};
	this.drawHover = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		VirtArenaControl.Graphics.ctx.font = '10px Arial';
		VirtArenaControl.Graphics.ctx.fillStyle = 'white';
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
	};
	this.drawHighlight = function(color){
		VirtArenaControl.Graphics.ctx.fillStyle = color;
		VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.drawHighlightForMovement = function(){
		this.drawHighlight("rgba(50,255,50,0.5)");
	};
	this.drawHighlightForAttack = function(){
		this.drawHighlight("rgba(255,50,50,0.5)");
	};
	this.drawHighlightForAction = function(){
		this.drawHighlight("rgba(50,50,255,0.5)");
	};
	this.drawBorderForActivatingUnit = function(){
		this.drawBorder("#FFFFFF");
	};
	this.drawBorder = function(color){
		VirtArenaControl.Graphics.ctx.lineWidth = 5;
		VirtArenaControl.Graphics.ctx.strokeStyle = color;
		// VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width,this.height,1,'#CCCCCC',20,0,1);
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
		VirtArenaControl.Graphics.ctx.lineWidth = 1;
	};
	this.isOpen = function(){
		var tileIsOpen = true;
		if(this.unit) tileIsOpen = false;

		return tileIsOpen;
	};
	this.setPositionOnBoardChange = function(){
		this.x = (this.oddRow) ? this.column*(this.width+this.spacing) : this.column*(this.width+this.spacing)+((this.width+this.spacing)/2);
		this.y = this.row*(this.height+this.spacing);

		this.x += VirtArenaControl.Board.x + VirtArenaControl.Board.horizontalPadding;
		this.y += VirtArenaControl.Board.y + VirtArenaControl.Board.topPadding;
	};
	this.resetUnit = function(){
		this.unit = '';
	};
}

