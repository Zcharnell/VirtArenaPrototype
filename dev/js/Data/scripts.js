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

	Scripts.rollDamageDie = function(){
		var roll = Math.floor(Math.random()*3); //return 0 1 2
		var crit = (Math.floor(Math.random()*2) && roll > 0) ? true : false; //return 0 1
		var dieRoll = {
			roll:roll,
			crit:crit
		}
		return dieRoll;
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