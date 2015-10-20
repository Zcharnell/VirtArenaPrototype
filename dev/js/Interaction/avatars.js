(function(){
	VirtArenaControl.Avatars.avatars = [];

	VirtArenaControl.Avatars.newAvatar = function(unit){
		var avatar = new Avatar({unit:unit});
		this.avatars.push(avatar);
		return avatar;
	};	
})();