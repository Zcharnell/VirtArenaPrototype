
	
function Team(name,color){
	this.name = name;
	this.color = color;
	this.units = [];
	this.commander = {};
	this.hasPriority = false;

	this.addUnit = function(unit){
		unit.team = this.name;
		VirtArenaControl.Units.addUnit(unit);
		this.units.push(unit);
	};

	this.addCommander = function(unitName){
		var unit = VirtArenaControl.Units.getUnitObject(unitName);
		this.commander = unit;
		this.addUnit(unit);
	};

	this.setStartingPosition = function(positionObj){
		var positions = Object.keys(positionObj);
		for(var i in this.units){
			if(this.units[i] === this.commander){
				var tile = VirtArenaControl.Board.tiles[positionObj.commanderTile];
				VirtArenaControl.ObjectController.setUnitTile(this.units[i],tile);
				positions.splice(positions.indexOf('commanderTile',1));
			} else {
				var tile = VirtArenaControl.Board.tiles[positionObj[positions[0]]];
				VirtArenaControl.ObjectController.setUnitTile(this.units[i],tile);
				positions.splice(0,1);
			}
		}
	};
}

