
	
function Team(name,color){
	this.name = name;
	this.color = color;
	this.units = [];
	this.commander = {};
	this.hasPriority = false;
	this.deck = '';

	this.addUnit = function(unit){
		unit.team = this;
		VirtArenaControl.ObjectController.addUnit(unit);
		this.units.push(unit);
		// if(VirtArenaControl.Units.activationOrder.length > 0){
		// 	VirtArenaControl.ObjectController.addUnitToActivationOrder
		// }
	};

	this.addCompanion = function(unitName,tile){
		var unit = VirtArenaControl.ObjectController.getUnitObject(unitName);
		if(tile) VirtArenaControl.ObjectController.setUnitTile(unit,tile);
		this.addUnit(unit);
	};

	this.addCommander = function(unitName){
		var unit = VirtArenaControl.ObjectController.getUnitObject(unitName);
		unit.setCommander();
		this.commander = unit;
		this.addUnit(unit);
		this.addDeck();
	};

	this.addDeck = function(){
		this.deck = new Deck({commander:this.commander,team:this});
		this.deck.shuffle();
		this.deck.drawCardsStartOfGame();
	};

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
			if(this.units[i].tile.column <= VirtArenaControl.Board.columns/2){
				this.units[i].setDirection('right');
			} else {
				this.units[i].setDirection('left');
			}
			// console.log(this.units[i],' ; ', this.units[i].tile);
			// console.log(positions);
		}
	};

	this.spawnUnitNearCommander = function(card,companion){
		VirtArenaControl.TurnController.setCurrentAction("spawnCompanion",{card:card,team:this,companion:companion});
	};

	this.cardUsed = function(card){
		var cardToDiscard = this.deck.cardsInHand.splice(card.positionInHand,1);
		this.deck.discardPile.push(cardToDiscard);
	};

	this.allStancesSelected = function(){
		for(var i in this.units){
			if(this.units[i].stanceSelected === '') return false;
		}
		return true;
	};
}

