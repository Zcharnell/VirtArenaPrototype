(function(){
	
	VirtArenaControl.ObjectController.virtMovement = function(virt,endTile){
		//get the path between the virt and the selected tile (from tiles.js)
		//check if the movement cost of the end tile is greater than the virt's movement
		VirtArenaControl.ObjectController.path = VirtArenaControl.ObjectController.findMovementPath(virt,endTile);

		if(endTile.moveCost <= virt.turnStats.move){
			VirtArenaControl.ObjectController.stepMovement(virt,VirtArenaControl.ObjectController.path);
		} else {
			//error feedback for not enough movement? still move along the path?
		}
	};

	VirtArenaControl.ObjectController.findMovementPath = function(virt,endTile){
		//get initial tile
		//get end tile
		//make an array of all tiles adjacent to initial, set their parents to initial
		//find the range from each adjacent tile to the end tile
		//pick the tile with least range
		//add to the array all tiles adjacent to this new one, set their parents to this new one
		//find the range to the end tile
		//pick the tile with least range
		//repeat until the final tile is in the array, then return an array with each of the 
		//tiles and their parent tile until the initial tile is in the array

		var initialTile = virt.tile;
		var tiles = VirtArenaControl.Board.tiles;
		var openTiles = [];
		var closedTiles = [];
		var moveCost = 1;
		var error = 0;

		this.setTileMoveCosts(virt);

		var path = [];
		var step = endTile;
		while(step != initialTile && error < 100){
			error++;
			path.unshift(step);
			step = step.parentTile;
		}

		return path;
	};

	VirtArenaControl.ObjectController.stepMovement = function(virt,path){
		var nextTile = path.shift();
		this.setVirtTile(virt,nextTile);
		virt.turnStats.move -= nextTile.moveCost;
		this.setTileMoveCosts(virt);
		if(path.length > 0){
			setTimeout(function(){
				VirtArenaControl.ObjectController.stepMovement(virt,path);
			},this.movementStepDelay);
		} else if(virt.turnStats.move === 0){
			VirtArenaControl.TurnController.delayPhaseChange(500);
		}
	};

	VirtArenaControl.ObjectController.setTileMoveCosts = function(virt){
		var initialTile = virt.tile;
		var tiles = VirtArenaControl.Board.tiles;
		var openTiles = [];
		var closedTiles = [];
		var moveCost = 1;

		for(var i in initialTile.adjacentTiles){
			var index = initialTile.adjacentTiles[i];
			if(tiles[index].isOpen()){
				tiles[index].parentTile = initialTile;
				tiles[index].moveCost = moveCost;
				openTiles.push(tiles[index]);
			}
		}
		var error = 0;

		while(error < 1000 && openTiles.length > 0){	
			error++;

			for(var i=0; i<openTiles.length; i++){
				var nextMoveCost = openTiles[i].moveCost + 1;
				for(var j in openTiles[i].adjacentTiles){
					var index = openTiles[i].adjacentTiles[j];
					var indexInOpenTiles = openTiles.indexOf(tiles[index]);
					if(indexInOpenTiles === -1 && tiles[index].isOpen()){
						tiles[index].parentTile = openTiles[i];
						tiles[index].moveCost = nextMoveCost;
						openTiles.push(tiles[index]);
					} else if(indexInOpenTiles != -1 && openTiles[indexInOpenTiles].moveCost > nextMoveCost){
						openTiles[indexInOpenTiles].parentTile = openTiles[i];
						openTiles[indexInOpenTiles].moveCost = nextMoveCost;
					}
				}
				closedTiles.push(openTiles[i]);
			}

			for(var i=0; i<closedTiles.length; i++){
				var index = openTiles.indexOf(closedTiles[i]);
				if(index != -1){
					openTiles.splice(index,1);
				}
			}


		}
	};

})();