import clsx from 'clsx';
import type { Ship } from '@/types';

type ShipListProps = {
  ships: Ship[];
  selectedShip?: Ship | null;
  onSelectShip?: (ship: Ship) => void;
  showStatus?: boolean;
};

export default function ShipList({
  ships,
  selectedShip,
  onSelectShip,
  showStatus = false,
}: ShipListProps) {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, ship: Ship) {
    if (ship.placed) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('shipId', ship.id);
    e.dataTransfer.effectAllowed = 'move';
    if (onSelectShip) onSelectShip(ship);
  }

  return (
    <div className="flex flex-col gap-2">
      {ships.map(ship => {
        const isSelected = selectedShip?.id === ship.id;
        const isPlaced = ship.placed;

        return (
          <div
            key={ship.id}
            draggable={!isPlaced && !!onSelectShip}
            onDragStart={e => handleDragStart(e, ship)}
            onClick={() => {
              if (!isPlaced && onSelectShip) onSelectShip(ship);
            }}
            className={clsx(
              'flex flex-col gap-1.5 p-2.5 rounded-lg border transition-all select-none',
              isPlaced
                ? 'opacity-40 border-ocean-light/20 bg-ocean-mid/30 cursor-default'
                : isSelected
                ? 'border-accent bg-accent/10 cursor-grab shadow-lg shadow-accent/20'
                : 'border-ocean-light/30 bg-ocean-mid/50 cursor-grab hover:border-accent/50 hover:bg-ocean-light/10',
              !isPlaced && 'active:cursor-grabbing'
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={clsx(
                  'text-sm font-semibold',
                  isPlaced ? 'text-ocean-light/50' : isSelected ? 'text-accent' : 'text-white'
                )}
              >
                {ship.name}
              </span>
              {showStatus && (
                <span
                  className={clsx(
                    'text-xs font-bold px-1.5 py-0.5 rounded',
                    ship.sunk ? 'text-hit bg-hit/20' : 'text-green-400 bg-green-400/20'
                  )}
                >
                  {ship.sunk ? 'SUNK' : 'OK'}
                </span>
              )}
              {isPlaced && !showStatus && (
                <span className="text-xs text-ocean-light/40">Placed</span>
              )}
            </div>
            {/* Ship block visual */}
            <div className="flex gap-0.5">
              {Array.from({ length: ship.size }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    'h-3 rounded-sm flex-1',
                    isPlaced
                      ? 'bg-ocean-light/30'
                      : isSelected
                      ? 'bg-accent/70'
                      : 'bg-ship/70'
                  )}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
