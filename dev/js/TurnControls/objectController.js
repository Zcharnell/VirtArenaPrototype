(function(){
	VirtArenaControl.ObjectController = {
		selectedUnit:'',
		movementStepDelay:250,
		activationOrder:[],
		currentUnitActivating:'',
		setUnitTile: function(unit,tile){
			unit.tile = tile;
			tile.unit = unit;
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
				units[i].weaponSelected = '';
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
			VirtArenaControl.Buttons.removeButton('selectStance');
			VirtArenaControl.TurnController.nextPhase();
		},
		selectCommanderUnit: function(unit,team){
			VirtArenaControl.Units.teams[team].addCommander(unit);
			// /*
			VirtArenaControl.Units.teams[team].addCompanion(unit);
			VirtArenaControl.Units.teams[team].addCompanion(unit);
			// */
			VirtArenaControl.Buttons.removeButton('selectVirt');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
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
		setEndOfActivationVariables: function(virt){
			virt.activated = true;
		}
	};
})();