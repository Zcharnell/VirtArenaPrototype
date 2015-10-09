
	
function Team(name,color){
	this.name = name;
	this.color = color;
	this.virts = [];
	this.commander = {};
	this.hasPriority = false;

	this.addVirt = function(virt){
		virt.team = this.name;
		VirtArenaControl.Virts.addVirt(virt);
		this.virts.push(virt);
	};

	this.addCommander = function(virtName){
		var virt = VirtArenaControl.Virts.getVirtObject(virtName);
		this.commander = virt;
		this.addVirt(virt);
	};

	this.setStartingPosition = function(positionObj){
		var positions = Object.keys(positionObj);
		for(var i in this.virts){
			if(this.virts[i] === this.commander){
				var tile = VirtArenaControl.Board.tiles[positionObj.commanderTile];
				VirtArenaControl.ObjectController.setVirtTile(this.virts[i],tile);
				positions.splice(positions.indexOf('commanderTile',1));
			} else {
				var tile = VirtArenaControl.Board.tiles[positionObj[positions[0]]];
				VirtArenaControl.ObjectController.setVirtTile(this.virts[i],tile);
				positions.splice(0,1);
			}
		}
	};
}

