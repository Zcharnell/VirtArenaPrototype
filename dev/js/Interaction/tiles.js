(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Virts;
		if(VirtArenaControl.ObjectController.selectedUnit === VirtArenaControl.ObjectController.currentVirtActivating
			&& VirtArenaControl.ObjectController.selectedUnit.weaponSelected
			&& this.virt 
			&& this.virt.team != VirtArenaControl.ObjectController.selectedUnit.team 
			&& VirtArenaControl.TurnController.currentSubphase === 'attackSubphase'){

			var virt = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.virtAttackSelectTarget(virt,this.virt);

		} else if(VirtArenaControl.ObjectController.selectedUnit === VirtArenaControl.ObjectController.currentVirtActivating 
			&& VirtArenaControl.TurnController.currentSubphase === 'movementSubphase'){

			var virt = VirtArenaControl.ObjectController.selectedUnit;
			VirtArenaControl.ObjectController.virtMovement(virt,this);

		} else if(this.virt != ''){
			VirtArenaControl.ObjectController.selectVirt(this.virt);
		}
	};
	
})();