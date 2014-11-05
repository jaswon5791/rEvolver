var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload () {
    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.load.image('logo', 'assets/phaser.png');

}

var ground;

function create () {

    ground = game.add.group();

    var nextx = 0;
    var nexty = game.world.height/2;
    var complex = .1;
    var dcomplex = .15;
    for (var i = 0 ; i < 20 ; i++) {
        var shape = game.add.graphics(nextx, nexty);
        shape.beginFill(0x0FFFFF);
        shape.drawRect(0,0,50,5);
        shape.endFill();
        ang = (Math.random()-.5)*complex;
        shape.rotation = ang;
        nextx += Math.cos(ang)*50;
        nexty += Math.sin(ang)*50;
        complex += dcomplex;
        game.physics.enable(shape, Phaser.Physics.ARCADE);
        ground.add(shape);
    }



}

function update () {

}
