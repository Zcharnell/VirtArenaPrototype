(function(){
	VirtArenaControl.ObjectController = {
		selectedUnit:'',
		movementStepDelay:250,
		activationOrder:[],
		currentVirtActivating:'',
		setVirtTile: function(virt,tile){
			virt.tile = tile;
			tile.virt = virt;
		},
		selectVirt: function(virt){
			for(var i in VirtArenaControl.Virts.virts){
				if(VirtArenaControl.Virts.virts[i] === virt){
					this.selectedUnit = VirtArenaControl.Virts.virts[i];
					return;
				}
			}
		},
		resetSelectedObject: function(){
			if(this.selectedUnit) this.selectedUnit = '';
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
				virts[i].stanceSelected = '';
			}
		},
		resetWeaponSelected: function(){
			var virts = VirtArenaControl.Virts.virts;
			for(var i in virts){
				virts[i].weaponSelected = '';
			}
		},
		resetActivationOrder: function(){
			this.activationOrder = [];
			this.currentVirtActivating = '';
		},
		setVirtStance: function(virt,stanceNumber){
			virt.setStance("stance" + stanceNumber);
			VirtArenaControl.Buttons.removeButton('selectStance');
			VirtArenaControl.TurnController.nextPhase();
		},
		selectCommanderVirt: function(virt,team){
			VirtArenaControl.Virts.teams[team].addCommander(virt);
			VirtArenaControl.Buttons.removeButton('selectVirt');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		}
	};
})();