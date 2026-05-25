import clsx from 'clsx';
import type { Cell as CellType } from '@/types';

type CellProps = {
  cell: CellType;
  isEnemy?: boolean;
  isSetup?: boolean;
  previewCells?: { row: number; col: number }[];
  previewValid?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function Cell({
  cell,
  isEnemy = false,
  isSetup = false,
  previewCells = [],
  previewValid = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CellProps) {
  const isPreview = previewCells.some(p => p.row === cell.row && p.col === cell.col);

  const baseClasses =
    'w-8 h-8 border border-ocean-light/40 transition-all duration-150 flex items-center justify-center text-xs font-bold cursor-default';

  const stateClasses = clsx({
    'bg-ocean-mid': !isPreview && (cell.state === 'empty' || (cell.state === 'ship' && isEnemy)),
    'bg-ship-placed border-ship/60': !isPreview && cell.state === 'ship' && !isEnemy,
    'bg-hit': !isPreview && (cell.state === 'hit'),
    'bg-sunk': !isPreview && cell.state === 'sunk',
    'bg-miss': !isPreview && cell.state === 'miss',
    'cell-preview': isPreview && previewValid,
    'cell-preview-invalid': isPreview && !previewValid,
    'hover:bg-wave/60 cursor-crosshair':
      isEnemy &&
      !isPreview &&
      (cell.state === 'empty' || cell.state === 'ship'),
    'hover:bg-ocean-surface cursor-pointer': isSetup && !isPreview,
  });

  function getCellContent() {
    if (cell.state === 'hit') return '✕';
    if (cell.state === 'sunk') return '✕';
    if (cell.state === 'miss') return '·';
    return null;
  }

  return (
    <div
      className={clsx(baseClasses, stateClasses)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {getCellContent()}
    </div>
  );
}
