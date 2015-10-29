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
			if(targets[0]){
				return {unit:targets[0].unit,weapon:targets[0].weapon};
			} else {
				return null;
			}
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

	VirtArenaControl.AI.Scripts.determineActivationCardsToUse = function(aiUnit,enemyTeam){
		var cards = aiUnit.team.deck.cardsInHand;
		var cardsToPlay = [];

		//companion cards
		if(aiUnit.commander === true){
			for(var i in cards){
				var cardToPlay = VirtArenaControl.AI.Scripts.checkCompanionCardPlayable(aiUnit,cards[i],cardsToPlay);
				if(cardToPlay) cardsToPlay.push(cardToPlay);
			}
		}

		return cardsToPlay;
	};

	VirtArenaControl.AI.Scripts.checkCompanionCardPlayable = function(aiUnit,card,queuedCards){
		var tiles = VirtArenaControl.Board.tiles;
		var cardReturnObj = {
			card: card,
			target: '',
			action: "spawnCompanion"
		}
		var playable = false;
		if(card.companion){
			for(var i in aiUnit.tile.adjacentTiles){
				var tile = tiles[aiUnit.tile.adjacentTiles[i]];
				var path;
				path = (!aiUnit.ai.hasMoved) ? VirtArenaControl.ObjectController.findMovementPath(aiUnit,aiUnit.ai.targetTile) : false;
				var tileInPath = (path && path.indexOf(tile) >= -1) ? true : false;
				var tileUsed = VirtArenaControl.AI.Scripts.checkQueuedCardsForTileUsed(tile,queuedCards);
				if(tile.isOpen() && !tileInPath && !tileUsed){
					cardReturnObj.target = tile;
					playable = true;
				}
			}
		}

		if(playable){
			return cardReturnObj;
		} else {
			return false;
		}
	};

	VirtArenaControl.AI.Scripts.checkQueuedCardsForTileUsed = function(tile,queuedCards){
		for(var i in queuedCards){
			if(queuedCards[i].target === tile){
				return true;
			}
		}
		return false;
	};

	VirtArenaControl.AI.Scripts.AISummonCompanion = function(aiUnit,cardObj){
		VirtArenaControl.TurnController.setCurrentAction("spawnCompanion",{card:cardObj.card,team:aiUnit.team,companion:cardObj.card.companion});
		setTimeout(function(){
			VirtArenaControl.Abilities.summonCompanion(cardObj.target);
			setTimeout(function(){
				VirtArenaControl.AI.Scripts.playCards(aiUnit);
			},VirtArenaControl.TurnController.phaseChangeDelay);
		},VirtArenaControl.TurnController.phaseChangeDelay);
	};

})();