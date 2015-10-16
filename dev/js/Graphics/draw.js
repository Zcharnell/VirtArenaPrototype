(function(){
	VirtArenaControl.Graphics.draw = function(){
		for(var i=0; i<this.drawFunctions.length; i++){
			this[this.drawFunctions[i]]();
		}
	}

	VirtArenaControl.Graphics.redrawCanvas = function(){
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = '#666';
		VirtArenaControl.Graphics.ctx.lineWidth = 1;
		VirtArenaControl.Graphics.ctx.textBaseline = 'middle';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		// this.ctx.strokeStyle = 'gray';
		// this.ctx.strokeRect(0,0,VirtArenaControl.Camera.width,VirtArenaControl.Camera.height);
	}

	VirtArenaControl.Graphics.drawSquare = function(){
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(VirtArenaControl.Camera.x,VirtArenaControl.Camera.y,VirtArenaControl.Camera.width/2,VirtArenaControl.Camera.height/2);
	}

	VirtArenaControl.Graphics.drawBoardTiles = function(){
		var tiles = VirtArenaControl.Board.tiles;

		for(var i=0; i<tiles.length; i++){
			if(tiles[i].hover || tiles[i].adjacentToHover){
				tiles[i].drawHover();
			} else {
				tiles[i].draw();
			}
			if(tiles[i].unit && tiles[i].unit === VirtArenaControl.ObjectController.currentUnitActivating){
				tiles[i].drawBorderForActivatingUnit();
			}
			// console.log(tiles[i].targetFor);
			if(tiles[i].targetFor === "movement") {
				tiles[i].drawHighlightForMovement();
			}
			if(tiles[i].targetFor === "attack") {
				tiles[i].drawHighlightForAttack();
			}
			if(tiles[i].targetFor === "action") {
				tiles[i].drawHighlightForAction();
			}

			tiles[i].drawIndex(i);
		}
	}

	VirtArenaControl.Graphics.drawButtons = function(){
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;

		for(var i=0; i<buttons.length; i++){
			var button = VirtArenaControl.Buttons[buttons[i]];
			if(button){
				button.draw();
				// console.log(button);
			}
		}
	}

	VirtArenaControl.Graphics.drawUnits = function(){
		var units = VirtArenaControl.Units.getUnitsToDraw();

		for(var i in units){
			var unit = units[i];
			if(unit){
				unit.draw();
			}
		}
	}

	VirtArenaControl.Graphics.drawPath = function(){
		var path = VirtArenaControl.ObjectController.path;
		for(var i in path){
			path[i].drawPath();
		}
	};

	VirtArenaControl.Graphics.drawBoardBackground = function(){
		VirtArenaControl.Board.drawBackground();
	};

	VirtArenaControl.Graphics.drawPlayerCards = function(){
		var deck;
		if(VirtArenaControl.Units.teams.blueTeam) deck = VirtArenaControl.Units.teams.blueTeam.deck;
		if(deck) deck.graphicsDrawCards();
	};

	VirtArenaControl.Graphics.drawActivationOrder = function(){
		for(var i in VirtArenaControl.ObjectController.activationOrder){
			var activationAvatar = {
				name:VirtArenaControl.ObjectController.activationOrder[i].name,
				x: VirtArenaControl.Board.x + 5,
				y: VirtArenaControl.Board.y + VirtArenaControl.Board.topPadding/2 + i*85,
				width:80,
				height:80,
				activating:(VirtArenaControl.ObjectController.activationOrder[i].id === VirtArenaControl.ObjectController.currentUnitActivating.id) ? true : false,
				selected:(VirtArenaControl.ObjectController.activationOrder[i].id === VirtArenaControl.ObjectController.selectedUnit.id) ? true : false
			}

			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "18px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = '#333333';
			VirtArenaControl.Graphics.ctx.strokeStyle = '#000000';
			VirtArenaControl.Graphics.ctx.fillRect(activationAvatar.x,activationAvatar.y,activationAvatar.width,activationAvatar.height);
			VirtArenaControl.Graphics.ctx.strokeRect(activationAvatar.x,activationAvatar.y,activationAvatar.width,activationAvatar.height);
			VirtArenaControl.Graphics.ctx.fillStyle = '#FFFFFF';
			VirtArenaControl.Graphics.ctx.fillText(activationAvatar.name,activationAvatar.x+activationAvatar.width/2,activationAvatar.y+activationAvatar.height/2);

			if(activationAvatar.selected){
				VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(200,220,255)';
				VirtArenaControl.Graphics.strokeRectWithShadow(activationAvatar.x,activationAvatar.y,activationAvatar.width+2,activationAvatar.height+2,2,'rgba(200,220,255,0.7)',20,0,1);
			}
			if(activationAvatar.activating){
				VirtArenaControl.Graphics.ctx.strokeStyle = 'rgb(50,255,50)';
				VirtArenaControl.Graphics.strokeRectWithShadow(activationAvatar.x,activationAvatar.y,activationAvatar.width+2,activationAvatar.height+2,2,'rgba(50,255,50,0.7)',20,0,1);
			}
		}
	};
})();
