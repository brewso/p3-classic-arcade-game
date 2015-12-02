/*
    Enemy Objects
*/
// Enemies the player must avoid
var Enemy = function(x, y) {
    // The image/sprite for enemies
    "use strict";
    this.sprite = 'images/enemy-bug.png';
    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [];
//var row = new randomRow();

function randomPlace(x, y) {
    "use strict";
    var starting = (x - y);
    var finish = Math.floor(Math.random() * starting) + y;
    if (finish <= 1) {
        return 41;
    }
    if (finish <= 2) {
        return 124;
    }
    if (finish <= 3) {
        return 207;
    }
    if (finish <= 4) {
        return 290;
    }
    return finish;
}

(function setEnemies() {
    //randomly generating enemies
    "use strict";
    for (var e = 0; e < 8; e += 1) {
        allEnemies.push(new Enemy(-2, randomPlace(5, 1)));
    }
}());

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset with new row
    "use strict";
    if (this.x <= 808) {
        this.x += this.speed * dt;
    } else {
        this.x = -2;
        this.y = randomPlace(5, 1);
    }

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if (player.x >= this.x - 30 && player.x <= this.x + 30) {
        if (player.y >= this.y - 30 && player.y <= this.y + 30) {
            player.reset();
            player.score = 0;
        }
    }
};


/*
    Player Object
*/


// Player class and initial x and y coordinates
var Player = function() {
    "use strict";
    this.sprite = 'images/char-boy.png';
    this.x = 303;
    this.y = 377;

    this.score = 0;
    this.max = 0;
};
Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Scoreboard//
    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 2;
    ctx.font = '36px Impact';
    ctx.fillText("High Score: " + player.max, 15, 90); //high score
    ctx.font = '20px Impact';
    ctx.fillText("Score: " + player.score, 15, 130); //score label
};
//Reset player to beginning position
Player.prototype.reset = function() {
    "use strict";
    player.x = 303;
    player.y = 377;
};


//Update player position
Player.prototype.update = function() {
    //if left key is pressed and player is not on edge of map, pressed decrement x
    "use strict";
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
        //if right key is pressed and player is not on edge of map increment x 
    } else if (this.ctlKey === 'right' && this.x != 700) {
        this.x = this.x + 101;
        //if up key is pressed increment y 
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 83;
        //if down key is pressed and player is not on edge of map decrement y 
    } else if (this.ctlKey === 'down' && this.y != 377) {
        this.y = this.y + 83;
    }
    this.ctlKey = null;

    //If on water, reset
    if (this.y < 10) {
        this.reset();
        this.score += 1;
        if (this.score > this.max) {
            this.max = this.score;
        }
    }
};


//Input handler for player
Player.prototype.handleInput = function(e) {
    "use strict";
    this.ctlKey = e;
};


var player = new Player();


// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});