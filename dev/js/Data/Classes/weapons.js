
function Weapon(inName,inPwr,inRng,inPen){
	var name = inName;
	var power = inPwr;
	var range = inRng;
	var penetration = inPen;
	var impact = 0;
	this.targetInRange = false;

	this.setPenetration = function(inPen2){
		penetration = inPen2;
	}
	
	this.setImpact = function(inImp){
		impact = inImp;
	}
	
	this.getName = function(){
		return name;
	}
	
	this.getPower = function(){
		return power;
	}
	
	this.getRange = function(){
		return range;
	}
	
	this.getPenetration = function(){
		return penetration;
	}
	
	this.getImpact = function(){
		return impact;
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

