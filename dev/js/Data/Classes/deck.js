
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
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Lancer",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Lancer",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Knight",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Knight")
				}));
			deck.cards.push(
				new Card(
					{name:"Knight",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Knight")
				}));
			deck.cards.push(
				new Card(
					{name:"Praetorian",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Praetorian")
				}));
			deck.cards.push(
				new Card(
					{name:"Praetorian",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Praetorian")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Pre-emptive Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Pre-emptive Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Double Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.doubleStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Double Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.doubleStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Preparation",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preparation)
				}));
			deck.cards.push(
				new Card(
					{name:"Preparation",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preparation)
				}));
			deck.cards.push(
				new Card(
					{name:"Flash",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.flash)
				}));
			deck.cards.push(
				new Card(
					{name:"Flash",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.flash)
				}));
			deck.cards.push(
				new Card(
					{name:"Parry",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.parry)
				}));
			deck.cards.push(
				new Card(
					{name:"Parry",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.parry)
				}));
			deck.cards.push(
				new Card(
					{name:"Reinforce",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.reinforce)
				}));
			deck.cards.push(
				new Card(
					{name:"Reinforce",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.reinforce)
				}));
			deck.cards.push(
				new Card(
					{name:"Charged Shot",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.chargedShot)
				}));
			deck.cards.push(
				new Card(
					{name:"Charged Shot",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.chargedShot)
				}));
			deck.cards.push(
				new Card(
					{name:"Riposte",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.riposte)
				}));
			deck.cards.push(
				new Card(
					{name:"Riposte",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.riposte)
				}));
		} else if(commander.name === "Imperator"){
			deck.cards.push(
				new Card(
					{name:"Lancer",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Lancer",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Lancer",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Lancer")
				}));
			deck.cards.push(
				new Card(
					{name:"Knight",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Knight")
				}));
			deck.cards.push(
				new Card(
					{name:"Knight",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Knight")
				}));
			deck.cards.push(
				new Card(
					{name:"Praetorian",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Praetorian")
				}));
			deck.cards.push(
				new Card(
					{name:"Praetorian",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Praetorian")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Hecate",
					type:"companion",
					companion:VirtArenaControl.Units.getUnitObject("Hecate")
				}));
			deck.cards.push(
				new Card(
					{name:"Pre-emptive Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Pre-emptive Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preemptiveStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Double Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.doubleStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Double Strike",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.doubleStrike)
				}));
			deck.cards.push(
				new Card(
					{name:"Preparation",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preparation)
				}));
			deck.cards.push(
				new Card(
					{name:"Preparation",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.preparation)
				}));
			deck.cards.push(
				new Card(
					{name:"Flash",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.flash)
				}));
			deck.cards.push(
				new Card(
					{name:"Flash",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.flash)
				}));
			deck.cards.push(
				new Card(
					{name:"Parry",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.parry)
				}));
			deck.cards.push(
				new Card(
					{name:"Parry",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.parry)
				}));
			deck.cards.push(
				new Card(
					{name:"Reinforce",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.reinforce)
				}));
			deck.cards.push(
				new Card(
					{name:"Reinforce",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.reinforce)
				}));
			deck.cards.push(
				new Card(
					{name:"Charged Shot",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.chargedShot)
				}));
			deck.cards.push(
				new Card(
					{name:"Charged Shot",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.chargedShot)
				}));
			deck.cards.push(
				new Card(
					{name:"Riposte",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.riposte)
				}));
			deck.cards.push(
				new Card(
					{name:"Riposte",
					type:"ability",
					ability:new Ability(VirtArenaControl.Abilities.riposte)
				}));
		}

		this.cardsInDeck = deck.cards;
	}