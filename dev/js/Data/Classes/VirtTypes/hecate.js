function Hecate(){
	this.setStartingVars();

	this.name = 'Hecate';
	this.virtType = 'Hecate';
	this.virtClassType = 'Companion';
	this.HP = 80;
	this.totalHP = 80;
	this.energy = 60;
	this.energyExtra = 20;
	
//Weapons
	var weapon1 = {
		name:"Gauss Rifle",
		number:1,
		power:30,
		range:6,
		penetration:30
	}
	this.weapons.weapon1 = new Weapon(weapon1);

//Stances
	var stance1 = {
		name:"Reposition",
		desc:"-2 Range",
		number:1,
		speed:77,
		move:2,
		defense:20,
		stability:30,
		evasion:60,
		misc:"Range -2"
	};
	var stance2 = {
		name:"Gunslinger",
		desc:"-2 Range",
		number:2,
		speed:47,
		move:1,
		defense:30,
		stability:50,
		evasion:30,
		misc:"Range -1"
	};
	var stance3 = {
		name:"Snipe",
		desc:"Precision",
		number:3,
		speed:27,
		move:0,
		defense:50,
		stability:40,
		evasion:0,
		precision:true
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	this.stances.stance3 = new Stance(stance3);

}

Hecate.prototype = new Unit();