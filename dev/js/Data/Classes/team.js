
	
function Team(name,color){
	this.name = name;
	this.color = color;
	this.units = [];
	this.commander = {};
	this.hasPriority = false;
	this.deck = {};

	this.addUnit = function(unit){
		unit.team = this;
		VirtArenaControl.Units.addUnit(unit);
		this.units.push(unit);
	};

	this.addCompanion = function(unitName){
		var unit = VirtArenaControl.Units.getUnitObject(unitName);
		this.addUnit(unit);
	};

	this.addCommander = function(unitName){
		var unit = VirtArenaControl.Units.getUnitObject(unitName);
		unit.commander = true;
		this.commander = unit;
		this.addUnit(unit);
		this.addDeck();
	};

	this.addDeck = function(){
		this.deck = new Deck({commander:this.commander});
	}

	this.setStartingPosition = function(positionObj){
		var commanderSet = false;
		var positions = Object.keys(positionObj);
		console.log(this.units, ';', positionObj);
		for(var i in this.units){
			if(this.units[i] === this.commander && !commanderSet){
				var tile = VirtArenaControl.Board.tiles[positionObj.commanderTile];
				VirtArenaControl.ObjectController.setUnitTile(this.units[i],tile);
				positions.splice(positions.indexOf('commanderTile'),1);
				commanderSet = true;
			} else {
				var tile = VirtArenaControl.Board.tiles[positionObj[positions[0]]];
				VirtArenaControl.ObjectController.setUnitTile(this.units[i],tile);
				positions.splice(0,1);
			}
			// console.log(this.units[i],' ; ', this.units[i].tile);
			// console.log(positions);
		}
	};
}

