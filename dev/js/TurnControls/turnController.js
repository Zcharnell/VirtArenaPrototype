(function(){
	VirtArenaControl.TurnController = {
		turnOrder:['startOfTurn','stanceSelection','unitActivation','endOfTurn','END'],
		startOfTurn:{
			subphaseOrder:['replenishSpecialActionBar','drawCards','startOfTurnBoosts'],
			replenishSpecialActionBar:{},
			drawCards:{},
			startOfTurnBoosts:{}
		},
		stanceSelection:{
			subphaseOrder:['selectStances','setActivationOrder'],
			selectStances:{},
			setActivationOrder:{}
		},
		unitActivation:{
			subphaseOrder:[
				'nextUnitActivation',
				/*'startOfActivationBoosts','movementSubphase','attackSubphase',*/
				'activateUnit',
				'endActivation'],
			nextUnitActivation:{},
			startOfActivationBoosts:{},
			movementSubphase:{},
			attackSubphase:{},
			activateUnit:{},
			endActivation:{}
		},
		endOfTurn:{
			subphaseOrder:['cycleCards','setVariablesForEndOfTurn'],
			cycleCards:{},
			setVariablesForEndOfTurn:{}
		},
		gameEnd: false,
		currentPhase:'',
		currentSubphase:'',
		currentAction:{
			action:'',
			user:'',
			target:'',
			range:0,
			misc:{},
			card:''
		},
		currentAbility:{
			action:'',
			user:'',
			target:'',
			range:0,
			misc:{},
			card:''
		},
		phaseChangeDelay:500,
		delayingPhaseChange:false,
		startTurn: function(){
			// this.currentPhase = this.turnOrder[0];
			this.nextPhase();
		},
		nextPhase: function(){
			//if the current subphase is END, next phase
			//if the current phase is END, reset turn order
			//always, next subphase
			var objControl = VirtArenaControl.ObjectController;
			var phaseIndex;
			var goToNextSubphase;
			var continueActivation = (this.currentPhase === "unitActivation" && objControl.unactivatedUnitsInActivationOrder()) ? true : false;
			var goToNextPhase = ((this.currentSubphase === 'END' || this.currentSubphase === '') && !continueActivation) ? true : false;

			if(goToNextPhase){
				phaseIndex = this.turnOrder.indexOf(this.currentPhase);
				this.currentPhase = this.turnOrder[phaseIndex+1];

				console.log('PHASE:' + this.currentPhase);
				if(this.currentPhase === 'END' && !this.gameEnd){
					this.currentPhase = this.turnOrder[0];
				}
			}
			
			goToNextSubphase = (this.currentPhase != 'END' && !this.gameEnd) ? true : false;
			if(goToNextSubphase){
				this.nextSubphase();
			}
		},
		nextSubphase: function(){
			//if the currentSubphase is not in the subphase order, set currentSubphase to the first subphase
			//else, set the currentSubphase to the next subPhase; if no next subphase, set it to END
			//if there currentSubphase is not END, activate it; else, call the next phase
			var phase = this[this.currentPhase];
			var subphase;
			var subphaseIndex;

			if(phase.subphaseOrder.indexOf(this.currentSubphase) === -1){
				subphase = phase.subphaseOrder[0];
				this.currentSubphase = subphase;
			} else {
				subphaseIndex = phase.subphaseOrder.indexOf(this.currentSubphase);
				subphase = phase.subphaseOrder[subphaseIndex+1] || 'END';
				this.currentSubphase = subphase;
			}

			if(this.currentSubphase != 'END')
				phase[this.currentSubphase]();
			else 
				this.nextPhase();
		},
		delayPhaseChange: function(delay){
			//call the next phase after a delay
			var delay = delay || VirtArenaControl.TurnController.phaseChangeDelay;
			VirtArenaControl.TurnController.delayingPhaseChange = true;
			setTimeout(function(){
				VirtArenaControl.TurnController.nextPhase();
				VirtArenaControl.TurnController.delayingPhaseChange = false;
			},delay);
		},
		selectCommanderPhase: function(team){
			console.log('PHASE: selectCommanderPhase: ' + team.name);
			VirtArenaControl.Buttons.addButton('selectCommander',{team:team});
		},
		endOfGame: function(){
			// var units = VirtArenaControl.Units.units;
			var teams = VirtArenaControl.Units.teams;
			var losingTeam = '';
			var winningTeam = '';
			for(var i in teams){
				if(!teams[i].commander.alive){
					losingTeam = teams[i].name;
				} else {
					winningTeam = teams[i].name;
				}
			}

			this.gameEnd = true;
			console.log(winningTeam + ' wins!');
		},
		setCurrentAction: function(action,misc){
			switch(action){
				case 'attack':
					this.currentAction = {
						action:action,
						user:misc.attackingUnit,
						target:misc.targetUnit,
						range:misc.range
						// misc:{team:misc.team,companion:misc.companion},
						// card:misc.card
					};
					break;
			}
		},
		resetCurrentAction: function(){
			this.currentAction = {
				action:'',
				user:'',
				target:'',
				range:0,
				misc:{},
				card:''
			};
		},
		setCurrentAbility: function(ability,misc){
			switch(ability){
				case 'attack':
					this.currentAbility = {
						ability:ability,
						user:misc.currentUnit,
						target:misc.currentUnit,
						misc:{team:misc.team,ability:misc.ability},
						card:misc.card
					};
					break;
				case 'defense':
					this.currentAbility = {
						ability:ability,
						user:misc.currentUnit,
						target:'ally',
						misc:{team:misc.team,ability:misc.ability},
						card:misc.card
					};
					break;
				case 'spawnCompanion':
					this.currentAbility = {
						ability:ability,
						user:misc.team.commander,
						target:'tile',
						range:1,
						misc:{team:misc.team,companion:misc.companion},
						card:misc.card
					};
					VirtArenaControl.ObjectController.setTileRange(this.currentAbility.user);
					break;
			}
		},
		resetCurrentAbility: function(){
			this.currentAbility = {
				action:'',
				user:'',
				target:'',
				range:0,
				misc:{},
				card:''
			};
		},
		endPhaseEarly: function(){
			if(!this.delayingPhaseChange){
				switch(this.currentPhase){
					case 'stanceSelection':
						switch(this.currentSubphase){
							case 'selectStances':
								VirtArenaControl.Buttons.removeButton('selectStance');
								VirtArenaControl.TurnController.delayPhaseChange();
								break;
						}
						break;
					case 'unitActivation':
						switch(this.currentSubphase){
							case 'movementSubphase':
								VirtArenaControl.ObjectController.endMovement();
								break;
							case 'attackSubphase':
								VirtArenaControl.ObjectController.endAttackSubphase();
								break;
							default:
								this.delayPhaseChange();
								break;
						}
						break;
					default:
						this.delayPhaseChange();
						break;
				}
			}
		},
		getCurrentPhaseText: function(){
			switch(this.currentSubphase){
				case 'drawCards':
					return 'Draw Cards';
					break
				case 'selectStances':
					return 'Select Stances';
					break
				case 'activateUnit':
					return 'Unit Activation';
					break
			}
			return '';
		}
	};


	VirtArenaControl.TurnController.gameStarter = {
		gameStarted:false,
		startSequence:['selectPlayerCommander','selectEnemyCommander'],
		currentPhase:'',
		startupPhaseChangeDelay:100,
		startGame: function(){
			console.log('Starting game');
			if(!VirtArenaControl.TurnController.gameStarter.gameStarted){
				VirtArenaControl.TurnController.gameStarter.gameStarted = true;
				VirtArenaControl.TurnController.gameStarter.setupTeams();
				VirtArenaControl.Buttons.removeButton('startGame');
			}
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		setupTeams: function(){
			VirtArenaControl.Units.teams.blueTeam = new Team('blueTeam','blue','player');
			VirtArenaControl.Units.teams.redTeam = new Team('redTeam','red','ai');
		},
		selectPlayerCommander: function(){
			console.log('Select Player Unit');
			var team = VirtArenaControl.Units.teams.blueTeam;
			VirtArenaControl.TurnController.selectCommanderPhase(team);
			// var virtName = "Arturius";
			// VirtArenaControl.Units.teams.blueTeam.addCommander(virtName);
			// VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		selectEnemyCommander: function(){
			console.log('Select Enemy Unit');
			var team = VirtArenaControl.Units.teams.redTeam;
			// VirtArenaControl.TurnController.selectCommanderPhase(team);
			var unitName = "Imperator";
			if(VirtArenaControl.Units.teams.blueTeam.commander.unitType === unitName){
				unitName = "Arturius";
			}
			VirtArenaControl.Units.teams.redTeam.addCommander(unitName);
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		selectCommanderPhaseEnd: function(){
			var team;
			var tiles;

			switch(this.currentPhase){
				case 'selectPlayerCommander':
					team = VirtArenaControl.Units.teams.blueTeam;
					tiles = {commanderTile:51,secondTile:38,thirdTile:63};
					break;
				case 'selectEnemyCommander':
					team = VirtArenaControl.Units.teams.redTeam;
					tiles = {commanderTile:60,secondTile:48,thirdTile:73};
					break;
			}

			if(team && tiles)
				this.setStartingPosition(team,tiles);

		},
		setStartingPosition: function(team,tiles){
			// var leftTiles = {commanderTile:51};
			// var rightTiles = {commanderTile:60};
			team.setStartingPosition(tiles);
			// console.log(VirtArenaControl.Units.teams[team].commander.weapons);
			// console.log(VirtArenaControl.Units.teams[team].commander.stances);
		},
		nextPhase: function(){
			var obj = VirtArenaControl.TurnController.gameStarter;
			switch(obj.currentPhase){
				case '':
					obj.currentPhase = obj.startSequence[0];
					break;
				case obj.startSequence[0]:
					obj.selectCommanderPhaseEnd();
					obj.currentPhase = obj.startSequence[1];
					break;
				case obj.startSequence[1]:
					obj.selectCommanderPhaseEnd();
					obj.currentPhase = obj.startSequence[2];
					break;
				default:
					console.log('ERROR: Start sequence phase cannot be matched. Please check VirtArenaControl.TurnController.gameStarter.nextPhase.');
					break;
			}

			if(!obj.currentPhase) obj.currentPhase = 'END';

			setTimeout(function(){
				if(obj.currentPhase != 'END') obj[obj.currentPhase]();
				else VirtArenaControl.TurnController.startTurn();
			},VirtArenaControl.TurnController.gameStarter.startupPhaseChangeDelay);
		}
	};





	VirtArenaControl.TurnController.startOfTurn.replenishSpecialActionBar = function(){
		console.log('\tsubPHASE: replenishSpecialActionBar');
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.startOfTurn.drawCards = function(){
		console.log('\tsubPHASE: drawCards');
		var teams = Object.keys(VirtArenaControl.Units.teams);
		for(var i in teams){
			VirtArenaControl.Units.teams[teams[i]].deck.drawCardsPhase();
		}
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.startOfTurn.startOfTurnBoosts = function(){
		console.log('\tsubPHASE: startOfTurnBoosts');
		VirtArenaControl.TurnController.delayPhaseChange();
	};





	VirtArenaControl.TurnController.stanceSelection.selectStances = function(){
		console.log('\tsubPHASE: selectStances');
		var team = VirtArenaControl.Units.teams.blueTeam;
		VirtArenaControl.Buttons.addButton('selectStances',{team:team});
		//random stance for AI
		VirtArenaControl.AI.Scripts.stanceSelection(VirtArenaControl.Units.teams.redTeam);
		// VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.stanceSelection.setActivationOrder = function(){
		console.log('\tsubPHASE: setActivationOrder');
		VirtArenaControl.ObjectController.setActivationOrder();
		console.log('Activation Order:',VirtArenaControl.Units.activationOrder);
		VirtArenaControl.TurnController.delayPhaseChange();
	};




	VirtArenaControl.TurnController.unitActivation.nextUnitActivation = function(){
		console.log('\tsubPHASE: nextUnitActivation');
		//get the index of the current activating unit, and set the activating unit to the next unit in the activation order
		//end automatically
		var indexOfCurrentUnit = VirtArenaControl.Units.activationOrder.indexOf(VirtArenaControl.Units.currentUnitActivating);
		var nextUnitToActivate = VirtArenaControl.Units.activationOrder[indexOfCurrentUnit+1];
		VirtArenaControl.ObjectController.setUnitActivating(nextUnitToActivate);
		VirtArenaControl.ObjectController.selectUnit(nextUnitToActivate);
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.unitActivation.startOfActivationBoosts = function(){
		//use cards at the start of activation
		//ends on continue
		console.log('\tsubPHASE: startOfActivationBoosts - ' + VirtArenaControl.Units.currentUnitActivating.name);
		if(VirtArenaControl.Units.currentUnitActivating.team.aiTeam){
			VirtArenaControl.AI.Scripts.aiActivationControl(VirtArenaControl.Units.currentUnitActivating);
		}
	};

	VirtArenaControl.TurnController.unitActivation.activateUnit = function(){
		console.log('\tsubPHASE: activateUnit - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setTileMoveCosts(VirtArenaControl.Units.currentUnitActivating);
		VirtArenaControl.ObjectController.setTileRangeForWeapons(VirtArenaControl.Units.currentUnitActivating);
		
		if(VirtArenaControl.Units.currentUnitActivating.team.aiTeam){
			VirtArenaControl.AI.Scripts.aiActivationControl(VirtArenaControl.Units.currentUnitActivating);
		}
	};

	/*
	VirtArenaControl.TurnController.unitActivation.movementSubphase = function(){
		//select tiles to move
		//tiles.js and movement.js
		//ends when the activating unit runs out of movement or on continue
		console.log('\tsubPHASE: movementSubphase - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setTileMoveCosts(VirtArenaControl.Units.currentUnitActivating);
		if(VirtArenaControl.Units.currentUnitActivating.turnStats.move === 0){
			VirtArenaControl.TurnController.delayPhaseChange();
		} else {
			if(VirtArenaControl.Units.currentUnitActivating.team.aiTeam){
				VirtArenaControl.AI.Scripts.aiActivationControl(VirtArenaControl.Units.currentUnitActivating);
			}
		}
	};

	VirtArenaControl.TurnController.unitActivation.attackSubphase = function(){
		//select weapon and show possible targets
		//ends if the unit attacks, if there are no targets in range, or on continue
		console.log('\tsubPHASE: attackSubphase - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setTileRangeForWeapons(VirtArenaControl.Units.currentUnitActivating);
		var usableWeapons = VirtArenaControl.ObjectController.checkUsableWeapons(VirtArenaControl.Units.currentUnitActivating);
		if(!usableWeapons){
			VirtArenaControl.ObjectController.endAttackSubphase();
		} else {
			if(VirtArenaControl.Units.currentUnitActivating.team.aiTeam){
				VirtArenaControl.AI.Scripts.aiActivationControl(VirtArenaControl.Units.currentUnitActivating);
			} else {
				VirtArenaControl.ObjectController.addWeaponSelectionButtons(VirtArenaControl.Units.currentUnitActivating);
			}
		}
		// VirtArenaControl.TurnController.delayPhaseChange();
	};
	*/

	VirtArenaControl.TurnController.unitActivation.endActivation = function(){
		//setting any variables that need to be changed at the end of activation
		//end automatically
		console.log('\tsubPHASE: endActivation - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setEndOfActivationVariables(VirtArenaControl.Units.currentUnitActivating);
		VirtArenaControl.TurnController.delayPhaseChange();
	};





	VirtArenaControl.TurnController.endOfTurn.cycleCards = function(){
		console.log('\tsubPHASE: cycleCards');
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.endOfTurn.setVariablesForEndOfTurn = function(){
		console.log('\tsubPHASE: setVariablesForEndOfTurn');
		VirtArenaControl.ObjectController.resetUnitValues();
		VirtArenaControl.ObjectController.resetActivationOrder();
		VirtArenaControl.TurnController.delayPhaseChange();
	};
})();