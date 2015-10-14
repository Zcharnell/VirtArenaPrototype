
function Stance(initVars){
	this.name = '';
	this.number = 0;
	this.speed = 0;
	this.move = 0;
	this.defense = 0;
	this.evasion = 0;
	this.stability = 0;
	this.deflect = 0;
	this.versatile = false;
	this.vampiric = false;
	this.penetration = 0;
	this.rapidFire = 0;
	this.impact = 0;
	this.dualWield = false;
	this.precision = false;
	this.reveal = "none";
	this.misc = "none";
	this.desc = '';

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}

}

