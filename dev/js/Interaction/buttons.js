(function(){
	VirtArenaControl.Buttons.buttonsToDraw = ['startGame','endPhase'];
	VirtArenaControl.Buttons.startGame = new Button();
	VirtArenaControl.Buttons.endPhase = new Button();

	VirtArenaControl.Buttons.init = function(){
		this.startGame.init(startGameInit());
		this.endPhase.init(endPhaseInit());
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
			if(index >= 0){
				this.buttonsToDraw.splice(index,1);
			}
		}
	};


	var startGameInit = function(){
		var obj = {};
		obj.text = 'Start Game';
		obj.width = 100;
		obj.height = 40;
		obj.x = VirtArenaControl.Camera.width * 0.5 - obj.width/2;
		obj.y = VirtArenaControl.Camera.height - 20 - this.height;
		obj.onClick = function(){VirtArenaControl.TurnController.gameStarter.startGame()};
		obj.update = function(){
			this.x = VirtArenaControl.Camera.width * 0.5 - this.width/2;
			this.y = VirtArenaControl.Camera.height - 20 - this.height;
		}
		return obj;
	};

	var endPhaseInit = function(){
		var obj = {};
		obj.text = 'Continue';
		obj.width = 100;
		obj.height = 40;
		obj.x = VirtArenaControl.Board.x + VirtArenaControl.Board.width - obj.width - 20;
		obj.y = VirtArenaControl.Board.y + VirtArenaControl.Board.height/2 - obj.height;
		obj.onClick = function(){VirtArenaControl.TurnController.nextPhase()};
		obj.disabled = false;
		obj.update = function(){
			this.x = VirtArenaControl.Board.x + VirtArenaControl.Board.width - this.width - 20;
			this.y = VirtArenaControl.Board.y + VirtArenaControl.Board.height/2 - this.height;
			// console.log(this.x,this.y);

			// if(VirtArenaControl.TurnController.currentSubphase)
		}
		return obj;
	};



	var addSelectVirtButtons = function(misc){
		var obj = VirtArenaControl.Units;
		for(var i in obj.chooseVirtCommanderVirts){
			var unitName = obj.chooseVirtCommanderVirts[i];
			var buttonName = 'selectVirt'+unitName;
			VirtArenaControl.Buttons[buttonName] = new Button();

			var variablesForButton = {
				text:unitName,
				x:600,
				y:100+(i*50),
				width:100,
				height:40,
				onClick:function(){
					VirtArenaControl.ObjectController.selectCommanderUnit(this.unit,this.team);
				},
				update:function(){
					this.x = VirtArenaControl.Camera.width - 20 - this.width;
					this.y = 100+(this.orderOfButtons*50);
				},
				orderOfButtons:i,
				unit:unitName,
				team:misc.team
			}

			VirtArenaControl.Buttons[buttonName].init(variablesForButton);
			VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);
		};
	};


	var addSelectStanceButtons = function(misc){
		var units = misc.team.units;
		for(var j in units){
			var unit = units[j];
			var keys = Object.keys(unit.stances);
			for(var i in keys){
				var stance = unit.stances[keys[i]];
				var buttonName = 'selectStance'+j+keys[i];
				VirtArenaControl.Buttons[buttonName] = new Button();

				var variablesForButton = {
					text:unit.stances[keys[i]].name,
					x:-999,
					y:-999,
					width:100,
					height:40,
					onClick:function(){
						if(!this.disabled){
							VirtArenaControl.ObjectController.setUnitStance(this.unit,(parseInt(this.index)+1));
						}
					},
					update:function(){
						var startX = this.buttonsOfThisType * -(this.width/2) - this.spacing;
						var dynamicX = startX + (this.index*(this.width+this.spacing));
						this.x = VirtArenaControl.Camera.width/2 + dynamicX;
						this.y = VirtArenaControl.Camera.height - this.height - 20 - this.indexInUnitArray*50;
						if(this.unit.stanceSelected === this.stance) {
							this.selected = true;
						} else if(this.selected){
							this.selected = false;
						}
					},
					spacing:25,
					index:i,
					buttonsOfThisType:keys.length,
					indexInUnitArray:j,
					disabled:(unit.lastStanceSelected === keys[i]) ? true : false,
					unit:unit,
					stance:keys[i]
				}

				VirtArenaControl.Buttons[buttonName].init(variablesForButton);
				VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);
			};
		};
	};


	var addSelectWeaponButton = function(misc){
		//{unit:unit,weapon:unit.weapons[keys[i]],disabled:outOfRange,index:i,buttonsOfThisType:keys.length}

		var unit = misc.unit;
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
					VirtArenaControl.ObjectController.selectWeapon(this.unit,this.weapon);
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
			unit:unit,
			weapon:weapon
		}
		VirtArenaControl.Buttons[buttonName].init(variablesForButton);
		VirtArenaControl.Buttons.buttonsToDraw.push(buttonName);

	};
	
})();