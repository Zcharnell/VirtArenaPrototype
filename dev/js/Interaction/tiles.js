(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Units;
		if(VirtArenaControl.TurnController.currentAction.action === "spawnCompanion"
			&& this.targetFor === "action"){

			VirtArenaControl.Abilities.summonCompanion(this);

		} else if(this.targetFor === "attack"){

			var unit = VirtArenaControl.Units.selectedUnit;
			VirtArenaControl.ObjectController.unitAttackSelectTarget(unit,this.unit);

		} else if(this.targetFor === "attackConfirm"){

			var unitAttacking = VirtArenaControl.TurnController.currentAction.user;
			var unitTarget = VirtArenaControl.TurnController.currentAction.target;
			VirtArenaControl.ObjectController.unitAttackTarget(unitAttacking,unitTarget);

		} else if(this.targetFor === "movement"
			&& VirtArenaControl.Units.selectedUnit.id === VirtArenaControl.Units.currentUnitActivating.id){

			var unit = VirtArenaControl.Units.selectedUnit;
			VirtArenaControl.ObjectController.unitMovement(unit,this);

		} else if(this.unit != ''){
			VirtArenaControl.ObjectController.selectUnit(this.unit);
		}
	};
	
})();