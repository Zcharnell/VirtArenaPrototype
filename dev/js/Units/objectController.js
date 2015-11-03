(function(){
	VirtArenaControl.ObjectController = {
		movementStepDelay:350,
		path:[],
		unitMoving:false,
		setUnitTile: function(unit,tile){
			var oldTile = unit.tile;
			unit.tile = tile;
			tile.unit = unit;
			if(oldTile) oldTile.unit = '';
		},
		selectUnit: function(unit){
			for(var i in VirtArenaControl.Units.units){
				if(VirtArenaControl.Units.units[i] === unit){
					VirtArenaControl.Units.selectedUnit = VirtArenaControl.Units.units[i];
					return;
				}
			}
		},
		resetSelectedObject: function(){
			if(VirtArenaControl.Units.selectedUnit) VirtArenaControl.Units.selectedUnit = '';
		},
		setActivationOrder: function(){
			VirtArenaControl.Units.activationOrder = [];
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				if(units[i].canActivateThisTurn()){
					VirtArenaControl.Units.activationOrder.push(units[i]);
				}
			}
			
			VirtArenaControl.Units.activationOrder.sort(Scripts.sortUnitsBySpeed);
			for(var i in VirtArenaControl.Units.activationOrder){
				VirtArenaControl.Units.activationOrder[i].activationOrderIndex = i;
			}
		},
		setUnitActivating: function(unit){
			VirtArenaControl.Units.currentUnitActivating = unit;
		},
		resetUnitValues: function(){
			this.setLastStanceSelected();
			this.resetWeapons();
			this.resetHasActivated();
			this.resetHasAttacked();
			this.resetAIVariables();
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
		resetHasAttacked: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				if(units[i].hasAttacked) units[i].hasAttacked = false;
			}
		},
		resetAIVariables: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				if(units[i].team.aiTeam){
					units[i].ai.hasMoved = false;
					units[i].ai.hasUsedCards = false;
					units[i].ai.hasAttacked = false;
					units[i].ai.targetUnit = null;
					units[i].ai.targetTile = null;
				}
			}
		},
		resetActivationOrder: function(){
			VirtArenaControl.Units.activationOrder = [];
			VirtArenaControl.Units.currentUnitActivating = '';
		},
		setUnitStance: function(unit,stanceNumber){
			unit.setStance("stance" + stanceNumber);
		},
		selectCommanderUnit: function(unit,team){
			team.addCommander(unit);
			// /*
			// team.addCompanion(unit);
			// team.addCompanion(unit);
			// */
			VirtArenaControl.Buttons.removeButton('selectCommander');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		unitHasDied: function(unit){
			if(unit.commander){
				VirtArenaControl.TurnController.endOfGame();
			} else {
				this.removeUnitFromActivationOrder(unit);
				setTimeout(function(){
					unit.dontDraw = true;
				},VirtArenaControl.Units.deathDelay);
			}
		},
		removeUnitFromActivationOrder: function(unit){
			var index = VirtArenaControl.Units.activationOrder.indexOf(unit);
			VirtArenaControl.Units.activationOrder.splice(index,1);
		},
		unactivatedUnitsInActivationOrder: function(){
			//check if all units in the activation order have activated
			for(var i in VirtArenaControl.Units.activationOrder){
				if(!VirtArenaControl.Units.activationOrder[i].activated)
					return true;
			}
			return false;
		},
		setEndOfActivationVariables: function(unit){
			unit.activated = true;
			unit.removeActivationAbilities();
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
		},
		addUnit: function(unit){
			VirtArenaControl.Units.units.push(unit);
			unit.avatar = VirtArenaControl.Avatars.newAvatar(unit);
		},
		getUnitObject: function(unitName){
			//returns a new object based on the virtName, which should be class
			var unit = jQuery.extend(true, {}, new window[unitName]());
			unit.id = this.setUnitId(unit);
			unit.setStartingStance();
			return unit;
		},
		setUnitId: function(unit){
			var id = VirtArenaControl.Units.units.length;

			for(var i in VirtArenaControl.Units.units){
				if(VirtArenaControl.Units.units[i].id == id)
					id++;
			}

			return id;
		}
	};
})();