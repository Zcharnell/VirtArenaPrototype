(function(){
	VirtArenaControl.Graphics.draw = function(){
		for(var i=0; i<this.drawFunctions.length; i++){
			this[this.drawFunctions[i]]();
		}
	}

	VirtArenaControl.Graphics.redrawCanvas = function(){
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = '#666';
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		// this.ctx.strokeStyle = 'gray';
		// this.ctx.strokeRect(0,0,VirtArenaControl.Camera.width,VirtArenaControl.Camera.height);
	}

	VirtArenaControl.Graphics.drawSquare = function(){
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(VirtArenaControl.Camera.x,VirtArenaControl.Camera.y,VirtArenaControl.Camera.width/2,VirtArenaControl.Camera.height/2);
	}

	VirtArenaControl.Graphics.drawBoardTiles = function(){
		var tiles = VirtArenaControl.Board.tiles;

		for(var i=0; i<tiles.length; i++){
			if(tiles[i].hover || tiles[i].adjacentToHover){
				tiles[i].drawHover(i);
			} else {
				tiles[i].draw(i);
			}
		}
	}

	VirtArenaControl.Graphics.drawButtons = function(){
		var buttons = VirtArenaControl.Buttons.buttonsToDraw;

		for(var i=0; i<buttons.length; i++){
			var button = VirtArenaControl.Buttons[buttons[i]];
			if(button){
				button.draw();
				// console.log(button);
			}
		}
	}

	VirtArenaControl.Graphics.drawVirts = function(){
		var virts = VirtArenaControl.Virts.getVirtsToDraw();

		for(var i in virts){
			var virt = virts[i];
			if(virt){
				virt.draw();
			}
		}
	}

	VirtArenaControl.Graphics.drawPath = function(){
		var path = VirtArenaControl.ObjectController.path;
		for(var i in path){
			path[i].drawPath();
		}
	};

	VirtArenaControl.Graphics.drawBoardBackground = function(){
		VirtArenaControl.Board.drawBackground();
	};
})();
