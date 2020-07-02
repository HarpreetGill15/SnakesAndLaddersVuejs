class Game {
  constructor() {
    this.playing = true;
    this.winner = null;
    this.currentTurn = null;
    this.currentSpot = null;
    this.spot = null;
    this.die = null;
    this.dieShow = "/Sprites/dieAnimate.gif";
    //Filling squares gotten from dcode youtube video
    //https://www.youtube.com/watch?v=rqb4FgVNrrM
    this.squares = new Array(50).fill().map((s) => new Square());
    this.players = new Array(2).fill().map((p) => new Player());
    this.ladders = {
      location: [
        [4, 15],
        [18, 45],
        [12, 49],
      ],
    };
    this.snakes = {
      location: [
        [20, 1],
        [41, 3],
        [48, 27],
      ],
    };
  }
  gameStart() {
    this.playing = true;
    this.die = 0;
    this.players[0].spot = 0;
    this.players[0].sprite = "/Sprites/player1.gif";
    this.players[1].spot = 0;
    this.players[1].sprite = "/Sprites/player2.gif";
    this.currentTurn = this.players[0];
    for (let x = 0; x < this.snakes.location.length; x++) {
      var snake = this.snakes.location[x][0] - 1;
      var snakeOut = this.snakes.location[x][1] - 1;
      this.squares[snake].snakeORLadder = "Snake To -->" + (snakeOut + 1);
      this.squares[snakeOut].snakeORLadder = "Snake End";
    }
    for (let x = 0; x < this.ladders.location.length; x++) {
      var ladder = this.ladders.location[x][0] - 1;
      var ladderOut = this.ladders.location[x][1] - 1;
      this.squares[ladder].snakeORLadder = "Ladder To -->" + (ladderOut + 1);
      this.squares[ladderOut].snakeORLadder = "Ladder End";
    }
  }
  nextPlayer() {
    if (this.currentTurn == this.players[0]) {
      this.currentTurn = this.players[1];
    } else {
      this.currentTurn = this.players[0];
    }
    this.dieShow = "/Sprites/dieAnimate.gif";
  }
  rollDie() {
    var roll = 1 + Math.floor(Math.random() * 6);
    this.die = roll;
    // check what number is rolled and display the correct die face (1-6)
    switch (roll) {
      case 1:
        this.dieShow = "/Sprites/dice/1.png";
        break;
      case 2:
        this.dieShow = "/Sprites/dice/2.png";
        break;
      case 3:
        this.dieShow = "/Sprites/dice/3.png";
        break;
      case 4:
        this.dieShow = "/Sprites/dice/4.png";
        break;
      case 5:
        this.dieShow = "/Sprites/dice/5.png";
        break;
      case 6:
        this.dieShow = "/Sprites/dice/6.png";
        break;
    }
    //logic to move player
    this.makeMove();
  }
  makeMove() {
    //check if the game is active
    if (this.playing == true) {
      //set the current spot to the current players spot
      this.currentSpot = this.currentTurn.spot;
      //if the current spot is less then or equal to 1 which is the starting spot make the current spot 0 which is the
      //first element in the array of squares
      if (this.currentSpot >= 1) {
        this.currentSpot = this.currentSpot - 1;
      }
      //make the previous spot sprite dispear
      this.squares[this.currentSpot].value = null;
      //add the rolled dice number to the current players current spot
      this.currentTurn.spot += this.die;
      //check if this spot is a ladder or snake
      this.checkSpot(this.currentTurn.spot);
      //set spot to the spot plus 1 so that it goes to the correct element in the array of squares
      this.currentTurn.spot = this.spot + 1;
      //if the user goes over 50 put the back to the spot they were at before
      if (this.currentTurn.spot > 50) {
        //take the spot they were at and subtract the rolled number
        this.spot = this.currentTurn.spot - this.die;
        this.currentTurn.spot = this.spot;
        //set the sprite to the new position
        this.squares[this.spot].value = this.currentTurn.sprite;
      }
      //set the sprite to the next location
      this.squares[this.spot].value = this.currentTurn.sprite;
      //check if the spot is at the end
      this.checkWinner();
    }
  }
  checkSpot(pos) {
    var out = 0;
    var other = 0;
    //check if the spot is a snake
    out = this.checkSnake(pos);
    //check if spot is a ladder
    other = this.checkLadder(out);
    //set the spot to the return number
    this.spot = other - 1;
  }
  checkLadder(pos) {
    var out;
    var myarr = this.ladders.location;
    //for each ladder location check if the position of the player matches the index
    for (var x = 0; x < myarr.length; x++) {
      //if it matches the position
      if (myarr[x][0] === pos) {
        //return the second element of the location which is the position the player will go up to
        out = myarr[x][1];
        break;
      } else {
        //if not just return the position
        out = pos;
      }
    }

    return out;
  }
  checkSnake(pos) {
    var out;
    var myarr = this.snakes.location;
    //for each snake location check if the position of the player matches the index
    for (var x = 0; x < myarr.length; x++) {
      //if it matches the position
      if (myarr[x][0] === pos) {
        //return the second element of the location which is the position the player will go back to
        out = myarr[x][1];
        break;
      } else {
        //if not just return the position
        out = pos;
      }
    }

    return out;
  }
  checkWinner() {
      //the last number which is the end of the game
    const winning_num = 50;
    //if the current position is equal to the ending of the game
    if (this.currentTurn.spot == winning_num) {
      //set the current player to the winner
      this.currentTurn.winner = true;
      //stop the game
      this.playing = false;
    }
  }
  //reset game to play again
  reset(){
    this.playing = false;
    this.die = 0;
    this.players[0].spot = 0;
    this.players[1].spot = 0;
    this.currentTurn.winner = false;
    this.currentSpot = null;
    this.spot = null;
    this.currentTurn = this.players[0];
    
  }
}
