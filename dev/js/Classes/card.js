
function Card(initVars){
	this.name = '';
	this.desc = '';
	this.type = '';
	this.cost = 0;
	this.playable = [];
	this.effect = '';
	this.companion = '';
	this.ability = '';
	this.reveal = "none";
	this.misc = "none";
	this.team = '';

	//for graphics
	this.positionInHand = 0;
	this.cardsInHand = 0;
	this.x = 0;
	this.y = 0;
	this.width = 120;
	this.height = 30;
	this.spacing = -20;
	this.drawText = '';
	this.font = "12px Arial";
	this.hover = false;
	this.rotation = 0;

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}

	this.draw = function(){
		this.update();

		if(this.disabled){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = this.font;
			VirtArenaControl.Graphics.ctx.fillStyle = '#444444';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#CCCCCC';
			VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
		} else if(this.hover){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = this.font;
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
		} else {
			//translate and rotate
			VirtArenaControl.Graphics.ctx.save();
			var yTranslate = Math.abs(this.height*this.rotationPercent);
			if(this.rotationPercent < 0) yTranslate += this.height/2;
			console.log(yTranslate);
			VirtArenaControl.Graphics.ctx.translate(this.x,this.y+yTranslate);
			VirtArenaControl.Graphics.ctx.rotate(this.rotation);
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = this.font;
			VirtArenaControl.Graphics.ctx.fillStyle = '#666666';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(0,0,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(0,0,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			// VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
			// for(var i=0; i<this.drawText.length; i++){
				// var y = this.y+this.height*0.6;
				// if(this.drawText.length > 1) y += (-this.height*0.1 + 
				VirtArenaControl.Graphics.ctx.fillText(this.name,this.width/2,this.height/2);
			// }
			VirtArenaControl.Graphics.ctx.restore();
		}
	}

	this.update = function(updateObj){
		if(updateObj){
			this.positionInHand = updateObj.index;
			this.cardsInHand = updateObj.cardsInHand;
			this.oddLength = updateObj.oddLength;
		}
		var startX;
		var dynamicX;

		if(this.oddLength){
			startX = -((this.cardsInHand/2)*this.width + this.spacing);
		} else {
			startX = -((this.cardsInHand/2)*this.width + (this.spacing*1.5));
		}
		dynamicX = startX + (this.positionInHand*(this.width+this.spacing));
		this.x = Math.round(VirtArenaControl.Camera.width/2 + dynamicX);
		this.y = Math.round(VirtArenaControl.Camera.height - this.height - 5);
		var rotationDegrees = 8 * (this.positionInHand - (this.cardsInHand-1)/2);
		var rotationSign = (rotationDegrees < 0) ? -1 : 1;
		this.rotationPercent = (rotationDegrees != 0) ? rotationSign * (Math.abs(rotationDegrees)/180) : 0; //percent of 180
		this.rotation = Math.PI * this.rotationPercent;

		VirtArenaControl.Graphics.ctx.font = this.font;
		if(VirtArenaControl.Graphics.ctx.measureText(this.name).width > this.width*0.9){
			this.font = "11px Arial";
		}
		// this.font = Scripts.setFontSizeToFit(this.name,this.font,this.width);
		// this.drawText = Scripts.multilineStringReturn(this.name,this.width*0.9,"12px Arial");
		// console.log(this.drawText);
	}

	this.onClick = function(){
		if(this.companion) {
			if(this.team.commander.id === VirtArenaControl.Units.currentUnitActivating.id){
				this.team.spawnUnitNearCommander(this,this.companion);
			}
		} else if(this.ability) {

		}
	}

}

