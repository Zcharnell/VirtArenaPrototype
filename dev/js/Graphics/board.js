(function(){

	VirtArenaControl.Board = {
		x:0,
		y:0,
		width:0,
		height:0,
		horizontalPadding:200,
		topPadding:90,
		bottomPadding:150,
		tilesCount: 0,
		rows: 0,
		columns: 0,
		tileWidth:51,
		tileHeight:51,
		tileSpacing:5,
		tiles:[],
		init: function(){
			this.rows = 9;
			this.columns = 12;
			this.oddRows = Math.floor(this.rows/2);
			this.tilesCount = this.rows*this.columns + this.oddRows;
			this.setupTiles();
			this.width = (this.columns+1)*this.tileWidth + this.columns*this.tileSpacing + this.horizontalPadding*2;
			this.height = (this.rows)*this.tileHeight + this.rows*this.tileSpacing + this.topPadding + this.bottomPadding;
		},
		drawBackground: function(){
			VirtArenaControl.Graphics.ctx.fillStyle = '#ebf5f7';
			VirtArenaControl.Graphics.fillRectWithShadow(this.x,this.y,this.width,this.height,'#111',20,0,15);
			VirtArenaControl.Graphics.ctx.fillStyle = '#ffffff';
			VirtArenaControl.Graphics.ctx.fillRect(this.x+this.horizontalPadding/2,this.y,this.width-this.horizontalPadding,this.height);
			VirtArenaControl.Graphics.ctx.drawImage(VirtArenaControl.Images.boardBackground,this.x,this.y,this.width,this.height);
		},
		drawCurrentPhase: function(){
			VirtArenaControl.Graphics.ctx.textAlign = "center";
			VirtArenaControl.Graphics.ctx.fillStyle = '#ffffff';
			VirtArenaControl.Graphics.ctx.font = '16px Arial';
			VirtArenaControl.Graphics.ctx.fillText(VirtArenaControl.TurnController.getCurrentPhaseText(),this.x+this.width/2,this.y+this.topPadding/2);
		},
		updatePosition: function(){
			var oldX = this.x;
			var oldY = this.y;
			this.x = Math.floor(VirtArenaControl.Camera.width/2-this.width/2);
			this.y = Math.floor(VirtArenaControl.Camera.y);
			if(this.x != oldX || this.y != oldY){
				this.resetTilePositions();
			}
		},
		setupTiles: function(){
			var dimensions = {width:this.tileWidth,height:this.tileHeight,spacing:this.tileSpacing};
			for(var i=0; i<this.rows; i++){
				for(var j=0; j<this.columns; j++){
					var newTile = new Tile(i,j,dimensions);
					newTile.index = this.tiles.length;
					this.tiles.push(newTile);
					if(i%2 === 1 && j === this.columns-1){
						var newTile = new Tile(i,j+1,dimensions);
						newTile.index = this.tiles.length;
						this.tiles.push(newTile);
					}
				}
			}
			this.setAdjacentTiles();
		},
		setAdjacentTiles: function(){
			for(var i=0; i<this.tilesCount; i++){
				var tile = this.tiles[i];
				if(tile.oddRow){
					if(tile.column != this.columns){
						tile.adjacentTiles.push(i+1); //right
						if(tile.row != 0)
							tile.adjacentTiles.push(i-this.columns); //topright
						if(tile.row != this.rows-1)
							tile.adjacentTiles.push(i+this.columns+1); //bottomright
					}
					if(tile.column != 0) {
						tile.adjacentTiles.push(i-1); //left
						if(tile.row != 0)
							tile.adjacentTiles.push(i-this.columns-1); //topleft
						if(tile.row != this.rows-1)
							tile.adjacentTiles.push(i+this.columns); //bottomleft
					}
				} else if(!tile.oddRow) {
					if(tile.column != this.columns-1)
						tile.adjacentTiles.push(i+1); //right
					if(tile.column != 0)
						tile.adjacentTiles.push(i-1); //left
					if(tile.row != 0){
						tile.adjacentTiles.push(i-this.columns-1); //topleft
						tile.adjacentTiles.push(i-this.columns); //topright
					}
					if(tile.row != this.rows-1){
						tile.adjacentTiles.push(i+this.columns+1); //bottomright
						tile.adjacentTiles.push(i+this.columns); //bottomleft
					}
				}
			}
		},
		resetTilePositions: function(){
			for(var i in this.tiles){
				this.tiles[i].setPositionOnBoardChange();
			}
		}
	}

})();