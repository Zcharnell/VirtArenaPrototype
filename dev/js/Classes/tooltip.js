
	
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
	this.subtitle = '';
	this.description = '';
	this.obj = '';
	this.hover = false;
	this.hoverObject = hoverObject;
	this.columns = [];
	this.paddingLeft = 10;
	this.paddingTop = 15;
	this.titleHeight = 38;

	var keys = Object.keys(obj);
	for(var i=0; i<keys.length; i++){
		this[keys[i]] = obj[keys[i]];
	}

	this.draw = function(){
		if(this.xLeft != 0 && this.yTop != 0){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			//background
			VirtArenaControl.Graphics.ctx.fillStyle = '#222222';
			VirtArenaControl.Graphics.ctx.fillRect(this.xLeft,this.yTop,this.width,this.height);

			//title
			VirtArenaControl.Graphics.ctx.font = "15px Arial";
			// VirtArenaControl.Graphics.ctx.fillStyle = '#333333';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#555555';
			// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.yTop+5,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.xLeft,this.yTop,this.width,this.titleHeight);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.fillText(this.title,this.x,this.yTop+this.titleHeight*0.4);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.font = "10px Arial";
			VirtArenaControl.Graphics.ctx.fillText(this.subtitle.toUpperCase(),this.x,this.yTop+this.titleHeight*0.8);

			//description
			VirtArenaControl.Graphics.ctx.font = "10px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = '#EEEEEE';
			this.drawDescription();

			//border
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.strokeRect(this.xLeft,this.yTop,this.width,this.height);

			// if(this.activating) {
			// 	VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(50,255,50)';
			// 	VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(50,255,50,0.7)',20,0,1);
			// }
			// if(this.selected) {
			// 	VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(200,220,255)';
			// 	VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(200,220,255,0.7)',20,0,1);
			// }  
			// if(this.hover) {
			// 	VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(150,170,200)';
			// 	VirtArenaControl.Graphics.strokeRectWithShadow(this.x,this.y,this.width+2,this.height+2,2,'rgba(150,170,200,0.7)',20,0,1);
			// }
		}
	};

	this.update = function(){
		this.checkIfShouldHide();

		if(this.type == 'unit'){
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

			this.height = this.titleHeight + Math.ceil(this.description.length/2) * 15 + this.paddingTop*2;
			this.xLeft = this.x-this.width/2;
			this.yTop = this.y-this.height-10;
		} else if(this.type == 'button'){
			if(this.subtype == 'stance'){
				this.description = this.stanceDescription();

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

				this.height = this.titleHeight + Math.ceil(this.description.length/2) * 15 + this.paddingTop*2;
				this.xLeft = this.x-this.width/2;
				this.yTop = this.y-this.height-10;
			}
		}
		
	};

	this.unitDescription = function(){
		var stats = [
			{
				key:'HP',
				value:this.obj.HP + '/' + this.obj.totalHP
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
				key:'Stability',
				value:this.obj.turnStats.stability
			},
			{
				key:'Evasion',
				value:this.obj.turnStats.evasion
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

	this.stanceDescription = function(){
		// console.log(this,this.obj);
		var stats = [
			{
				key:'Speed',
				value:this.obj.speed
			},
			{
				key:'Move',
				value:this.obj.move
			},
			{
				key:'Def',
				value:this.obj.defense
			},
			{
				key:'Stability',
				value:this.obj.stability
			},
			{
				key:'Evasion',
				value:this.obj.evasion
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
		VirtArenaControl.Graphics.ctx.textAlign = "left";
		for(var i in this.description){
			var column = this.description[i].column;
			var string = this.description[i].key + ': ' + this.description[i].value;
			var x = (column != 0) ? this.xLeft + this.columns[column-1].width + this.paddingLeft*(column+1) : this.xLeft + this.paddingLeft;
			var y = this.yTop + this.titleHeight + this.paddingTop + Math.floor(i/numColumns)*15;
			VirtArenaControl.Graphics.ctx.fillText(string,x,y);
		}
		// VirtArenaControl.Graphics.ctx.textAlign = "center";
	};
}
