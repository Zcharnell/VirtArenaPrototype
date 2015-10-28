function Lancer(){
	this.setStartingVars();

	this.name = 'Lancer';
	this.unitType = 'Lancer';
	this.unitClass = 'Companion';
	this.unitArt = VirtArenaControl.Images.lancerUnitArt;
	this.HP = 80;
	this.totalHP = 80;
	this.energy = 60;
	this.energyExtra = 20;
	
//Weapons
	var weapon1 = {
		name:"Lance",
		number:1,
		power:40,
		range:1,
		penetration:60,
	}
	this.weapons.weapon1 = new Weapon(weapon1);

//Stances
	var stance1 = {
		name:"Blur",
		desc:"+20 Penetration",
		number:1,
		speed:65,
		move:0,
		defense:10,
		stability:20,
		evasion:60,
		misc:"Penetration +20"
	};
	var stance2 = {
		name:"Advance",
		desc:"",
		number:2,
		speed:40,
		move:2,
		defense:15,
		stability:25,
		evasion:45
	};
	var stance3 = {
		name:"Joust",
		desc:"+10 Power, must move in a straight line",
		number:3,
		speed:20,
		move:3,
		defense:20,
		stability:30,
		evasion:30,
		misc:"Power +10"
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	this.stances.stance3 = new Stance(stance3);

}

Lancer.prototype = new Unit();