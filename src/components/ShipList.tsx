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
  selectedShip = null,
  onSelectShip,
  showStatus = false,
}: ShipListProps) {
  return (
    <div className="flex flex-col gap-2">
      {ships.map(ship => (
        <div
          key={ship.id}
          className={clsx(
            'flex items-center gap-3 p-2 rounded-lg border transition-all duration-150',
            {
              'border-accent bg-accent/10 shadow-lg shadow-accent/20':
                selectedShip?.id === ship.id,
              'border-ocean-light/30 bg-ocean-mid/50 hover:border-ocean-light/60 cursor-pointer':
                !ship.placed && !showStatus,
              'border-ocean-light/20 bg-ocean-mid/30 opacity-60':
                ship.placed && !showStatus,
              'border-ocean-light/30 bg-ocean-mid/50': showStatus && !ship.sunk,
              'border-hit/40 bg-hit/10 opacity-50': showStatus && ship.sunk,
            }
          )}
          onClick={() => {
            if (!ship.placed && onSelectShip) {
              onSelectShip(ship);
            }
          }}
        >
          <div className="flex gap-0.5">
            {Array.from({ length: ship.size }).map((_, i) => (
              <div
                key={i}
                className={clsx('w-5 h-5 rounded-sm border', {
                  'bg-ship border-ship/60': !showStatus || !ship.sunk,
                  'bg-hit border-hit/60': showStatus && ship.sunk,
                  'opacity-50': ship.placed && !showStatus,
                })}
              />
            ))}
          </div>
          <div className="flex flex-col">
            <span className={clsx('text-sm font-semibold', {
              'text-white': !ship.sunk,
              'text-hit/70': showStatus && ship.sunk,
            })}>
              {ship.name}
            </span>
            <span className="text-xs text-ocean-light/60">
              {showStatus
                ? ship.sunk
                  ? 'Sunk'
                  : 'Afloat'
                : ship.placed
                ? 'Placed ✓'
                : `Size ${ship.size}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
