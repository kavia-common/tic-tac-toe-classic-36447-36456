import React from 'react';
import Square from './Square';

/**
 * Board renders the 3x3 grid of squares.
 * Props:
 * - squares: array(9) of 'X' | 'O' | null
 * - onSquareClick: (index:number) => void
 * - winningLine: number[] of indices in the winning combo to highlight
 * - disabled: boolean to stop interaction after game end
 */
export default function Board({ squares, onSquareClick, winningLine = [], disabled = false }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => {
        const highlight = winningLine.includes(idx);
        return (
          <Square
            key={idx}
            value={value}
            onClick={() => onSquareClick(idx)}
            highlight={highlight}
            disabled={disabled || !!value}
            ariaLabel={`Square ${idx + 1}`}
          />
        );
      })}
    </div>
  );
}
