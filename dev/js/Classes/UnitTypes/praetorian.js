function Praetorian(){
	this.setStartingVars();

	this.name = 'Defensive Ranged';
	this.unitType = 'Praetorian';
	this.unitClass = 'Companion';
	this.unitArt = VirtArenaControl.Images.praetorianUnitArt;
	this.HP = 100;
	this.totalHP = 100;
	this.energy = 60;
	this.energyExtra = 20;
	
//Weapons
	var weapon1 = {
		name:"Particle Carbines",
		number:1,
		power:30,
		range:4,
		penetration:20,
		special:"Impact +10 at Range 1"
	}
	this.weapons.weapon1 = new Weapon(weapon1);

//Stances
	var stance1 = {
		name:"Steady",
		desc:"+1 Rapidfire",
		number:1,
		speed:50,
		move:1,
		defense:30,
		stability:30,
		evasion:10,
		misc:"Rapidfire +1"
	};
	// var stance2 = {
	// 	name:"Advance",
	// 	desc:"+10 Impact",
	// 	number:2,
	// 	speed:30,
	// 	move:2,
	// 	defense:20,
	// 	stability:20,
	// 	evasion:20,
	// 	misc:"Impact +10"
	// };
	var stance2 = {
		name:"Guard",
		desc:"+10 Defense if within Range 1 of an ally",
		number:3,
		speed:20,
		move:1,
		defense:60,
		stability:40,
		evasion:0,
		misc:"Defense +10 if Range 1 of ally"
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	// this.stances.stance3 = new Stance(stance3);

}

Praetorian.prototype = new Unit();