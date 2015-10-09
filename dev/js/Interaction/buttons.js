(function(){


	VirtArenaControl.Buttons.init = function(){
		this.startGame.init(startGameInit());
	};

	VirtArenaControl.Buttons.addButton = function(buttonType,misc){
		if(buttonType === 'selectVirt') addSelectVirtButtons(misc);
	};

	VirtArenaControl.Buttons.removeButton = function(buttonType,misc){
		var buttons = Object.keys(this);
		var buttonsToRemove = [];

		switch(buttonType){
			case 'selectVirt':
				//get the buttons with a name that includes selectVirt
				for(var i in buttons){
					if(buttons[i].indexOf('selectVirt') != -1){
						buttonsToRemove.push(buttons[i]);
					}
				}
				break;
			case 'startGame':
				for(var i in buttons){
					if(buttons[i].indexOf('startGame') != -1){
						buttonsToRemove.push(buttons[i]);
					}
				}
				break;
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
		obj.x = VirtArenaControl.Camera.width * 0.5 - obj.width/2;
		obj.y = VirtArenaControl.Camera.height - 20 - this.height;
		obj.onClick = VirtArenaControl.TurnController.gameStarter.startGame;
		obj.update = function(){
			this.x = VirtArenaControl.Camera.width * 0.5 - this.width/2;
			this.y = VirtArenaControl.Camera.height - 20 - this.height;
			// console.log('update');
		}
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
				y:100+(i*50),
				update:function(){
					this.x = VirtArenaControl.Camera.width - 20 - this.width;
					this.y = 100+(this.orderOfButtons*50);
				},
				orderOfButtons:i
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
		obj.update = vars.update;
		obj.virt = vars.virt;
		obj.team = vars.team;
		obj.orderOfButtons = vars.orderOfButtons;
		return obj;
	};
	
})();