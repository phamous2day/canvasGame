
var score = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var backgroundImage = new Image();
backgroundImage.src = 'images/background.png';
var heroImage = new Image();
heroImage.src = 'images/hero.png';

function Hero() {
  this.x = 200;
  this.y = 200;
  this.dirX = 0;
  this.dirY = 0;
  this.speed = 5;
}

Hero.prototype.update = function() {
  this.x += this.dirX * this.speed;
  this.y += this.dirY * this.speed;
};

function Rescue() {
  this.x = Math.random() * 920;
  this.y = Math.random() * 546;
  this.dirX = 1;
  this.dirY = 0;
  this.speed = 9;
}

Rescue.prototype.update = function() {
  updateEnemy(this);
};

function Goblin() {
  this.x = Math.random() * 920;
  this.y = Math.random() * 546;
  this.dirX = 1;
  this.dirY = 0;
  this.speed = 7;
}

Goblin.prototype.update = function() {
  updateEnemy(this);
};

var hero = new Hero();

var rescueImage = new Image();
rescueImage.src = 'images/rescue.png';
var rescue = new Rescue();

var goblinImage = new Image();
goblinImage.src = 'images/goblin.png';

var goblins = [
  new Goblin(), new Goblin()
];

window.addEventListener('keydown', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.dirX = -1;
  } else if (key === 39) { // right
    hero.dirX = 1;
  } else if (key === 38) { // up
    hero.dirY = -1;
  } else if (key === 40) { // down
    hero.dirY = 1;
  }

  handleWrapping(hero);
});

window.addEventListener('keyup', function(event) {
  var key = event.keyCode;
  if (key === 37) { // left
    hero.dirX = 0;
  } else if (key === 39) { // right
    hero.dirX = 0;
  } else if (key === 38) { // up
    hero.dirY = 0;
  } else if (key === 40) { // down
    hero.dirY = 0;
  }
});

function collision(enemy) {
  // detect collision
  if (hero.x + 32 < enemy.x) {
    return false;
  } else if (enemy.x + 32 < hero.x) {
    return false;
  } else if (hero.y + 32 < enemy.y) {
    return false;
  } else if (enemy.y + 32 < hero.y) {
    return false;
  }
  return true;
}

function handleWrapping(object) {
  if (object.x > 920) {
    object.x = 0;
  }
  if (object.x < 0) {
    object.x = 920;
  }
  if (object.y > 546) {
    object.y = 0;
  }
  if (object.y < 0) {
    object.y = 546;
  }
}

function updateEnemy(enemy) {
  // change enemy direction
  if (counter % 50 === 0) {
    enemy.dirX = Math.floor(Math.random() * 3) - 1;
    enemy.dirY = Math.floor(Math.random() * 3) - 1;
  }
  // update enemy position
  enemy.x += enemy.dirX * enemy.speed;
  enemy.y += enemy.dirY * enemy.speed;
  handleWrapping(enemy);
}

var counter = 0;
function main() {
  counter++;
  ctx.drawImage(backgroundImage, 0, 0);
  ctx.drawImage(heroImage, hero.x, hero.y);

  hero.update();
  rescue.update();
  if (collision(rescue)) {
    score++;
    rescue.x = Math.random() * 920;
    rescue.y = Math.random() * 546;
  }
  ctx.drawImage(rescueImage, rescue.x, rescue.y);

  for (var i = 0; i < goblins.length; i++) {
    var goblin = goblins[i];
    goblin.update();
    if (collision(goblin)) {
      score = 0;
      hero.x = Math.random() * 920;
      hero.y = Math.random() * 920;
      break;
    }
    ctx.drawImage(goblinImage, goblin.x, goblin.y);
  }

  ctx.font = "32px Impact";
  ctx.fillStyle = "white";
  ctx.fillText('Score: ' + score, 35, 60);
  requestAnimationFrame(main);
}

main();
