
function Deck(initVars){
	this.cardsInHand = [];
	this.cardsInDeck = [];
	this.discardPile = [];
	this.team = {};

	//set initial variables with initVars
	var keys = Object.keys(initVars);
	for(var i in keys){
		this[keys[i]] = initVars[keys[i]];
	}

}

