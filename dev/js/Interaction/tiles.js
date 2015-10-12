(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Virts;
		if(VirtArenaControl.ObjectController.selectedVirt === VirtArenaControl.ObjectController.currentVirtActivating
			&& VirtArenaControl.ObjectController.selectedVirt.weaponSelected
			&& this.virt 
			&& this.virt.team != VirtArenaControl.ObjectController.selectedVirt.team 
			&& VirtArenaControl.TurnController.currentSubphase === 'attackSubphase'){

			var virt = VirtArenaControl.ObjectController.selectedVirt;
			VirtArenaControl.ObjectController.virtAttackSelectTarget(virt,this.virt);

		} else if(VirtArenaControl.ObjectController.selectedVirt === VirtArenaControl.ObjectController.currentVirtActivating 
			&& VirtArenaControl.TurnController.currentSubphase === 'movementSubphase'){

			var virt = VirtArenaControl.ObjectController.selectedVirt;
			VirtArenaControl.ObjectController.virtMovement(virt,this);

		} else if(this.virt != ''){
			VirtArenaControl.ObjectController.selectVirt(this.virt);
		}
	};
	
})();