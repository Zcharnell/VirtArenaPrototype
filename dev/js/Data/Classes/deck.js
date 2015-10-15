
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
	if(commander.name === "Arturius"){
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:"Lancer",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:"Lancer",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:"Lancer",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Knight",
				type:"companion",
				companion:"Knight",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Knight",
				type:"companion",
				companion:"Knight",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Praetorian",
				type:"companion",
				companion:"Praetorian",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Praetorian",
				type:"companion",
				companion:"Praetorian",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:"Hecate",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:"Hecate",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:"Hecate",
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Pre-emptive Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Pre-emptive Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Double Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.doubleStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Double Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.doubleStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Preparation",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preparation),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Preparation",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preparation),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Flash",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.flash),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Flash",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.flash),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Parry",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.parry),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Parry",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.parry),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Reinforce",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.reinforce),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Reinforce",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.reinforce),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Charged Shot",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.chargedShot),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Charged Shot",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.chargedShot),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Riposte",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.riposte),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Riposte",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.riposte),
				team:this.team
			}));
	} else if(commander.name === "Imperator"){
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Lancer"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Lancer"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Lancer",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Lancer"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Knight",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Knight"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Knight",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Knight"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Praetorian",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Praetorian"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Praetorian",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Praetorian"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Hecate"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Hecate"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Hecate",
				type:"companion",
				companion:VirtArenaControl.Units.getUnitObject("Hecate"),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Pre-emptive Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Pre-emptive Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Double Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.doubleStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Double Strike",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.doubleStrike),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Preparation",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preparation),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Preparation",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.preparation),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Flash",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.flash),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Flash",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.flash),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Parry",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.parry),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Parry",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.parry),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Reinforce",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.reinforce),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Reinforce",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.reinforce),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Charged Shot",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.chargedShot),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Charged Shot",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.chargedShot),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Riposte",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.riposte),
				team:this.team
			}));
		deck.cards.push(
			new Card(
				{name:"Riposte",
				type:"ability",
				ability:new Ability(VirtArenaControl.Abilities.riposte),
				team:this.team
			}));
	}
	this.cardsInDeck = deck.cards;
}

Deck.prototype.shuffle = function(){
	//returns a random number between -1 and 1, so that the deck is randomly sorted
	this.cardsInDeck.sort(function(a,b){return Math.floor(Math.random()*3)-1});
}

Deck.prototype.drawCardsStartOfGame = function(){
	//draw three cards
	for(var i=0; i<3; i++){
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
		this.cardsInHand[i].update({index:i,cardsInHand:this.cardsInHand.length});
	}
}

Deck.prototype.graphicsDrawCards = function(){
	for(var i in this.cardsInHand){
		this.cardsInHand[i].draw();
	}
}

