function Arturius(){
	this.setStartingVars();

	this.name = 'Arturius';
	this.unitType = 'Arturius';
	this.unitClass = 'Commander';
	this.unitArt = VirtArenaControl.Images.arturiusUnitArt;
	this.HP = 200;
	this.totalHP = 200;
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 120;
	this.supply = 480;
	this.powerNextAttackThisTurn = false;
	this.penetrationNextTurn = false;
	
//Weapons
	var weapon1 = {
		name:"Melee",
		number:1,
		power:30,
		range:1,
		penetration:80,
	}
	var weapon2 = {
		name:"Ranged",
		number:2,
		power:50,
		range:5,
		penetration:40,
		special:"Power -20 at Range 1"
	}
	this.weapons.weapon1 = new Weapon(weapon1);
	this.weapons.weapon2 = new Weapon(weapon2);

//Stances
	var stance1 = {
		name:"Fast",
		desc:"May Move 2 once at any point during its activation if within Range 1 of an enemy.",
		number:1,
		speed:60,
		move:2,
		defense:40,
		stability:0,
		evasion:50,
		misc:"Move 2 if Range 1 of enemy"
	};
	var stance2 = {
		name:"Neutral",
		desc:"Versatile. Dual Wield (may use both Weapons).",
		number:2,
		speed:40,
		move:2,
		defense:40,
		stability:0,
		evasion:40,
		versatile:true,
		dualWield:true
	};
	var stance3 = {
		name:"Reactive",
		desc:"Deflect +40. Reveal: Move 1",
		number:3,
		speed:01,
		move:1,
		defense:10,
		stability:40,
		evasion:60,
		deflect:40,
		reveal:"Move 1"
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	this.stances.stance3 = new Stance(stance3);

	
	this.unitTypeSpecialValues = function(){
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
		console.log('Unit Type ' + this.unitType + ' special values from stances/weapon/etc added to stat values.');
	}
}

Arturius.prototype = new Unit();