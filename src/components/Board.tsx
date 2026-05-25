import { useState } from 'react';
import clsx from 'clsx';
import Cell from '@/components/Cell';
import type { Board as BoardType, Ship, Orientation } from '@/types';
import { canPlaceShip, getShipCells } from '@/lib/battleship';

type BoardProps = {
  board: BoardType;
  isEnemy?: boolean;
  isSetup?: boolean;
  selectedShip?: Ship | null;
  orientation?: Orientation;
  onCellClick?: (row: number, col: number) => void;
  label?: string;
  disabled?: boolean;
};

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROWS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function Board({
  board,
  isEnemy = false,
  isSetup = false,
  selectedShip = null,
  orientation = 'horizontal',
  onCellClick,
  label,
  disabled = false,
}: BoardProps) {
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);

  const previewCells =
    isSetup && selectedShip && hoverCell
      ? getShipCells(selectedShip.size, hoverCell.row, hoverCell.col, orientation)
      : [];

  const previewValid =
    isSetup && selectedShip && hoverCell
      ? canPlaceShip(board, selectedShip, hoverCell.row, hoverCell.col, orientation)
      : true;

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <h3 className="text-lg font-bold text-accent tracking-wide uppercase">{label}</h3>
      )}
      <div className="select-none">
        {/* Column labels */}
        <div className="flex ml-8">
          {COLS.map(c => (
            <div key={c} className="w-8 h-5 flex items-center justify-center text-xs text-ocean-light/80 font-semibold">
              {c}
            </div>
          ))}
        </div>
        {board.map((row, rIdx) => (
          <div key={rIdx} className="flex">
            {/* Row label */}
            <div className="w-8 h-8 flex items-center justify-center text-xs text-ocean-light/80 font-semibold">
              {ROWS[rIdx]}
            </div>
            {row.map((cell, cIdx) => (
              <Cell
                key={`${rIdx}-${cIdx}`}
                cell={cell}
                isEnemy={isEnemy}
                isSetup={isSetup && !disabled}
                previewCells={previewCells}
                previewValid={previewValid}
                onClick={() => {
                  if (!disabled && onCellClick) {
                    onCellClick(rIdx, cIdx);
                  }
                }}
                onMouseEnter={() => setHoverCell({ row: rIdx, col: cIdx })}
                onMouseLeave={() => setHoverCell(null)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
