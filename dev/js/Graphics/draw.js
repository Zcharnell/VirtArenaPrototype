(function(){
	VirtArenaControl.Graphics.draw = function(){
		for(var i=0; i<this.drawFunctions.length; i++){
			this[this.drawFunctions[i]]();
		}
	}

	VirtArenaControl.Graphics.redrawCanvas = function(){
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = '#444';
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
			if(tiles[i].hover || (tiles[i].unit && tiles[i].unit.avatar.hover)){
				tiles[i].drawHover();
			} else {
				tiles[i].draw();
			}
			if(tiles[i].unit && tiles[i].unit === VirtArenaControl.Units.currentUnitActivating){
				tiles[i].drawBorderForActivatingUnit();
			}
			// console.log(tiles[i].targetFor);
			if(tiles[i].targetFor === "movement") {
				tiles[i].drawHighlightForMovement();
			}
			if(tiles[i].targetFor === "attack") {
				tiles[i].drawHighlightForAttack();
			}
			if(tiles[i].targetFor === "attackConfirm") {
				tiles[i].drawHighlightForAttackConfirm();
			}
			if(tiles[i].targetFor === "action") {
				tiles[i].drawHighlightForAction();
			}

			// tiles[i].drawIndex();
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
		for(var i in VirtArenaControl.Units.activationOrder){
			VirtArenaControl.Units.activationOrder[i].avatar.draw();
		}
	};

	VirtArenaControl.Graphics.drawTooltips = function(){
		for(var i in VirtArenaControl.Tooltips.tooltips){
			VirtArenaControl.Tooltips.tooltips[i].draw();
		}
	};
})();
