//Constants
var MAXRAD = 100;
var MINRAD = 10;
var w;
//End Constants


function RadTheta(rad,theta) {
	this.r = rad;
	this.t = theta;
}
RadTheta.prototype.toCartesian = function() {
	var x = this.r*Math.cos(this.t);
	var y = this.r*Math.sin(this.t);
	return [x,y];
}

function Wheel(rt) {
	this.radTheta = rt;
	this.sprite = null;
}
Wheel.prototype.create = function(game,STARTX,STARTY) {
	this.sprite = game.add.sprite(STARTX,STARTY);
	game.physics.p2.enable(this.sprite,true);
	this.sprite.body.addPolygon([],this.getCartesianPolygon());
}



Wheel.prototype.cloneAndMutate = function(mutationRate) {
	return new Wheel(this.mutateRadTheta(mutationRate));
}
Wheel.prototype.mutateRadius = function(r,mutationRate) {
	var rtn = (r+r*(Math.random()-0.5)*mutationRate);
    if(rtn > MAXRAD) {
        rtn = MAXRAD;
    } else if(rtn < MINRAD) {
        rtn = MINRAD;
    }
    return rtn;
}
Wheel.prototype.mutateRadTheta = function(mutationRate) {
	var rtn = new Array(this.radTheta.length);
    for(var i = 0; i < this.radTheta.length; i++) {
        var r = this.mutateRadius(this.radTheta[i].r,mutationRate);
        rtn[i] = new RadTheta(r,this.radTheta[i].t);
    }
    return rtn;
}
Wheel.prototype.mutate = function() {
	this.radTheta = this.mutateRadTheta(0.1);
	this.update();
}
Wheel.prototype.getCartesianPolygon = function() {
	var rtn = new Array(this.radTheta.length);
    for(var i = 0; i < this.radTheta.length; i++) {
    	//console.log(this.radTheta[i]);
        rtn[i] = this.radTheta[i].toCartesian();
    }
    return rtn;
}
Wheel.prototype.update = function(game) {
	this.sprite.body.clearShapes();
	this.sprite.body.addPolygon([],this.getCartesianPolygon());
}

function randomWheel(vertices) {
	var rt = new Array(vertices);
	var anglepart = 2*Math.PI/vertices;
	for(var i = 0; i < vertices; i++) {
		rt[i] = new RadTheta(Math.floor(Math.random()*50),anglepart*i);
	}

	return new Wheel(rt);
}












/*
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

function preload() {
	game.stage.disableVisibilityChange = true;
}

function create() {
	game.world.setBounds(0, 0, 800, 600);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.friction = 3.0;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();

    w = randomWheel(8);
    w.create(game);

    setInterval(function() {w=w.cloneAndMutate(0.1);w.create(game); },10);
}

function update() {
	w.sprite.body.x = STARTX;
	w.sprite.body.y = STARTY;
}
function render() {

}
*/
