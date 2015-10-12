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
		width: 640,
		height: 600,
		x: 0,
		y: 0
	};
	VirtArenaControl.Interaction = {};
	VirtArenaControl.TurnController = {};
	VirtArenaControl.ObjectController = {};
	VirtArenaControl.Units = {};
	VirtArenaControl.AI = {};
	VirtArenaControl.AI.Scripts = {};

	VirtArenaControl.Buttons = {};

	VirtArenaControl.Graphics = {
		canvas: undefined,
		ctx: undefined,
		drawFunctions: [],

		init: function(){
			this.canvas = document.getElementById("canvas1");
			this.ctx = this.canvas.getContext("2d");
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			VirtArenaControl.Camera.width = this.canvas.width;
			VirtArenaControl.Camera.height = this.canvas.height;
			VirtArenaControl.Camera.x = 0;
			VirtArenaControl.Camera.y = 0;
			this.drawFunctions.push('redrawCanvas');
			this.drawFunctions.push('drawBoardBackground');
			// this.drawFunctions.push('drawSquare');
			this.drawFunctions.push('drawBoardTiles');
			this.drawFunctions.push('drawButtons');
			this.drawFunctions.push('drawUnits');
			this.drawFunctions.push('drawPath');
		},
		setShadow: function(color,blur,offsetX,offsetY){
		    this.ctx.shadowColor = color;
		    this.ctx.shadowBlur = blur;
		    this.ctx.shadowOffsetX = offsetX;
		    this.ctx.shadowOffsetY = offsetY;
		},
		fillRectWithShadow: function(x,y,width,height,color,blur,offsetX,offsetY){
			this.ctx.save();
			this.setShadow(color,blur,offsetX,offsetY);
			this.ctx.fillRect(x,y,width,height);
			this.ctx.restore();
		},
		fillTextWithShadow: function(text,x,y,color,blur,offsetX,offsetY){
			this.ctx.save();
			this.setShadow(color,blur,offsetX,offsetY);
			this.ctx.fillText(text,x,y);
			this.ctx.restore();
		},
	};

	VirtArenaControl.Updater = {
		updateFunctions: [],
		framerate:1000/30,
		phaseChangeDelayCounter:0,


		init: function(){
			this.updateFunctions.push('checkCanvasSize');
			// this.updateFunctions.push('animateSquare');
			this.updateFunctions.push('getMousePosition');
			this.updateFunctions.push('getHoveredObjects');
			this.updateFunctions.push('checkVirtPositions');
			this.updateFunctions.push('updateButtonPositions');
			this.updateFunctions.push('updateBoardPosition');
		}
	};



	Scripts = {};
})();