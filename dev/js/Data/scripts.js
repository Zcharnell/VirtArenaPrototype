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

	Scripts.sortUnitsBySpeed = function(a,b){
		if(a.turnStats.speed > b.turnStats.speed) return -1;
		if(a.turnStats.speed < b.turnStats.speed) return 1;
		//check which team has priority
		if(a.turnStats.speed === b.turnStats.speed && a.team.hasPriority) return -1;
		if(a.turnStats.speed === b.turnStats.speed && !a.team.hasPriority) return 1;
	};

	Scripts.rollDamageDie = function(){
		var roll = Math.floor(Math.random()*3); //return 0 1 2
		var crit = (Math.floor(Math.random()*2) && roll > 0) ? true : false; //return 0 1
		var dieRoll = {
			roll:roll,
			crit:crit
		}
		return dieRoll;
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