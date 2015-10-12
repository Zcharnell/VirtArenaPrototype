function Ability(initVars){
	this.name = ''; 		//name of ability
	this.type = ''; 		//attack, defense, etc
	this.cost = 0; 		//cost of the ability
	this.desc = ''; 	//ability description
	this.desc2 = '';			//description for second form
	this.desc3 = '';			//description for third form
	this.forms = 1;			//number forms (basic attack ability has 3 forms for example, based on stance)
	this.currentForm = 1;	//current form

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}


	this.setCurrentForm = function(inForm){
		currentForm = inForm;
	}

	this.getCurrentDesc = function(){
		switch(currentForm){
			case 1:
				return desc;
				break;
			case 2:
				return desc2;
				break;
			case 3:
				return desc3;
				break;
		}
	}

}