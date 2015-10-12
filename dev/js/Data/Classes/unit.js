
function Unit(){
	this.setStartingVars = function(){
		// this.speed = 0;
		this.HP = 200;
		this.totalHP = 200;
		this.previousHP = 200;
		this.HPPercent = 100;
		this.energy = 90;
		this.energyExtra = 30;
		// this.capacityLimit = 0;
		// this.capacity = 0;
		// this.supply = 0;
		this.name = '';
		this.virtType = '';
		this.virtClassType = '';
		this.isAlive = true;
		this.weapons = {};
		this.stances = {};
		this.stanceSelected = '';
		this.lastStanceSelected = '';
		this.weaponSelected = {};
		this.team = '';

		//virts
		this.energy = 90;
		this.energyExtra = 30;
		this.capacityLimit = 0;
		this.capacity = 0;
		this.supply = 0;

		this.turnStats = {
			speed: 0,
			move: 0,
			defense: 0,
			evasion: 0,
			stability: 0,
			deflect: 0,
			power: 0,
			range: 0,
			penetration: 0,
			impact: 0,
			deflect: 0,
			rapidFire: 0,
			vampiric: false,			//Attacks heal the virt for half of the damage done
			attackVulnerability: 0,	//reduces defense of target virt by this amount when next attacked
			attackWeakness: 0,		//reduces power of target virt by this amount when next attacking
			attackSlow: false,		//reduces speed of target virt by 2 for their next activation (changes activation order if they havent activated, otherwise affects the next stance selection phase)
			attackDisable: 0,			//reduces move of target virt by 1 next activation
			vulnerability: 0,			//Lowers defense by the value of Vulnerability
			weakness: 0,				//Lowers power by the value of Weakness
			slow: 0,					//Speed -2
			slowUsed: false,			//Checks whether the slow has reduced the virt's speed. Makes it so that the virt cant be slowed twice
			disable: 0,				//Move -1
			resilience: -1, 			//max damage taken per attack, if 0 or higher
			attackBlast: false,		//Attack causes damage to all enemies adjacent to the target
			attackLineOfFire: false,	//Attack causes damage to all enemies in the line of fire (and maybe blast those hexes too)
			isStunned: false,
			stunnedThisAttack: false,
			stunnedThisTurn: false,
			movedThisTurn: false,
			moveRangeLeast: 0,
			moveRangeMax: 0,
			hasActivated: false,
			isVersatile: false,		//Can attack before moving
			attackBeforeMove: false,
			weapon1Used: false,
			weapon2Used: false
		}

		//Knights Challenge (Lancer)
		this.knightChallenger = '';
		this.knightChallengeTurn = 0;

		//for drawing
		this.tile = {};
	};

	this.draw = function(){
		if(this.name === VirtArenaControl.ObjectController.selectedUnit.name) {
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "30px Arial";
			VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
			VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Units.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			VirtArenaControl.Graphics.ctx.fillRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			VirtArenaControl.Graphics.ctx.fillStyle = 'white';
			VirtArenaControl.Graphics.ctx.fillText(this.name[0],this.tile.x+this.tile.width/2,this.tile.y+this.tile.height*0.75);
		} else {
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.font = "30px Arial";
			VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Units.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeStyle = VirtArenaControl.Units.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			var fillText = {
				text:this.name[0],
				x:this.tile.x+this.tile.width/2,
				y:this.tile.y+this.tile.height*0.75,
				color:'#9F9F9F',
				blur:5,
				offsetX:0,
				offsetY:1
			}
			VirtArenaControl.Graphics.fillTextWithShadow(fillText.text,fillText.x,fillText.y,fillText.color,fillText.blur,fillText.offsetX,fillText.offsetY);
			VirtArenaControl.Graphics.ctx.strokeStyle = "#999";
			VirtArenaControl.Graphics.ctx.lineWidth = 1;
			VirtArenaControl.Graphics.ctx.strokeText(fillText.text,fillText.x,fillText.y);
		}
	};

	this.setStance = function(stanceKey){
		var stance = this.stances[stanceKey];
		var keys = Object.keys(stance);
		this.stanceSelected = stanceKey;

		for(var i in keys){
			this.turnStats[keys[i]] = stance[keys[i]];
		}

		//--OPTIMIZE THIS: speed should be reduced by stun
		if(this.turnStats.slow > 0){
			this.turnStats.speed -= this.turnStats.slow;
			this.turnStats.slowUsed = true;
			if(this.turnStats.speed < 0){
				this.turnStats.speed = 0;
			}
		}

		if(this.turnStats.disable > 0){
			this.turnStats.move -= this.turnStats.disable;
			if(this.turnStats.move < 0){
				this.turnStats.move = 0;
			}
		}
		// if(this.turnStats.isStunned){
		// 	this.turnStats.defense -= stunDefenseVal;
		// }
		this.unitStanceAffectingVariables();
	}

	this.setWeapon = function(numWeapon){
		var weapon = this.weapons["weapon"+numWeapon];
		var keys = Object.keys(weapon);

		for(var i in keys){
			this.weaponSelected[keys[i]] = weapon[keys[i]];
		}

		this.turnStats["weapon"+numWeapon+"Used"] = true;

		// if(this.turnStats.isStunned){
		// 	this.weaponSelected.power -= stunPowerVal;
		// }
		this.unitTypeSpecialValues();
	}

	this.getWeaponRange = function(){
		var range = 0;

		if(this.weaponSelected){
			range = this.weaponSelected.range;
		} else {
			var keys = Object.keys(this.weapons);
			for(var i in keys){
				if(range < this.weapons[keys[i]].range)
					range = this.weapons[keys[i]].range;
			}
		}

		return range;
	};

	this.getDamageAndStatsForAttacking = function(){
		var diceRolls = this.rollDamage();
		var penetration = this.weaponSelected.penetration;
		var impact = this.weaponSelected.impact;

		var obj = {
			damage: diceRolls.damage,
			critDamage: diceRolls.critDamage,
			damageDice: diceRolls.damageDice,
			critDice: diceRolls.critDice,
			penetration: penetration,
			impact: impact
		};

		return obj;
	};

	this.rollDamage = function(){
		//set power equal to the selected weapon's power
		//LATER: change power here based on other variables, like stun
		var power = this.weaponSelected.power;
		var diceRolls = {
			damage:0,
			critDamage:0,
			damageDice: [],
			critDice: []
		};
		for(var i=0; i<power; i++){
			var roll = Scripts.rollDamageDie();
			if(roll.crit) {
				diceRolls.critDice.push(roll.roll);
				diceRolls.critDamage += roll.roll;
			} else {
				diceRolls.damageDice.push(roll.roll);
				diceRolls.damage += roll.roll;
			}
		}

		return diceRolls;
	};
	
	this.takeDamage = function(obj){
		//damage,diceArray,pen,maxDamage
		/*
			damage: diceRolls.damage,
			critDamage: diceRolls.critDamage,
			damageDice: diceRolls.damageDice,
			critDice: diceRolls.critDice,
			penetration: penetration,
			impact: impact
		*/

		var damage = obj.damage;
		var critDamage = obj.critDamage;
		var damageDice = obj.damageDice;
		var critDice = obj.critDice;
		var penetration = obj.penetration;
		var impact = obj.impact;

		var tempDefense = this.turnStats.defense;
		console.log(obj);
		console.log(tempDefense);
		this.previousHP = this.HP;
		
		// if(damage > maxDamage){
		// 	damage = maxDamage;	
		// }
		// if(this.vulnerability > 0){
		// 	var defenseAfterVuln = getVulnerabilityPercent(tempDefense,this.vulnerability);
		// 	var vulnDeduction = tempDefense - defenseAfterVuln;
		// 	tempDefense = defenseAfterVuln;
		// 	console.log('Vulnerability ' + this.vulnerability + '%: Defense reduced by ' + vulnDeduction + '; New Defense: ' + tempDefense);
		// 	this.vulnerability = 0;
		// }
		if(penetration > 0){
			tempDefense -= penetration;
			// console.log('Penetration ' + penetration + ': Defense reduced to ' + tempDefense);
		}

		if(tempDefense < 0){
			tempDefense = 0;
			// console.log('Defense reduced below 0. Defense set to 0.');
		}
		
		var damageTaken = damage - tempDefense;
		if(damageTaken < 0) damageTaken = 0;
		damageTaken += critDamage;
		// console.log('damage taken after defense before resilience: ' + damageTaken);
		// if(damageTaken > this.resilience && this.resilience > -1){
		// 	damageTaken = this.resilience;
		// 	this.HP -= damageTaken;
		// 	console.log('Resilience reduces damage to: (' + damageTaken + ')');
		// }
		if(damageTaken > 0){
			this.HP -= damageTaken;
		}
		else{
			damageTaken = 0;
		}
		
		// console.log('damage taken: ' + damageTaken);
		console.log('PreviousHP:' + this.previousHP + '; NewHP: ' + this.HP);
		
		// showDamageCanvas(this.currentHex.xpos,this.currentHex.ypos,damageTaken);		
		//this.returnDamage(damageTaken,diceArray,damage,critDamage,critDamageFinal,pen,imp,newlyStunned,tempDefense);
		// return damageTaken;
	}
	
	this.takeStabilityDmg = function(damage){
		var tempStability = this.stability;
		console.log('Stability Dmg');
		console.log('Stability: ' + tempStability);
		console.log('Damage: ' + damage);

		var damageStabTaken = damage - tempStability;
		console.log('Damage after Stability: ' + damageStabTaken);
		if(damageStabTaken > 0){
			if(this.isStunned === false){
				console.log(this.name + ' Stunned!');
				this.isStunned = true;
				this.defense -= stunDefenseVal;
				this.power -= stunPowerVal;
				showStunCanvas(this.currentHex.xpos,this.currentHex.ypos);
			}
			this.stunThisTurn = true;
			this.stunThisAttack = true;
		}
		return damageStabTaken;
	}
	
	this.percentHPBar = function(){	
		if(this.previousHP != this.HP){
			this.previousHP = this.HP;
			this.HPPercent = Math.round((this.HP/this.totalHP)*100);
			console.log('Percent HP: ' + this.HPPercent + '%');
		}
	}

	// this.setDead = function(unitName,deadhex){
	// 	//set isAlive and remove the virt from the board
	// 	this.isAlive = false;
	// 	setCurrentHex(unitName,deadhex);

	// 	//Adjust virtArray so that this virt is not in the array
	// 	var j;
	// 	var tempVirtArray = [];
	// 	for(var i=0; i<virtArray.length; i++){
	// 		if(virtArray[i] === virtName){
	// 			j = i;
	// 		}
	// 	}
	// 	for(var i=0; i<j; i++){
	// 		tempVirtArray[i] = virtArray[i];
	// 	}
	// 	for(var i=(j+1); i<virtArray.length; i++){
	// 		tempVirtArray[i-1] = virtArray[i];
	// 	}
	// 	virtArray = [];
	// 	virtArray = tempVirtArray;

	// 	//Remove this virt from the activation order if it has not activated yet
	// 	tempVirtArray = [];
	// 	for(var i=0; i<virtActivationOrder.length; i++){
	// 		if(virtActivationOrder[i] === virtName){
	// 			j = i;
	// 		}
	// 	}
	// 	if(j>currentVirtActivating){
	// 		for(var i=0; i<j; i++){
	// 			tempVirtArray[i] = virtActivationOrder[i];
	// 		}
	// 		for(var i=(j+1); i<virtActivationOrder.length; i++){
	// 			tempVirtArray[i-1] = virtActivationOrder[i];
	// 		}
	// 		virtActivationOrder = [];
	// 		virtActivationOrder = tempVirtArray;
	// 		finalVirtActivation -= 1;
	// 		updateVirtActivationOrderDisplay(currentVirtActivating);
	// 		activationOrderBarUpdate();
	// 	}
	// 	if(j<=currentVirtActivating){
	// 		for(var i=0; i<j; i++){
	// 			tempVirtArray[i] = virtActivationOrder[i];
	// 		}
	// 		for(var i=(j+1); i<virtActivationOrder.length; i++){
	// 			tempVirtArray[i-1] = virtActivationOrder[i];
	// 		}
	// 		virtActivationOrder = [];
	// 		virtActivationOrder = tempVirtArray;
	// 		currentVirtActivating -= 1;
	// 		finalVirtActivation -= 1;
	// 		updateVirtActivationOrderDisplay(currentVirtActivating);
	// 		activationOrderBarUpdate();
	// 	}
	// }

	this.unitStanceAffectingVariables = function(){};
	this.unitTypeSpecialValues = function(){};

}





