
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
  this.speed = 3;
}

Hero.prototype.update = function() {
  this.x += this.dirX * this.speed;
  this.y += this.dirY * this.speed;
};

function Monster() {
  this.x = Math.random() * 512;
  this.y = Math.random() * 480;
  this.dirX = 1;
  this.dirY = 0;
  this.speed = 5;
}

Monster.prototype.update = function() {
  updateEnemy(this);
};

function Goblin() {
  this.x = Math.random() * 512;
  this.y = Math.random() * 480;
  this.dirX = 1;
  this.dirY = 0;
  this.speed = 3;
}

Goblin.prototype.update = function() {
  updateEnemy(this);
};

var hero = new Hero();

var monsterImage = new Image();
monsterImage.src = 'images/monster.png';
var monster = new Monster();

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
  if (object.x > 512) {
    object.x = 0;
  }
  if (object.x < 0) {
    object.x = 512;
  }
  if (object.y > 480) {
    object.y = 0;
  }
  if (object.y < 0) {
    object.y = 480;
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
  monster.update();
  if (collision(monster)) {
    score++;
    monster.x = Math.random() * 512;
    monster.y = Math.random() * 480;
  }
  ctx.drawImage(monsterImage, monster.x, monster.y);

  for (var i = 0; i < goblins.length; i++) {
    var goblin = goblins[i];
    goblin.update();
    if (collision(goblin)) {
      score = 0;
      hero.x = Math.random() * 512;
      hero.y = Math.random() * 512;
      break;
    }
    ctx.drawImage(goblinImage, goblin.x, goblin.y);
  }

  ctx.font = "32px sans-serif";
  ctx.fillText('Score: ' + score, 35, 60);
  requestAnimationFrame(main);
}

main();
