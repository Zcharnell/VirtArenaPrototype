function Ability(name,type,cost,description){
	var name = name; 		//name of ability
	var type = type; 		//attack, defense, etc
	var cost = cost; 		//cost of the ability
	var desc = description; 	//ability description
	var desc2 = '';			//description for second form
	var desc3 = '';			//description for third form
	var forms = 1;			//number forms (basic attack ability has 3 forms for example, based on stance)
	var currentForm = 1;	//current form

	this.setDesc = function(inDesc){
		desc = inDesc;
	}
	this.setDesc2 = function(inDesc){
		desc2 = inDesc;
	}
	this.setDesc3 = function(inDesc){
		desc3 = inDesc;
	}

	this.setNumberOfForms = function(inFormsNumber){
		forms = inFormsNumber;
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
	this.getCurrentForm = function(){
		return currentForm;
	}
	this.getNumberOfForms = function(){
		return forms;
	}
	this.getName = function(){
		return name;
	}
	this.getNameTooltip = function(){
		return '<b style="font-size: 16px">' + name + '</b>';
	}
	this.getCost = function(){
		return cost;
	}
	

	this.returnAbility = function(){
		//order
		//0 = name
		//1 = type
		//2 = cost
		//3 = desc
		//4 = desc2
		//5 = desc3
		//6 = forms
		//7 = currentForm
		return [name,type,cost,desc,desc2,desc3,forms,currentForm];
	}

}