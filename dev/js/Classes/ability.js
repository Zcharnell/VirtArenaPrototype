function Ability(initVars){
	this.name = ''; 		//name of ability
	this.type = ''; 		//attack, defense, etc
	this.cost = 0; 		//cost of the ability
	this.desc = ''; 	//ability description
	this.user = '';
	this.target = '';

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}

}