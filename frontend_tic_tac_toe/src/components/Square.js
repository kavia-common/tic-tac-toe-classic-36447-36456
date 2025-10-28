import React from 'react';

/**
 * Square represents a single cell. It handles click and visual state.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - highlight: boolean (if part of winning line)
 * - disabled: boolean
 * - ariaLabel: string (for a11y)
 */
export default function Square({ value, onClick, highlight, disabled, ariaLabel }) {
  const classes = ['square'];
  if (highlight) classes.push('highlight');
  if (value === 'X') classes.push('xmark');
  if (value === 'O') classes.push('omark');

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {value}
    </button>
  );
}
