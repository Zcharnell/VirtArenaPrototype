(function(){
	
	VirtArenaControl.ObjectController.checkUsableWeapons = function(unit){
		var keys = Object.keys(unit.weapons);
		var unitsInRange = {};
		var hasWeaponInRange = false;

		for(var i in keys){
			unitsInRange[keys[i]] = VirtArenaControl.ObjectController.getUnitsInRange(unit,unit.weapons[keys[i]]);
			var outOfRange = (unitsInRange[keys[i]].length > 0) ? false : true;
			VirtArenaControl.Buttons.addButton('selectWeapon',{unit:unit,weapon:unit.weapons[keys[i]],disabled:outOfRange,index:i,buttonsOfThisType:keys.length});
			if(!outOfRange) hasWeaponInRange = true;
		}

		return hasWeaponInRange;
	};

	VirtArenaControl.ObjectController.selectWeapon = function(unit,weapon){
		unit.setWeapon(weapon.number);
	};

	VirtArenaControl.ObjectController.setTileRangeForWeapons = function(unit){
		var initialTile = unit.tile;
		var tiles = VirtArenaControl.Board.tiles;
		var openTiles = [];
		var closedTiles = [];
		var rangeForWeapon = 1;

		for(var i in initialTile.adjacentTiles){
			var index = initialTile.adjacentTiles[i];
			tiles[index].parentTile = initialTile;
			tiles[index].rangeForWeapon = rangeForWeapon;
			openTiles.push(tiles[index]);
		}
		var error = 0;

		while(error < 1000 && openTiles.length > 0){	
			error++;

			for(var i=0; i<openTiles.length; i++){
				var nextRangeForWeapon = openTiles[i].rangeForWeapon + 1;
				for(var j in openTiles[i].adjacentTiles){
					var index = openTiles[i].adjacentTiles[j];
					var indexInOpenTiles = openTiles.indexOf(tiles[index]);
					if(indexInOpenTiles === -1){
						tiles[index].parentTile = openTiles[i];
						tiles[index].rangeForWeapon = nextRangeForWeapon;
						openTiles.push(tiles[index]);
					} else if(openTiles[indexInOpenTiles].rangeForWeapon > nextRangeForWeapon){
						openTiles[indexInOpenTiles].parentTile = openTiles[i];
						openTiles[indexInOpenTiles].rangeForWeapon = nextRangeForWeapon;
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
	
	VirtArenaControl.ObjectController.unitAttackSelectTarget = function(unitAttacking,unitTarget){
		var range = unitTarget.tile.rangeForWeapon;
		if(range > unitAttacking.getWeaponRange()){
			console.log('OUTOFRANGE: ' + unitTarget.name, tile);
		} else {
			console.log('Attack!');
			VirtArenaControl.Buttons.removeButton('selectWeapon');
			//set current action to attack, then wait for cards to be played on the unit to be clicked again
			VirtArenaControl.TurnController.setCurrentAction('attack',{attackingUnit:unitAttacking,targetUnit:unitTarget,range:range});
			// VirtArenaControl.ObjectController.unitAttackTarget(unitAttacking,unitTarget);
		}
	};

	VirtArenaControl.ObjectController.unitAttackTarget = function(unit,target){
		//roll damage based on power
		//send that damage value (with crit, penetration, and anything special) in an object to the virt's takeDamage function
		var obj = unit.getDamageAndStatsForAttacking();
		target.takeDamage(obj);
		VirtArenaControl.ObjectController.endAttackSubphase();
	}

	VirtArenaControl.ObjectController.endAttackSubphase = function(){
		VirtArenaControl.Buttons.removeButton('selectWeapon');
		VirtArenaControl.TurnController.resetCurrentAction();
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.ObjectController.getUnitsInRange = function(unit,weapon){
		var range = weapon.range;
		var units = VirtArenaControl.Units.units;
		var unitsInRange = [];

		for(var i in VirtArenaControl.Units.units){
			if(units[i].team != unit.team) {
				if(units[i].tile.rangeForWeapon <= range){
					unitsInRange.push(units[i]);
				}
			}
		}

		return unitsInRange;
	};

})();