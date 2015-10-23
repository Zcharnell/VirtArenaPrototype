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
			subphaseOrder:['nextUnitActivation','startOfActivationBoosts','movementSubphase','attackSubphase','endActivation'],
			nextUnitActivation:{},
			startOfActivationBoosts:{},
			movementSubphase:{},
			attackSubphase:{},
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
		phaseChangeDelay:500,
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
			var delay = delay || this.phaseChangeDelay;
			setTimeout(function(){
				VirtArenaControl.TurnController.nextPhase();
			},delay);
		},
		selectVirtPhase: function(team){
			console.log('PHASE: selectVirtPhase: ' + team.name);
			VirtArenaControl.Buttons.addButton('selectVirt',{team:team});
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
				case 'spawnCompanion':
					this.currentAction = {
						action:action,
						user:misc.team.commander,
						target:'tile',
						range:1,
						misc:{team:misc.team,companion:misc.companion},
						card:misc.card
					};
					VirtArenaControl.ObjectController.setTileRange(this.currentAction.user);
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
			}
		}
	};




	VirtArenaControl.TurnController.gameStarter = {
		gameStarted:false,
		startSequence:['selectPlayerVirt','selectEnemyVirt'],
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
			VirtArenaControl.Units.teams.blueTeam = new Team('blueTeam','blue');
			VirtArenaControl.Units.teams.redTeam = new Team('redTeam','red');
		},
		selectPlayerVirt: function(){
			console.log('Select Player Virt');
			var team = VirtArenaControl.Units.teams.blueTeam;
			VirtArenaControl.TurnController.selectVirtPhase(team);
			// var virtName = "Arturius";
			// VirtArenaControl.Units.teams.blueTeam.addCommander(virtName);
			// VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		selectEnemyVirt: function(){
			console.log('Select Enemy Virt');
			var team = VirtArenaControl.Units.teams.redTeam;
			VirtArenaControl.TurnController.selectVirtPhase(team);
			// var virtName = "Imperator";
			// VirtArenaControl.Units.teams.redTeam.addCommander(virtName);
			// VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		selectVirtPhaseEnd: function(){
			var team;
			var tiles;

			switch(this.currentPhase){
				case 'selectPlayerVirt':
					team = VirtArenaControl.Units.teams.blueTeam;
					tiles = {commanderTile:51,secondTile:38,thirdTile:63};
					break;
				case 'selectEnemyVirt':
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
					obj.selectVirtPhaseEnd();
					obj.currentPhase = obj.startSequence[1];
					break;
				case obj.startSequence[1]:
					obj.selectVirtPhaseEnd();
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
		var indexOfCurrentUnit = VirtArenaControl.Units.activationOrder.indexOf(VirtArenaControl.Units.currentUnitActivating);
		var nextUnitToActivate = VirtArenaControl.Units.activationOrder[indexOfCurrentUnit+1];
		VirtArenaControl.ObjectController.setUnitActivating(nextUnitToActivate);
		VirtArenaControl.ObjectController.selectUnit(nextUnitToActivate);
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.unitActivation.startOfActivationBoosts = function(){
		console.log('\tsubPHASE: startOfActivationBoosts - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.unitActivation.movementSubphase = function(){
		//select tiles to move
		//tiles.js and movement.js
		console.log('\tsubPHASE: movementSubphase - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setTileMoveCosts(VirtArenaControl.Units.currentUnitActivating);
		if(VirtArenaControl.Units.currentUnitActivating.turnStats.move === 0){
			VirtArenaControl.TurnController.delayPhaseChange();
		}
		if(VirtArenaControl.Units.currentUnitActivating.team.name === "redTeam"){
			VirtArenaControl.AI.Scripts.aiActivationControl(VirtArenaControl.Units.currentUnitActivating);
		}
	};

	VirtArenaControl.TurnController.unitActivation.attackSubphase = function(){
		//select weapon and show possible targets
		console.log('\tsubPHASE: attackSubphase - ' + VirtArenaControl.Units.currentUnitActivating.name);
		VirtArenaControl.ObjectController.setTileRangeForWeapons(VirtArenaControl.Units.currentUnitActivating);
		VirtArenaControl.ObjectController.checkUsableWeapons(VirtArenaControl.Units.currentUnitActivating);
		// VirtArenaControl.TurnController.delayPhaseChange();
	};

	VirtArenaControl.TurnController.unitActivation.endActivation = function(){
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