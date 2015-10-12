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
			this.activationOrder = VirtArenaControl.Units.units;
			this.activationOrder.sort(Scripts.sortUnitsBySpeed);
		},
		setUnitActivating: function(unit){
			this.currentUnitActivating = unit;
		},
		setLastStanceSelected: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				units[i].lastStanceSelected = units[i].stanceSelected;
				units[i].stanceSelected = '';
			}
		},
		resetWeaponSelected: function(){
			var units = VirtArenaControl.Units.units;
			for(var i in units){
				units[i].weaponSelected = '';
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
			VirtArenaControl.Buttons.removeButton('selectVirt');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		}
	};
})();