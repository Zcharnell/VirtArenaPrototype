(function(){
	
	VirtArenaControl.AI.Scripts.getEnemyTeam = function(aiUnit){
		var teams = VirtArenaControl.Units.teams;
		var team = aiUnit.team;
		var keys = Object.keys(teams);
		for(var i in keys){
			if(teams[keys[i]].name != team.name){
				// console.log(team,teams[keys[i]]);
				return teams[keys[i]];
			}
		}
	};

	VirtArenaControl.AI.Scripts.getMoveDistanceFromUnits = function(aiUnit,units){
		VirtArenaControl.ObjectController.setTileMoveCosts(aiUnit);
		var moveDistance = [];
		for(var i in units){
			var obj = {
				unit:units[i],
				moveDistance:units[i].tile.moveCost
			};
			moveDistance.push(obj);
		}

		moveDistance.sort(function(a,b){
			return Scripts.sortAscending(a.moveDistance,b.moveDistance);
		});
		console.log(moveDistance);
		return moveDistance;
	};

	VirtArenaControl.AI.Scripts.findClosestTileInMoveRange = function(unit,targetTile){
		var tiles = VirtArenaControl.Board.tiles;
		console.log(targetTile);
		var adjacentTilesInRange = VirtArenaControl.AI.Scripts.getAdjacentTilesInRange(unit,targetTile);
		if(adjacentTilesInRange.length > 0){
			return adjacentTilesInRange[0];
		}

		//if no adjacent tiles in range, find next best tile
		//get tile closest to the target tile
		var tilesClosestToTarget = VirtArenaControl.AI.Scripts.getTilesClosestToTargetInRange(unit,targetTile);
		return tilesClosestToTarget[0].tile;
	};

	VirtArenaControl.AI.Scripts.getAdjacentTilesInRange = function(unit,targetTile){
		var tiles = VirtArenaControl.Board.tiles;
		var adjacentTiles = [];

		for(var i in targetTile.adjacentTiles){
			var tile = tiles[targetTile.adjacentTiles[i]];
			if(tile.moveCost <= unit.turnStats.move && tile.isOpen()){
				adjacentTiles.push(tile);
			}
		}

		adjacentTiles.sort(function(a,b){
			return sortAscending(a.moveCost,b.moveCost);
		});

		console.log('adjacentTiles',adjacentTiles);
		return adjacentTiles;
	};

	VirtArenaControl.AI.Scripts.getTilesClosestToTargetInRange = function(unit,targetTile){
		var tiles = VirtArenaControl.Board.tiles;
		var tilesInMoveRange = [];

		for(var i in tiles){
			if(tiles[i].moveCost <= unit.turnStats.move && tiles[i].isOpen()){
				var range = Scripts.getMoveRangeBetweenTiles(tiles[i],targetTile);
				tilesInMoveRange.push({tile:tiles[i],range:range});
			}
		}

		tilesInMoveRange.sort(function(a,b){
			return (b.tile.moveCost + b.range) - (a.tile.moveCost - a.range);
		});

		console.log('tilesInMoveRange',tilesInMoveRange);
		return tilesInMoveRange;
	};
})();