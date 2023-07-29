const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// if conditions satisfy someone is winner
const winConditions = [
    
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonals
    [0, 4, 8],
    [2, 4, 6]
];

// 9 options to fill in X or O
let options = ["", "", "", "", "", "", "", "", ""];

// keeping track of player
let currentPlayer = "X";

// Running status of game
let running = false;

// -------- Starting the game ------------
startGame();

// Start Game function
function startGame(){

    // checking if a player clicks the cell and updates the cell
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    // if restart is clicked 
    restartBtn.addEventListener("click", restartGame);

    // Status of whose turn
    statusText.textContent = `${currentPlayer}'s turn`;
    
    // to start game running status should be true
    running = true;
}

// Cell clicked function

function cellClicked(){

    // Storing the cell index of each cell
    const cellIndex = this.getAttribute("cellIndex");
    
    // if cell is already occupied OR game is not running just return
    if (options[cellIndex] != "" || !running){
        return;
    }

    // if cell is empty and game is running, update the cell
    updateCell(this, cellIndex);

    // check for winner
    checkWinner();
}
// update the cell function 
function updateCell(cell, index){
    
    // update the options list with current player's move
    options[index] = currentPlayer;
    
    // update cell with X or O depending on player
    cell.textContent = currentPlayer;
}

// after a move player should be changed
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";

    // showing the status of which players turn
    statusText.textContent = `${currentPlayer}'s turn`;
}

// logic for checking winner

function checkWinner(){
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer}' WINS!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = "DRAW!";
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}