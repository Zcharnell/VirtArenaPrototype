(function(){


	VirtArenaControl.Buttons.init = function(){
		this.startGame.init(startGameInit());
	};

	VirtArenaControl.Buttons.addButton = function(buttonType,misc){
		if(buttonType === 'selectVirt') addSelectVirtButtons(misc);
	};

	VirtArenaControl.Buttons.removeButton = function(buttonType,misc){
		var buttons = [];
		var buttonsToRemove = [];

		if(buttonType === 'selectVirt') {
			buttons = Object.keys(this);
			for(var i in buttons){
				if(buttons[i].indexOf('selectVirt') != -1){
					buttonsToRemove.push(buttons[i]);
				}
			}
		}

		for(var i in buttonsToRemove){
			var index = this.buttonsToDraw.indexOf(buttonsToRemove[i]);
			this.buttonsToDraw.splice(index,1);
		}
	};

	VirtArenaControl.Buttons.buttonsToDraw = ['startGame'];
	
	VirtArenaControl.Buttons.startGame = new Button();

	var startGameInit = function(){
		var obj = {};
		obj.text = 'Start Game';
		obj.width = 100;
		obj.height = 40;
		obj.x = VirtArenaControl.Graphics.cameraWidth * 0.5 - obj.width/2;
		obj.y = VirtArenaControl.Graphics.cameraHeight * 0.1 - obj.height/2;
		obj.onClick = VirtArenaControl.TurnController.gameStarter.startGame;
		return obj;
	};



	var addSelectVirtButtons = function(misc){
		var obj = VirtArenaControl.Virts;
		for(var i in obj.chooseVirtCommanderVirts){
			var virtName = obj.chooseVirtCommanderVirts[i];
			var buttonName = 'selectVirt'+virtName;
			VirtArenaControl.Buttons[buttonName] = new Button();
			var variablesForButton = {
				virt:virtName,
				team:misc.team,
				x:600,
				y:100+(i*100),
			}
			VirtArenaControl.Buttons[buttonName].init(selectVirtInit(variablesForButton));
			VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);
		};
	};

	var selectVirtInit = function(vars){
		var obj = {};
		obj.text = vars.virt;
		obj.width = 100;
		obj.height = 40;
		obj.x = vars.x;
		obj.y = vars.y;
		obj.onClick = function(){
			VirtArenaControl.Virts.teams[this.team].addCommander(this.virt);
			VirtArenaControl.Buttons.removeButton('selectVirt');
			VirtArenaControl.TurnController.gameStarter.nextPhase();
		};
		obj.virt = vars.virt;
		obj.team = vars.team;
		return obj;
	};
	
})();