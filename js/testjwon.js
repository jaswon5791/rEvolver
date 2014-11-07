var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update/*, render: render*/});

function preload () {
    game.stage.disableVisibilityChange = true;

}

var gCol, bCol;

var d2r = 2*Math.PI/360;

var anglearray = [];
var ground;
var ball;
var segh = 6;
var segw = 50;
var startx = 400;
var starty = 300;
var nexta = d2r*10;
var changea = d2r*7;
var nextx = startx;
var nexty = starty;
var r = 10;

function create () {

    game.world.setBounds(0, 0, 1e9, 1e6);

    game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.p2.restitution = .8;
    game.physics.p2.gravity.y = 400;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();

    //create ground

    ground = game.add.group();
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0 ; i < 10 ; i++) {
        addSeg();
    }

    //create bitmap for ball
    var bmball = game.add.bitmapData(r*2,r*2);
    bmball.ctx.fillStyle = "#FF0FFF";
    bmball.ctx.beginPath();
    bmball.ctx.arc(r, r, r, 0, 2 * Math.PI, false);
    bmball.ctx.fill();
    bmball.ctx.closePath();

    //create sprite from bitmap
    var polygons = new Array(3);
    for (var i = 0 ; i < 3 ; i++) {
        polygons[i] = [Math.random()*40+20,Math.random()*40+20];
    }
    //ball = game.add.sprite(r+startx,r+starty-40,bmball);
    ball = game.add.sprite(r+startx,r+starty-80,null);
    game.physics.p2.enable(ball,true);
    //ball.body.setCircle(r);
    ball.body.addPolygon([],polygons);
    ball.body.setCollisionGroup(bCol);
    ball.body.collides(gCol);

    game.camera.follow(ball);


}

function update () {
    if (game.camera.x + game.world.width > nextx) {
        addSeg();
    }
    ball.body.angularVelocity = 5;
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

function addSeg(col) {
    //create bitmap of segment
    var bmd = game.add.bitmapData(segw,segh);
    bmd.ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
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
    nexta += (Math.random()-.5)*changea;
}

function render () {
    //this.game.debug.renderBodyInfo(player, 150, 150);
}
