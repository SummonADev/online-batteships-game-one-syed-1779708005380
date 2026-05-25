import { useState, useRef } from 'react';
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
  onDropShip?: (shipId: string, row: number, col: number) => void;
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
  onDropShip,
  label,
  disabled = false,
}: BoardProps) {
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);
  const [dragOverCell, setDragOverCell] = useState<{ row: number; col: number } | null>(null);
  const dragShipRef = useRef<Ship | null>(null);

  const activeHover = dragOverCell ?? hoverCell;

  const previewCells =
    isSetup && selectedShip && activeHover
      ? getShipCells(selectedShip.size, activeHover.row, activeHover.col, orientation)
      : [];

  const previewValid =
    isSetup && selectedShip && activeHover
      ? canPlaceShip(board, selectedShip, activeHover.row, activeHover.col, orientation)
      : true;

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, row: number, col: number) {
    if (!isSetup || disabled) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCell({ row, col });
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    // Only clear if leaving the board entirely
    const related = e.relatedTarget as Node | null;
    const board = e.currentTarget;
    if (!related || !board.contains(related)) {
      setDragOverCell(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, row: number, col: number) {
    if (!isSetup || disabled) return;
    e.preventDefault();
    const shipId = e.dataTransfer.getData('shipId');
    if (shipId && onDropShip) {
      onDropShip(shipId, row, col);
    }
    setDragOverCell(null);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <h3 className="text-lg font-bold text-accent tracking-wide uppercase">{label}</h3>
      )}
      <div
        className="select-none"
        onDragLeave={handleDragLeave}
      >
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
                onMouseEnter={() => {
                  if (!dragOverCell) setHoverCell({ row: rIdx, col: cIdx });
                }}
                onMouseLeave={() => setHoverCell(null)}
                onDragOver={e => handleDragOver(e, rIdx, cIdx)}
                onDrop={e => handleDrop(e, rIdx, cIdx)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
