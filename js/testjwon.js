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
function create () {

    game.world.setBounds(0, 0, 1e9, 1e6);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 300;
    game.physics.p2.friction = 1.0;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();

    //create ground

    ground = game.add.group();
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0 ; i < 10 ; i++) {
        addSeg();
    }

//create wheel
    w = randomWheel(8);
    w.create(game,startx+40,starty-100);
    w.sprite.body.setCollisionGroup(bCol);
    w.sprite.body.collides(gCol);

    game.camera.follow(w);

    game.input.onDown.add(click, this);

}

function update () {
    if (game.camera.x + game.world.width > nextx) {
        addSeg();
    }
    w.cloneAndMutate(0.1).create(game);
}

function click(pointer) {
    addObstacle(50,50,pointer.x+game.camera.x,pointer.y+game.camera.y);
}

function addObstacle (w,h,x,y) {
    var bmd = game.add.bitmapData(w,h);
    bmd.ctx.fillStyle = '#'+Math.floor(Math.random()*16000000+777215).toString(16);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, w, h);
    bmd.ctx.fill();

    //make sprite from bitmap
    var shape = ground.create(x,y,bmd);
    game.physics.p2.enable(shape,true);
    shape.body.setRectangle(w,h);
    shape.body.setCollisionGroup(gCol);
    shape.body.collides(bCol);
    shape.body.static = true;
}

function addSeg(col) {
//function addSeg(col) {
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
    shape.outOfBoundsKill = true;

    //randomize
    shape.anchor.setTo(0,0);
    shape.body.rotation = nexta;
    nextx += Math.cos(nexta)*(segw);
    nexty += Math.sin(nexta)*(segw);
    nexta += (Math.random()-0.5)*changea;
    if(nexta < 0) nexta = 0;
}

function render () {
    //this.game.debug.renderBodyInfo(player, 150, 150);
}
