var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload () {
    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.load.image('logo', 'assets/phaser.png');

}

function create () {

    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(logo);
    logo.body.bounce.y = .9;
    logo.body.gravity.y = 400;
    logo.body.collideWorldBounds = true;

}

function update () {

}
