(function(){
	VirtArenaControl.Updater.gameUpdate = function(){
		for(var i=0; i<this.updateFunctions.length; i++){
			this[this.updateFunctions[i]]();
		}
	}

	VirtArenaControl.Updater.checkCanvasSize = function(){
		if(window.innerWidth != VirtArenaControl.Graphics.canvas.width || window.innerHeight != VirtArenaControl.Graphics.canvas.height){
			VirtArenaControl.Graphics.canvas.width = window.innerWidth;
			VirtArenaControl.Graphics.canvas.height = window.innerHeight;
			VirtArenaControl.Graphics.cameraWidth = window.innerWidth;
			VirtArenaControl.Graphics.cameraHeight = window.innerHeight;
		}
	}

	VirtArenaControl.Updater.animateSquare = function(){
		VirtArenaControl.Graphics.cameraY += VirtArenaControl.Graphics.canvas.height/60;
		if(VirtArenaControl.Graphics.cameraY > VirtArenaControl.Graphics.canvas.height){
			VirtArenaControl.Graphics.cameraY = -VirtArenaControl.Graphics.cameraHeight*0.8;
		}
	}

	VirtArenaControl.Updater.getMousePosition = function(){
		var scrollOffsetTop = document.body.scrollTop;
		var scrollOffsetLeft = document.body.scrollLeft;
		var canvasOffset = $('#canvas1').offset();
		VirtArenaControl.Mouse.x = (VirtArenaControl.Mouse.x - canvasOffset.left + scrollOffsetLeft + VirtArenaControl.Camera.xLeft);
		VirtArenaControl.Mouse.y = (VirtArenaControl.Mouse.y - canvasOffset.top + scrollOffsetTop + VirtArenaControl.Camera.yTop);
	}

	VirtArenaControl.Updater.resetHoveredObjects = function(){
		var tiles = VirtArenaControl.Board.tiles;
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;

		for(var i in this.hoveredObjects){
			var obj = this.hoveredObjects[i];
			if(obj.constructor.name === "Tile"){
				obj.hover = false;
				// for(var j in obj.adjacentTiles){
				// 	var index = obj.adjacentTiles[j];
				// 	tiles[index].adjacentToHover = false;
				// }
			} else if(obj.constructor.name === "Button") {
				obj.hover = false;
			}
			
			// console.log(this.hoveredObjects[i].constructor.name);
		}

		this.hoveredObjects = [];
	}

	VirtArenaControl.Updater.getHoveredObjects = function(){
		var tiles = VirtArenaControl.Board.tiles;
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;
		this.resetHoveredObjects();
		var objectIsHovered = false;

		if(!objectIsHovered){
			for(var i=0; i<buttons.length; i++){
				var button = VirtArenaControl.Buttons[buttons[i]];
				if(Scripts.mouseInObject(button)){
					objectIsHovered = true;
					button.hover = true;
					this.hoveredObjects.push(button);
				}
			}
		}

		if(!objectIsHovered) {
			for(var i=0; i<tiles.length; i++){
				if(Scripts.mouseInObject(tiles[i])){
					objectIsHovered = true;
					tiles[i].hover = true;
					this.hoveredObjects.push(tiles[i]);
					// for(var j=0; j<tiles[i].adjacentTiles.length; j++){
					// 	var adjIndex = tiles[i].adjacentTiles[j];
					// 	tiles[adjIndex].adjacentToHover = true;
					// }
				}
			}
		}
	}

	VirtArenaControl.Updater.checkVirtPositions = function(){
		var virts = VirtArenaControl.Virts.virts;
		var tiles = VirtArenaControl.Board.tiles;
		var tilesWithVirts = [];

		for(var i in virts){
			tilesWithVirts.push(virts[i].tile.index);
		}

		for(var i in tiles){
			if(tiles[i].virt != ''){
			}
			if(tiles[i].virt != '' && tilesWithVirts.indexOf(tiles[i].index) === -1){
				//if a tile thinks it has a virt but it doesn't, reset the variable
				tiles[i].virt = '';
			}
		}
	}

	VirtArenaControl.Updater.updateDelayPhaseChange = function(){
		this.phaseChangeDelayCounter += this.framerate;
		if(this.phaseChangeDelayCounter >= VirtArenaControl.TurnController.phaseChangeDelay){
			this.phaseChangeDelayCounter = 0;
			VirtArenaControl.TurnController.phaseChangeDelay = 0;
			VirtArenaControl.TurnController.nextPhase();
			this.updateFunctions.splice(this.updateFunctions.indexOf('updateDelayPhaseChange'),1);
		}
	}
})();