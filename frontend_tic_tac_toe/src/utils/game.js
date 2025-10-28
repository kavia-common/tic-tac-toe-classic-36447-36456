export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Returns { winner: 'X'|'O'|null, line: number[]|null }
   */
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  /** True if all tiles are filled. */
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
export function getNextPlayer(currentStarter) {
  /** Alternates the starting player. */
  return currentStarter ? false : true;
}
