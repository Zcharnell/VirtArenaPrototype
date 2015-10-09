
function Virt(){
	this.speed = 0;
	this.HP = 200;
	this.totalHP = 200;
	this.previousHP = 200;
	this.HPPercent = 100;
	this.energy = 90;
	this.energyExtra = 30;
	this.capacityLimit = 0;
	this.capacity = 0;
	this.supply = 0;
	this.name = 'Virt';
	this.virtType = 'Virt';
	this.virtClassType = 'Commander';
	this.player = 'Player';
	this.isAlive = true;
	this.playerNumber;
	this.teamCommanderName;
	this.teamNumber;
	this.enemyTeamNumber;
	this.activationNum;
	this.allyVirtsArrayLength;	//This is set to the number of indexes that are actually used in allyVirtsArray. If there are 2 ally virts, only [0][x] and [1][x] are virts
	this.enemyVirtsArrayLength;	//This is set to the number of indexes that are actually used in enemyVirtsArray. If there are 3 ally virts, only [0][x], [1][x], and [2][x] are virts
	this.allyVirtsArray = [['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999]];		//20 in the array; [0][0] is the virt object, [0][1] is the range of the virt in the array from the current virt
	this.enemyVirtsArray = [['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999],['',999]];	//20 in the array; [0][0] is the virt object, [0][1] is the range of the virt in the array from the current virt
	this.stanceNames = [];
	this.weapon1;
	this.weapon2;
	this.stance1;
	this.stance2;
	this.stance3;
	var stanceReturnArray = [];
	this.stanceChosen = 3;
	this.stanceChosenLast = 3;
	this.stanceChosenName = '';
	this.stanceChosenNameLast = '';
	this.stanceSelectedThisTurn = false;
	var abilityReturnArray = [];
	this.move = 0;
	this.defense = 0;
	this.evasion = 0;
	this.stability = 0;
	this.deflect = 0;
	this.power = 0;
	this.range = 0;
	this.maxRange = 0;
	this.penetration = 0;
	this.impact = 0;
	this.deflect = 0;
	this.rapidFire = 0;
	this.isStunned = false;
	this.stunThisAttack = false;
	this.stunThisTurn = false;
	this.movedThisTurn = false;
	this.weaponSelected = [];
	this.currentWeapon;
	this.currentHex;
	this.otherVirtsArray = [];
	this.moveRangeLeast = 0;
	this.moveRangeMax = 0;
	this.enemyVirtsInMoveRange = [];
	this.enemyVirtsInMoveRangeMax = [];
	this.enemyVirtsInTargetRange = [];
	this.inActivationOrder = false;
	this.hasActivated = false;
	this.nextToAlly = false;
	this.nextToEnemy = false;
	this.isVersatile = false;		//Can attack before moving
	this.attackBeforeMove = false;
	this.weapon1Used = false;
	this.weapon2Used = false;
	this.vampiric = false;			//Attacks heal the virt for half of the damage done
	this.attackVulnerability = 0;	//reduces defense of target virt by this amount when next attacked
	this.attackWeakness = 0;		//reduces power of target virt by this amount when next attacking
	this.attackSlow = false;		//reduces speed of target virt by 2 for their next activation (changes activation order if they havent activated, otherwise affects the next stance selection phase)
	this.attackDisable = 0;			//reduces move of target virt by 1 next activation
	this.vulnerability = 0;			//Lowers defense by the value of Vulnerability
	this.weakness = 0;				//Lowers power by the value of Weakness
	this.slow = 0;					//Speed -2
	this.slowUsed = false;			//Checks whether the slow has reduced the virt's speed. Makes it so that the virt cant be slowed twice
	this.disable = 0;				//Move -1
	this.resilience = -1; 			//max damage taken per attack, if 0 or higher
	this.attackBlast = false;		//Attack causes damage to all enemies adjacent to the target
	this.attackLineOfFire = false;	//Attack causes damage to all enemies in the line of fire (and maybe blast those hexes too)

	//abilities and effects from abilities
	this.basicAttackAbilityUsed = false;
	this.basicDefenseAbilityUsed = false;
	this.ability1Used = false;
	this.ability2Used = false;
	this.ability3Used = false;
	this.ability4Used = false;
	this.numAbilites = 0;
	this.numCombatAtkAbilities = 0;
	this.numCombatDefAbilities = 0;

	//Knights Challenge (Lancer)
	this.knightChallenger = '';
	this.knightChallengeTurn = 0;

	//for drawing
	this.tile = {};

	this.draw = function(){
		if(this.name === VirtArenaControl.ObjectController.selectedVirt.name) {
			VirtArenaControl.Graphics.ctx.font = "20px Arial";
			var offset = VirtArenaControl.Graphics.ctx.measureText(this.name[0]).width/2;
			VirtArenaControl.Graphics.ctx.strokeStyle = 'black';
			VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Virts.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			VirtArenaControl.Graphics.ctx.fillRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			VirtArenaControl.Graphics.ctx.fillStyle = 'white';
			VirtArenaControl.Graphics.ctx.fillText(this.name[0],this.tile.x+this.tile.width/2-offset,this.tile.y+this.tile.height*0.75);
		} else {
			VirtArenaControl.Graphics.ctx.font = "20px Arial";
			var offset = VirtArenaControl.Graphics.ctx.measureText(this.name[0]).width/2;
			VirtArenaControl.Graphics.ctx.fillStyle = VirtArenaControl.Virts.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeStyle = VirtArenaControl.Virts.teams[this.team].color;
			VirtArenaControl.Graphics.ctx.strokeRect(this.tile.x,this.tile.y,this.tile.width,this.tile.height);
			VirtArenaControl.Graphics.ctx.fillText(this.name[0],this.tile.x+this.tile.width/2-offset,this.tile.y+this.tile.height*0.75);
		}
	};

	this.setStanceArray = function(stanceNumber){
		switch(stanceNumber) {
			case 1:
				stanceReturnArray = this.stance1.returnStance();
				break;
			case 2:
				stanceReturnArray = this.stance2.returnStance();
				break;
			case 3:
				stanceReturnArray = this.stance3.returnStance();
				break;
		}
	}

	this.setAbilityArray = function(inAbility){
		abilityReturnArray = inAbility.returnAbility();
	}

	this.setStance = function(stanceNumber){
		switch(stanceNumber) {
			case 1:
				this.setStanceArray(1);
				break;
			case 2:
				this.setStanceArray(2);
				break;
			case 3:
				this.setStanceArray(3);
				break;
		}

		this.stanceChosenName = stanceReturnArray[0];
		this.stanceChosen = stanceReturnArray[1];
		//--OPTIMIZE THIS: speed should be reduced by stun
		this.speed = stanceReturnArray[2];
		if(this.slow > 0){
			this.speed -= this.slow;
			this.slowUsed = true;
			if(this.speed < 0){
				this.speed = 0;
			}
		}
		this.move = stanceReturnArray[3];
		if(this.disable > 0){
			this.move -= this.disable;
			if(this.move < 0){
				this.move = 0;
			}
		}
		this.moveRangeLeast = 1;
		this.moveRangeMax = 2;
		this.defense = stanceReturnArray[4];
		if(this.isStunned){
			this.defense -= stunDefenseVal;
		}
		this.stability = stanceReturnArray[5];
		this.deflect = stanceReturnArray[6];
		this.isVersatile = stanceReturnArray[7];
		this.vampiric = stanceReturnArray[8];
		this.penetration = stanceReturnArray[9];
		this.rapidFire = stanceReturnArray[10];
		this.impact = stanceReturnArray[11];
		this.evasion = stanceReturnArray[13];
		this.virtStanceAffectingVariables();

	}

	this.getStance = function(stanceNumber){
		var returnString = '';

		switch(stanceNumber) {
			case 0:
				this.setStanceArray(1);
				returnString += ('<span style="font-size:16px">' + stanceReturnArray[0] + "</span><br/>Speed: " + stanceReturnArray[2] + " - Move: " + stanceReturnArray[3] + "<br />Defense: " + stanceReturnArray[4] + " - Evasion: " + stanceReturnArray[13] + "% - Stability: " + stanceReturnArray[5]);
				if(stanceReturnArray[12] != ''){
					returnString += ('<br />---------<br />' + stanceReturnArray[12]);
				}
				return returnString;
				break;
			case 1:
				this.setStanceArray(2);
				returnString += ('<span style="font-size:16px">' + stanceReturnArray[0] + "</span><br/>Speed: " + stanceReturnArray[2] + " - Move: " + stanceReturnArray[3] + "<br />Defense: " + stanceReturnArray[4] + " - Evasion: " + stanceReturnArray[13] + "% - Stability: " + stanceReturnArray[5]);
				if(stanceReturnArray[12] != ''){
					returnString += ('<br />---------<br />' + stanceReturnArray[12]);
				}
				return returnString;
				break;
			case 2:
				this.setStanceArray(3);
				returnString += ('<span style="font-size:16px">' + stanceReturnArray[0] + "</span><br/>Speed: " + stanceReturnArray[2] + " - Move: " + stanceReturnArray[3] + "<br />Defense: " + stanceReturnArray[4] + " - Evasion: " + stanceReturnArray[13] + "% - Stability: " + stanceReturnArray[5]);
				if(stanceReturnArray[12] != ''){
					returnString += ('<br />---------<br />' + stanceReturnArray[12]);
				}
				return returnString;
				break;
			default:
				return("Undefined stance number");
		}
	}

	this.getStanceName = function(stanceNumber){
		var returnString = '';

		switch(stanceNumber) {
			case 0:
				this.setStanceArray(1);
				returnString += (stanceReturnArray[0]);
				return returnString;
				break;
			case 1:
				this.setStanceArray(2);
				returnString += (stanceReturnArray[0]);
				return returnString;
				break;
			case 2:
				this.setStanceArray(3);
				returnString += (stanceReturnArray[0]);
				return returnString;
				break;
			default:
				return("Undefined stance number");
		}
	}

	this.setWeapon = function(numWeapon){
		if(numWeapon === 1){
			this.weaponSelected = [this.weapon1.getName(),this.weapon1.getPower(),this.weapon1.getRange(),this.weapon1.getPenetration(),this.weapon1.getImpact()];
		}
		else if(numWeapon === 2){
			this.weaponSelected = [this.weapon2.getName(),this.weapon2.getPower(),this.weapon2.getRange(),this.weapon2.getPenetration(),this.weapon2.getImpact()];
		}
		this.currentWeapon = this.weaponSelected[0];
		this.power = this.weaponSelected[1];
		if(this.isStunned){
			this.power -= stunPowerVal;
		}
		this.range = this.weaponSelected[2];
		this.penetration = this.weaponSelected[3];
		this.impact = this.weaponSelected[4];
		this.virtTypeSpecialValues();
	}
	
	this.getWeaponName = function(numWeapon){
		if(numWeapon === 1){
			return this.weapon1.getName();
		}
		else if(numWeapon === 2){
			return this.weapon2.getName();
		}
	}

	this.getWeapon = function(numWeapon){
		if(numWeapon === 1){
			return this.weapon1;
		}
		else if(numWeapon === 2){
			return this.weapon2;
		}
	}
	
	this.displayWeaponStats = function(numWeapon){
		if(numWeapon === 1){
			return this.weapon1.displayWeaponStats();
		}
		else if(numWeapon === 2){
			return this.weapon2.displayWeaponStats();
		}
	}
	this.displayWeaponStatsTooltip = function(numWeapon){
		if(numWeapon === 1){
			return this.weapon1.displayWeaponStatsTooltip();
		}
		else if(numWeapon === 2){
			return this.weapon2.displayWeaponStatsTooltip();
		}
	}

	
	this.takeDamage = function(damage,diceArray,pen,maxDamage){
		var tempDefense = this.defense;
		this.previousHP = this.HP;
		console.log('damage rolled: ' + damage);
		if(damage > maxDamage){
			damage = maxDamage;
			console.log('damage after max damage applied: ' + damage);
		}
		if(this.vulnerability > 0){
			var defenseAfterVuln = getVulnerabilityPercent(tempDefense,this.vulnerability);
			var vulnDeduction = tempDefense - defenseAfterVuln;
			tempDefense = defenseAfterVuln;
			console.log('Vulnerability ' + this.vulnerability + '%: Defense reduced by ' + vulnDeduction + '; New Defense: ' + tempDefense);
			this.vulnerability = 0;
		}
		if(pen > 0){
			tempDefense -= pen;
			console.log('Penetration ' + pen + ': Defense reduced to ' + tempDefense);
		}

		if(tempDefense < 0){
			tempDefense = 0;
			console.log('Defense reduced below 0. Defense set to 0.');
		}
		
		var damageTaken = damage - tempDefense;
		console.log('damage taken after defense before resilience: ' + damageTaken);
		if(damageTaken > this.resilience && this.resilience > -1){
			damageTaken = this.resilience;
			this.HP -= damageTaken;
			console.log('Resilience reduces damage to: (' + damageTaken + ')');
		}
		else if(damageTaken > 0){
			this.HP -= damageTaken;
		}
		else{
			damageTaken = 0;
		}
		
		console.log('damage taken: ' + damageTaken);
		
		showDamageCanvas(this.currentHex.xpos,this.currentHex.ypos,damageTaken);		
		//this.returnDamage(damageTaken,diceArray,damage,critDamage,critDamageFinal,pen,imp,newlyStunned,tempDefense);
		return damageTaken;
		
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
	
	/*this.returnDamage = function(damageTaken,diceArray,damage,critDamage,critDamageFinal,pen,imp,newlyStunned,tempDefense){
		var returnString = '';
		//initalize and name
		returnString += ('<div class="logmessage"><span class="garamondBold">' + this.name + ' ');
		//HP
		returnString += ('HP: ' + this.previousHP);
		//Dice Roll
		returnString += ('<br>Dice Roll: ' + diceArray);
		//Damage calcs
		returnString += ('<br>Damage to ' + this.name + ': <br>' + damage + ' - ' + tempDefense + ' = ' + damageTaken);
			//Impact
		if(imp > 0 && damageTaken === imp){
			returnString += (' (Impact' + imp + ')');
		}
		//Stun calcs
			//Penetration
		if(pen > 0){
			returnString += ('<br>Stun to ' + this.name + ': <br>' + critDamage + '(Pen' + pen + ') - ' + this.stability + ' = ' + critDamageFinal);
		}
		else{
			returnString += ('<br>Stun to ' + this.name + ': <br>' + critDamage + ' - ' + this.stability + ' = ' + critDamageFinal);
		}
		if(newlyStunned){
			returnString += ('<br>Stunned!');
			this.takeStabilityDmg();
		}
		else{
			returnString += ('<br>Not stunned');
		}
		//Final Statements
		returnString += ('<br><br><span id="combatMessage">' + this.name + '</span>:<br>HP: <span id="combatMessage">' + this.HP + '</span><br>Status Effects:<br>Stun <span id="imporantMessage2">' + this.isStunned + '</span></span></div>');
		//Append to textbox
		console.log(returnString);
		//$('#textBox').append(returnString);
		
		//$('#textBox').append('<div class="logmessage"><span style="font-weight: bold; font-family:Garamond">' + this.name + ' HP: ' + this.previousHP + '<br>Dice Roll: ' + diceArray + '<br>Damage to ' + this.name + ': <br>' + damage + ' - ' + this.defense + ' = ' + damageTaken +'<br>Stun to ' + this.name + ': <br>' + critDamage + ' - ' + this.stability + ' = ' + critDamageFinal + '<br><br><span id="combatMessage">' + this.name + '</span>:<br>HP: <span id="combatMessage">' + this.HP + '</span><br>Stunned = <span id="combatMessage">' + stabStun + '</span></span></div>');
	}*/
	
	this.percentHPBar = function(){	
		if(this.previousHP != this.HP){
			this.previousHP = this.HP;
			this.HPPercent = Math.round((this.HP/this.totalHP)*100);
			console.log('Percent HP: ' + this.HPPercent + '%');
		}
	}

	this.virtStanceAffectingVariables = function(){

	}



	this.updateStatDisplay = function(){
		var returnString = '';
		returnString += ('Move: ' + this.move);
		//Defense
		returnString += ('<br>Defense: ' + this.defense);
		//Stability
		returnString += ('<br>Stability: ' + this.stability);
		//Stun level
		returnString += ('<br>Stunned: ' + this.isStunned);
		return returnString;
	}

	this.setDead = function(virtName,deadhex){
		//set isAlive and remove the virt from the board
		this.isAlive = false;
		setCurrentHex(virtName,deadhex);

		//Adjust virtArray so that this virt is not in the array
		var j;
		var tempVirtArray = [];
		for(var i=0; i<virtArray.length; i++){
			if(virtArray[i] === virtName){
				j = i;
			}
		}
		for(var i=0; i<j; i++){
			tempVirtArray[i] = virtArray[i];
		}
		for(var i=(j+1); i<virtArray.length; i++){
			tempVirtArray[i-1] = virtArray[i];
		}
		virtArray = [];
		virtArray = tempVirtArray;

		//Remove this virt from the activation order if it has not activated yet
		tempVirtArray = [];
		for(var i=0; i<virtActivationOrder.length; i++){
			if(virtActivationOrder[i] === virtName){
				j = i;
			}
		}
		if(j>currentVirtActivating){
			for(var i=0; i<j; i++){
				tempVirtArray[i] = virtActivationOrder[i];
			}
			for(var i=(j+1); i<virtActivationOrder.length; i++){
				tempVirtArray[i-1] = virtActivationOrder[i];
			}
			virtActivationOrder = [];
			virtActivationOrder = tempVirtArray;
			finalVirtActivation -= 1;
			updateVirtActivationOrderDisplay(currentVirtActivating);
			activationOrderBarUpdate();
		}
		if(j<=currentVirtActivating){
			for(var i=0; i<j; i++){
				tempVirtArray[i] = virtActivationOrder[i];
			}
			for(var i=(j+1); i<virtActivationOrder.length; i++){
				tempVirtArray[i-1] = virtActivationOrder[i];
			}
			virtActivationOrder = [];
			virtActivationOrder = tempVirtArray;
			currentVirtActivating -= 1;
			finalVirtActivation -= 1;
			updateVirtActivationOrderDisplay(currentVirtActivating);
			activationOrderBarUpdate();
		}


	}

}





