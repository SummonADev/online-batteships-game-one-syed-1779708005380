import { useState, useCallback, useRef } from 'react';
import type { GameState, Ship, Orientation, Board } from '@/types';
import {
  createEmptyBoard,
  createInitialShips,
  randomlyPlaceShips,
  canPlaceShip,
  placeShipOnBoard,
  fireAtCell,
  allShipsSunk,
  botChooseTarget,
} from '@/lib/battleship';

function createInitialState(): GameState {
  return {
    phase: 'setup',
    playerBoard: createEmptyBoard(),
    botBoard: createEmptyBoard(),
    playerShips: createInitialShips(),
    botShips: [],
    turn: 'player',
    selectedShip: null,
    orientation: 'horizontal',
    winner: null,
    message: 'Place your ships! Select a ship and click or drag it onto the grid.',
    botLastHit: null,
    botHitStack: [],
  };
}

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialState);
  const botTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectShip = useCallback((ship: Ship) => {
    setState(prev => ({
      ...prev,
      selectedShip: prev.selectedShip?.id === ship.id ? null : ship,
    }));
  }, []);

  const toggleOrientation = useCallback(() => {
    setState(prev => ({
      ...prev,
      orientation: prev.orientation === 'horizontal' ? 'vertical' : 'horizontal',
    }));
  }, []);

  // placeShip uses whichever selectedShip is in state at call time
  const placeShip = useCallback((row: number, col: number) => {
    setState(prev => {
      if (!prev.selectedShip || prev.selectedShip.placed) return prev;

      if (!canPlaceShip(prev.playerBoard, prev.selectedShip, row, col, prev.orientation)) {
        return { ...prev, message: 'Cannot place ship there! Try another position.' };
      }

      const { board, ship } = placeShipOnBoard(
        prev.playerBoard,
        prev.selectedShip,
        row,
        col,
        prev.orientation
      );

      const updatedShips = prev.playerShips.map(s => (s.id === ship.id ? ship : s));
      const allPlaced = updatedShips.every(s => s.placed);
      const nextUnplaced = updatedShips.find(s => !s.placed) || null;

      return {
        ...prev,
        playerBoard: board,
        playerShips: updatedShips,
        selectedShip: nextUnplaced,
        message: allPlaced
          ? 'All ships placed! Click "Start Battle" to begin.'
          : `${ship.name} placed! Now place your ${nextUnplaced?.name}.`,
      };
    });
  }, []);

  // placeShipById selects the ship by id first, then places — used for drag & drop
  const placeShipById = useCallback(
    (shipId: string, row: number, col: number) => {
      setState(prev => {
        const ship = prev.playerShips.find(s => s.id === shipId);
        if (!ship || ship.placed) return prev;

        if (!canPlaceShip(prev.playerBoard, ship, row, col, prev.orientation)) {
          return { ...prev, message: 'Cannot place ship there! Try another position.' };
        }

        const { board, ship: placedShip } = placeShipOnBoard(
          prev.playerBoard,
          ship,
          row,
          col,
          prev.orientation
        );

        const updatedShips = prev.playerShips.map(s =>
          s.id === placedShip.id ? placedShip : s
        );
        const allPlaced = updatedShips.every(s => s.placed);
        const nextUnplaced = updatedShips.find(s => !s.placed) || null;

        return {
          ...prev,
          playerBoard: board,
          playerShips: updatedShips,
          selectedShip: nextUnplaced,
          message: allPlaced
            ? 'All ships placed! Click "Start Battle" to begin.'
            : `${placedShip.name} placed! Now place your ${nextUnplaced?.name}.`,
        };
      });
    },
    []
  );

  const autoPlaceShips = useCallback(() => {
    setState(prev => {
      const freshShips = createInitialShips();
      const { board, ships } = randomlyPlaceShips(freshShips);
      return {
        ...prev,
        playerBoard: board,
        playerShips: ships,
        selectedShip: null,
        message: 'Ships auto-placed! Click "Start Battle" to begin.',
      };
    });
  }, []);

  const resetPlacement = useCallback(() => {
    setState(prev => ({
      ...prev,
      playerBoard: createEmptyBoard(),
      playerShips: createInitialShips(),
      selectedShip: null,
      message: 'Place your ships! Select a ship and click or drag it onto the grid.',
    }));
  }, []);

  const startBattle = useCallback(() => {
    setState(prev => {
      if (!prev.playerShips.every(s => s.placed)) {
        return { ...prev, message: 'Place all your ships first!' };
      }

      const freshBotShips = createInitialShips();
      const { board: botBoard, ships: botShips } = randomlyPlaceShips(freshBotShips);

      return {
        ...prev,
        phase: 'battle',
        botBoard,
        botShips,
        turn: 'player',
        message: "Battle started! Click on the enemy's grid to fire.",
      };
    });
  }, []);

  const playerFire = useCallback((row: number, col: number) => {
    setState(prev => {
      if (prev.phase !== 'battle' || prev.turn !== 'player') return prev;

      const cell = prev.botBoard[row][col];
      if (cell.state === 'hit' || cell.state === 'miss' || cell.state === 'sunk') {
        return { ...prev, message: 'Already fired there! Choose another cell.' };
      }

      const { board, ships, hit, sunk } = fireAtCell(prev.botBoard, prev.botShips, row, col);

      const message = hit
        ? sunk
          ? `You sunk the enemy's ${ships.find(s => s.id === prev.botBoard[row][col].shipId)?.name || 'ship'}!`
          : 'Hit! Fire again!'
        : "Miss! Bot's turn.";

      if (allShipsSunk(ships)) {
        return {
          ...prev,
          botBoard: board,
          botShips: ships,
          phase: 'gameover',
          winner: 'player',
          message: '🎉 You win! All enemy ships sunk!',
        };
      }

      return {
        ...prev,
        botBoard: board,
        botShips: ships,
        turn: hit ? 'player' : 'bot',
        message,
      };
    });
  }, []);

  const botFire = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'battle' || prev.turn !== 'bot') return prev;

      const target = botChooseTarget(prev.playerBoard, prev.botLastHit, prev.botHitStack);
      if (!target) return prev;

      const { board, ships, hit, sunk } = fireAtCell(
        prev.playerBoard,
        prev.playerShips,
        target.row,
        target.col
      );

      let newHitStack = [...prev.botHitStack];
      let botLastHit = prev.botLastHit;

      if (hit) {
        newHitStack.push(target);
        botLastHit = target;
      }

      if (sunk) {
        const sunkShip = ships.find(
          s => s.sunk && !prev.playerShips.find(ps => ps.id === s.id && ps.sunk)
        );
        if (sunkShip) {
          newHitStack = newHitStack.filter(
            h => !sunkShip.cells.some(c => c.row === h.row && c.col === h.col)
          );
        } else {
          newHitStack = [];
        }
        botLastHit = null;
      }

      const shipName =
        ships.find(s => s.id === board[target.row][target.col].shipId)?.name || 'your ship';
      const message = hit
        ? sunk
          ? `Bot sunk your ${shipName}!`
          : 'Bot hit your ship! Bot fires again.'
        : 'Bot missed! Your turn.';

      if (allShipsSunk(ships)) {
        return {
          ...prev,
          playerBoard: board,
          playerShips: ships,
          phase: 'gameover',
          winner: 'bot',
          message: '💀 Bot wins! All your ships were sunk!',
          botLastHit: null,
          botHitStack: [],
        };
      }

      return {
        ...prev,
        playerBoard: board,
        playerShips: ships,
        turn: hit ? 'bot' : 'player',
        message,
        botLastHit,
        botHitStack: newHitStack,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    if (botTimeoutRef.current) {
      clearTimeout(botTimeoutRef.current);
    }
    setState(createInitialState());
  }, []);

  return {
    state,
    selectShip,
    toggleOrientation,
    placeShip,
    placeShipById,
    autoPlaceShips,
    resetPlacement,
    startBattle,
    playerFire,
    botFire,
    resetGame,
    botTimeoutRef,
  };
}
