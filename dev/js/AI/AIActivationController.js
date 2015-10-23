(function(){
	
	 ///////////////////////////////////////////////////////////
	//AI Movement

	VirtArenaControl.AI.Scripts.aiActivationControl = function(aiUnit){
		 /////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		////// Get variables for use in the AI functions \\\\\\\
		VirtArenaControl.ObjectController.setTileMoveCosts(aiUnit);
		VirtArenaControl.ObjectController.setTileRangeForWeapons(aiUnit);
		var aiObj = {};
		var enemyTeam = {
			team: VirtArenaControl.AI.Scripts.getEnemyTeam(aiUnit)
		};
		enemyTeam.units = enemyTeam.team.units;
		enemyTeam.unitDistances = VirtArenaControl.AI.Scripts.getMoveDistanceFromUnits(aiUnit,enemyTeam.units);

		 ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\
		/////////        Determine state         \\\\\\\\\\
		aiObj.state = VirtArenaControl.AI.Scripts.determineAIState(aiUnit,enemyTeam);
		aiUnit.ai.state = aiObj.state;

		 ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\
		//////   Determine target unit & tile    \\\\\\\\\\
		aiObj.targets = VirtArenaControl.AI.Scripts.determineAITargetTile(aiUnit,enemyTeam,aiObj);
		aiUnit.ai.targetUnit = aiObj.targets.unit.unit;
		aiUnit.ai.targetTile = aiObj.targets.tile;

		 ///////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\
		//////       Call movement function        \\\\\\\\
		if(VirtArenaControl.TurnController.currentSubphase === 'movementSubphase') {
			// console.log('targetTile',aiObj.targets.tile);
			VirtArenaControl.AI.Scripts.moveAI(aiUnit);
		} else if(VirtArenaControl.TurnController.currentSubphase === 'attackSubphase') {
			VirtArenaControl.AI.Scripts.setWeaponAndTarget(aiUnit);
			setTimeout(function(){
				VirtArenaControl.AI.Scripts.attackWithAI(aiUnit);
			},VirtArenaControl.TurnController.phaseChangeDelay);
		}
	};

	VirtArenaControl.AI.Scripts.determineAIState = function(aiUnit,enemyTeam){
		//figure out what the unit should be doing
		//=====  CODE FOR SETTING UNIT STATE  =====//
		var state = "attackClosest";

		return state;
	};

	VirtArenaControl.AI.Scripts.determineAITargetTile = function(aiUnit,enemyTeam,aiObj){
		//based on state in aiObj, decide what tile to move to 
		//move towards the closest unit
		var closestUnit = enemyTeam.unitDistances[0];

		//find the best tile to move to
		var tile = VirtArenaControl.AI.Scripts.findClosestTileInMoveRange(aiUnit,closestUnit.unit.tile);

		return {unit:closestUnit,tile:tile};
	};

	VirtArenaControl.AI.Scripts.moveAI = function(aiUnit){
		VirtArenaControl.ObjectController.unitMovement(aiUnit,aiUnit.ai.targetTile,'ai');
	};

	VirtArenaControl.AI.Scripts.setWeaponAndTarget = function(aiUnit){
		//determine which units are in range of each weapon
		var unitsInRange = VirtArenaControl.AI.Scripts.findUnitsInRangeOfWeapons(aiUnit);
		//select weapon and attack target
		var preferredTarget = "mostVulnerable";
		var select = VirtArenaControl.AI.Scripts.selectTarget(aiUnit,unitsInRange,preferredTarget);
		aiUnit.ai.targetUnit = select.unit;
		VirtArenaControl.ObjectController.selectWeapon(aiUnit,select.weapon);
	};

	VirtArenaControl.AI.Scripts.attackWithAI = function(aiUnit){
		VirtArenaControl.ObjectController.unitAttackSelectTarget(aiUnit,aiUnit.ai.targetUnit);
		//other team can play cards or pass
		setTimeout(function(){
			var unitAttacking = VirtArenaControl.TurnController.currentAction.user;
			var unitTarget = VirtArenaControl.TurnController.currentAction.target;
			VirtArenaControl.ObjectController.unitAttackTarget(unitAttacking,unitTarget);
		},VirtArenaControl.TurnController.phaseChangeDelay);
	};



	// VirtArenaControl.AI.Scripts.algorithmMoveAI = function(currentVirt,targetVirtHex){
		
	// 	//closestHex and furthestHex are global variables at the top of this file.

	// 	var columnsToMove = 0;
	// 	var rowsToMove = 0;
	// 	var targetColumn = 0;
	// 	var targetRow = 0;
	// 	var moveTargetVirt = targetVirtHex.virtOccupying;
	// 	closestHex = moveHexArray[0];
	// 	closestHexInRange = moveHexArray[0];
	// 	furthestHex = moveHexArray[0];
	// 	furthestHexInRange = moveHexArray[0];
	// 	var closestHexTemp = moveHexArray[0];
	// 	var targetHexInMoveRange = false;

	// 	console.log(targetVirtHex);
	// 	targetVirtIsInMoveRange = false;
	// 	//moveStraight determines whether the AI should move straight towards the target or try to cut them off
	// 	var moveStraight = false;
	// 	//moveDownUpStraight makes the AI either move to the top or bottom of the board at the beginning of the game
	// 	var moveDownUpStraight = Math.floor(Math.random()*3);
	// 	var hexInArray;
	// 	var hexInArray2;
	// 	var targetVirtHex = targetVirtHex;
	// 	var closestVirtLeft = false;
	// 	var closestVirtRight = false;
	// 	var closestVirtUp = false;
	// 	var closestVirtDown = false;

	// 	if(turnNumber === 2){
	// 		moveDownUpStraight = 0;
	// 	}

	// 	if(targetVirtHex.rangeFromVirt >= 6){
	// 		moveStraight = true;
	// 	}

	// 	//Determine where the target virt is
	// 	if(targetVirtHex.getColumn() < currentVirt.currentHex.getColumn()){
	// 		closestVirtLeft = true;
	// 		console.log('target virt is left!');
	// 	}
	// 	else if(targetVirtHex.getColumn() > currentVirt.currentHex.getColumn()){
	// 		closestVirtRight = true;
	// 		console.log('target virt is right!');
	// 	}
		
	// 	if(targetVirtHex.getRow() < currentVirt.currentHex.getRow()){
	// 		closestVirtUp = true;
	// 		console.log('target virt is up!');
	// 	}
	// 	else if(targetVirtHex.getRow() > currentVirt.currentHex.getRow()){
	// 		closestVirtDown = true;
	// 		console.log('target virt is down!');
	// 	}

	// 	for(var i=0; i<moveHexArray.length; i++){
	// 		if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) < findRangeFromVirt(moveTargetVirt,closestHex)){
	// 			closestHex = moveHexArray[i];
	// 			console.log('new closest hex! range:' + findRangeFromVirt(moveTargetVirt,closestHex));
	// 		}
	// 		else if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) > findRangeFromVirt(moveTargetVirt,furthestHex)){
	// 			furthestHex = moveHexArray[i];
	// 			console.log('new furthest hex! range:' + findRangeFromVirt(moveTargetVirt,furthestHex));
	// 		}


	// 		if(moveDownUpStraight === 2){
	// 		//Straight
	// 			if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) <= findRangeFromVirt(moveTargetVirt,closestHex) && moveHexArray[i].getRow() === currentVirt.currentHex.getRow() && moveHexArray[i].occupied === false){
	// 				closestHex = moveHexArray[i];
	// 				console.log('new closest hex! range:' + findRangeFromVirt(moveTargetVirt,closestHex));
	// 			}
	// 		}

	// 		if(moveStraight === false || moveDownUpStraight === 1){
	// 		//Up
	// 			//closest hex
	// 			if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) <= findRangeFromVirt(moveTargetVirt,closestHex) && closestVirtLeft && moveHexArray[i].getColumn() <= closestHex.getColumn()){
	// 				closestHex = moveHexArray[i];
	// 				//console.log('new closest hex!(left) range:' + closestHex.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() > closestHex.getRow()){
	// 					closestHex = moveHexArray[i];
	// 					//console.log('new closest hex!(leftdown) range:' + closestHex.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() < closestHex.getRow()){
	// 					closestHex = moveHexArray[i];
	// 					//console.log('new closest hex!(leftup) range:' + closestHex.rangeFromVirtTarget);
	// 				}
	// 			}
	// 			else if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) <= findRangeFromVirt(moveTargetVirt,closestHex) && closestVirtRight && moveHexArray[i].getColumn() >= closestHex.getColumn()){
	// 				closestHex = moveHexArray[i];
	// 				//console.log('new closest hex!(right) range:' + closestHex.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() > closestHex.getRow()){
	// 					closestHex = moveHexArray[i];
	// 					//console.log('new closest hex!(rightdown) range:' + closestHex.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() < closestHex.getRow()){
	// 					closestHex = moveHexArray[i];
	// 					//console.log('new closest hex!(rightup) range:' + closestHex.rangeFromVirtTarget);
	// 				}
	// 			}

	// 			//closest hex in range
	// 			if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) <= findRangeFromVirt(moveTargetVirt,closestHexInRange) && findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= currentVirt.maxRange && closestVirtLeft && moveHexArray[i].getColumn() <= closestHexInRange.getColumn()){
	// 				closestHexInRange = moveHexArray[i];
	// 				//console.log('new closest hex!(left) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() > closestHexInRange.getRow()){
	// 					closestHexInRange = moveHexArray[i];
	// 					//console.log('new closest hex!(leftdown) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() < closestHexInRange.getRow()){
	// 					closestHexInRange = moveHexArray[i];
	// 					//console.log('new closest hex!(leftup) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				}
	// 			}
	// 			else if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) <= findRangeFromVirt(moveTargetVirt,closestHexInRange) && findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= currentVirt.maxRange && closestVirtRight && moveHexArray[i].getColumn() >= closestHexInRange.getColumn()){
	// 				closestHexInRange = moveHexArray[i];
	// 				//console.log('new closest hex!(right) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() > closestHexInRange.getRow()){
	// 					closestHexInRange = moveHexArray[i];
	// 					//console.log('new closest hex!(rightdown) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() < closestHexInRange.getRow()){
	// 					closestHexInRange = moveHexArray[i];
	// 					//console.log('new closest hex!(rightup) range:' + closestHexInRange.rangeFromVirtTarget);
	// 				}
	// 			}

	// 			//furthest hex
	// 			if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= findRangeFromVirt(moveTargetVirt,furthestHex) && closestVirtLeft && moveHexArray[i].getColumn() >= furthestHex.getColumn()){
	// 				furthestHex = moveHexArray[i];
	// 				//console.log('new furthest hex!(left) range:' + furthestHex.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() < furthestHex.getRow()){
	// 					furthestHex = moveHexArray[i];
	// 					//console.log('new furthest hex!(leftdown) range:' + furthestHex.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() > furthestHex.getRow()){
	// 					furthestHex = moveHexArray[i];
	// 					//console.log('new furthest hex!(leftup) range:' + furthestHex.rangeFromVirtTarget);
	// 				}
	// 			}
	// 			else if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= findRangeFromVirt(moveTargetVirt,furthestHex) && closestVirtRight && moveHexArray[i].getColumn() <= furthestHex.getColumn()){
	// 				furthestHex = moveHexArray[i];
	// 				//console.log('new furthest hex!(right) range:' + furthestHex.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() < furthestHex.getRow()){
	// 					furthestHex = moveHexArray[i];
	// 					//console.log('new furthest hex!(rightdown) range:' + furthestHex.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() > furthestHex.getRow()){
	// 					furthestHex = moveHexArray[i];
	// 					//console.log('new furthest hex!(rightup) range:' + furthestHex.rangeFromVirtTarget);
	// 				}
	// 			}

	// 			//furthest hex in range
	// 			if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= findRangeFromVirt(moveTargetVirt,furthestHexInRange) && findRangeFromVirt(moveTargetVirt,moveHexArray[i]) < (currentVirt.maxRange+1) && closestVirtLeft && moveHexArray[i].getColumn() >= furthestHexInRange.getColumn()){
	// 				furthestHexInRange = moveHexArray[i];
	// 				//console.log('new furthest hex!(left) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() < furthestHexInRange.getRow()){
	// 					furthestHexInRange = moveHexArray[i];
	// 					//console.log('new furthest hex!(leftdown) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() > furthestHexInRange.getRow()){
	// 					furthestHexInRange = moveHexArray[i];
	// 					//console.log('new furthest hex!(leftup) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				}
	// 			}
	// 			else if(findRangeFromVirt(moveTargetVirt,moveHexArray[i]) >= findRangeFromVirt(moveTargetVirt,furthestHexInRange) && findRangeFromVirt(moveTargetVirt,moveHexArray[i]) < (currentVirt.maxRange+1) && closestVirtRight && moveHexArray[i].getColumn() <= furthestHexInRange.getColumn()){
	// 				furthestHexInRange = moveHexArray[i];
	// 				//console.log('new furthest hex!(right) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				if(closestVirtDown && moveHexArray[i].getRow() < furthestHexInRange.getRow()){
	// 					furthestHexInRange = moveHexArray[i];
	// 					//console.log('new furthest hex!(rightdown) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				}
	// 				else if(closestVirtUp && moveHexArray[i].getRow() > furthestHexInRange.getRow()){
	// 					furthestHexInRange = moveHexArray[i];
	// 					//console.log('new furthest hex!(rightup) range:' + furthestHexInRange.rangeFromVirtTarget);
	// 				}
	// 			}
	// 		}
	// 	}


	// 	//If the target virt is within movement range, set closest hex to the one that is closest to both the current virt and the target virt
	// 	if(currentVirt.virtType === 'Lancer' || currentVirt.virtType === "Imperator" || currentVirt.virtType === "Praetorian"){
	// 		for(var i=0; i<targetVirtHex.allVirtRangeArrayLength; i++){
	// 			if(targetVirtHex.allVirtRangeArray[i][0] === currentVirt && targetVirtHex.allVirtRangeArray[i][1] < (currentVirt.move+1)){
	// 				closestHex = findClosestHexToVirt(currentVirt,targetVirtHex);
	// 				targetVirtIsInMoveRange = true;
	// 			}
	// 		}	
	// 	}

		
	// 	console.log(closestHex,furthestHex);
	// }

	// VirtArenaControl.AI.Scripts.determineAIActionMovement = function(currentVirt){
		
	// 	//If the current virt cannot move, advance to choosing weapon.
	// 	if(currentVirt.move <= 0){
	// 		console.log(currentVirt.name);
	// 		console.log('Move = 0, advancing to targeting');
	// 		activationChooseWeapon(currentVirt);
	// 	}
	// 	else{

	// 	var enemyVirtsArray = currentVirt.enemyVirtsArray;
	// 	var enemyVirtsArrayLength = currentVirt.enemyVirtsArrayLength;
	// 	var enemyVirt = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	// 	switch(enemyVirtsArrayLength){
	// 		case 20:
	// 			enemyVirt[19] = 100;
	// 		case 19:
	// 			enemyVirt[18] = 100;
	// 		case 18:
	// 			enemyVirt[17] = 100;
	// 		case 17:
	// 			enemyVirt[16] = 100;
	// 		case 16:
	// 			enemyVirt[15] = 100;
	// 		case 15:
	// 			enemyVirt[14] = 100;
	// 		case 14:
	// 			enemyVirt[13] = 100;
	// 		case 13:
	// 			enemyVirt[12] = 100;
	// 		case 12:
	// 			enemyVirt[11] = 100;
	// 		case 11:
	// 			enemyVirt[10] = 100;
	// 		case 10:
	// 			enemyVirt[9] = 100;
	// 		case 9:
	// 			enemyVirt[8] = 100;
	// 		case 8:
	// 			enemyVirt[7] = 100;
	// 		case 7:
	// 			enemyVirt[6] = 100;
	// 		case 6:
	// 			enemyVirt[5] = 100;
	// 		case 5:
	// 			enemyVirt[4] = 100;
	// 		case 4:
	// 			enemyVirt[3] = 100;
	// 		case 3:
	// 			enemyVirt[2] = 100;
	// 		case 2:
	// 			enemyVirt[1] = 100;
	// 		case 1:
	// 			enemyVirt[0] = 100;
	// 			break;
	// 	}
	// 	var charge = 100;
	// 	//var movetargetEnemyCommander = 100;
	// 	//var movetargetEnemyCompanion1 = 100;
	// 	//var movetargetEnemyCompanion2 = 100;
	// 	var dontmove = 100;
	// 	var moveAgain = true;
	// 	var moveReason = 0;
	// 	var moveintoMaxRange = 100;
	// 	var fleetoMaxRange = 100;
	// 	var closestVirtRange = 20;
	// 	var closestVirtHexEnemy;
	// 	//the following variable is an array. [0] is the lowest health enemy, [1] is the second lowest health enemy
	// 	var enemiesHPOrder = findHPOrder[enemyVirtsArray,'2d',enemyVirtsArrayLength];	//enemiesHPOrder returns as the length and dimension entered
	// 	var enemiesHPOrderLength = enemyVirtsArrayLength;
	// 	var HPOrderMoveRange = findLowestHealthInMoveRange(currentVirt);
	// 	var enemyCommanderVirt;
	// 	var tempTeamArray;
	// 	var teamEnemyTeamArray;

	// 	if(currentVirt.teamNumber === 1){
	// 		enemyCommanderVirt = enemyVirt;
	// 		tempTeamArray = playerVirtArray;
	// 		tempEnemyTeamArray = enemyVirtArray;

	// 	}
	// 	else if(currentVirt.teamNumber === 2){
	// 		enemyCommanderVirt = playerVirt;
	// 		tempTeamArray = enemyVirtArray;
	// 		tempEnemyTeamArray = playerVirtArray;
	// 	}

	// 	if(currentVirt.virtType != 'Arturius'){
	// 		moveintoMaxRange *= 0;
	// 		fleetoMaxRange *= 0;
	// 	}

	// 	//--OPTIMIZE THIS: uses range but not move range
	// 	for(var i=0; i<enemyVirtsArrayLength; i++){
	// 		if(enemyVirtsArray[i][1] < closestVirtRange){
	// 			closestVirtRange = enemyVirtsArray[i][1];
	// 			closestVirtHexEnemy = enemyVirtsArray[i][0];
	// 		}
	// 	}

	// 	console.log('closest virt hex range: ' + closestVirtRange);

	// 	//--PRAETORIAN
	// 	if(currentVirt.virtType === "Praetorian"){

	// 		//move target: the closest enemy virt
	// 		for(var i=0; i<enemyVirtsArrayLength; i++){
	// 			if(closestVirtHexEnemy === enemyVirtsArray[i][0]){
	// 				enemyVirt[i] *= 2;
	// 			}			
	// 		}

	// 		//always move if not next to an enemy
	// 		if(currentVirt.nextToEnemy === false){
	// 			dontmove *= 0;
	// 		}
	// 	}

	// 	//--IMPERATOR
	// 	else if(currentVirt.virtType === "Imperator"){
	// 		/*if(enemyCommanderVirt.HP <= (enemyCommanderVirt.totalHP*0.33)){
	// 			movetargetEnemyCommander *= 7;
	// 		}*/

	// 		/*if(lowestHealthEnemyInMoveRange[0].virtType === "Arturius"){
	// 			movetargetEnemyCommander *= 15;
	// 		}*/


	// 		//dont move if next to a target
	// 		for(var i=0; i<HPOrderMoveRange.length; i++){
	// 			for(var j=0; j<enemyVirtsArrayLength; j++){
	// 				if(HPOrderMoveRange[i] === enemyVirtsArray[j][0] && enemyVirtsArray[j][1] === 1){
	// 					dontmove *= 7;
	// 				}
	// 			}
	// 		}

	// 		//move target: the lowest health target if in move range and not next to a target
	// 		if(HPOrderMoveRange.length > 0){
	// 			var lowestHP = HPOrderMoveRange[(HPOrderMoveRange.length-1)].HP;
	// 			for(var i=0; i<HPOrderMoveRange.length; i++){
	// 				if(HPOrderMoveRange[i].HP <= lowestHP){
	// 					lowestHP = HPOrderMoveRange[i].HP;
	// 					for(var j=0; j<enemyVirtsArrayLength; j++){
	// 						if(HPOrderMoveRange[i] === enemyVirtsArray[j][0]){
	// 							enemyVirt[j] *= 5;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
			
				

	// 		//move target: closest target
	// 		for(var i=0; i<enemyVirtsArrayLength; i++){
	// 			if(closestVirtHexEnemy === enemyVirtsArray[i][0]){
	// 				enemyVirt[i] *= 2;
	// 			}			
	// 		}
			
	// 		//always move if not next to an enemy
	// 		if(currentVirt.nextToEnemy === false){
	// 			dontmove *= 0;
	// 		}



	// 	}


	// 	//--LANCER
	// 	else if(currentVirt.virtType === 'Lancer'){
	// 		/*if(enemyCommanderVirt.HP <= (enemyCommanderVirt.totalHP*0.33)){
	// 			movetargetEnemyCommander *= 7;
	// 		}*/
			
			
	// 		//dont move if next to a target
	// 		for(var i=0; i<HPOrderMoveRange.length; i++){
	// 			for(var j=0; j<enemyVirtsArrayLength; j++){
	// 				if(HPOrderMoveRange[i] === enemyVirtsArray[j][0] && enemyVirtsArray[j][1] === 1){
	// 					dontmove *= 7;
	// 				}
	// 			}
	// 		}
			
	// 		//move target: the lowest health target if in move range and not next to a target
	// 		if(HPOrderMoveRange.length > 0){
	// 			var lowestHP = HPOrderMoveRange[(HPOrderMoveRange.length-1)].HP;
	// 			for(var i=0; i<HPOrderMoveRange.length; i++){
	// 				if(HPOrderMoveRange[i].HP <= lowestHP){
	// 					lowestHP = HPOrderMoveRange[i].HP;
	// 					for(var j=0; j<enemyVirtsArrayLength; j++){
	// 						if(HPOrderMoveRange[i] === enemyVirtsArray[j][0]){
	// 							enemyVirt[j] *= 5;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}

	// 		//move target: closest target
	// 		for(var i=0; i<enemyVirtsArrayLength; i++){
	// 			if(closestVirtHexEnemy === enemyVirtsArray[i][0]){
	// 				enemyVirt[i] *= 2;
	// 			}			
	// 		}
			
	// 		//always move if not next to an enemy
	// 		if(currentVirt.nextToEnemy === false){
	// 			dontmove *= 0;
	// 		}
	// 	}


	// 	//--ARTURIUS
	// 	else if(currentVirt.virtType === 'Arturius'){
	// 		//move target: closest target
	// 		for(var i=0; i<enemyVirtsArrayLength; i++){
	// 			if(closestVirtHexEnemy === enemyVirtsArray[i][0]){
	// 				enemyVirt[i] *= 2;
	// 				//dont move if the closest virt is already max range from Arturius
	// 				if(enemyVirtsArray[i][1] === currentVirt.maxRange){
	// 					dontmove *= 10;
	// 				}
	// 			}			
	// 		}

	// 		//move decision: move into range if closest virt is outside of range
	// 		if(closestVirtHexEnemy.rangeFromVirt > currentVirt.maxRange){
	// 			moveintoMaxRange *= 5;
	// 			//moveToHexAI(currentVirt,closestHex,0);
	// 		}
	// 		//move decision: move away to max range if closest virt is closer than max range
	// 		else if(closestVirtHexEnemy.rangeFromVirt < currentVirt.maxRange){
	// 			fleetoMaxRange *= 5;
	// 			//moveToHexAI(currentVirt,furthestHexInRange,1);
	// 		}
	// 	}




	// 	var decisionValuesArray = [];
	// 	for(var i=0; i<enemyVirtsArrayLength; i++){
	// 		decisionValuesArray[i] = enemyVirt[i];
	// 	}
	// 	decisionValuesArray[decisionValuesArray.length] = dontmove;
	// 	//decisionValuesArray[0] = movetargetEnemyCommander;
	// 	//decisionValuesArray[1] = movetargetEnemyCompanion1;
	// 	//decisionValuesArray[2] = movetargetEnemyCompanion2;
	// 	//decisionValuesArray[3] = dontmove;
	// 	var moveReasonArray = [];
	// 	moveReasonArray[0] = charge;
	// 	moveReasonArray[1] = moveintoMaxRange;
	// 	moveReasonArray[2] = fleetoMaxRange;
	// 	console.log('name: ' + currentVirt.name);
	// 	console.log('enemyVirtsArray');
	// 	for(var i=0; i<enemyVirtsArrayLength; i++){
	// 		console.log(i + ': ' + enemyVirtsArray[i][0].name);
	// 	}
	// 	console.log('decisionValuesArray');
	// 	for(var i=0; i<decisionValuesArray.length; i++){
	// 		console.log(i + ': ' + decisionValuesArray[i]);
	// 	}
	// 	decisionValuesArray.sort(sortDescending);
	// 	console.log('moveReasonArray');
	// 	console.log(moveReasonArray[0] + '    ' + moveReasonArray[1] + '    ' + moveReasonArray[2]);
	// 	moveReasonArray.sort(sortDescending);
	// 	/*if(decisionValuesArray[0] === decisionValuesArray[1] && decisionValuesArray[1] === decisionValuesArray[2]){
	// 		var aiRandomChoice = Math.floor(Math.random()*3);
	// 		//console.log(aiRandomChoice);
			
	// 		if(aiRandomChoice === 0){
	// 			targetVirt = closestVirtHexEnemy.virtOccupying;
	// 		}
	// 		else if(aiRandomChoice === 1){
	// 			aiVirt.setStance(2);
	// 		}
	// 		else{
	// 			aiVirt.setStance(3);
	// 		}
	// 	}
	// 	else if(decisionValuesArray[0] === decisionValuesArray[1]){
	// 		if(decisionValuesArray[0] === chooseClosestVirt && decisionValuesArray[1] === chooseLowestHealthVirt){
	// 			var aiRandomChoice = Math.floor(Math.random()*2);
	// 			//console.log(aiRandomChoice);
				
	// 			if(aiRandomChoice === 0){
	// 				targetVirt = closestVirtHexEnemy.virtOccupying;
	// 			}
	// 			else{
	// 				targetVirt = lowestHealthVirtHexEnemy.virtOccupying;
	// 			}
	// 		}
	// 		else if(decisionValuesArray[0] === chooseLowestHealthVirt && decisionValuesArray[1] === chooseHighestHealthVirt){
	// 			var aiRandomChoice = Math.floor(Math.random()*2);
	// 			//console.log(aiRandomChoice);
				
	// 			if(aiRandomChoice === 0){
	// 				targetVirt = lowestHealthVirtHexEnemy.virtOccupying;
	// 			}
	// 			else{
	// 				targetVirt = highestHealthVirtHexEnemy.virtOccupying;
	// 			}
	// 		}
	// 		else if(decisionValuesArray[0] === chooseClosestVirt && decisionValuesArray[1] === chooseHighestHealthVirt){
	// 			var aiRandomChoice = Math.floor(Math.random()*2);
	// 			//console.log(aiRandomChoice);
				
	// 			if(aiRandomChoice === 0){
	// 				targetVirt = closestVirtHexEnemy.virtOccupying;
	// 			}
	// 			else{
	// 				targetVirt = highestHealthVirtHexEnemy.virtOccupying;
	// 			}
	// 		}
	// 	}*/
	// 	if(moveReasonArray[0] === charge){
	// 		console.log('reason: charge');
	// 		moveReason = 0;
	// 	}
	// 	else if(moveReasonArray[0] === moveintoMaxRange){
	// 		console.log('reason: moveintoMaxRange');
	// 		moveReason = 1;
	// 	}
	// 	else if(moveReasonArray[0] === fleetoMaxRange){
	// 		console.log('reason: fleetoMaxRange');
	// 		moveReason = 2;
	// 	}

	// 	var targetFound = false;
	// 	for(var i=0; i<enemyVirtsArrayLength; i++){
	// 		if(decisionValuesArray[0] === enemyVirt[i]){
	// 			console.log('movetarget enemyVirt[' + i + ']: ' + enemyVirtsArray[i][0].name);
	// 			targetFound = true;
	// 			algorithmMoveAI(currentVirt,enemyVirtsArray[i][0].currentHex);
	// 			if(targetVirtIsInMoveRange){
	// 				moveAgain = false;
	// 			}
	// 			moveToHexAI(currentVirt,moveReason,moveAgain);
	// 		}
	// 	}
	// 	if(targetFound === false && decisionValuesArray[0] === dontmove){
	// 		console.log('dontmove');
	// 		movementPhase = false;
	// 		resetMoveArray();
	// 		redrawCanvas();
	// 		setTimeout(function(){
	// 		  	activationChooseWeapon(currentVirt);
	// 		},timeoutSpeed1000);
	// 	}
	// 	else if(targetFound === false){
	// 		console.log('------------ERROR: No target found for AI Movement Decison Array');
	// 	}
		




	// 	}
	// }
	
})();