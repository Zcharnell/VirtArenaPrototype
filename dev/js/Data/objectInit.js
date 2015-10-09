(function(){
	VirtArenaControl = {
		init: function(){
			this.Graphics.init();
			this.Updater.init();
			this.Board.init();
			this.Listeners.jquery.init();
			this.Buttons.init();
		}
	};

	VirtArenaControl.Classes = {};
	VirtArenaControl.Mouse = {};
	VirtArenaControl.Listeners = {};
	VirtArenaControl.Camera = {
		xLeft:0,
		yTop:0
	};
	VirtArenaControl.Interaction = {};
	VirtArenaControl.TurnController = {};
	VirtArenaControl.ObjectController = {};
	VirtArenaControl.Virts = {};

	VirtArenaControl.Buttons = {};

	VirtArenaControl.Graphics = {
		cameraWidth: 640,
		cameraHeight: 600,
		cameraX: -600,
		cameraY: -600,
		canvas: undefined,
		ctx: undefined,
		drawFunctions: [],

		init: function(){
			this.canvas = document.getElementById("canvas1");
			this.ctx = this.canvas.getContext("2d");
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.cameraWidth = this.canvas.width;
			this.cameraHeight = this.canvas.height;
			this.cameraX = this.cameraWidth*0.8;
			this.cameraY = -this.cameraHeight;
			this.drawFunctions.push('redrawCanvas');
			this.drawFunctions.push('drawSquare');
			this.drawFunctions.push('drawBoardTiles');
			this.drawFunctions.push('drawButtons');
			this.drawFunctions.push('drawVirts');
			this.drawFunctions.push('drawPath');
		}
	};

	VirtArenaControl.Updater = {
		updateFunctions: [],
		framerate:1000/30,
		phaseChangeDelayCounter:0,


		init: function(){
			this.updateFunctions.push('checkCanvasSize');
			this.updateFunctions.push('animateSquare');
			this.updateFunctions.push('getMousePosition');
			this.updateFunctions.push('getHoveredObjects');
			this.updateFunctions.push('checkVirtPositions');
		}
	};



	Scripts = {};
})();