(function(){

	VirtArenaControl.Board = {
		tilesCount: 0,
		rows: 0,
		columns: 0,
		tiles:[],
		init: function(){
			this.rows = 9;
			this.columns = 12;
			this.oddRows = Math.floor(this.rows/2);
			this.tilesCount = this.rows*this.columns + this.oddRows;
			this.setupTiles();
		},
		setupTiles: function(){
			for(var i=0; i<this.rows; i++){
				for(var j=0; j<this.columns; j++){
					var newTile = new Tile(i,j);
					newTile.index = this.tiles.length;
					this.tiles.push(newTile);
					if(i%2 === 1 && j === this.columns-1){
						var newTile = new Tile(i,j+1);
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
		}
	}

})();