function createPlayer(name, marker) {
    return {name, marker};
}

function createGameboard() {
    const board = [0,0,0,0,0,0,0,0,0]

    const play = (marker, position) => { 
        // Add error handling if position is taken
        if (board[position] !== 0) {
            return
        }
        board[position] = marker;
        const element = document.getElementById(position).textContent = marker
    }
    
    const computeWin = () => {
        if ((board[0] === board[1]) && (board[0] === board[2])) {
            return true;
        } else if ((board[0] === board[3]) && (board[0] === board[6])) {
            return true;
        } else if ((board[0] === board[4]) && (board[0] === board[8])) {
            return true;
        } else if ((board[1] === board[4]) && (board[0] === board[7])) {
            return true;
        } else if ((board[2] === board[5]) && (board[0] === board[8])) {
            return true;
        } else if ((board[2] === board[4]) && (board[0] === board[6])) {
            return true;
        } else {
            return false;
        }
    }

    return { play, computeWin };
}

const game = (function () {
    const player1 = createPlayer("Player 1", "O");
    const player2 = createPlayer("Player 2", "X");
    const gameboard = createGameboard();

    let nextPlayer = player1

    const turn = (position) => {
        gameboard.play(nextPlayer.marker, position)
        if (gameboard.computeWin()) {
            document.getElementById("winner").textContent = nextPlayer.marker + " wins!";
        }
        if (nextPlayer === player1) {
            nextPlayer = player2
        } else {
            nextPlayer = player1
        }
        document.getElementById("turn").textContent = nextPlayer.marker + " turn";
    };

    return { turn };

})();


document.getElementsByName("position").forEach(element => { 
    element.addEventListener("click", (e) => {
        const position = e.target.id
        game.turn(position);
    })
});
