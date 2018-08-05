const Gameboard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  const resetBoard = () => {
    for (i = 0; i < 3; i++) {
      for (y = 0; y < 3; y++) {
        board[i][y] = "";
        tile = document.getElementById(i + "" + y);
        tile.style.backgroundImage = "none";
      }
    }
  }

  return {
    resetBoard,
    board
  };
})();

const Game = (() => {
  let currentPlayer;
  let player1;
  let player2;
  let tileStyle = ""; // Styles for each tile. Left blank for default.

  // Change tile style
  const changeStyle = (style) => {
    defaultStyle = document.getElementById("defaultStyle");
    hello = document.getElementById("helloKittyStyle");

    if (style == "") {
      tileStyle = "";
      defaultStyle.style.backgroundColor = "#4CAF50";
      defaultStyle.style.color = "white";
      hello.style.backgroundColor = "";
      hello.style.color = "black";
    } else {
      tileStyle = "hello";
      hello.style.backgroundColor = "#4CAF50";
      hello.style.color = "white";
      defaultStyle.style.backgroundColor = "";
      defaultStyle.style.color = "black";
    }
  }

  const greenTiles = (a, b, c, d, e, f) => {
    document.getElementById(a + "" + b).style.borderColor = "#4dff4d";
    document.getElementById(a + "" + b).style.borderWidth = "thick";
    document.getElementById(c + "" + d).style.borderColor = "#4dff4d";
    document.getElementById(c + "" + d).style.borderWidth = "thick";
    document.getElementById(e + "" + f).style.borderColor = "#4dff4d";
    document.getElementById(e + "" + f).style.borderWidth = "thick";
    setTimeout(function() {
      document.getElementById(a + "" + b).style.borderColor = "";
      document.getElementById(a + "" + b).style.borderWidth = "";
      document.getElementById(c + "" + d).style.borderColor = "";
      document.getElementById(c + "" + d).style.borderWidth = "";
      document.getElementById(e + "" + f).style.borderColor = "";
      document.getElementById(e + "" + f).style.borderWidth = "";
    }, 2500);
  }

  const updateStatus = () => {
    var status = document.getElementById("status");
    status.innerHTML = "<h2>" + player1.name + " <b>" + player1.score + " - " + player2.score + "</b> " + player2.name + "<h2>";
  }

  const startGame = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
    player1.reset();
    player2.reset();
    updateStatus();
    document.getElementById("startSection").style.display = "none";
    document.getElementById("scoreCard").style.display = "block";
    document.getElementById("buttons").style.display = "block";
    document.getElementById("tileTable").style.display = "block";
    Gameboard.resetBoard();
  }

  const turn = (i, y) => {
    if (Gameboard.board[i][y] == "") {
      Gameboard.board[i][y] = currentPlayer.symbol;
      var tile = document.getElementById(i + "" + y);
      tile.style.backgroundImage = "url(img/" + currentPlayer.symbol + tileStyle + ".png)";
      tile.style.backgroundSize = "contain";
    }

    // Check if round has been won
    let roundFinished = false;
    for (i = 0; i < 3; i++) {
      if (Gameboard.board[i][0] == "x" && Gameboard.board[i][1] == "x" && Gameboard.board[i][2] == "x") {
        roundFinished = true;
        greenTiles(i, 0, i, 1, i, 2);
      } else if (Gameboard.board[i][0] == "o" && Gameboard.board[i][1] == "o" && Gameboard.board[i][2] == "o") {
        roundFinished = true;
        greenTiles(i, 0, i, 1, i, 2);
      } else if (Gameboard.board[0][i] == "x" && Gameboard.board[1][i] == "x" && Gameboard.board[2][i] == "x") {
        roundFinished = true;
        greenTiles(0, i, 1, i, 2, i);
      } else if (Gameboard.board[0][i] == "o" && Gameboard.board[1][i] == "o" && Gameboard.board[2][i] == "o") {
        roundFinished = true;
        greenTiles(0, i, 1, i, 2, i);
      }
    }

    if (Gameboard.board[0][0] == "o" && Gameboard.board[1][1] == "o" && Gameboard.board[2][2] == "o") {
      roundFinished = true;
      greenTiles(0, 0, 1, 1, 2, 2);
    } else if (Gameboard.board[0][0] == "x" && Gameboard.board[1][1] == "x" && Gameboard.board[2][2] == "x") {
      roundFinished = true;
      greenTiles(0, 0, 1, 1, 2, 2);
    } else if (Gameboard.board[0][2] == "o" && Gameboard.board[1][1] == "o" && Gameboard.board[2][0] == "o") {
      roundFinished = true;
      greenTiles(0, 2, 1, 1, 2, 0);
    } else if (Gameboard.board[0][2] == "x" && Gameboard.board[1][1] == "x" && Gameboard.board[2][0] == "x") {
      roundFinished = true;
      greenTiles(0, 2, 1, 1, 2, 0);
    }

    // Checking if it's a draw
    let draw = false;
    noEmptyTiles = 0;
    for (i = 0; i < 3; i++) {
      for (y = 0; y < 3; y++) {
        if (Gameboard.board[i][y] == "") {
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
      setTimeout(updateStatus, 2500);
    } else {
      if (currentPlayer == player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  }

  return {
    startGame,
    turn,
    changeStyle
  };
})();

function Player(name, symbol) {
  this.score = 0;
  this.name = name;
  this.symbol = symbol;
  this.reset = function() {
    this.score = 0;
  };
  this.win = function() {
    this.score++;
  }
}

var Player1 = new Player("Player 1", "x");
var Player2 = new Player("Player 2", "o");

function startGameButtonClick() {
  Game.startGame(Player1, Player2);
}

function startMenuButtonClick() {
  document.getElementById("startSection").style.display = "block";
  document.getElementById("scoreCard").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("tileTable").style.display = "none";
}
