function Imperator(){
	this.name = 'Imperator';
	this.virtType = 'Imperator';
	this.virtClassType = 'Commander';
	this.player = "AI";
	this.HP = 300;
	this.totalHP = 300;
	this.previousHP = 300;
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 100;
	this.supply = 400;
	this.speed = 0;
	this.stanceNames = ['Tackle','Vigorous','Indomitable'];
	this.range = 0;
	this.maxRange = 3;
	this.numCombatAtkAbilities = 2;
	this.numCombatDefAbilities = 2;
	this.irradiateDamageTarget = false;

//Weapon(name,power,range,penetration)
	this.weapon1 = new Weapon('Radiation Claw Grasp',60,1,60);
	//-20 Power if target virt has moved
	//--OPTIMIZE THIS: add in a description for weapons
	this.weapon2 = new Weapon('Particle Cannon Shot',40,3,20);
	this.weapon2.setImpact(20);

//Stance(name,number,speed,move,defense,stability,evasion)
	this.stance1 = new Stance('Tackle',0,50,2,50,60,10);
	this.stance1.setSpecialDesc('May Push 1 or Pull 1 target enemy within Range 1 after moving.');
	this.stance2 = new Stance('Vigorous',1,20,1,50,80,10);
	this.stance2.setSpecialDesc('Vampiric');
	this.stance2.setVampiric(true);
	this.stance3 = new Stance('Indomitable',2,10,2,100,999,5);
	this.stance3.setSpecialDesc('Immune to Stun');

//Ability(name,type,cost,description)
	this.basicAttackAbility = new Ability('Irradiate','attack',0,'Radiation Claw only; Target loses 30 HP');
	this.basicAttackAbility.setDesc2('Imperator gains 20 HP');
	this.basicAttackAbility.setDesc3('Target suffers Slow -20% (% NOT IMPLEMENTED)');
	this.basicAttackAbility.setNumberOfForms(3);

	this.basicDefenseAbility = new Ability('Absorb','defense',0,'Move 2 toward the attacker');
	this.basicDefenseAbility.setDesc2('+30 Deflect');
	this.basicDefenseAbility.setDesc3('Gain 30E');
	this.basicDefenseAbility.setNumberOfForms(3);

	this.numAbilities = 4;
	this.ability1 = new Ability('Crushing Claw','attack',0,'Range 1. Precision. Must discard one Stabilization Token. Target Virt suffers Disable and loses 40 HP.');
	this.ability2 = new Ability('Implacable','defense',0,"Lucius suffers Disable and cannot be Pushed or Pulled. +20 Defense. +2 Speed next turn.");
	this.ability3 = new Ability('Retribution','turn',0,'Lucius cannot be destroyed. When he activates, all Virts within Range 2 are struck by a Power 8 Attack. Ultimate');
	this.ability4 = new Ability('Radiation Burst','turn',0,'Lucius cannot be destroyed. When he activates, all Virts within Range 2 are struck by a Power 8 Attack. Ultimate');

	this.commanderAbility1 = new Ability('The Die is Cast','turn',0,'Each Praetorian may Move 2.');
	this.commanderAbility2 = new Ability('Strength and Honor','turn',0,'Lucius and Praetorians within Range 2 gain +10 Power and +10 Defense.');
	this.commanderAbility3 = new Ability('Unleash Hell','activation',0,'Range 5. Resolve one Power 30 attack for each Praetorian within range and sight of target Virt. These attacks do not cause Stun.');
	this.commanderAbility4 = new Ability('For Glory','turn',0,'Lucius and Praetorians gain +3 Speed. Ultimate');
	
	this.virtTypeSpecialValues = function(){
		switch(this.stanceChosen) {
			case 0:
				
				break;
			case 1:
				
				break;
			case 2:
				
				break;
			default:
				return("Undefined stance number");
		}
		console.log('Virt Type ' + this.virtType + ' special values from stances/weapon/etc added to stat values.');
	}

	this.virtStanceAffectingVariables = function(){
		
	}
}

Imperator.prototype = new Virt();