(function(){
	VirtArenaControl.Updater.gameUpdate = function(){
		for(var i=0; i<this.updateFunctions.length; i++){
			this[this.updateFunctions[i]]();
		}
	}

	VirtArenaControl.Updater.checkCanvasSize = function(){
		if(window.innerWidth != VirtArenaControl.Graphics.canvas.width || window.innerHeight != VirtArenaControl.Graphics.canvas.height){
			VirtArenaControl.Graphics.canvas.width = window.innerWidth;
			VirtArenaControl.Graphics.canvas.height = window.innerHeight;
			VirtArenaControl.Camera.width = window.innerWidth;
			VirtArenaControl.Camera.height = window.innerHeight;
		}
	}

	VirtArenaControl.Updater.animateSquare = function(){
		VirtArenaControl.Camera.y += VirtArenaControl.Graphics.canvas.height/60;
		if(VirtArenaControl.Camera.y > VirtArenaControl.Graphics.canvas.height){
			VirtArenaControl.Camera.y = -VirtArenaControl.Camera.height*0.8;
		}
	}

	VirtArenaControl.Updater.getMousePosition = function(){
		var scrollOffsetTop = document.body.scrollTop;
		var scrollOffsetLeft = document.body.scrollLeft;
		var canvasOffset = $('#canvas1').offset();
		VirtArenaControl.Mouse.x = (VirtArenaControl.Mouse.x - canvasOffset.left + scrollOffsetLeft + VirtArenaControl.Camera.x);
		VirtArenaControl.Mouse.y = (VirtArenaControl.Mouse.y - canvasOffset.top + scrollOffsetTop + VirtArenaControl.Camera.y);
	}

	VirtArenaControl.Updater.resetHoveredObjects = function(){
		var tiles = VirtArenaControl.Board.tiles;
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;

		for(var i in this.hoveredObjects){
			var obj = this.hoveredObjects[i];
			if(obj.constructor.name === "Tile"){
				obj.hover = false;
				// for(var j in obj.adjacentTiles){
				// 	var index = obj.adjacentTiles[j];
				// 	tiles[index].adjacentToHover = false;
				// }
			} else if(obj.constructor.name === "Button") {
				obj.hover = false;
			} else if(obj.constructor.name === "Card") {
				obj.hover = false;
			} else if (obj.constructor.name === "Avatar") {
				obj.hover = false;
			}
			
			// console.log(this.hoveredObjects[i].constructor.name);
		}

		this.hoveredObjects = [];
	}

	VirtArenaControl.Updater.getHoveredObjects = function(){
		var tiles = VirtArenaControl.Board.tiles;
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;
		var avatars = VirtArenaControl.Avatars.avatars;
		var cards = {};
		if(VirtArenaControl.Units.teams.blueTeam && VirtArenaControl.Units.teams.blueTeam.deck.cardsInHand) cards = VirtArenaControl.Units.teams.blueTeam.deck.cardsInHand;
		this.resetHoveredObjects();
		var objectIsHovered = false;

		if(!objectIsHovered){
			for(var i=0; i<cards.length; i++){
				var card = cards[i];
				if(Scripts.mouseInObject(card)){
					objectIsHovered = true;
					card.hover = true;
					this.hoveredObjects.push(card);
				}
			}
		}

		if(!objectIsHovered){
			for(var i=0; i<buttons.length; i++){
				var button = VirtArenaControl.Buttons[buttons[i]];
				if(Scripts.mouseInObject(button)){
					objectIsHovered = true;
					button.hover = true;
					this.hoveredObjects.push(button);
				}
			}
		}

		if(!objectIsHovered) {
			for(var i=0; i<tiles.length; i++){
				if(Scripts.mouseInObject(tiles[i])){
					objectIsHovered = true;
					tiles[i].hover = true;
					this.hoveredObjects.push(tiles[i]);
				}
			}
		}

		if(!objectIsHovered){
			for(var i=0; i<avatars.length; i++){
				var avatar = avatars[i];
				if(Scripts.mouseInObject(avatar)){
					objectIsHovered = true;
					avatar.hover = true;
					this.hoveredObjects.push(avatar);
				}
			}
		}
	}

	VirtArenaControl.Updater.updateTileVariables = function(){
		var tiles = VirtArenaControl.Board.tiles;
		for(var i in tiles){
			tiles[i].targetFor = '';

			if(VirtArenaControl.TurnController.currentAction.action === "spawnCompanion"
				&& tiles[i].range <= VirtArenaControl.TurnController.currentAction.range
				&& tiles[i].isOpen()) {

				tiles[i].targetFor = "action";

			} else if (VirtArenaControl.Units.selectedUnit 
				&& VirtArenaControl.Units.selectedUnit === VirtArenaControl.Units.currentUnitActivating
				&& VirtArenaControl.Units.selectedUnit.weaponSelected
				&& tiles[i].rangeForWeapon <= VirtArenaControl.Units.currentUnitActivating.getWeaponRange()
				&& tiles[i].unit 
				&& tiles[i].unit.team != VirtArenaControl.Units.selectedUnit.team 
				&& VirtArenaControl.TurnController.currentSubphase === 'attackSubphase') {

				tiles[i].targetFor = "attack";

			} else if(VirtArenaControl.TurnController.currentSubphase === "movementSubphase" 
				&& VirtArenaControl.ObjectController.path.length === 0
				&& tiles[i].moveCost <= VirtArenaControl.Units.currentUnitActivating.turnStats.move
				&& tiles[i].isOpen()) {

				tiles[i].targetFor = "movement";

			}
		}
	}

	VirtArenaControl.Updater.checkUnitPositions = function(){
		var units = VirtArenaControl.Units.units;
		var tiles = VirtArenaControl.Board.tiles;
		var tilesWithUnits = [];

		for(var i in units){
			tilesWithUnits.push(units[i].tile.index);
		}

		for(var i in tiles){
			if(tiles[i].unit != ''){
			}
			if(tiles[i].unit != '' && tilesWithUnits.indexOf(tiles[i].index) === -1){
				//if a tile thinks it has a virt but it doesn't, reset the variable
				tiles[i].unit = '';
			}
		}
	}

	VirtArenaControl.Updater.updateUnitAnimations = function(){
		var units = VirtArenaControl.Units.units;
		for(var i in units){
			units[i].animationTime = (units[i].animationTime+1)%units[i].animationDuration;
			if(units[i].animationTime === 0) units[i].animationFrame = (units[i].animationFrame+1)%4;
		}
	}

	VirtArenaControl.Updater.updateButtonPositions = function(){
		var buttonsToDraw = VirtArenaControl.Buttons.buttonsToDraw;
		for(var i in buttonsToDraw){
			VirtArenaControl.Buttons[buttonsToDraw[i]].update();
		}
	}

	VirtArenaControl.Updater.updateBoardPosition = function(){
		VirtArenaControl.Board.updatePosition();
	}

	VirtArenaControl.Updater.updateDeck = function(){
		var deck;
		if(VirtArenaControl.Units.teams.blueTeam) deck = VirtArenaControl.Units.teams.blueTeam.deck;
		if(deck) deck.updateCards();
	}

	VirtArenaControl.Updater.updateActivationAvatars = function(){
		for(var i in VirtArenaControl.Avatars.avatars){
			var avatar = VirtArenaControl.Avatars.avatars[i];
			avatar.activating = (avatar.unit.id === VirtArenaControl.Units.currentUnitActivating.id) ? true : false;
			avatar.selected = (avatar.unit.id === VirtArenaControl.Units.selectedUnit.id) ? true : false;
			avatar.hover = (avatar.unit.tile.hover === true || this.hoveredObjects.indexOf(avatar) > -1) ? true : false;
			avatar.x = VirtArenaControl.Board.x + 5;
			avatar.y = VirtArenaControl.Board.y + VirtArenaControl.Board.topPadding/2 + avatar.unit.activationOrderIndex*85;
			// console.log(avatar.unit.activationOrderIndex);
			avatar.text = avatar.unit.name;
		}
	}
})();