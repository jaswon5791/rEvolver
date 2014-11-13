var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
var ground;
var w;
var v;
var maxX = STARTX;


function preload() {
	game.stage.disableVisibilityChange = true;
}

function create() {
	game.world.setBounds(0,0, 1e9, 1e6);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 300;
    game.physics.p2.friction = 5.0;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();


    ground = game.add.group();
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0 ; i < 1000 ; i++) {
	   	addSeg();
	}
    w = new Array();
    for(var i = 0; i < 10; i++) {
        w[i] =  randomWheel(8);
        w[i].create(game);

        w[i].setCollisionGroup(bCol,gCol);
    }

    game.camera.follow(w[0].sprite);

    game.input.onDown.add(click, this);



}

function update() {
    for(var i = 0; i < w.length; i++) {
        if(maxX < w[i].sprite.body.x) {
            maxX = w[i].sprite.body.x;
            game.camera.follow(w[i].sprite);
        }
        //if(w[i].sprite.body.angularVelocity < 10) w[i].sprite.body.angularVelocity = 10;
    }
}
function render() {

}

var nextx = STARTX-100;
var nexty = STARTY + 80;
var nexta = Math.PI/18;

function addSeg() {
    //create bitmap of segment
    var bmd = game.add.bitmapData(SEGW,SEGH);
    bmd.ctx.fillStyle = '#'+Math.floor(Math.random()*16000000+777215).toString(16);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, SEGW, SEGH);
    bmd.ctx.fill();

    //make sprite from bitmap
    var shape = ground.create(nextx,nexty,bmd);
    game.physics.p2.enable(shape,false);
    shape.body.setRectangle(SEGW,SEGH,SEGW/2,SEGH/2);
    shape.body.setCollisionGroup(gCol);
    shape.body.collides(bCol);
    shape.body.static = true;
    shape.anchor.setTo(0,0);
    shape.body.rotation = nexta;

    //randomize
	nextx += Math.cos(nexta)*(SEGW);
	nexty += Math.sin(nexta)*(SEGW);
	nexta += (Math.random()-0.5)*CHANGEA;
    if(nexta < 3*Math.PI/12) {
    	nexta = 3*Math.PI/12;
    } else if(nexta > 3*Math.PI/6) {
    	nexta = 3*Math.PI/6;
    }

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

function click(pointer) {
    addObstacle(50,50,pointer.x+game.camera.x,pointer.y+game.camera.y);
}
function reset() {
    for(var i = 0; i < w.length; i++) {
        var s = w[i].sprite;
        s.body.x = STARTX;
        s.body.y = STARTY;
        s.body.velocity.x = 0;
        s.body.velocity.y = 0;
    }
}
