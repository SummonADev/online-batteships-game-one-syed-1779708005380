import { useEffect } from 'react';
import { RotateCcw, Shuffle, Play, RefreshCw, Target } from 'lucide-react';
import clsx from 'clsx';
import Board from '@/components/Board';
import ShipList from '@/components/ShipList';
import MessageBar from '@/components/MessageBar';
import { useGame } from '@/hooks/useGame';

export default function GamePage() {
  const {
    state,
    selectShip,
    toggleOrientation,
    placeShip,
    autoPlaceShips,
    resetPlacement,
    startBattle,
    playerFire,
    botFire,
    resetGame,
    botTimeoutRef,
  } = useGame();

  // Bot AI: trigger bot fire with delay when it's bot's turn
  useEffect(() => {
    if (state.phase === 'battle' && state.turn === 'bot') {
      botTimeoutRef.current = setTimeout(() => {
        botFire();
      }, 800);
    }
    return () => {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current);
      }
    };
  }, [state.turn, state.phase, botFire]);

  const allShipsPlaced = state.playerShips.every(s => s.placed);

  // Handle drop: find ship by id then place it
  function handleDropShip(shipId: string, row: number, col: number) {
    const ship = state.playerShips.find(s => s.id === shipId);
    if (!ship || ship.placed) return;
    // Make sure the ship is selected so placeShip works correctly
    selectShip(ship);
    // Use a tiny timeout to let state update before placing
    // Actually we call placeShip directly with the current orientation
    placeShip(row, col);
  }

  return (
    <div className="min-h-screen bg-ocean-dark text-white">
      {/* Header */}
      <header className="border-b border-ocean-light/20 bg-ocean-mid/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚓</span>
            <h1 className="text-xl font-bold tracking-wider text-accent">BATTLESHIPS</h1>
          </div>
          <div className="flex items-center gap-4">
            {state.phase !== 'setup' && (
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-bold border',
                    state.turn === 'player' && state.phase === 'battle'
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'bg-ocean-light/20 border-ocean-light/40 text-ocean-light/60'
                  )}
                >
                  YOUR TURN
                </span>
                <span
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-bold border',
                    state.turn === 'bot' && state.phase === 'battle'
                      ? 'bg-hit/20 border-hit text-hit'
                      : 'bg-ocean-light/20 border-ocean-light/40 text-ocean-light/60'
                  )}
                >
                  BOT&apos;S TURN
                </span>
              </div>
            )}
            <button
              onClick={resetGame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ocean-light/20 hover:bg-ocean-light/30 border border-ocean-light/30 text-sm transition-colors"
            >
              <RefreshCw size={14} />
              New Game
            </button>
          </div>
        </div>
      </header>

      {/* Message Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <MessageBar message={state.message} />
      </div>

      {/* Game Over Overlay */}
      {state.phase === 'gameover' && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 fade-in">
          <div className="bg-ocean-mid border border-ocean-light/30 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-4">
              {state.winner === 'player' ? '🏆' : '💀'}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {state.winner === 'player' ? 'Victory!' : 'Defeat!'}
            </h2>
            <p className="text-ocean-light/70 mb-6">
              {state.winner === 'player'
                ? 'You sunk all enemy ships!'
                : 'The bot sunk all your ships!'}
            </p>
            <button
              onClick={resetGame}
              className="w-full py-3 rounded-xl bg-accent hover:bg-accent/80 text-ocean-dark font-bold text-lg transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        {state.phase === 'setup' && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Ship Selection Panel */}
            <div className="flex flex-col gap-4 w-full lg:w-64">
              <div className="bg-ocean-mid/50 rounded-xl border border-ocean-light/20 p-4">
                <h2 className="text-base font-bold text-accent mb-3 uppercase tracking-wide">Your Fleet</h2>
                <p className="text-xs text-ocean-light/60 mb-3">Click or drag ships onto the board.</p>
                <ShipList
                  ships={state.playerShips}
                  selectedShip={state.selectedShip}
                  onSelectShip={selectShip}
                />
              </div>

              <div className="bg-ocean-mid/50 rounded-xl border border-ocean-light/20 p-4 flex flex-col gap-3">
                <h2 className="text-base font-bold text-accent uppercase tracking-wide">Controls</h2>

                <button
                  onClick={toggleOrientation}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-ocean-surface/50 hover:bg-ocean-surface/80 border border-ocean-light/30 text-sm font-medium transition-colors"
                >
                  <RotateCcw size={14} />
                  Rotate ({state.orientation})
                </button>

                <button
                  onClick={autoPlaceShips}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-ocean-surface/50 hover:bg-ocean-surface/80 border border-ocean-light/30 text-sm font-medium transition-colors"
                >
                  <Shuffle size={14} />
                  Auto-Place
                </button>

                <button
                  onClick={resetPlacement}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-ocean-surface/50 hover:bg-ocean-surface/80 border border-ocean-light/30 text-sm font-medium transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>

                <button
                  disabled={!allShipsPlaced}
                  onClick={startBattle}
                  className={clsx(
                    'flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold transition-all',
                    allShipsPlaced
                      ? 'bg-accent hover:bg-accent/80 text-ocean-dark cursor-pointer'
                      : 'bg-ocean-light/20 text-ocean-light/40 cursor-not-allowed'
                  )}
                >
                  <Play size={14} />
                  Start Battle!
                </button>
              </div>
            </div>

            {/* Player Board */}
            <div className="flex flex-col items-center gap-4">
              <Board
                board={state.playerBoard}
                isSetup={true}
                selectedShip={state.selectedShip}
                orientation={state.orientation}
                onCellClick={placeShip}
                onDropShip={handleDropShip}
                label="Your Ocean"
              />
            </div>
          </div>
        )}

        {(state.phase === 'battle' || state.phase === 'gameover') && (
          <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">
            {/* Player Side */}
            <div className="flex flex-col items-center gap-4">
              <Board
                board={state.playerBoard}
                label="Your Ocean"
                disabled
              />
              <div className="bg-ocean-mid/50 rounded-xl border border-ocean-light/20 p-4 w-full max-w-[360px]">
                <h3 className="text-sm font-bold text-accent mb-2 uppercase tracking-wide">Your Fleet</h3>
                <ShipList ships={state.playerShips} showStatus />
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex xl:flex-col items-center justify-center gap-2 xl:py-16">
              <div className="text-2xl font-black text-ocean-light/30">VS</div>
              {state.phase === 'battle' && (
                <div className={clsx(
                  'w-3 h-3 rounded-full',
                  state.turn === 'player' ? 'bg-accent animate-pulse' : 'bg-hit animate-pulse'
                )} />
              )}
            </div>

            {/* Bot Side */}
            <div className="flex flex-col items-center gap-4">
              <Board
                board={state.botBoard}
                isEnemy={true}
                label="Enemy Ocean"
                disabled={state.phase === 'gameover' || state.turn === 'bot'}
                onCellClick={(row, col) => {
                  if (state.phase === 'battle' && state.turn === 'player') {
                    playerFire(row, col);
                  }
                }}
              />
              <div className="bg-ocean-mid/50 rounded-xl border border-ocean-light/20 p-4 w-full max-w-[360px]">
                <h3 className="text-sm font-bold text-hit mb-2 uppercase tracking-wide">Enemy Fleet</h3>
                <div className="flex flex-col gap-2">
                  {state.botShips.map(ship => (
                    <div
                      key={ship.id}
                      className={clsx(
                        'flex items-center gap-3 p-2 rounded-lg border',
                        ship.sunk
                          ? 'border-hit/40 bg-hit/10 opacity-60'
                          : 'border-ocean-light/20 bg-ocean-mid/40'
                      )}
                    >
                      <Target size={14} className={ship.sunk ? 'text-hit' : 'text-ocean-light/40'} />
                      <span className={clsx('text-sm font-medium', ship.sunk ? 'text-hit/70 line-through' : 'text-white')}>
                        {ship.name}
                      </span>
                      <span className="ml-auto text-xs text-ocean-light/50">
                        {ship.sunk ? 'SUNK' : '???'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
