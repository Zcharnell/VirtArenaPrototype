(function(){
	Scripts.mouseInObject = function(object){
		var mouse = VirtArenaControl.Mouse;
		if(mouse.x >= object.x 
		  && mouse.x <= object.x+object.width
		  && mouse.y >= object.y
		  && mouse.y <= object.y+object.height) {
			return true;
		} else {
			return false;
		}
	};

	Scripts.sortVirtsBySpeed = function(a,b){
		if(a.speed > b.speed) return -1;
		if(a.speed < b.speed) return 1;
		//check which team has priority
		if(a.speed === b.speed && VirtArenaControl.Virts.teams[a.team].hasPriority) return -1;
		if(a.speed === b.speed && !VirtArenaControl.Virts.teams[a.team].hasPriority) return 1;
	};

	// Scripts.executeFunctionByName = function()(functionName, context /*, args */) {
	// 	var args = [].slice.call(arguments).splice(2);
	// 	var namespaces = functionName.split(".");
	// 	var func = namespaces.pop();
	// 	for(var i = 0; i < namespaces.length; i++) {
	//   	context = context[namespaces[i]];
	// 	}
	// 	return context[func].apply(this, args);
	// };
})();