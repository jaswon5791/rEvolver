function createGround() {
	ground = game.add.group();
	ground.enableBody = true;
	ground.physicsBodyType = Phaser.Physics.P2JS;

	for (var i = 0 ; i < 10 ; i++) {
	    addSeg();
	}
}