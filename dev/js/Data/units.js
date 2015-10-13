(function(){

	VirtArenaControl.Units = {
		units:[],
		teams:[],
		addUnit: function(unit){
			this.units.push(unit);
		},
		getUnitsToDraw: function(){
			var unitsToDraw = [];
			for(var i in this.units){
				if(this.units[i]){
					unitsToDraw.push(this.units[i]);
				}
			}

			return unitsToDraw;
		},
		getUnitObject: function(unitName){
			//returns a new object based on the virtName, which should be class
			var unit = jQuery.extend(true, {}, new window[unitName]());
			unit.id = this.setUnitId(unit);
			return unit;
		},
		setUnitId: function(unit){
			var id = this.units.length;

			for(var i in this.units){
				if(this.units[i].id == id)
					id++;
			}

			return id;
		},

		//commander virts to choose from
		chooseVirtCommanderVirts:['Arturius','Imperator'],
	}

})();