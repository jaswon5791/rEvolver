var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload () {
    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.load.image('logo', 'assets/phaser.png');

}

var ground;

function create () {

    ground = game.add.group();
    for (var i = 0 ; i < 10 ; i++) {
        var rect = game.add.sprite(i*game.world.width/11, game.world.height/2, null);
        var graphics = game.add.graphics(0, 0);
        graphics.beginFill(0xFFFF0B);
        graphics.drawRect(i*game.world.width/11, game.world.height/2,50,5);
        graphics.endFill();
        game.physics.enable(graphics, Phaser.Physics.ARCADE);
        graphics.body.immovable = true;
        ground.add(graphics);
    }

    /*
    logo = game.add.sprite(game.world.centerX, 0, 'logo');
    //logo.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(logo);
    logo.body.bounce.y = .9;
    logo.body.gravity.y = 400;
    logo.body.collideWorldBounds = true;
    */

}

function update () {

}
