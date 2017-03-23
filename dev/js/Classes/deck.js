
function Deck(initVars){
	this.cardsInHand = [];
	this.cardsInDeck = [];
	this.discardPile = [];
	this.team = {};

	//set initial variables with initVars
	if(initVars){
		var keys = Object.keys(initVars);
		for(var i in keys){
			this[keys[i]] = initVars[keys[i]];
		}
		this.createDeck(initVars.commander);
	}
}

Deck.prototype.createDeck = function(commander){
	//10 companions, 20 abilities
	var deck = {
		cards:[]
	};
		deck.cards.push(
			new Card(
				{name:"Melee Agile",
				type:"companion",
				companion:"Lancer",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Melee Agile",
				type:"companion",
				companion:"Lancer",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Melee Strong",
				type:"companion",
				companion:"Knight",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Melee Strong",
				type:"companion",
				companion:"Knight",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Defensive Ranged",
				type:"companion",
				companion:"Praetorian",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Defensive Ranged",
				type:"companion",
				companion:"Praetorian",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Long Ranged",
				type:"companion",
				companion:"Hecate",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Long Ranged",
				type:"companion",
				companion:"Hecate",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Power +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.power20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Power +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.power20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Power +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.power20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Defense +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.defense20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Defense +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.defense20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Defense +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.defense20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Stability +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.stability20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Stability +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.stability20),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Stability +20",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.stability20),
				team:this.team
			}));
	// }
	this.cardsInDeck = deck.cards;
}

Deck.prototype.shuffle = function(){
	//returns a random number between -1 and 1, so that the deck is randomly sorted
	this.cardsInDeck.sort(function(a,b){return Math.floor(Math.random()*3)-1});
}

Deck.prototype.drawCardsStartOfGame = function(){
	//draw three cards
	for(var i=0; i<2; i++){
		var card = this.cardsInDeck.shift();
		this.cardsInHand.push(card);
	}
}

Deck.prototype.drawCardsPhase = function(){
	var card = this.cardsInDeck.shift();
	this.cardsInHand.push(card);
}

Deck.prototype.updateCards = function(){
	for(var i in this.cardsInHand){
		this.cardsInHand[i].update({index:i,cardsInHand:this.cardsInHand.length,oddLength:this.cardsInHand.length%2});
	}
}

Deck.prototype.graphicsDrawCards = function(){
	var delayedDraw = [];
	for(var i in this.cardsInHand){
		if(!this.cardsInHand[i].hover) this.cardsInHand[i].draw();
		else delayedDraw.push(this.cardsInHand[i]);
	}

	for(var i in delayedDraw){
		delayedDraw[i].draw();
	}
}

