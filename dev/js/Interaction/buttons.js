(function(){


	VirtArenaControl.Buttons.init = function(){
		this.startGame.init(startGameInit());
	};

	VirtArenaControl.Buttons.addButton = function(buttonType,misc){
		if(buttonType === 'selectVirt') addSelectVirtButtons(misc);
		else if(buttonType === 'selectStances') addSelectStanceButtons(misc);
		else if(buttonType === 'selectWeapon') addSelectWeaponButton(misc);
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
			case 'selectStance':
				//get the buttons with a name that includes selectVirt
				for(var i in buttons){
					if(buttons[i].indexOf('selectStance') != -1){
						buttonsToRemove.push(buttons[i]);
					}
				}
				break;
			case 'selectWeapon':
				//get the buttons with a name that includes selectVirt
				for(var i in buttons){
					if(buttons[i].indexOf('selectWeapon') != -1){
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
				text:virtName,
				x:600,
				y:100+(i*50),
				width:100,
				height:40,
				onClick:function(){
					VirtArenaControl.ObjectController.selectCommanderVirt(this.virt,this.team);
				},
				update:function(){
					this.x = VirtArenaControl.Camera.width - 20 - this.width;
					this.y = 100+(this.orderOfButtons*50);
				},
				orderOfButtons:i,
				virt:virtName,
				team:misc.team
			}

			VirtArenaControl.Buttons[buttonName].init(variablesForButton);
			VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);
		};
	};


	var addSelectStanceButtons = function(misc){
		var virt = misc.team.commander;
		var keys = Object.keys(virt.stances);

		for(var i in keys){
			var stance = virt[keys[i]];
			var buttonName = 'selectStance'+keys[i];
			VirtArenaControl.Buttons[buttonName] = new Button();

			var variablesForButton = {
				text:virt.stances[keys[i]].name,
				x:-999,
				y:-999,
				width:100,
				height:40,
				onClick:function(){
					if(!this.disabled){
						VirtArenaControl.ObjectController.setVirtStance(this.virt,(parseInt(this.index)+1));
					}
				},
				update:function(){
					var startX = this.buttonsOfThisType * -(this.width/2) - this.spacing;
					var dynamicX = startX + (this.index*(this.width+this.spacing));
					this.x = VirtArenaControl.Camera.width/2 + dynamicX;
					this.y = VirtArenaControl.Camera.height - this.height - 20;
				},
				spacing:25,
				index:i,
				buttonsOfThisType:keys.length,
				disabled:(virt.lastStanceSelected === keys[i]) ? true : false,
				virt:virt
			}

			VirtArenaControl.Buttons[buttonName].init(variablesForButton);
			VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);
		};
	};


	var addSelectWeaponButton = function(misc){
		//{virt:virt,weapon:virt.weapons[keys[i]],disabled:outOfRange,index:i,buttonsOfThisType:keys.length}

		var virt = misc.virt;
		var weapon = misc.weapon;

		var buttonName = 'selectWeapon'+weapon.name;
		VirtArenaControl.Buttons[buttonName] = new Button();
		var variablesForButton = {
			text:weapon.name,
			x:-999,
			y:-999,
			width:100,
			height:40,
			onClick:function(){
				if(!this.disabled){
					VirtArenaControl.ObjectController.selectWeapon(this.virt,this.weapon);
				}
			},
			update:function(){
				var startX = this.buttonsOfThisType * -(this.width/2) - this.spacing;
				var dynamicX = startX + (this.index*(this.width+this.spacing));
				this.x = VirtArenaControl.Camera.width/2 + dynamicX;
				this.y = VirtArenaControl.Camera.height - this.height - 20;
			},
			spacing:25,
			index:misc.index,
			buttonsOfThisType:misc.buttonsOfThisType,
			disabled:misc.disabled,
			virt:virt,
			weapon:weapon
		}
		VirtArenaControl.Buttons[buttonName].init(variablesForButton);
		VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);

	};
	
})();