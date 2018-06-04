var game = new Phaser.Game(800, 600,Phaser.CANVAS, 'gameDiv')
var darkforest;
var backgroundv;
var spaceship;
var cursors;
var bullets;
var bulletTime = 0;

var enemies;

var fireButton;

var score = 0;
var scoreText;
var winText;



var mainState = {
  preload() {
    game.load.image('darkforest' , "assets/darkforest.png")
    game.load.image('spaceship' ,"assets/spaceship.png");
    game.load.image('enemies',"assets/enemies.png")
    game.load.spritesheet('bulletball' ,"assets/bulletball.png")
  },

  create() {

    sprite = game.add.sprite(40, 100, 'ms');

       sprite.animations.add('walk');

       sprite.animations.play('walk', 50, true);

    darkforest = game.add.tileSprite(0,0,800,600,'darkforest');

    spaceship = game.add.sprite(game.world.centerX,game.world.centerY = 200 , 'spaceship');
    game.physics.enable(spaceship,Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bulletball');
    bullets.setAll('anchor.X', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outofboundsKILL', true);
    bullets.setAll('checkworldbounds' , true);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;


    createEnemies();


    scoreText = game.add.text(0,550,'score:',{font: '32px Arial',fill : '#fff'});
    winText = game.add.text(game.world.centerX,game.world.centerY,'YOU WIN!',{font: '32px Arial',fill:'#fff'});
    winText.visible = false;

  },

  update() {
    game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

    spaceship.body.velocity.x = 0;

    backgroundv = 3;
    darkforest.tilePosition.x -= 3;

    if(cursors.up.isDown) {
        spaceship.body.y -= 7;
    }

    if(cursors.down.isDown) {
        spaceship.body.y += 7;
    }

    if(cursors.left.isDown) {
        spaceship.body.x -= 7;
    }

    if(cursors.right.isDown) {
        spaceship.body.x += 7;
    }

    if(fireButton.isDown)
    {
        FireBullet();
    }

scoreText.text = 'score:' + score;

if(score == 2000){
    winText.visible = true;
}



  }
}

  function FireBullet(){

    if(game.time.now > bulletTime){

      bullet = bullets.getFirstExists(false);

      if(bullet){
         bullet.reset(spaceship.x,spaceship.y);
         bullet.body.velocity.x = +400;
         bulletTime = game.time.now + 200;
      }
    }

}



function createEnemies(){
    for(var y = 0; y< 5; y++){
        for(var x = 0; x< 5;x++){
            var enemy = enemies.create(x*50,y*50,'enemies');
            enemy.anchor.setTo(0.5,0.5);
        }

    }


enemies.x = 100;
enemies.y = 50;


var tween = game.add.tween(enemies).to({x:200},2000,Phaser.Easing.Linear.none,true,0,1000,true);

tween.onLoop.add(descend,this);

}

function descend(){
    enemies.y += 10;
}

function collisionHandler(bullet, enemy) {

bullet.kill();
enemy.kill();

score += 100;


}

game.state.add('mainState' , mainState);

game.state.start('mainState')
