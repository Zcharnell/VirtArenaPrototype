
function Weapon(initVars){
	this.name = '';
	this.number = 0;
	this.power = 0;
	this.range = 0;
	this.penetration = 0;
	this.impact = 0;
	this.targetInRange = false;
	this.special = '';
	this.used = false;

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}
	
	this.displayWeaponStats = function(){
		var returnString = '';
		console.log('\nWeapon Stats Logging');
		console.log('Name: ' + name);
		console.log('Power: ' + power);
		console.log('Range: ' + range);
		console.log('Penetration: ' + penetration);
		console.log('Impact: ' + impact);
		//The return string should include all necessary values that are relevant to the weapon. If a weapon normally does not have penetration, don't retrun it. This can be done by adding things to the return string as they are determined to be necessary or not.
		returnString += ('Weapon: ' + name + '<br>Power: ' + power + '<br>Range: ' + range);
		if(penetration > 0){
			returnString += ('<br>Penetration: ' + penetration);
		}
		if(impact > 0){
			returnString += ('<br>Impact: ' + impact);
		}
		if(name === "Lance"){
			returnString += ('<br>+10 Penetration After Moving');
		}
		return returnString;
	}

	this.displayWeaponStatsTooltip = function(){
		var returnString = '';
		//The return string should include all necessary values that are relevant to the weapon. If a weapon normally does not have penetration, don't retrun it. This can be done by adding things to the return string as they are determined to be necessary or not.
		returnString += ('Weapon: ' + name + '<br />Power: ' + power + '<br />Range: ' + range);
		if(penetration > 0){
			returnString += ('<br />Penetration: ' + penetration);
		}
		if(impact > 0){
			returnString += ('<br />Impact: ' + impact);
		}
		if(name === "Lance"){
			returnString += ('<br />+10 Penetration After Moving');
		}
		return returnString;
	}
}

