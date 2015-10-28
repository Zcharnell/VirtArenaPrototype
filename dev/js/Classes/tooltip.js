
	
function Tooltip(obj,hoverObject){
	this.x = 0;
	this.y = 0;
	this.xLeft = 0;
	this.yTop = 0;
	this.width = 200;
	this.height = 80;
	this.text = '';
	this.type = '';
	this.id = '';
	this.title = '';
	this.description = '';
	this.obj = '';
	this.hover = false;
	this.hoverObject = hoverObject;
	this.columns = [];
	this.paddingLeft = 5;
	this.paddingTop = 10;

	var keys = Object.keys(obj);
	for(var i=0; i<keys.length; i++){
		this[keys[i]] = obj[keys[i]];
	}

	this.draw = function(){
		VirtArenaControl.Graphics.ctx.textAlign = "center";
		//background
		VirtArenaControl.Graphics.ctx.fillStyle = '#222222';
		VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
		VirtArenaControl.Graphics.ctx.fillRect(this.xLeft,this.yTop,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);

		//title
		VirtArenaControl.Graphics.ctx.font = "12px Arial";
		// VirtArenaControl.Graphics.ctx.fillStyle = '#333333';
		VirtArenaControl.Graphics.ctx.strokeStyle = '#555555';
		// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.yTop+5,this.width,this.height);
		VirtArenaControl.Graphics.ctx.strokeRect(this.xLeft,this.yTop,this.width,20);
		VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
		VirtArenaControl.Graphics.ctx.fillText(this.text,this.x,this.yTop+10);

		//description
		VirtArenaControl.Graphics.ctx.font = "10px Arial";
		VirtArenaControl.Graphics.ctx.fillStyle = '#EEEEEE';
		this.drawDescription();

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

	this.update = function(){
		this.checkIfShouldHide();
		this.description = this.unitDescription();

		this.columns = [
			{
				width:0
			},
			{
				width:0
			}
		];

		VirtArenaControl.Graphics.ctx.font = "10px Arial";
		for(var i in this.description){
			var column = i%2;
			this.description[i].column = column;
			var string = this.description[i].key + ': ' + this.description[i].value;
			var width = VirtArenaControl.Graphics.ctx.measureText(string).width;
			this.description[i].length = width

			if(this.columns[column].width < width){
				this.columns[column].width = width;
			}
		}

		this.width = this.paddingLeft*(this.columns.length+1);

		for(var i in this.columns){
			this.width += this.columns[i].width;
		}

		this.height = Math.ceil(this.description.length/2) * 15;
		this.xLeft = this.x-this.width/2;
		this.yTop = this.y-this.height-10;
	};

	this.unitDescription = function(){
		var stats = [
			{
				key:'HP',
				value:this.obj.HP
			},
			{
				key:'Max HP',
				value:this.obj.totalHP
			},
			{
				key:'Speed',
				value:this.obj.turnStats.speed
			},
			{
				key:'Move',
				value:this.obj.turnStats.move
			},
			{
				key:'Def',
				value:this.obj.turnStats.defense
			},
			{
				key:'Weapons',
				value:this.obj.weapons
			},
			{
				key:'Stances',
				value:this.obj.stances
			}
		];

		return stats;
	};

	this.checkIfShouldHide = function(){
		var shouldHide = true;
		// switch(this.type){
		// 	case 'unit':
		// 		if(this.obj.tile.hover){
		// 			shouldHide = false;
		// 		}
		// 		break;
		// }
		if(this.hoverObject.hover){
			shouldHide = false;
		}

		if(shouldHide){
			VirtArenaControl.Tooltips.removeTooltip(this);
		}
	};

	this.drawDescription = function(){
		var numColumns = this.columns.length;
		for(var i in this.description){
			var column = this.description[i].column;
			var string = this.description[i].key + ': ' + this.description[i].value;
			var x = (column != 0) ? this.x + this.columns[column-1].width + this.paddingLeft : this.x + this.paddingLeft;
			var y = this.yTop + 30 + this.paddingTop + Math.floor(i/numColumns)*15;
			VirtArenaControl.Graphics.ctx.fillText(string,x,y);
		}
	};
}
