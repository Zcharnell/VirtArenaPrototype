(function(){
	
	VirtArenaControl.ObjectController.checkUsableWeapons = function(virt){
		var keys = Object.keys(virt.weapons);
		var virtsInRange = {};
		var hasWeaponInRange = false;

		for(var i in keys){
			virtsInRange[keys[i]] = VirtArenaControl.ObjectController.getVirtsInRange(virt,virt.weapons[keys[i]]);
			var outOfRange = (virtsInRange[keys[i]].length > 0) ? false : true;
			VirtArenaControl.Buttons.addButton('selectWeapon',{virt:virt,weapon:virt.weapons[keys[i]],disabled:outOfRange,index:i,buttonsOfThisType:keys.length});
			if(!outOfRange) hasWeaponInRange = true;
		}

		if(!hasWeaponInRange) VirtArenaControl.ObjectController.endAttackSubphase();

	};

	VirtArenaControl.ObjectController.selectWeapon = function(virt,weapon){
		virt.setWeapon(weapon.number);
	};

	VirtArenaControl.ObjectController.setTileRangeForWeapons = function(virt){
		var initialTile = virt.tile;
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
	
	VirtArenaControl.ObjectController.virtAttackSelectTarget = function(virtAttacking,virtTarget){
		if(virtTarget.tile.rangeForWeapon > virtAttacking.getWeaponRange()){
			console.log('OUTOFRANGE: ' + virtTarget.name, tile);
		} else {
			console.log('Attack!');
			VirtArenaControl.Buttons.removeButton('selectWeapon');
			VirtArenaControl.ObjectController.virtAttackTarget(virtAttacking,virtTarget);

		}
	};

	VirtArenaControl.ObjectController.virtAttackTarget = function(virt,target){
		//roll damage based on power
		//send that damage value (with crit, penetration, and anything special) in an object to the virt's takeDamage function
		var obj = virt.getDamageAndStatsForAttacking();
		target.takeDamage(obj);
		VirtArenaControl.ObjectController.endAttackSubphase();
	}

	VirtArenaControl.ObjectController.endAttackSubphase = function(){
		VirtArenaControl.Buttons.removeButton('selectWeapon');
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.ObjectController.getVirtsInRange = function(virt,weapon){
		var range = weapon.range;
		var virts = VirtArenaControl.Virts.virts;
		var virtsInRange = [];

		for(var i in VirtArenaControl.Virts.virts){
			if(virts[i].team != virt.team) {
				if(virts[i].tile.rangeForWeapon <= range){
					virtsInRange.push(virts[i]);
				}
			}
		}

		return virtsInRange;
	};

})();