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
		/////////      Decide cards to use       \\\\\\\\\\
		aiObj.cardsToUse = VirtArenaControl.AI.Scripts.determineAIBoosts(aiUnit,enemyTeam);
		aiUnit.cardsToPlay = aiObj.cardsToUse;

		 //////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\
		//////       Call functions for subphase        \\\\\\\\
		if(!aiUnit.ai.hasMoved){
			VirtArenaControl.AI.Scripts.moveAI(aiUnit);
		} else if(!aiUnit.ai.hasUsedCards){
			VirtArenaControl.AI.Scripts.playCards(aiUnit);	
		} else if(!aiUnit.ai.hasAttacked){
			VirtArenaControl.AI.Scripts.setWeaponAndTarget(aiUnit);
			setTimeout(function(){
				if(aiUnit.weaponSelected.name){
					VirtArenaControl.AI.Scripts.attackWithAI(aiUnit);
				} else {
					VirtArenaControl.ObjectController.endAttackSubphase();
				}
			},VirtArenaControl.TurnController.phaseChangeDelay);
		}
		// if(VirtArenaControl.TurnController.currentSubphase === 'startOfActivationBoosts') { 
		// 	//*** Use any activation boost cards, like companion spawning ***\\
		// 	VirtArenaControl.AI.Scripts.playCards(aiUnit);
		// } else if(VirtArenaControl.TurnController.currentSubphase === 'movementSubphase') {
		// 	//*** Move to the target tile ***\\
		// 	// console.log('targetTile',aiObj.targets.tile);
		// 	VirtArenaControl.AI.Scripts.moveAI(aiUnit);
		// } else if(VirtArenaControl.TurnController.currentSubphase === 'attackSubphase') {
		// 	//*** Attack the target unit ***\\
		// 	VirtArenaControl.AI.Scripts.setWeaponAndTarget(aiUnit);
		// 	setTimeout(function(){
		// 		VirtArenaControl.AI.Scripts.attackWithAI(aiUnit);
		// 	},VirtArenaControl.TurnController.phaseChangeDelay);
		// }
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

	VirtArenaControl.AI.Scripts.determineAIBoosts = function(aiUnit,enemyTeam){
		if(VirtArenaControl.TurnController.currentSubphase === "activateUnit"){
			var cardsToUse = VirtArenaControl.AI.Scripts.determineActivationCardsToUse(aiUnit,enemyTeam);
		}
		console.log('cardsToUse: ',cardsToUse);
		return cardsToUse;
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
		if(select) {
			aiUnit.ai.targetUnit = select.unit;
			VirtArenaControl.ObjectController.selectWeapon(aiUnit,select.weapon);
		}
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

	// VirtArenaControl.AI.Scripts.useActivationBoostsAI = function(aiUnit){
	// 	for(var i in aiUnit.cardsToPlay){
	// 		var cardObj = aiUnit.cardsToPlay[i];
	// 		// VirtArenaControl.ObjectController.spawnUnitOnTile(aiUnit,cardObj.card,cardObj.card.companion,cardObj.target);
	// 		if(cardObj.action === "spawnCompanion"){
	// 			VirtArenaControl.AI.Scripts.AISummonCompanion(aiUnit,cardObj);
	// 		}
	// 	}
	// };


	VirtArenaControl.AI.Scripts.playCards = function(aiUnit){
		console.log(aiUnit);
		console.log('playCards: ',aiUnit.cardsToPlay.length);
		if(aiUnit.cardsToPlay.length > 0){
			var cardObj = aiUnit.cardsToPlay.shift();
			// VirtArenaControl.ObjectController.spawnUnitOnTile(aiUnit,cardObj.card,cardObj.card.companion,cardObj.target);
			// console.log(cardObj);
			if(cardObj.action === "spawnCompanion"){
				// console.log('yes');
				VirtArenaControl.AI.Scripts.AISummonCompanion(aiUnit,cardObj);
			}
		} else {
			//end phase
			aiUnit.ai.hasUsedCards = true;
			VirtArenaControl.AI.Scripts.aiActivationControl(aiUnit);
		}
	};
	
})();