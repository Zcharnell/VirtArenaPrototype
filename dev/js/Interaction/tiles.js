(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Units;
		if(VirtArenaControl.TurnController.currentAction.action === "spawnCompanion"
			&& this.targetFor === "action"){

			VirtArenaControl.Abilities.summonCompanion(this);

		} else if(this.targetFor === "attack"){

			var unit = VirtArenaControl.Units.currentUnitActivating;
			VirtArenaControl.ObjectController.unitAttackSelectTarget(unit,this.unit);

		} else if(this.targetFor === "attackConfirm"){

			var unitAttacking = VirtArenaControl.TurnController.currentAction.user;
			var unitTarget = VirtArenaControl.TurnController.currentAction.target;
			VirtArenaControl.ObjectController.unitAttackTarget(unitAttacking,unitTarget);

		} else if(this.targetFor === "movement"){

			var unit = VirtArenaControl.Units.currentUnitActivating;
			VirtArenaControl.ObjectController.unitMovement(unit,this);

		} else if(this.unit != ''){
			VirtArenaControl.ObjectController.selectUnit(this.unit);
		}
	};
	
})();