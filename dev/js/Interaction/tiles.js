(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Units;
		if(VirtArenaControl.TurnController.currentAction.action === "spawnCompanion"
			&& this.targetFor === "action" && VirtArenaControl.Units.currentUnitActivating.team.name == 'blueTeam'){

			VirtArenaControl.Abilities.summonCompanion(this);

		} else if(this.targetFor === "attack" && VirtArenaControl.Units.currentUnitActivating.team.name == 'blueTeam'){

			var unit = VirtArenaControl.Units.currentUnitActivating;
			VirtArenaControl.ObjectController.unitAttackSelectTarget(unit,this.unit);

		} else if(this.targetFor === "attackConfirm" && VirtArenaControl.Units.currentUnitActivating.team.name == 'blueTeam'){

			var unitAttacking = VirtArenaControl.TurnController.currentAction.user;
			var unitTarget = VirtArenaControl.TurnController.currentAction.target;
			VirtArenaControl.ObjectController.unitAttackTarget(unitAttacking,unitTarget);

		} else if(this.targetFor === "movement" && VirtArenaControl.Units.currentUnitActivating.team.name == 'blueTeam'){

			var unit = VirtArenaControl.Units.currentUnitActivating;
			VirtArenaControl.ObjectController.unitMovement(unit,this);

		} else if(this.unit != ''){
			// VirtArenaControl.ObjectController.selectUnit(this.unit);
		}
	};
	
})();