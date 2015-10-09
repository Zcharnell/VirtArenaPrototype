function Arturius(){
	this.name = 'Arturius';
	this.virtType = 'Arturius';
	this.virtClassType = 'Commander';
	this.player = "AI";
	this.HP = 200;
	this.totalHP = 200;
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 120;
	this.supply = 480;
	this.speed = 0;
	this.stanceNames = ['Force Recon','Dual Wield','Reactive'];
	this.range = 0;
	this.maxRange = 5;
	this.powerNextAttackThisTurn = false;
	this.penetrationNextTurn = false;
	this.basicDefense3Used = false;
	this.numCombatAtkAbilities = 1;
	this.numCombatDefAbilities = 2;
	
//Weapon(name,power,range,penetration)
	this.weapon1 = new Weapon('Saber Strike',30,1,80);
	this.weapon2 = new Weapon('V-Shield Beam',50,5,40);
	//--OPTIMIZE THIS: -20 power at range 1

//Stance(name,number,speed,move,defense,stability,evasion)
	this.stance1 = new Stance('Force Recon',0,60,2,40,0,50);
	this.stance1.setSpecialDesc('May Move 2 once at any point during its activation if within Range 1 of an enemy.');
	this.stance2 = new Stance('Dual Wield',1,40,2,40,0,40);
	this.stance2.setSpecialDesc('Versatile. May use both Weapons.');
	this.stance2.setVersatile(true);
	this.stance3 = new Stance('Reactive',2,30,1,10,40,60);
	this.stance3.setSpecialDesc('Deflect +40. Reveal: Move 1');
	this.stance3.setDeflect(40);

//Ability(name,type,cost,description)
	this.basicAttackAbility = new Ability('Pre-emptive Strike','attack',0,'+20 Power (doesn\'t increase max attack) against Virts that have not activated this turn');
	this.basicAttackAbility.setDesc2('+20 Power for its second attack this turn');
	this.basicAttackAbility.setDesc3('+20 Penetration next turn');
	this.basicAttackAbility.setNumberOfForms(3);

	this.basicDefenseAbility = new Ability('Flash','defense',0,'+40 Defense and +10 Deflect if Arturius has already activated this turn');
	this.basicDefenseAbility.setDesc2('Make a Power Roll with your Beam Saber and reduce the attack by the result');
	this.basicDefenseAbility.setDesc3('+20 Defense and +40 Stability');
	this.basicDefenseAbility.setNumberOfForms(3);

	this.numAbilities = 3;
	this.ability1 = new Ability('Riposte','defense',0,"+10 Defense. After resolving the attack, attack the Attacker with Energy Sword if it's within Range 1, even if Stunned.");
	this.ability2 = new Ability('Charged Shot','turn',0,'Catherine has -2 Move, Heavy Plasma Rifle gains Blast, and Fusion Tokens grant +10 Power per 2 tokens anted but do not grant Speed.');
	this.ability3 = new Ability('Supernova Cannon','turn',0,'Catherine has -2 Move, Heavy Plasma Rifle gains Blast and targets all spaces in its line of fire, and Fusion Tokens grant +10 Power per 2 tokens anted but do not grant Speed. Ultimate');

	this.commanderAbility1 = new Ability('Legend of Camelot','defense',0,'Lancer AIs teleport to unoccupied spaces within Range 1 of Catherine. They gain +20 Defnese when Blocking.');
	this.commanderAbility2 = new Ability('Loyal to the End','turn',0,'Lancer AIs gain +40 Stability. They lose all remaining HP at the end of the turn (Opponent does not receive VPs).');
	this.commanderAbility3 = new Ability('Return from Avalon','turn',0,'Lancers destroyed last turn revive immediately, do not grant VPs, and may be placed within Range 1 of Catherine. Ultimate');
	
	this.virtTypeSpecialValues = function(){
		if(this.powerNextAttackThisTurn){
			this.power += 20;
			this.powerNextAttackThisTurn = false;
			console.log('Pre-emptive Strike Stance 2: +20 Power next attack');
		}
		if(this.penetrationNextTurn && turnNumber > arturiusTempTurnNumber){
			this.penetration += 20;
			this.penetrationNextTurn = false;
			console.log('Pre-emptive Strike Stance 3: +20 Penetration next attack');
		}
		console.log('Virt Type ' + this.virtType + ' special values from stances/weapon/etc added to stat values.');
	}

	this.virtStanceAffectingVariables = function(){
		if(this.ability2Used){
			this.move -= 2;
		}
		if(this.ability3Used){
			this.move -= 2;
		}
	}
}

Arturius.prototype = new Virt();