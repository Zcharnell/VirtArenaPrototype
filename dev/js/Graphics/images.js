(function(){
	var images = VirtArenaControl.Images;

	images.boardBackground = new Image();
	images.boardBackground.src = "assets/images/background.jpg";

	images.spritesheet = {};
	images.spritesheet.image = new Image();
	images.spritesheet.image.src = "assets/images/spritesheet2.png";
	images.spritesheet.cellWidth = 40;
	images.spritesheet.cellHeight = 40;

	images.imperatorUnitArt = {
		x:0,
		y:0
	};

	images.arturiusUnitArt = {
		x:160,
		y:0
	};

	images.lancerUnitArt = {
		x:320,
		y:0
	};

	images.knightUnitArt = {
		x:480,
		y:0
	};

	images.praetorianUnitArt = {
		x:640,
		y:0
	};

	images.hecateUnitArt = {
		x:800,
		y:0
	};

	images.stanceButtons = {
		left: new Image(),
		leftHover: new Image(),
		middle: new Image(),
		middleHover: new Image(),
		right: new Image(),
		rightHover: new Image()
	}

	images.stanceButtons.left.src = 'assets/images/interface/stanceLeft2.png';
	images.stanceButtons.leftHover.src = 'assets/images/interface/stanceLeftHover.png';
	images.stanceButtons.middle.src = 'assets/images/interface/stanceMiddle.png';
	images.stanceButtons.middleHover.src = 'assets/images/interface/stanceMiddleHover.png';
	images.stanceButtons.right.src = 'assets/images/interface/stanceRight2.png';
	images.stanceButtons.rightHover.src = 'assets/images/interface/stanceRightHover.png';

	images.cardBackground = new Image();
	images.cardBackground.src = 'assets/images/interface/cardBackground.png';

})();
