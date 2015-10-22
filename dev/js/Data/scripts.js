(function(){
	Scripts.mouseInObject = function(object){
		var mouse = VirtArenaControl.Mouse;
		if(mouse.x >= object.x 
		  && mouse.x <= object.x+object.width
		  && mouse.y >= object.y
		  && mouse.y <= object.y+object.height) {
			return true;
		} else {
			return false;
		}
	};

	Scripts.sortUnitsBySpeed = function(a,b){
		if(a.turnStats.speed > b.turnStats.speed) return -1;
		if(a.turnStats.speed < b.turnStats.speed) return 1;
		//check which team has priority
		if(a.turnStats.speed === b.turnStats.speed && a.team.hasPriority) return -1;
		if(a.turnStats.speed === b.turnStats.speed && !a.team.hasPriority) return 1;
	};

	Scripts.sortDescending = function(a,b){
		if(a > b) return -1; //a before b
		if(a < b) return 1; //a after b
		return Math.floor(Math.random()*2-1); //random -1 or 0
	};

	Scripts.sortAscending = function(a,b){
		if(a < b) return -1; //a before b
		if(a > b) return 1; //a after b
		return Math.floor(Math.random()*2-1); //random -1 or 0
	};

	Scripts.sortStancesDescending = function(a,b){
		if(a.value > b.value) return -1; //a before b
		if(a.value < b.value) return 1; //a after b
		return Math.floor(Math.random()*2); //random 0 or 1
	};

	Scripts.rollDamageDie = function(){
		var roll = Math.floor(Math.random()*3); //return 0 1 2
		var crit = (Math.floor(Math.random()*2) && roll > 0) ? true : false; //return 0 1
		var dieRoll = {
			roll:roll,
			crit:crit
		}
		return dieRoll;
	};

	Scripts.getMoveRangeBetweenTiles = function(startTile,endTile){
		var tiles = VirtArenaControl.Board.tiles;
		var openTiles = [];
		var closedTiles = [];
		var blockedTiles = [];
		var tempRange = 1;
		// console.log(startTile,endTile);

		for(var i in startTile.adjacentTiles){
			var index = startTile.adjacentTiles[i];
			if(tiles[index].isOpen()){
				tiles[index].tempParentTile = startTile;
				tiles[index].tempRange = tempRange;
				openTiles.push(tiles[index]);
			} else {
				tiles[index].tempParentTile = startTile;
				tiles[index].tempRange = tempRange;
				blockedTiles.push(tiles[index]);
			}
		}
		var error = 0;

		while(error < 1000 && openTiles.length > 0) {
			error++;

			for(var i=0; i<openTiles.length; i++){
				var nextTempRange = openTiles[i].tempRange + 1;
				for(var j in openTiles[i].adjacentTiles){
					var index = openTiles[i].adjacentTiles[j];
					var indexInOpenTiles = openTiles.indexOf(tiles[index]);
					if(indexInOpenTiles === -1 && tiles[index].isOpen()){
						tiles[index].tempParentTile = openTiles[i];
						tiles[index].tempRange = nextTempRange;
						openTiles.push(tiles[index]);
					} else if(indexInOpenTiles != -1 && openTiles[indexInOpenTiles].tempRange > nextTempRange){
						openTiles[indexInOpenTiles].tempParentTile = openTiles[i];
						openTiles[indexInOpenTiles].tempRange = nextTempRange;
					} else if(!tiles[index].isOpen()) {
						if(blockedTiles.indexOf(tiles[index]) === -1){
							tiles[index].tempParentTile = openTiles[i];
							tiles[index].tempRange = nextTempRange;
							blockedTiles.push(tiles[index]);
						} else if(tiles[index].tempRange > nextTempRange){
							tiles[index].tempParentTile = openTiles[i];
							tiles[index].tempRange = nextTempRange;
						}

					}
				}
				closedTiles.push(openTiles[i]);
			}

			for(var i=0; i<closedTiles.length; i++){
				var index = openTiles.indexOf(closedTiles[i]);
				if(index != -1){
					openTiles.splice(index,1);
				}
			}
		}

		// console.log(endTile.tempRange);
		var rangeToEndTile = endTile.tempRange;
		return rangeToEndTile;
	};

	// Scripts.setFontSizeToFit = function(text,font,width){
	// 	var font;
	// 	VirtArenaControl.Graphics.ctx.font = font;
	// 	if(VirtArenaControl.Graphics.ctx.measureText(text).width > width*0.9){
			
	// 	}
	// }
	


	Scripts.multilineStringReturn = function(lineIn,maxSize,font){
		//designed to take a string and make it into multiple lines based on the max line size given
		var totalWidth,numLines,linesToReturn,curStringIndex,currentWidth,nextWord;
		VirtArenaControl.Graphics.ctx.font = font;
		curStringIndex = 0;
		linesToReturn = [];
		totalWidth = VirtArenaControl.Graphics.ctx.measureText(lineIn).width;	//gets total line size
		if(totalWidth > maxSize){		
			numLines = Math.ceil(totalWidth/maxSize); //find how many lines are needed for the given size
		} else {
			linesToReturn[0] = lineIn;
		}
		for(var i=0; i<numLines; i++){		//for each line,
			linesToReturn[i] = '';		//instantiate the string that will contain the line
			currentWidth = 0;					//count the current size
			while(currentWidth < maxSize && lineIn[curStringIndex]){		//while less than max size and the inputted string hasnt been completely read,
				if(maxSize-currentWidth < 50 && lineIn[curStringIndex] == ' '){		//if near max size, check if the next word would push the line over max size
					nextWord = multilineCheckNextWord(lineIn,curStringIndex,maxSize-currentWidth);
					if(nextWord != null){
						linesToReturn[i] += nextWord[0];
						curStringIndex = nextWord[1];
					}
					else{
						curStringIndex++;
						break;
					}
				}
				else
				{
					linesToReturn[i] += lineIn[curStringIndex];	//add the next letter of the inputted string
					curStringIndex++;
				}
				currentWidth = VirtArenaControl.Graphics.ctx.measureText(linesToReturn[i]).width;
			}
		}
		return linesToReturn; 	//return array of the divided lines
	}

	function multilineCheckNextWord(lineIn,currentIndex,maxSizeLeft){
		var curStringIndex = currentIndex+1;
		var tempWord = ' ';
		while(lineIn[curStringIndex] && lineIn[curStringIndex] != ' '){
			tempWord += lineIn[curStringIndex];
			curStringIndex++;
		}
		if(VirtArenaControl.Graphics.ctx.measureText(tempWord).width < maxSizeLeft){
			return [tempWord,curStringIndex];
		}
		else{
			return null;
		}
	}
})();