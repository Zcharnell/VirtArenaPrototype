(function(){
	
	VirtArenaControl.AI.Scripts.getEnemyTeam = function(aiUnit){
		var teams = VirtArenaControl.Units.teams;
		var team = aiUnit.team;
		var keys = Object.keys(teams);
		for(var i in keys){
			if(teams[keys[i]].name != team.name){
				return team[keys[i]];
			}
		}
	};

	VirtArenaControl.AI.Scripts.getMoveDistanceFromUnits = function(aiUnit,units){
		VirtArenaControl.ObjectController.setTileMoveCosts(aiUnit);
		var moveDistance = [];
		for(var i in units){
			var obj = {
				unit:units[i],
				moveDistance:units[i].tile.moveCost
			};
			moveDistance.push(obj);
		}

		moveDistance.sort(function(a,b){
			return Scripts.sortDescending(a.moveDistance,b.moveDistance);
		});
		console.log(moveDistance);
		return moveDistance;
	};
	
})();