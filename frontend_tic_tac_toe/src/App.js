import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import { calculateWinner, getNextPlayer, isBoardFull, WIN_LINES } from './utils/game';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main Tic Tac Toe application component.
   * It renders a retro-themed 3x3 board, shows the current player,
   * detects wins and draws, highlights the winning line, and provides reset controls.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xStarts, setXStarts] = useState(true); // keeps who starts a new game
  const [xIsNext, setXIsNext] = useState(true); // current turn
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = !winner && isBoardFull(squares);

  const statusText = (() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "It's a draw!";
    return `Turn: ${xIsNext ? 'X' : 'O'}`;
  })();

  function handleSquareClick(index) {
    if (winner || draw || squares[index]) return;
    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);

    const { winner: w } = calculateWinner(next);
    if (w) {
      setScores(prev => ({ ...prev, [w]: prev[w] + 1 }));
    }
  }

  // PUBLIC_INTERFACE
  function resetBoard() {
    /** Clears the board but keeps who starts the same as last game start. */
    setSquares(Array(9).fill(null));
    setXIsNext(xStarts);
  }

  // PUBLIC_INTERFACE
  function newGame() {
    /**
     * Starts a new game and alternates the starting player to keep things fair.
     */
    const nextStarter = getNextPlayer(xStarts);
    setXStarts(nextStarter);
    setSquares(Array(9).fill(null));
    setXIsNext(nextStarter);
  }

  // Determine message label style for winner/draw
  const statusClass = winner ? 'status status-win' : draw ? 'status status-draw' : 'status';
  const winningIndices = line ?? [];

  return (
    <div className="retro-app">
      <div className="game-container">
        <header className="game-header">
          <h1 className="retro-title">Tic Tac Toe</h1>
          <div className="scoreboard">
            <div className={`score ${xIsNext && !winner && !draw ? 'active' : ''}`}>
              <span className="label">X</span>
              <span className="value">{scores.X}</span>
            </div>
            <div className="divider" />
            <div className={`${!xIsNext && !winner && !draw ? 'score active' : 'score'}`}>
              <span className="label">O</span>
              <span className="value">{scores.O}</span>
            </div>
          </div>
          <div className={statusClass} role="status" aria-live="polite">
            {statusText}
          </div>
        </header>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningIndices}
          disabled={!!winner || draw}
        />

        <div className="controls">
          <button className="btn retro" onClick={resetBoard} aria-label="Reset board">
            Reset
          </button>
          <button className="btn retro primary" onClick={newGame} aria-label="Start new game">
            New Game
          </button>
        </div>

        <footer className="hint">
          First move: <strong>{xStarts ? 'X' : 'O'}</strong>
        </footer>
      </div>
    </div>
  );
}

export default App;
