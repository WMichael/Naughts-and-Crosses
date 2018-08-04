const Gameboard = (() => {
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  const resetBoard = () => {
    for (i = 0; i < 3; i++) {
      for (y = 0; y < 3; y++) {
        gameBoard[i][y] = "";
        tile = document.getElementById(i + "" + y);
        tile.style.backgroundImage = "none";
      }
    }
  }

  return {
    resetBoard,
    gameBoard
  };
})();

const Game = (() => {
  let currentPlayer;
  let player1;
  let player2;
  let p1score = 0; // Temp score variables until player object is fixed.
  let p2score = 0;
  let tileStyle = "hello"; // Styles for each tile. Left blank for default.

  const changeStyle = () => {
    console.log("Hi");
    if (tileStyle == "") {
      tileStyle = "hello";
    }
    else {
      tileStyle = "";
    }

  }

  const greenTiles = (a,b,c,d,e,f) => {
    document.getElementById(a + "" + b).style.borderColor = "#4dff4d";
    document.getElementById(a + "" + b).style.borderWidth = "thick";
    document.getElementById(c + "" + d).style.borderColor = "#4dff4d";
    document.getElementById(c + "" + d).style.borderWidth = "thick";
    document.getElementById(e + "" + f).style.borderColor = "#4dff4d";
    document.getElementById(e + "" + f).style.borderWidth = "thick";
    setTimeout(function(){
      document.getElementById(a + "" + b).style.borderColor = "";
      document.getElementById(a + "" + b).style.borderWidth = "";
      document.getElementById(c + "" + d).style.borderColor = "";
      document.getElementById(c + "" + d).style.borderWidth = "";
      document.getElementById(e + "" + f).style.borderColor = "";
      document.getElementById(e + "" + f).style.borderWidth = "";
    }, 2500);
  }

  const scores = () => {
    console.log(player1.name + " " + p1score + " - " + p2score + " " + player2.name);
  }

  const updateStatus = () => {
    var status = document.getElementById("status");
    status.innerHTML = "<h2>" + player1.name + " <b>" + p1score + " - " + p2score + "</b> " + player2.name + "<h2>";
  }

  const startGame = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    p1score = 0; // Reset temp score values.
    p2score = 0;
    currentPlayer = player1;
    //currentScore = p1score;
    updateStatus();
    Gameboard.resetBoard();
    console.log("Game started")
  }

  const turn = (i, y) => {
    if (Gameboard.gameBoard[i][y] == "") {
      Gameboard.gameBoard[i][y] = currentPlayer.symbol;
      var tile = document.getElementById(i + "" + y);
      tile.style.backgroundImage = "url(img/" + currentPlayer.symbol + tileStyle + ".png)";
      tile.style.backgroundSize = "contain";
    }

    // Check if round has been won
    let roundFinished = false;
    for (i = 0; i < 3; i++) {
      if (Gameboard.gameBoard[i][0] == "x" && Gameboard.gameBoard[i][1] == "x" && Gameboard.gameBoard[i][2] == "x") {
        roundFinished = true;
        greenTiles(i,0,i,1,i,2);
        console.log("- Horizontal win");
      } else if (Gameboard.gameBoard[i][0] == "o" && Gameboard.gameBoard[i][1] == "o" && Gameboard.gameBoard[i][2] == "o") {
        roundFinished = true;
        greenTiles(i,0,i,1,i,2);
        console.log("- Horizontal win");
      } else if (Gameboard.gameBoard[0][i] == "x" && Gameboard.gameBoard[1][i] == "x" && Gameboard.gameBoard[2][i] == "x") {
        roundFinished = true;
        greenTiles(0,i,1,i,2,i);
        console.log("- Vertical win");
      } else if (Gameboard.gameBoard[0][i] == "o" && Gameboard.gameBoard[1][i] == "o" && Gameboard.gameBoard[2][i] == "o") {
        roundFinished = true;
        greenTiles(0,i,1,i,2,i);
        console.log("- Vertical win");
      }
    }

    if (Gameboard.gameBoard[0][0] == "o" && Gameboard.gameBoard[1][1] == "o" && Gameboard.gameBoard[2][2] == "o") {
      roundFinished = true;
      greenTiles(0,0,1,1,2,2);
      console.log("- Diagonal win");
    } else if (Gameboard.gameBoard[0][0] == "x" && Gameboard.gameBoard[1][1] == "x" && Gameboard.gameBoard[2][2] == "x") {
      roundFinished = true;
      greenTiles(0,0,1,1,2,2);
      console.log("- Diagonal win");
    } else if (Gameboard.gameBoard[0][2] == "o" && Gameboard.gameBoard[1][1] == "o" && Gameboard.gameBoard[2][0] == "o") {
      roundFinished = true;
      greenTiles(0,2,1,1,2,0);
      console.log("- Diagonal win");
    } else if (Gameboard.gameBoard[0][2] == "x" && Gameboard.gameBoard[1][1] == "x" && Gameboard.gameBoard[2][0] == "x") {
      roundFinished = true;
      greenTiles(0,2,1,1,2,0);
      console.log("- Diagonal win");
    }

    // Checking if it's a draw
    let draw = false;
    noEmptyTiles = 0;
    for (i = 0; i < 3; i++) {
      for (y = 0; y < 3; y++) {
        if (Gameboard.gameBoard[i][y] == "") {
          noEmptyTiles++;
        }
      }
    }
    if (noEmptyTiles == 0) {
      draw = true;
    }

    var status = document.getElementById("status");
    // If it's a draw
    if (draw == true && roundFinished != true) {
      status.innerHTML = "<h2><b>Draw!</b><h2>"
      setTimeout(Gameboard.resetBoard, 2500);
      setTimeout(updateStatus, 2500);
    // If it's a win
    } else if (roundFinished == true) {
      currentPlayer.win();
      status.innerHTML = "<h2><b>" + currentPlayer.name + "</b> is the winner! <h2>"
      setTimeout(Gameboard.resetBoard, 2500);
      roundFinished = false;
      if (currentPlayer == player1) {
        p1score++;
      } else {
        p2score++;
      }
      setTimeout(updateStatus, 2500);
      scores();
    } else {
      if (currentPlayer == player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
      console.log("It's " + currentPlayer.name + "'s turn.");
    }
  }

  return {
    startGame,
    player1,
    player2,
    turn
  };
})();

const Player = (name, symbol) => {
  let score = 0;
  const reset = () => score = 0;
  const win = () => {
    score++;
  }

  return {
    reset,
    win,
    score,
    symbol,
    name
  }
}

const Player1 = Player("Player 1", "x");
const Player2 = Player("Player 2", "o");

//
Game.startGame(Player1, Player2);
