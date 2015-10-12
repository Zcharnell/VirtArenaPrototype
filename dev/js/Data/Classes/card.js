
function Card(initVars){
	this.name = '';
	this.desc = '';
	this.type = '';
	this.cost = 0;
	this.playable = [];
	this.effect = '';
	this.companion = {};
	this.ability = {};
	this.reveal = "none";
	this.misc = "none";

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}

}

