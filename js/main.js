var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});
var wheels[];

function preload() {
	game.stage.disableVisibilityChange = true;
}

function create() {
	game.world.setBounds(0, 0, 800, 600);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.friction = 3.0;

    gCol = game.physics.p2.createCollisionGroup();
    bCol = game.physics.p2.createCollisionGroup();

    w = randomWheel(8);
    w.create(game);

    //setInterval(function() {w=w.cloneAndMutate(0.1);w.create(game); },10);
}

function update() {
	w.sprite.body.x = STARTX;
	w.sprite.body.y = STARTY;
}
function render() {

}