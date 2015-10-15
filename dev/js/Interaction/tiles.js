(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Units;
		if(VirtArenaControl.TurnController.currentAction.action === "spawnCompanion"
			&& this.targetFor === "action"){

			VirtArenaControl.Abilities.summonCompanion(this);

		} else if(this.targetFor === "attack"){

			var unit = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.unitAttackSelectTarget(unit,this.unit);

		} else if(this.targetFor === "movement"){

			var unit = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.unitMovement(unit,this);

		} else if(this.unit != ''){
			VirtArenaControl.ObjectController.selectUnit(this.unit);
		}
	};
	
})();