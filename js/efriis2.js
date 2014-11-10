//Constants
var STARTX = 300;
var STARTY = 400;
//End Constants
function Wheel(rt) {
	this.radTheta = rt;
	this.sprite = null;
}
Wheel.prototype.create = function(game) {
	this.sprite = game.add.sprite(STARTX,STARTY);
	game.physics.p2.enable(this.sprite,true);
	this.sprite.body.addPolygon([],this.radTheta);
}
Wheel.prototype.render = function(game) {

}