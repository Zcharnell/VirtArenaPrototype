(function(){
	VirtArenaControl.Tooltips.tooltips = [];

	VirtArenaControl.Tooltips.newTooltip = function(obj,hoverObject){
		//tooltips can be made for any object, and will get the necessary information from the object itself
		var tooltip = new Tooltip(obj.getTooltip(),hoverObject);
		this.tooltips.push(tooltip);
		console.log(tooltip);
		return tooltip;
	};	

	VirtArenaControl.Tooltips.tooltipExists = function(tooltipType,tooltipIdentifier){
		var exists = false;

		for(var i in VirtArenaControl.Tooltips.tooltips){
			var tooltip = VirtArenaControl.Tooltips.tooltips[i];
			console.log(tooltipType,'+',tooltipIdentifier,'+',tooltip.type,'+',tooltip.id);
			if(tooltip.type === tooltipType && tooltip.id === tooltipIdentifier){
				exists = true;
			}
		}

		return exists;

		// var keys = Object.keys(VirtArenaControl.Tooltips.tooltips);
		// var index = -1;
		// switch(tooltipType){
		// 	case 'unit':
		// 		index = keys.indexOf('tooltipUnit' + tooltipIdentifier); //identifier is the unit's id
		// 		break;
		// }
		
		// if(index >= 0){
		// 	return true;
		// } else {
		// 	return false;
		// }
	};

	VirtArenaControl.Tooltips.removeTooltip = function(tooltipToRemove){
		var index = -1;

		for(var i in VirtArenaControl.Tooltips.tooltips){
			var tooltip = VirtArenaControl.Tooltips.tooltips[i];
			if(tooltip === tooltipToRemove){
				index = i;
			}
		}

		if(index >= 0){
			VirtArenaControl.Tooltips.tooltips.splice(index,1);
		}
	};
})();