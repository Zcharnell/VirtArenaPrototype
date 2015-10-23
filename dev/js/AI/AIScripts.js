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
		// console.log(moveDistance);
		return moveDistance;
	};

	VirtArenaControl.AI.Scripts.findClosestTileInMoveRange = function(unit,targetTile){
		var tiles = VirtArenaControl.Board.tiles;
		console.log('targetTile ',targetTile);
		var adjacentTilesInRange = VirtArenaControl.AI.Scripts.getAdjacentTilesInRange(unit,targetTile);
		if(adjacentTilesInRange.length > 0){
			return adjacentTilesInRange[0];
		}

		//if no adjacent tiles in range, find next best tile
		//get tile closest to the target tile
		var tilesClosestToTarget = VirtArenaControl.AI.Scripts.getTilesClosestToTargetInRange(unit,targetTile);
		if(tilesClosestToTarget[0]){
			return tilesClosestToTarget[0].tile;
		}
		return null;
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
			return Scripts.sortAscending(a.moveCost,b.moveCost);
		});

		// console.log('adjacentTiles',adjacentTiles);
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
			// return (a.range) - (b.range);
			var rangeDifference = (a.tile.moveCost + a.range) - (b.tile.moveCost + b.range);
			if(rangeDifference === 0){
				rangeDifference = b.tile.moveCost - a.tile.moveCost;
			}

			return rangeDifference;
		});

		// console.log('tilesInMoveRange',tilesInMoveRange);
		return tilesInMoveRange;
	};

	VirtArenaControl.AI.Scripts.findUnitsInRangeOfWeapons = function(aiUnit){
		var units = VirtArenaControl.Units.units;
		var weaponsKeys = Object.keys(aiUnit.weapons);
		var unitsInRange = [];
		for(var i in weaponsKeys){
			var unitsInRange = VirtArenaControl.AI.Scripts.orderUnitsInRange(aiUnit,aiUnit.weapons[weaponsKeys[i]]);
			for(var j in unitsInRange){
				unitsInRange[j] = {unit:unitsInRange[j],weapon:aiUnit.weapons[weaponsKeys[i]]};
			}
		}

		return unitsInRange;
		//based on state, find target
		//default: find lowest health target, and always prefer using the melee weapon if it has one
	};

	VirtArenaControl.AI.Scripts.orderUnitsInRange = function(aiUnit,weapon){
		var unitsInRange = VirtArenaControl.ObjectController.getUnitsInRange(aiUnit,weapon);

		unitsInRange.sort(function(a,b){
			return a.hp - b.hp; //lowest health first
		});

		return unitsInRange;
	};


	VirtArenaControl.AI.Scripts.selectTarget = function(aiUnit,units,preferredTarget){
		var targets = [];
		if(preferredTarget === "mostVulnerable"){
			targets = VirtArenaControl.AI.Scripts.orderTargetUnitsByDamage(aiUnit,units);
			return {unit:targets[0].unit,weapon:targets[0].weapon};
		}
	};

	VirtArenaControl.AI.Scripts.orderTargetUnitsByDamage = function(aiUnit,units){
		units.sort(function(a,b){
			//check how much damage can be done, and how much health the target has
			//this should take into account impact, penetration, etc
			//sort descending
			var aPower = a.weapon.getPotentialPower(aiUnit,a.unit);
			var bPower = b.weapon.getPotentialPower(aiUnit,b.unit);
			var difference = (bPower) - (aPower);
			return difference;
		});
		return units;
	};

})();