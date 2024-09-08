import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
//helper function

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].Player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players){
  let winner;
  for(const c of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[c[0].row][c[0].col];
    const secondSymbol = gameBoard[c[1].row][c[1].col];
    const thirdSymbol = gameBoard[c[2].row][c[2].col];

    if(firstSymbol && secondSymbol===firstSymbol && thirdSymbol===firstSymbol){
      winner = players[firstSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initalGameBoard.map(array=>[...array])];
  for(const turn of gameTurns){
        const {Square, Player} = turn;
        const{row, col} = Square;
        
        gameBoard[row][col]=Player;
   }
   return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const[players, setPlayers] = useState({
    'X' : 'Player 1',
    'O' : 'Player 2'
  })

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length ===9 && !winner;

  function handleTurns(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ Square: { row: rowIndex, col: colIndex }, Player: currentPlayer },...prevTurns,];
      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
    gameBoard = initalGameBoard;
  }

  function handlePlayerName(symbol, newName){
    setPlayers(prevPlayers=>{
      return {...prevPlayers, [symbol]: newName};
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={players.X} symbol="X" isActive={activePlayer === "X"}  onPlayerChange={handlePlayerName}/>
          <Player name={players.O} symbol="O" isActive={activePlayer === "O"} onPlayerChange={handlePlayerName}/>
        </ol>
        {(winner || hasDraw )&&<GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleTurns} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
//when a component is called more than once, completely isolated instances are created with completely different useStates too
