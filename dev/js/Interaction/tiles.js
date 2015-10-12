(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Units;
		if(VirtArenaControl.ObjectController.selectedUnit === VirtArenaControl.ObjectController.currentUnitActivating
			&& VirtArenaControl.ObjectController.selectedUnit.weaponSelected
			&& this.unit 
			&& this.unit.team != VirtArenaControl.ObjectController.selectedUnit.team 
			&& VirtArenaControl.TurnController.currentSubphase === 'attackSubphase'){

			var unit = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.unitAttackSelectTarget(unit,this.unit);

		} else if(VirtArenaControl.ObjectController.selectedUnit === VirtArenaControl.ObjectController.currentUnitActivating 
			&& VirtArenaControl.TurnController.currentSubphase === 'movementSubphase'){

			var unit = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.unitMovement(unit,this);

		} else if(this.unit != ''){
			VirtArenaControl.ObjectController.selectUnit(this.unit);
		}
	};
	
})();