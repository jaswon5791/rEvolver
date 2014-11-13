

function RadTheta(rad,theta) {
	this.r = rad;
	this.t = theta;
	this.score = 1e10;
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
Wheel.prototype.create = function(game) {
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
        rtn[i] = this.radTheta[i].toCartesian();
    }
    return rtn;
}
Wheel.prototype.update = function(game) {
	this.sprite.body.clearShapes();
	this.sprite.body.addPolygon([],this.getCartesianPolygon());
}
Wheel.prototype.setCollisionGroup = function(group,collides) {
	this.sprite.body.setCollisionGroup(group);
	this.sprite.body.collides(collides);
}

function randomWheel(vertices) {
	var rt = new Array(vertices);
	var anglepart = 2*Math.PI/vertices;
	for(var i = 0; i < vertices; i++) {
		rt[i] = new RadTheta(Math.floor(Math.random()*50),anglepart*i);
	}

	return new Wheel(rt);
}
