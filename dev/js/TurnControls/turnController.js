(function(){
	VirtArenaControl.TurnController = {
		turnOrder:['startOfTurn','stanceSelection','virtActivation','endOfTurn','END'],
		startOfTurn:{
			subphaseOrder:['replenishSpecialActionBar','drawCards','startOfTurnBoosts'],
			replenishSpecialActionBar:{},
			drawCards:{},
			startOfTurnBoosts:{}
		},
		stanceSelection:{
			subphaseOrder:['selectStances','setActivationOrder'],
			selectStances:{}
		},
		virtActivation:{
			subphaseOrder:['nextVirtActivation','startOfActivationBoosts','movementSubphase','attackSubphase','endActivation'],
			startOfActivationBoosts:{},
			movementSubphase:{},
			attackSubphase:{}
		},
		endOfTurn:{
			subphaseOrder:['cycleCards'],
			cycleCards:{}
		},
		currentPhase:'',
		currentSubphase:'',
		phaseChangeDelay:0,
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
			var continueActivation = (this.currentPhase === 'virtActivation' && objControl.currentVirtActivating != objControl.activationOrder[objControl.activationOrder.length-1]) ? true : false;
			var goToNextPhase = ((this.currentSubphase === 'END' || this.currentSubphase === '') && !continueActivation) ? true : false;

			if(goToNextPhase){
				phaseIndex = this.turnOrder.indexOf(this.currentPhase);
				this.currentPhase = this.turnOrder[phaseIndex+1];

				console.log('PHASE:' + this.currentPhase);
				if(this.currentPhase === 'END'){
					// this.currentPhase = this.turnOrder[0];
				}
			}
			
			goToNextSubphase = (this.currentPhase != 'END') ? true : false;
			if(goToNextSubphase){
				this.nextSubphase();
			}
		},
		nextSubphase: function(){
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
			this.phaseChangeDelay = delay;
			VirtArenaControl.Updater.updateFunctions.push('updateDelayPhaseChange');
		},
		selectVirtPhase: function(team){
			console.log('PHASE: selectVirtPhase: ' + team);
			VirtArenaControl.Buttons.addButton('selectVirt',{team:team});
		}
	};




	VirtArenaControl.TurnController.gameStarter = {
		gameStarted:false,
		startSequence:['selectPlayerVirt','selectEnemyVirt'],
		currentPhase:'',
		startupPhaseChangeDelay:500,
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
			VirtArenaControl.Virts.teams.blueTeam = new Team('blueTeam','blue');
			VirtArenaControl.Virts.teams.redTeam = new Team('redTeam','red');
		},
		selectPlayerVirt: function(){
			console.log('Select Player Virt');
			VirtArenaControl.TurnController.selectVirtPhase('blueTeam');
			// var virtName = "Arturius";
			// VirtArenaControl.Virts.teams.blueTeam.addCommander(virtName);
			// VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		selectVirtPhaseEnd: function(){
			var team;
			var tiles;

			switch(this.currentPhase){
				case 'selectPlayerVirt':
					team = 'blueTeam';
					tiles = {commanderTile:51};
					break;
				case 'selectEnemyVirt':
					team = 'redTeam';
					tiles = {commanderTile:60};
					break;
			}

			if(team && tiles)
				this.setStartingPosition(team,tiles);

		},
		selectEnemyVirt: function(){
			console.log('Select Enemy Virt');
			VirtArenaControl.TurnController.selectVirtPhase('redTeam');
			// var virtName = "Imperator";
			// VirtArenaControl.Virts.teams.redTeam.addCommander(virtName);
			// VirtArenaControl.TurnController.gameStarter.nextPhase();
		},
		setStartingPosition: function(team,tiles){
			// var leftTiles = {commanderTile:51};
			// var rightTiles = {commanderTile:60};
			VirtArenaControl.Virts.teams[team].setStartingPosition(tiles);
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
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.startOfTurn.startOfTurnBoosts = function(){
		console.log('\tsubPHASE: startOfTurnBoosts');
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};





	VirtArenaControl.TurnController.stanceSelection.selectStances = function(){
		console.log('\tsubPHASE: selectStances');
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.stanceSelection.setActivationOrder = function(){
		console.log('\tsubPHASE: setActivationOrder');
		VirtArenaControl.ObjectController.setActivationOrder();
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};




	VirtArenaControl.TurnController.virtActivation.nextVirtActivation = function(){
		console.log('\tsubPHASE: nextVirtActivation');
		var indexOfCurrentVirt = VirtArenaControl.ObjectController.activationOrder.indexOf(VirtArenaControl.ObjectController.currentVirtActivating);
		var nextVirtToActivate = VirtArenaControl.ObjectController.activationOrder[indexOfCurrentVirt+1];
		VirtArenaControl.ObjectController.setVirtActivating(nextVirtToActivate);
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.virtActivation.startOfActivationBoosts = function(){
		console.log('\tsubPHASE: startOfActivationBoosts - ' + VirtArenaControl.ObjectController.currentVirtActivating.name);
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.virtActivation.movementSubphase = function(){
		console.log('\tsubPHASE: movementSubphase - ' + VirtArenaControl.ObjectController.currentVirtActivating.name);
		// VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.virtActivation.attackSubphase = function(){
		console.log('\tsubPHASE: attackSubphase - ' + VirtArenaControl.ObjectController.currentVirtActivating.name);
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};

	VirtArenaControl.TurnController.virtActivation.endActivation = function(){
		console.log('\tsubPHASE: endActivation - ' + VirtArenaControl.ObjectController.currentVirtActivating.name);
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};





	VirtArenaControl.TurnController.endOfTurn.cycleCards = function(){
		console.log('\tsubPHASE: cycleCards');
		VirtArenaControl.TurnController.delayPhaseChange(500);
	};
})();