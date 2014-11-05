var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload () {
    game.stage.disableVisibilityChange = true;
    //game.load.image('logo', 'assets/phaser.png');

}

var ground;
var ball;
var segh = 6;
var segw = 50;

function create () {
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;
    game.physics.p2.gravity.y = 100;

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
    var bmball = game.add.bitmapData(10,10);
    bmball.ctx.fillStyle = "FF0FFF";
    bmball.ctx.beginPath();
    bmball.ctx.arc(5, 5, 5, 0, 2 * Math.PI, false);
    bmball.ctx.fill();
    bmball.ctx.closePath();

    //create sprite from bitmap
    ball = game.add.sprite(0,0,bmball);
    game.physics.p2.enable(ball,false);
    ball.body.setCircle(5);
    ball.body.setCollisionGroup(bCol);
    ball.body.collides(gCol);


}

function update () {
    //game.physics.arcade.collide(ball, ground);
}
