(function(){
	
	VirtArenaControl.AI.Scripts.stanceSelection = function(team){
		for(var i in team.units){
			if(team.units[i].alive){
				var stance = this.aiSelectStance(team.units[i]);
				team.units[i].setStance(stance);
			}
		}
	};

	VirtArenaControl.AI.Scripts.randomStance = function(virt){
		//random a stance
		//cannot random the lastStanceSelected
		var stances = Object.keys(virt.stances);
		var indexOfLastStanceSelected = stances.indexOf(virt.lastStanceSelected);
		if(indexOfLastStanceSelected != -1) stances.splice(indexOfLastStanceSelected,1);

		var random = Math.floor(Math.random()*stances.length);
		return stances[random];
	};



	////////////////////////////////////////////////////////////
	//AI Stances

	VirtArenaControl.AI.Scripts.aiSelectStance = function(aiUnit){
		VirtArenaControl.ObjectController.setTileMoveCosts(aiUnit);
		VirtArenaControl.ObjectController.setTileRangeForWeapons(aiUnit);

		var chooseStance = {
			stance1: (aiUnit.stances.stance1) ? 100 : 0,
			stance2: (aiUnit.stances.stance2) ? 100 : 0,
			stance3: (aiUnit.stances.stance3) ? 100 : 0
		};
		// var closestEnemyVirtRange = 20;
		// var closestEnemyVirt;
		// var lowestHealthEnemyInMoveRangeMax = findLowestHealthEnemyInMoveRangeMax(aiUnit);
		if(aiUnit.lastStanceSelected === "stance1"){
			chooseStance.stance1 *= 0;
		}
		else if(aiUnit.lastStanceSelected === "stance2"){
			chooseStance.stance2 *= 0;
		}
		else if(aiUnit.lastStanceSelected === "stance3"){
			chooseStance.stance3 *= 0;
		}

		// for(var i=0; i<aiUnit.enemyVirtsArray.length; i++){
		// 	if(aiUnit.enemyVirtsArray[i][1] < closestEnemyVirtRange){
		// 		closestEnemyVirtRange = aiUnit.enemyVirtsArray[i][1];
		// 		closestEnemyVirt = aiUnit.enemyVirtsArray[i][0];
		// 	}
		// }

		if(aiUnit.unitType === "Arturius"){
			// if(closestEnemyVirtRange <= 3){
			// 	chooseStance3 *= 5;
			// 	if(aiUnit.HP <= (aiUnit.totalHP/2)){
			// 		chooseStance3 *= 5;
			// 	}
			// }
			// else if(closestEnemyVirtRange > aiUnit.maxRange){
			// 	chooseStance3 *= 0;
			// }
			// if(closestEnemyVirtRange === 3){
			// 	chooseStance1 *= 7;
			// 	chooseStance2 *= 7;
			// }
		}
		else if(aiUnit.unitType === "Imperator"){
			// if(closestEnemyVirtRange > aiUnit.maxRange){
			// 	chooseStance2 *= 0;
			// }
			// else if(closestEnemyVirtRange <= aiUnit.maxRange){
			// 	chooseStance3 *= 10;
			// }

			// if(aiUnit.HP <= (aiUnit.totalHP*0.66) && closestEnemyVirtRange <= aiUnit.maxRange){
			// 	chooseStance2 *= 12;
			// }
		}
		else if(aiUnit.unitType === 'Lancer'){
			// if(closestEnemyVirtRange === 1 && closestEnemyVirt != lowestHealthEnemyInMoveRangeMax){
			// 	if(aiUnit.HP <= (aiUnit.totalHP/2) && lowestHealthEnemyInMoveRangeMax.HP > (lowestHealthEnemyInMoveRangeMax.HP/2)){
			// 		chooseStance1 *= 5;
			// 	}
			// 	else{
			// 		chooseStance1 *= 0;
			// 	}
			// }
			// else if(closestEnemyVirtRange === 1){
			// 	chooseStance1 *= 10; // 1000
			// }
			// else{
			// 	chooseStance1 *= 0;
			// }

			// //Choose Joust if the enemy is exactly 4 squares away
			// if(closestEnemyVirtRange === 4){
			// 	chooseStance3 *= 10; // 1000
			// }
		

		}
		else if(aiUnit.unitType === 'Praetorian'){
			// if(closestEnemyVirtRange <= aiUnit.maxRange){
			// 	chooseStance1 *= 10; // 1000
			// }
			// if(closestEnemyVirtRange > aiUnit.maxRange){
			// 	chooseStance1 *= 0;
			// 	chooseStance2 *= 10;
			// }

			// if(aiUnit.HP <= (aiUnit.totalHP/2)){
			// 	chooseStance3 *= 5;
			// }
		}
		else{
			//Add additional virt types here as necessary. Without this, virts will random stances.
		}

		//Determine the decision to make based on the decision values. If any values are the same number, random between those values. 
		var decisionValuesArray = [];
		for(var i=1; i<4; i++){
			decisionValuesArray.push({
				stance:"stance"+i,
				value:chooseStance["stance"+i]
			});
		}

		decisionValuesArray.sort(Scripts.sortStancesDescending);
		// console.log(aiUnit.name + ': ',decisionValuesArray[0], decisionValuesArray[1], decisionValuesArray[2]);
		var stanceChosen = decisionValuesArray[0].stance;
		return stanceChosen;
	}
	
})();