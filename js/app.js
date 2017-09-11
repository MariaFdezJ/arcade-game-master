var getSpeed = function() {
	//Math.floor((Math.random() * 101)+50)*5;//How do I calculate speed??
	var number = Math.floor((Math.random() * 5)+1);
	switch(number){
		case 1:
			number = 200;
			break;
		case 2:
			number = 300;
			break;
		case 3:
			number = 400;
			break;
		case 4:
			number = 500;
			break;		
		case 5:
			number = 550;
			break;		
	}
	return number;
};

var getY = function () {
	return Math.floor((Math.random() *3)+1)*83 -20;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor((Math.random() * 505)+1); 
	this.y = getY();
    this.speed = getSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += dt*this.speed;//????
    if(this.x > 5*101){
    	this.x = -101;
		this.y = getY();    	
    	this.speed = getSpeed();
    }

    //columns - 101, related to X 
    //rows - 83, related to Y

    // +50 to ensure middle of image
    // dividing into 101 to check which column
    var enemyColumn = Math.trunc((this.x+50)/101);
    var playerColumn = Math.trunc((player.x+50)/101) ;

    // +41 to ensure middle of image
    // dividing into 83 to check which row
    var enemyRow = Math.trunc((this.y+41)/83);
    var playerRow = Math.trunc((player.y+41)/83);

    if( enemyColumn=== playerColumn){
    	if(enemyRow === playerRow ){
    		//console.log('Same column and row');
    		player.reset();
    	}
    	
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	this.sprite = 'images/char-boy.png';
	this.x = 2*101;
	this.y = 5*75;
	this.score = 0;

};

Player.prototype.update = function() {
	//???
};

Player.prototype.reset = function() {
	this.x = 2*101;
	this.y = 5*75;
	this.score--;
	if (this.score < 0){
		this.score = 0;
	}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.lineWidth = 3;
    ctx.font = "30px Georgia";
    ctx.strokeText('Score:  ' + this.score, 310,570);
};

Player.prototype.handleInput = function(pressedKey){
	switch(pressedKey){
		case 'left':
			this.x-=101;
			break;
		case 'right':
			this.x+=101;
			break;
		case 'up':
			this.y-=83;
			break;
		case 'down':
			this.y+=83;
			break;
	};
	if(this.x < 0){
		this.x = 0;
	}else if(this.x > 404){
		this.x = 404;
	}
	if(this.y < 0){
		var theScore = this.score;
		this.reset();
		this.score = theScore +1;
	}else if(this.y > (5*75)){
		this.y = 5*75;
	}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
for(var i = 0; i<3; i++){
	allEnemies[i] = new Enemy();
}


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
