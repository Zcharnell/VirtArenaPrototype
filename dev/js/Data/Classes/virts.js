(function(){

	VirtArenaControl.Virts = {
		virts:[],
		teams:[],
		addVirt: function(virt){
			this.virts.push(virt);
		},
		getVirtsToDraw: function(){
			var virtsToDraw = [];
			for(var i in this.virts){
				if(this.virts[i]){
					virtsToDraw.push(this.virts[i]);
				}
			}

			return virtsToDraw;
		},
		getVirtObject: function(virtName){
			//returns a new object based on the virtName, which should be class
			var virt = new window[virtName]();
			return virt;
		},

		//commander virts to choose from
		chooseVirtCommanderVirts:['Arturius','Imperator'],
	}

})();