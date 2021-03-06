function Imperator(){
	this.setStartingVars();
	
	this.name = 'Imperator';
	this.unitType = 'Imperator';
	this.unitClass = 'Commander';
	this.unitArt = VirtArenaControl.Images.imperatorUnitArt;
	this.HP = 300;
	this.totalHP = 300;
	this.previousHP = 300;
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 100;
	this.supply = 400;
	this.speed = 0;
	this.range = 0;
	this.irradiateDamageTarget = false;

	// this.animation.idle = {
	// 	frames: 4,
	// 	duration: 8,
	// 	yIndex: 0
	// }

//Weapons
	var weapon1 = {
		name:"Melee",
		number:1,
		power:60,
		range:1,
		penetration:60,
		special:"Power -20 if target moved"
	}
	var weapon2 = {
		name:"Ranged",
		number:2,
		power:40,
		range:3,
		penetration:20,
		impact:20
	}
	this.weapons.weapon1 = new Weapon(weapon1);
	this.weapons.weapon2 = new Weapon(weapon2);

//Stances
	var stance1 = {
		name:"Fast",
		desc:"May Push 1 or Pull 1 target enemy within Range 1 after moving.",
		number:1,
		speed:50,
		move:2,
		defense:50,
		stability:60,
		evasion:10,
		misc:"Push 1 or Pull 1 if Range 1 of enemy after moved"
	};
	var stance2 = {
		name:"Neutral",
		desc:"Vampiric",
		number:2,
		speed:20,
		move:1,
		defense:50,
		stability:80,
		evasion:10,
		vampiric:true
	};
	var stance3 = {
		name:"Tank",
		desc:"Immune to Stun",
		number:3,
		speed:10,
		move:2,
		defense:100,
		stability:999,
		evasion:5,
		special:"Immune to Stun"
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	this.stances.stance3 = new Stance(stance3);
}

Imperator.prototype = new Unit();