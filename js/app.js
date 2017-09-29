// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
      this.x= x;
      this.y= y;
      // set the speed of the enemy using a random number between 1 and 4
      this.speed= Math.floor((Math.random()*4)+1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // set enemy position based on the speed and the time delta
    this.x = this.x + 101 * dt * this.speed;
    if(this.x> 505){ //if the bug is off canvas
      this.reset();
    }
// check collisions
  if( this.y == player.y &&( this.x > player.x - 20 && this.x < player.x + 20)){
    player.x= 200;
    player.y= 380;
  }


};

Enemy.prototype.reset = function(){
  this.x = -200 ; // set the bug before the canvas
  var path = [220, 140, 60]; // placing bugs locations
  this.y = path[Math.floor((Math.random()*3))]; // set the y axis for the bug
  this.speed= Math.floor((Math.random()*4)+1); // reset the speed
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 **  PLAYER CLASS
*/

var Player = function(x,y){

  // set the player's location
  this.x= x;
  this.y= y;
  // set the players image
  this.sprite = 'images/char-cat-girl.png';
};
  // update the players position
  Player.prototype.update= function(){
     this.x= this.x;
     this.y= this.y;
  };

// draw player on cnvas
  Player.prototype.render= function(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
    // change players position based on users key press
  Player.prototype.handleInput= function(keypress){
      if (keypress == 'left'){
        this.x-= 101;
      }
      if (keypress === 'right'){
          this.x+=101;
      }
      if (keypress === 'up'){
          this.y -= 80;
      }
      if (keypress === 'down'){
          this.y+= 80;
      }
      //if the player is off canvas to the left reset its postion
      if(this.x < 0){
        this.x =10;
      }
      //if the player is off canvas to the right dont allow it to move any forther
      if(this.x > 400){
        this.x = 400;
      }
      //if the player is going down the y axis off canvas bring it back on canvas
      if(this.y> 380){
        this.y= 380;
      }
      //check to see if the player reached the top then reset the game
      if(this.y <= -20 && this.x >0 && this.x < 606){
        this.x= 200;
        this.y = 380;
      }
  };


// Now instantiate your objects.
    var enemy1= new Enemy(10, 60, 3);
    var enemy2= new Enemy(10, 145, 4);
    var enemy3= new Enemy(10, 225, 1);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player(200,380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
