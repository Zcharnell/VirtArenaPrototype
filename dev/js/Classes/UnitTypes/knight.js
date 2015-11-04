function Knight(){
	this.setStartingVars();

	this.name = 'Melee Strong';
	this.unitType = 'Knight';
	this.unitClass = 'Companion';
	this.unitArt = VirtArenaControl.Images.knightUnitArt;
	this.HP = 120;
	this.totalHP = 120;
	this.energy = 60;
	this.energyExtra = 20;
	
//Weapons
	var weapon1 = {
		name:"Greatsword",
		number:1,
		power:50,
		range:1,
		penetration:50,
	}
	this.weapons.weapon1 = new Weapon(weapon1);

//Stances
	var stance1 = {
		name:"Rush",
		desc:"-20 Penetration",
		number:1,
		speed:63,
		move:2,
		defense:50,
		stability:40,
		evasion:20,
		misc:"Penetration -20"
	};
	// var stance2 = {
	// 	name:"Pursuit",
	// 	desc:"+10 energy regen",
	// 	number:2,
	// 	speed:33,
	// 	move:2,
	// 	defense:50,
	// 	stability:40,
	// 	evasion:20
	// };
	var stance2 = {
		name:"Firm Footing",
		desc:"Cannot be Pushed or Pulled",
		number:3,
		speed:23,
		move:1,
		defense:60,
		stability:60,
		evasion:0,
		misc:"Immune to Push and Pull"
	};
	this.stances.stance1 = new Stance(stance1);
	this.stances.stance2 = new Stance(stance2);
	// this.stances.stance3 = new Stance(stance3);

}

Knight.prototype = new Unit();