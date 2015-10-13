(function(){
	
	VirtArenaControl.AI.Scripts.stanceSelection = function(team){
		for(var i in team.units){
			var randomStance = this.randomStance(team.units[i]);
			team.units[i].setStance(randomStance);
		}
	};

	VirtArenaControl.AI.Scripts.randomStance = function(virt){
		//random a stance
		//cannot random the lastStanceSelected
		var stances = Object.keys(virt.stances);
		var indexOfLastStanceSelected = stances.indexOf(virt.lastStanceSelected);
		if(indexOfLastStanceSelected != -1) stances.splice(indexOfLastStanceSelected,1);

		var random = Math.floor(Math.random()*stances.length);
		return stances[random];
	};
	
})();