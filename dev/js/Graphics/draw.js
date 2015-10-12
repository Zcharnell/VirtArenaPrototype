(function(){
	VirtArenaControl.Graphics.draw = function(){
		for(var i=0; i<this.drawFunctions.length; i++){
			this[this.drawFunctions[i]]();
		}
	}

	VirtArenaControl.Graphics.redrawCanvas = function(){
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = '#666';
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
			if(VirtArenaControl.TurnController.currentSubphase === "movementSubphase" 
				&& tiles[i].moveCost <= VirtArenaControl.ObjectController.currentVirtActivating.turnStats.move
				&& tiles[i].isOpen()) {
				tiles[i].drawHighlightForMovement();
			}
			if(VirtArenaControl.TurnController.currentSubphase === "attackSubphase" 
				&& tiles[i].rangeForWeapon <= VirtArenaControl.ObjectController.currentVirtActivating.getWeaponRange()
				&& tiles[i].virt
				&& tiles[i].virt.team != VirtArenaControl.ObjectController.currentVirtActivating.team) {
				tiles[i].drawHighlightForAttack();
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
			var unit = unit[i];
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
})();
