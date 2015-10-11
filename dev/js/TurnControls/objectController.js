(function(){
	VirtArenaControl.ObjectController = {
		selectedVirt:'',
		movementStepDelay:250,
		activationOrder:[],
		currentVirtActivating:'',
		setVirtTile: function(virt,tile){
			virt.tile = tile;
			tile.virt = virt.name;
		},
		selectVirt: function(virtName){
			for(var i in VirtArenaControl.Virts.virts){
				if(VirtArenaControl.Virts.virts[i].name === virtName){
					this.selectedVirt = VirtArenaControl.Virts.virts[i];
					return;
				}
			}
		},
		resetSelectedObject: function(){
			if(this.selectedVirt) this.selectedVirt = '';
		},
		setActivationOrder: function(){
			this.activationOrder = VirtArenaControl.Virts.virts;
			this.activationOrder.sort(Scripts.sortVirtsBySpeed);
		},
		setVirtActivating: function(virt){
			this.currentVirtActivating = virt;
		},
		setLastStanceSelected: function(){
			var virts = VirtArenaControl.Virts.virts;
			for(var i in virts){
				virts[i].lastStanceSelected = virts[i].stanceSelected;
			}
		},
		resetActivationOrder: function(){
			this.activationOrder = [];
			this.currentVirtActivating = '';
		}
	};
})();