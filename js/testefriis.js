var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update/*, render: render*/});

function preload () {
    game.stage.disableVisibilityChange = true;

}

var gCol, bCol;

var d2r = 2*Math.PI/360;

var anglearray = [];
var ground;
var ball;
var segh = 20;
var segw = 50;
var startx = 400;
var starty = 300;
var nexta = d2r*10;
var changea = d2r*7;
var nextx = startx;
var nexty = starty;
var r = 10;
var maxRad = 100;
var minRad = 10;

var radThetas = getRadThetas(8);
function create () {

    game.world.setBounds(0, 0, 1e9, 1e6);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.friction = 3.0;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();

    //create ground

    /*ground = game.add.group();
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0 ; i < 10 ; i++) {
        addSeg();
    }*/
    ball = game.add.sprite(r+startx,r+starty-80,null);
    game.physics.p2.enable(ball,true);
    ball.body.addPolygon([],toCartesianArr(radThetas));
    ball.body.setCollisionGroup(bCol);
    ball.body.collides(gCol);

    game.camera.follow(ball);
}

function update () {
    if (game.camera.x + game.world.width > nextx) {
       // addSeg();
    }
    ball.body.x = startx;
    ball.body.y = starty;
    //if(ball && ball.body.angularVelocity < 5) ball.body.angularVelocity = 5;
}

function polyBitmap(vertices) {
    //find w and h
    minx = maxx = vertices[0][0];
    miny = maxy = vertices[0][1];
    for (var i = 1 ; i < vertices.length ; i++) {
        minx = Math.min(minx, vertices[i][0]);
        maxx = Math.max(maxx, vertices[i][0]);
        miny = Math.min(miny, vertices[i][1]);
        maxy = Math.max(maxy, vertices[i][1]);
    }
    w = Math.abs(maxx-minx);
    h = Math.abs(maxy-miny);

    var bm = game.add.bitmapData(w,h);
    bm.ctx.fillStyle = "#FF0FFF";
    bm.ctx.beginPath();
    bm.ctx.moveTo(vertices[0][0]-minx,vertices[0][1]-miny);
    for (var i = 1 ; i < vertices.length ; i++) {
        bm.ctx.lineTo(vertices[i][0]-minx,vertices[i][1]-miny);
    }
    bm.ctx.fill();
    bm.ctx.closePath();
    return bm;
}

/*function addSeg(col) {
    //create bitmap of segment
    var bmd = game.add.bitmapData(segw,segh);
    bmd.ctx.fillStyle = '#'+Math.floor(Math.random()*16000000+777215).toString(16);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, segw, segh);
    bmd.ctx.fill();

    //make sprite from bitmap
    var shape = ground.create(nextx,nexty,bmd);
    game.physics.p2.enable(shape,false);
    shape.body.setRectangle(segw,segh,segw/2,segh/2);
    shape.body.setCollisionGroup(gCol);
    shape.body.collides(bCol);
    shape.body.static = true;

    //randomize
    shape.anchor.setTo(0,0);
    shape.body.rotation = nexta;
    nextx += Math.cos(nexta)*(segw);
    nexty += Math.sin(nexta)*(segw);
    nexta += (Math.random()-0.5)*changea;
    if(nexta < 0) nexta = 0;
}*/

function render () {
    //this.game.debug.renderBodyInfo(player, 150, 150);
}
function getRadThetas(v) {
    //return [[0,0],[50,50],[100,0],[50,100]];
    var points = new Array(v);
    var anglepart = 2*Math.PI/v;
    for (var i = 0 ; i < points.length ; i++) {
        points[i] = [Math.floor(Math.random()*50),anglepart*i];
    }
    return points;
}
function reset() {
    //ball.kill();
    //ball = game.add.sprite(r+startx,r+starty-80,null);
    //game.physics.p2.enable(ball,true);
    //ball.body.setCircle(r);
    radThetas = mutatePoints(radThetas,0.2);
    ball.body.clearShapes();
    ball.body.addPolygon([],toCartesianArr(radThetas));
    ball.body.setCollisionGroup(bCol);
    ball.body.collides(gCol);

   // game.camera.follow(ball);
}
function mutatePoints(rt,mutationrate) {
    var rtn = new Array(rt.length);
    for(var i = 0; i < rt.length; i++) {
        var r = mutateRadius(radThetas[i][0],mutationrate);
        rtn[i] = [r,rt[i][1]];
    }
    return rtn;
}
function mutateRadius(r, mutationrate) {
    var rtn = (r+r*(Math.random()-0.5)*mutationrate);
    if(rtn > maxRad) {
        rtn = maxRad;
    } else if(rtn < minRad) {
        rtn = minRad;
    }
    return rtn;
}
function toCartesianArr(arr) {
    var rtn = new Array(arr.length);
    for(var i = 0; i < arr.length; i++) {
        rtn[i] = [arr[i][0]*Math.cos(arr[i][1]),arr[i][0]*Math.sin(arr[i][1])];
    }
    return rtn;
}

/*function copyPoints(arr) {
    var rtn = new Array(arr.length);
    for(var i = 0; i < arr.length; i++) {
        rtn[i] = new Array(2);
        rtn[i][0] = arr[i][0];
        rtn[i][1] = arr[i][1];
    }
    return rtn;
}*/
