var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update/*, render: render*/});

function preload () {
    game.stage.disableVisibilityChange = true;

}

var ground;
var ball;
var segh = 6;
var segw = 50;
var r = 10;

function create () {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.8;
    game.physics.p2.gravity.y = 200;

    var gCol = game.physics.p2.createCollisionGroup();
    var bCol = game.physics.p2.createCollisionGroup();

    //create ground

    ground = game.add.group();
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.P2JS;

    var nextx = -5;
    var nexty = 100;
    var complex = .25;
    var dcomplex = .05;
    for (var i = 0 ; i < 20 ; i++) {
        //create bitmap of segment
        var bmd = game.add.bitmapData(segw,segh);
        bmd.ctx.fillStyle = "#0FFFFF";
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
        ang = (Math.random())*complex;
        shape.anchor.setTo(0,0);
        shape.body.rotation = ang;
        xchange = Math.cos(ang)*(segw);
        ychange = Math.sin(ang)*(segw);
        nextx += xchange;
        nexty += ychange;
        complex += dcomplex;


    }

    //create bitmap for ball
    var bmball = game.add.bitmapData(r*2,r*2);
    bmball.ctx.fillStyle = "FF0FFF";
    bmball.ctx.beginPath();
    bmball.ctx.arc(r, r, r, 0, 2 * Math.PI, false);
    bmball.ctx.fill();
    bmball.ctx.closePath();

    //create sprite from bitmap
    ball = game.add.sprite(r,r,bmball);
    game.physics.p2.enable(ball,false);
    ball.body.setCircle(r);
    ball.body.setCollisionGroup(bCol);
    ball.body.collides(gCol);


}

function update () {
    //game.physics.arcade.collide(ball, ground);
}

function rander () {
    //this.game.debug.renderBodyInfo(player, 150, 150);
}
