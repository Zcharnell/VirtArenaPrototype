(function(){
	
	VirtArenaControl.Interaction.mouseDownHandler = function(e){
		// console.log('mouse'+e.button+' down');

		var hoveredObj = VirtArenaControl.Updater.hoveredObjects[0];
		if(e.button === 0){
			if(hoveredObj){
				// console.log(hoveredObj);
				hoveredObj.onClick();
			} else {
				VirtArenaControl.ObjectController.resetSelectedObject();
			}
		}
	}
	
})();