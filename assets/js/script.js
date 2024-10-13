let squares = document.querySelectorAll(".square");
let statusDisplay = document.querySelector(".status");
let reset = document.querySelector(".reset");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function squareClick(event) {
  const clickedSquare = event.target;
  const clickedSquareIndex = parseInt(clickedSquare.getAttribute("data-index"));

  if (gameState[clickedSquareIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedSquareIndex] = currentPlayer;
  clickedSquare.textContent = currentPlayer;

  checkForWinner();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];

    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;

      winCondition.forEach((index) => {
        document.querySelector(
          `[data-index='${index}']`
        ).style.backgroundColor = "green";
      });
      reset.style.display = "flex";
      break;
    }

    if (roundWon) {
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} has won !`;
    gameActive = false;
    return;
  }
  const roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.textContent = `Game is a draw`;
    reset.style.display = "flex";
    gameActive = false;
    return;
  }

  switchPlayer();

  reset.onclick = function () {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll(".square").forEach((square) => {
      square.textContent = "";
      square.style.backgroundColor = "";
    });
    reset.style.display = "none";

    return;
  };
}

squares.forEach((square) => square.addEventListener("click", squareClick));
