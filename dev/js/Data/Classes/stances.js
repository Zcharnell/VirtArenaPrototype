
function Stance(name,number,speed,move,defense,stability,evasion){
	var name = name;
	var number = number;
	var speed = speed;
	var move = move;
	var defense = defense;
	var evasion = evasion;
	var stability = stability;
	var deflect = 0;
	var isVersatile = false;
	var vampiric = false;
	var penetration = 0;
	var rapidFire = 0;
	var impact = 0;
	var stanceDesc = '';

	this.setDeflect = function(inDeflect){
		deflect = inDeflect;
	}
	
	this.setVersatile = function(inVersatile){
		isVersatile = inVersatile;
	}

	this.setVampiric = function(inVampiric){
		vampiric = inVampiric;
	}

	this.setPenetration = function(inPenetration){
		penetration = inPenetration;
	}

	this.setRapidFire = function(inRapidFire){
		rapidFire = inRapidFire;
	}

	this.setImpact = function(inImpact){
		impact = inImpact;
	}

	this.setSpecialDesc = function(inSpecialDesc){
		stanceDesc = inSpecialDesc;
	}

	this.returnStance = function(){
		//order
		//0 = name
		//1 = number
		//2 = speed
		//3 = move
		//4 = defense
		//5 = stability
		//6 = deflect
		//7 = isVersatile
		//8 = vampiric
		//9 = penetration
		//10 = rapidFire
		//11 = impact
		//12 = stanceDesc
		//13 = evasion
		return [name,number,speed,move,defense,stability,deflect,isVersatile,vampiric,penetration,rapidFire,impact,stanceDesc,evasion];
	}

}

