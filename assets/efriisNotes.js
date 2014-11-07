var game, DemoState;

var phD =   { 
    
    "check": [
      
        {
          "density": 2, "friction": 0, "bounce": 0, 
          "filter": { "categoryBits": 1, "maskBits": 65535 },
          "shape": [   33, 58.5  ,  51.5, 90  ,  24, 95.5  ,  -0.5, 80  ]
        }  ,
        {
          "density": 2, "friction": 0, "bounce": 0, 
          "filter": { "categoryBits": 1, "maskBits": 65535 },
          "shape": [   51.5, 90  ,  55, 124.5  ,  24, 95.5  ]
        }  ,
        {
          "density": 2, "friction": 0, "bounce": 0, 
          "filter": { "categoryBits": 1, "maskBits": 65535 },
          "shape": [   51.5, 90  ,  85.5, 34  ,  91.5, 76  ,  55, 124.5  ]
        }  ,
        {
          "density": 2, "friction": 0, "bounce": 0, 
          "filter": { "categoryBits": 1, "maskBits": 65535 },
          "shape": [   85.5, 34  ,  123.5, 36  ,  127.5, 47  ,  91.5, 76  ]
        }  ,
        {
          "density": 2, "friction": 0, "bounce": 0, 
          "filter": { "categoryBits": 1, "maskBits": 65535 },
          "shape": [   124, 0.5  ,  125, 0.5  ,  123.5, 36  ,  85.5, 34  ]
        }  
    ]
    
  };

//create the game state
function DemoState() {}

DemoState.prototype.preload = function() {
  game.load.crossOrigin = "Anonymous"; //required to load assets for codepen
  // load the sprite texture
  game.load.image('check', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/check.png');
  
  // load the physics data json
  game.load.physics('physicsData', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/physics.json');
}
  
DemoState.prototype.create = function() {
  
  // start the P2JS physics system
  game.physics.startSystem(Phaser.Physics.P2JS);

  //set some initial gravity
  game.physics.p2.gravity.y = 500;

  
  // add our simple Box Collider Sprite
  // and give it physics
  var simpleCollisionSprite = game.add.sprite(128,128,'check');  
  // the second argument here turns on debug for the 
  // physics body. I've enabled it here for demonstration's sake.
  game.physics.p2.enableBody(simpleCollisionSprite,true);

  // add our polygon collider sprite
  // and give it physics
  var polygonCollisionSprite = game.add.sprite(400,128,'check');  
  game.physics.p2.enableBody(polygonCollisionSprite,true);

  // remove all of the current collision shapes from the physics body
  polygonCollisionSprite.body.clearShapes();
  
  // load our polygon physics data
  polygonCollisionSprite.body.loadPolygon('physicsData', 'check');
  

  // create a group for easy modification
  // and add the sprites
  // NOTE: This is for purposes of restarting the demo 
  // it has no bearing on the actual physics of the sprites
  var checkGroup = game.add.group();
  checkGroup.add(simpleCollisionSprite);
  checkGroup.add(polygonCollisionSprite);
  
  // add text for demo display
  scoreText = game.add.text(10, 10, 'Hit Space to Restart Demo');
  scoreText.font = 'Arial Black';
  scoreText.fontSize = 16;
  scoreText.stroke = '#000';
  scoreText.strokeThickness = 3;
  scoreText.fill = '#fff';
  
  // setup our demo keyboard handler
  var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spacebar.onDown.add(function() {
    checkGroup.forEachExists(function(sprite) {
      sprite.reset(sprite.x, 128);
      sprite.body.angle = 0;
    });
  });
}

// Game Bootstrapper
window.onload = function () {
  game = new Phaser.Game(600, 300, Phaser.AUTO, 'polygon-example');
  // add the game state to the state manager
  game.state.add('demo', DemoState);
  // and start the game
  game.state.start('demo');

  
};