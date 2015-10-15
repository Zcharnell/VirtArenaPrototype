(function(){
	VirtArenaControl.ObjectController = {
		selectedUnit:'',
		movementStepDelay:250,
		activationOrder:[],
		currentUnitActivating:'',
		setUnitTile: function(unit,tile){
			var oldTile = unit.tile;
			unit.tile = tile;
			tile.unit = unit;
			if(oldTile) oldTile.unit = '';
		},
		selectUnit: function(unit){
			for(var i in VirtArenaControl.Units.units){
				if(VirtArenaControl.Units.units[i] === unit){
					this.selectedUnit = VirtArenaControl.Units.units[i];
					return;
				}
			}
		},
		resetSelectedObject: function(){
			if(this.selectedUnit) this.selectedUnit = '';
		},
		setActivationOrder: function(){
			this.activationOrder = [];
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				if(units[i].canActivateThisTurn()){
					this.activationOrder.push(units[i]);
				}
			}
			
			this.activationOrder.sort(Scripts.sortUnitsBySpeed);
		},
		setUnitActivating: function(unit){
			this.currentUnitActivating = unit;
		},
		resetUnitValues: function(){
			this.setLastStanceSelected();
			this.resetWeapons();
			this.resetHasActivated();
		},
		setLastStanceSelected: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				units[i].lastStanceSelected = units[i].stanceSelected;
				units[i].stanceSelected = '';
			}
		},
		resetWeapons: function(){
			//reset the selected weapon variable, and reset the used value of the unit's weapons
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				units[i].weaponSelected = {};
				var weapons = Object.keys(units[i].weapons);
				for(var j in weapons){
					var weapon = weapons[j];
					units[i].weapons[weapon].used = false;
				}
			}
		},
		resetHasActivated: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				units[i].activated = false;
			}
		},
		resetActivationOrder: function(){
			this.activationOrder = [];
			this.currentUnitActivating = '';
		},
		setUnitStance: function(unit,stanceNumber){
			unit.setStance("stance" + stanceNumber);
			if(unit.team.allStancesSelected()){
				VirtArenaControl.Buttons.removeButton('selectStance');
				VirtArenaControl.TurnController.nextPhase();
			}
		},
		selectCommanderUnit: function(unit,team){
			team.addCommander(unit);
			// /*
			team.addCompanion(unit);
			team.addCompanion(unit);
			// */
			VirtArenaControl.Buttons.removeButton('selectVirt');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		unitHasDied: function(unit){
			if(unit.commander){
				VirtArenaControl.TurnController.endOfGame();
			} else {
				this.removeUnitFromActivationOrder(unit);
			}
		},
		removeUnitFromActivationOrder: function(unit){
			var index = this.activationOrder.indexOf(unit);
			this.activationOrder.splice(index,1);
		},
		unactivatedUnitsInActivationOrder: function(){
			//check if all units in the activation order have activated
			for(var i in this.activationOrder){
				if(!this.activationOrder[i].activated)
					return true;
			}
			return false;
		},
		setEndOfActivationVariables: function(unit){
			unit.activated = true;
		},
		setTileRange: function(unit){
			var initialTile = unit.tile;
			var tiles = VirtArenaControl.Board.tiles;
			var openTiles = [];
			var closedTiles = [];
			var range = 1;

			for(var i in initialTile.adjacentTiles){
				var index = initialTile.adjacentTiles[i];
				tiles[index].parentTile = initialTile;
				tiles[index].range = range;
				openTiles.push(tiles[index]);
			}
			var error = 0;

			while(error < 1000 && openTiles.length > 0){	
				error++;

				for(var i=0; i<openTiles.length; i++){
					var nextRange = openTiles[i].range + 1;
					for(var j in openTiles[i].adjacentTiles){
						var index = openTiles[i].adjacentTiles[j];
						var indexInOpenTiles = openTiles.indexOf(tiles[index]);
						if(indexInOpenTiles === -1){
							tiles[index].parentTile = openTiles[i];
							tiles[index].range = nextRange;
							openTiles.push(tiles[index]);
						} else if(openTiles[indexInOpenTiles].range > nextRange){
							openTiles[indexInOpenTiles].parentTile = openTiles[i];
							openTiles[indexInOpenTiles].range = nextRange;
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
		}
	};
})();