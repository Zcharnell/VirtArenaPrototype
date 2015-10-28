
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
	this.height = 40;
	this.spacing = -20;
	this.drawText = '';
	this.font = "12px Arial";
	this.hover = false;
	this.rotation = 0;
	this.rotationPercent = 0;
	this.baseRotationDifference = 4;
	this.bottomSpacing = 50;

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	};

	this.draw = function(){
		this.update();

		if(this.hover){
			// VirtArenaControl.Graphics.ctx.textAlign = "center";
			// VirtArenaControl.Graphics.ctx.font = this.font;
			// VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			// VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.fillStyle = '#000000';
			// VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
			var colors = {
				fill:"#FFFFFF",
				stroke:"#000000",
				text:"#000000"
			}
			this.drawCard(colors,false);
		} else if(this.disabled){
			// VirtArenaControl.Graphics.ctx.textAlign = "center";
			// VirtArenaControl.Graphics.ctx.font = this.font;
			// VirtArenaControl.Graphics.ctx.fillStyle = '#444444';
			// VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			// VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.fillStyle = '#CCCCCC';
			// VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
			var colors = {
				fill:"#444444",
				stroke:"#000000",
				text:"#CCCCCC"
			}
			this.drawCard(colors,true);
		} else {
			// //translate and rotate
			// VirtArenaControl.Graphics.ctx.save();
			// var xTranslate = this.x;
			// var yTranslate = this.y + Math.abs(this.height*this.rotationPercent);
			// var xDraw = 0;
			// var yDraw = 0;
			// if(this.rotationPercent < 0){
			// 	xTranslate += this.width;
			// 	xDraw -= this.width; 
			// }
			// VirtArenaControl.Graphics.ctx.translate(xTranslate,yTranslate);
			// VirtArenaControl.Graphics.ctx.rotate(this.rotation);
			// VirtArenaControl.Graphics.ctx.textAlign = "center";
			// VirtArenaControl.Graphics.ctx.font = this.font;
			// VirtArenaControl.Graphics.ctx.fillStyle = '#666666';
			// VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			// VirtArenaControl.Graphics.ctx.fillRect(xDraw,yDraw,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.strokeRect(xDraw,yDraw,this.width,this.height);
			// VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			// // VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
			// // for(var i=0; i<this.drawText.length; i++){
			// 	// var y = this.y+this.height*0.6;
			// 	// if(this.drawText.length > 1) y += (-this.height*0.1 + 
			// VirtArenaControl.Graphics.ctx.fillText(this.name,xDraw+this.width/2,yDraw+this.height/2);
			// // }
			// VirtArenaControl.Graphics.ctx.restore();
			var colors = {
				fill: "#666666",
				stroke: "#000000",
				text: "#FFFFFF"
			}
			this.drawCard(colors,true);
		}
	};

	this.drawCard = function(colors,rotate){
		//translate and rotate
		if(rotate){
			var xTranslate = this.x;
			var yTranslate = this.y + Math.abs(this.height*this.rotationPercent);
			var xDraw = 0;
			var yDraw = 0;
			if(this.rotationPercent < 0){
				xTranslate += this.width;
				xDraw -= this.width; 
			}

			VirtArenaControl.Graphics.ctx.save();
			VirtArenaControl.Graphics.ctx.translate(xTranslate,yTranslate);
			VirtArenaControl.Graphics.ctx.rotate(this.rotation);
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = this.font;
			VirtArenaControl.Graphics.ctx.fillStyle = colors.fill;
			VirtArenaControl.Graphics.ctx.strokeStyle = colors.stroke;
			VirtArenaControl.Graphics.ctx.fillRect(xDraw,yDraw,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(xDraw,yDraw,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = colors.text;
			// VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
			// for(var i=0; i<this.drawText.length; i++){
				// var y = this.y+this.height*0.6;
				// if(this.drawText.length > 1) y += (-this.height*0.1 + 
			VirtArenaControl.Graphics.ctx.fillText(this.name,xDraw+this.width/2,yDraw+this.height/2);
			// }
			VirtArenaControl.Graphics.ctx.restore();
		} else {
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = this.font;
			VirtArenaControl.Graphics.ctx.fillStyle = colors.fill;
			VirtArenaControl.Graphics.ctx.strokeStyle = colors.stroke;
			VirtArenaControl.Graphics.ctx.fillRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.strokeRect(this.x,this.y,this.width,this.height);
			VirtArenaControl.Graphics.ctx.fillStyle = colors.text;
			VirtArenaControl.Graphics.ctx.fillText(this.name,this.x+this.width/2,this.y+this.height/2);
		}
		
	};

	this.update = function(updateObj){
		if(updateObj){
			this.positionInHand = updateObj.index;
			this.cardsInHand = updateObj.cardsInHand;
			this.oddLength = updateObj.oddLength;
		}
		var startX;
		var dynamicX;
		this.spacing = 40 - (this.cardsInHand * 10);

		if(this.oddLength){
			startX = -((this.cardsInHand/2)*this.width + this.spacing);
		} else {
			startX = -((this.cardsInHand/2)*this.width + (this.spacing*1.5));
		}
		dynamicX = startX + (this.positionInHand*(this.width+this.spacing));
		this.x = Math.round(VirtArenaControl.Camera.width/2 + dynamicX);
		this.y = Math.round(VirtArenaControl.Camera.height - this.bottomSpacing);
		var rotationDegrees = this.baseRotationDifference * (this.positionInHand - (this.cardsInHand-1)/2);
		var rotationSign = (rotationDegrees < 0) ? -1 : 1;
		this.rotationPercent = (rotationDegrees != 0) ? rotationSign * (Math.abs(rotationDegrees)/180) : 0; //percent of 180
		this.rotation = Math.PI * this.rotationPercent;

		VirtArenaControl.Graphics.ctx.font = this.font;
		if(VirtArenaControl.Graphics.ctx.measureText(this.name).width > this.width*0.9){
			this.font = "11px Arial";
		}

		this.disabled = this.checkDisabled();
		// this.font = Scripts.setFontSizeToFit(this.name,this.font,this.width);
		// this.drawText = Scripts.multilineStringReturn(this.name,this.width*0.9,"12px Arial");
		// console.log(this.drawText);
	};

	this.checkDisabled = function(){
		var disabled = true;
		if(this.companion){
			if(VirtArenaControl.Units.currentUnitActivating.team === this.team 
				&& VirtArenaControl.Units.currentUnitActivating.commander === true
				&& VirtArenaControl.TurnController.currentSubphase == "startOfActivationBoosts"){
				disabled = false;
			}
		}

		return disabled;
	};

	this.onClick = function(){
		if(this.companion) {
			if(this.team.commander.id === VirtArenaControl.Units.currentUnitActivating.id){
				this.team.spawnUnitNearCommander(this,this.companion);
			}
		} else if(this.ability) {

		}
	};

}

