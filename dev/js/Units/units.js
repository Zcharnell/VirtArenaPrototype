(function(){

	VirtArenaControl.Units = {
		units:[],
		teams:[],
		selectedUnit:'',
		movementStepDelay:350,
		deathDelay:1000,
		activationOrder:[],
		currentUnitActivating:'',
		path:[],

		//commander virts to choose from
		chooseVirtCommanderVirts:['Arturius','Imperator'],


		getUnitsToDraw: function(){
			var unitsToDraw = [];
			for(var i in this.units){
				if(this.units[i]){
					unitsToDraw.push(this.units[i]);
				}
			}

			return unitsToDraw;
		}
	}

})();