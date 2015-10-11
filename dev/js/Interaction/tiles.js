(function(){


	Tile.prototype.onClick = function(){
		var obj = VirtArenaControl.Virts;
		if(this.virt != ''){
			VirtArenaControl.ObjectController.selectVirt(this.virt);
		} else if(VirtArenaControl.ObjectController.selectedVirt === VirtArenaControl.ObjectController.currentVirtActivating && VirtArenaControl.TurnController.currentSubphase === 'movementSubphase'){
			var index = obj.virts.indexOf(VirtArenaControl.ObjectController.selectedVirt);
			var virt = obj.virts[index];
			VirtArenaControl.ObjectController.virtMovement(virt,this);
		}
	};
	
})();