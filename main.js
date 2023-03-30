window.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.querySelector(".wrapper");
  const playerStatus = document.querySelector(".game-status");
  const gameinfo = document.querySelector(".gameinfo");
  /* game variable */
  let playerRed = "red";
  let playerYellow = "yellow";

  let layer = [5, 5, 5, 5, 5, 5, 5];
  let c;
  let r;
  let gameOver = false;
  let totalBoard = [];
  let currentPlayer;
  /* creating the gameboard */
  function createGame() {
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(" ");
        const board = document.createElement("div");
        board.classList.add("box");
        board.id = r.toString() + "-" + c.toString();
        gameBoard.append(board);
      }
      totalBoard.push(row);
    }
  }

  function setPlayerColor() {
    if (currentPlayer === playerRed) {
      gameinfo.classList.remove("yellowbackground");
      playerStatus.textContent = "Red";
      playerStatus.style.color = "black";
      gameinfo.classList.add("redbackground");
    } else if (currentPlayer === playerYellow) {
      gameinfo.classList.remove("redbackground");
      playerStatus.textContent = "Yellow";
      playerStatus.style.color = "black";
      gameinfo.classList.add("yellowbackground");
    }
  }

  createGame();
  randomStart();
  function randomStart() {
    const coinFlip = Math.round(Math.random());
    console.log(coinFlip);
    currentPlayer = coinFlip === 1 ? playerRed : playerYellow;
  }

  setPlayerColor();

  /* dom elements */
  const board = document.querySelectorAll(".box");

  function setWinner(a, b) {
    console.log(totalBoard[a][b]);
    if (playerYellow === totalBoard[a][b]) {
      gameinfo.classList.remove("redbackground");
      playerStatus.style.color = "black";
      gameinfo.classList.add("yellowbackground");
      playerStatus.textContent = "Yellow Has Won!";
    } else if (playerRed === totalBoard[a][b]) {
      gameinfo.classList.remove("yellowbackground");
      playerStatus.style.color = "black";
      gameinfo.classList.add("redbackground");
      playerStatus.textContent = "Red Has Won!";
    }
  }

  function checkWin() {
    /* checking horizontal */
    for (let ri = 0; ri < 6; ri++) {
      for (let ci = 0; ci < 5; ci++) {
        if (totalBoard[ri][ci] != " ") {
          if (
            totalBoard[ri][ci] == totalBoard[ri][ci + 1] &&
            totalBoard[ri][ci + 1] == totalBoard[ri][ci + 2] &&
            totalBoard[ri][ci + 2] == totalBoard[ri][ci + 3]
          ) {
            console.log("winnner winnner");
            console.log(totalBoard);
            setWinner(ri, ci);
          }
        }
      }
    }

    for (let ci = 0; ci < 7; ci++) {
      for (let ri = 0; ri < 3; ri++) {
        if (totalBoard[ri][ci] != " ") {
          if (
            totalBoard[ri][ci] == totalBoard[ri + 1][ci] &&
            totalBoard[ri + 1][ci] == totalBoard[ri + 2][ci] &&
            totalBoard[ri + 2][ci] == totalBoard[ri + 3][ci]
          ) {
            console.log("you are straight");
            setWinner(ri, ci);
          }
        }
      }
    }

    /* left to rigt diagnol */
    for (let ri = 0; ri < 3; ri++) {
      for (let ci = 0; ci < 4; ci++) {
        if (totalBoard[ri][ci] != " ") {
          if (
            totalBoard[ri][ci] == totalBoard[ri + 1][ci + 1] &&
            totalBoard[ri + 1][ci + 1] == totalBoard[ri + 2][ci + 2] &&
            totalBoard[ri + 2][ci + 2] == totalBoard[ri + 3][ci + 3]
          ) {
            setWinner(ri, ci);
          }
        }
      }
    }

    /* right to left */
    for (let ri = 0; ri < 3; ri++) {
      for (let ci = 3; ci < 7; ci++) {
        if (totalBoard[ri][ci] != " ") {
          if (
            totalBoard[ri][ci] == totalBoard[ri + 1][ci - 1] &&
            totalBoard[ri + 1][ci - 1] == totalBoard[ri + 2][ci - 2] &&
            totalBoard[ri + 2][ci - 2] == totalBoard[ri + 3][ci - 3]
          ) {
            setWinner(ri, ci);
          }
        }
      }
    }
  }

  function setPiece(e) {
    if (gameOver) {
      return;
    }
    indexOf = e.target.id;
    const [row, column] = indexOf.split("-");

    r = layer[column];
    c = column;

    if (r < 0) {
      return;
    }

    /*this big blank array we made this and we assign what player color got it*/
    totalBoard[r][c] = currentPlayer;
    const gamePiece = document.getElementById(
      r.toString() + "-" + c.toString()
    );

    if (currentPlayer === playerRed) {
      gamePiece.classList.add("red");
      currentPlayer = playerYellow;
      setPlayerColor();
    } else if (currentPlayer === playerYellow) {
      gamePiece.classList.add("yellow");
      currentPlayer = playerRed;
      setPlayerColor();
    }

    /* make the circles stack */
    r -= 1;
    layer[c] = r;
    checkWin();
  }

  /* Event listeners */
  board.forEach((piece) => {
    piece.addEventListener("click", (e) => setPiece(e));
  });
});
