import type { Board, Cell, Ship, Orientation } from '@/types';

export const GRID_SIZE = 10;

export const SHIP_CONFIGS: { name: string; size: number }[] = [
  { name: 'Carrier', size: 5 },
  { name: 'Battleship', size: 4 },
  { name: 'Cruiser', size: 3 },
  { name: 'Submarine', size: 3 },
  { name: 'Destroyer', size: 2 },
];

export function createEmptyBoard(): Board {
  const board: Board = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push({ row: r, col: c, state: 'empty', shipId: null });
    }
    board.push(row);
  }
  return board;
}

export function canPlaceShip(
  board: Board,
  ship: Ship,
  row: number,
  col: number,
  orientation: Orientation
): boolean {
  const cells = getShipCells(ship.size, row, col, orientation);
  if (cells.length === 0) return false;

  for (const cell of cells) {
    if (cell.row < 0 || cell.row >= GRID_SIZE || cell.col < 0 || cell.col >= GRID_SIZE) {
      return false;
    }
    if (board[cell.row][cell.col].shipId !== null) {
      return false;
    }
    // Check adjacent cells
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = cell.row + dr;
        const nc = cell.col + dc;
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          if (board[nr][nc].shipId !== null) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

export function getShipCells(
  size: number,
  row: number,
  col: number,
  orientation: Orientation
): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  for (let i = 0; i < size; i++) {
    if (orientation === 'horizontal') {
      cells.push({ row, col: col + i });
    } else {
      cells.push({ row: row + i, col });
    }
  }
  return cells;
}

export function placeShipOnBoard(
  board: Board,
  ship: Ship,
  row: number,
  col: number,
  orientation: Orientation
): { board: Board; ship: Ship } {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cells = getShipCells(ship.size, row, col, orientation);

  for (const cell of cells) {
    newBoard[cell.row][cell.col].shipId = ship.id;
    newBoard[cell.row][cell.col].state = 'ship';
  }

  const updatedShip: Ship = {
    ...ship,
    placed: true,
    cells,
    orientation,
  };

  return { board: newBoard, ship: updatedShip };
}

export function createInitialShips(): Ship[] {
  return SHIP_CONFIGS.map((config, i) => ({
    id: `ship-${i}`,
    name: config.name,
    size: config.size,
    placed: false,
    sunk: false,
    cells: [],
    orientation: 'horizontal',
  }));
}

export function randomlyPlaceShips(ships: Ship[]): { board: Board; ships: Ship[] } {
  let board = createEmptyBoard();
  const placedShips: Ship[] = [];

  for (const ship of ships) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 1000) {
      attempts++;
      const orientation: Orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceShip(board, ship, row, col, orientation)) {
        const result = placeShipOnBoard(board, ship, row, col, orientation);
        board = result.board;
        placedShips.push(result.ship);
        placed = true;
      }
    }
    if (!placed) {
      // Fallback: place without adjacency constraint
      for (let r = 0; r < GRID_SIZE && !placed; r++) {
        for (let c = 0; c < GRID_SIZE && !placed; c++) {
          const cells = getShipCells(ship.size, r, c, 'horizontal');
          const valid = cells.every(
            cell =>
              cell.row < GRID_SIZE &&
              cell.col < GRID_SIZE &&
              board[cell.row][cell.col].shipId === null
          );
          if (valid) {
            const result = placeShipOnBoard(board, ship, r, c, 'horizontal');
            board = result.board;
            placedShips.push(result.ship);
            placed = true;
          }
        }
      }
    }
  }

  return { board, ships: placedShips };
}

export function checkSunk(board: Board, ship: Ship): boolean {
  return ship.cells.every(cell => board[cell.row][cell.col].state === 'hit');
}

export function allShipsSunk(ships: Ship[]): boolean {
  return ships.every(s => s.sunk);
}

export function fireAtCell(
  board: Board,
  ships: Ship[],
  row: number,
  col: number
): { board: Board; ships: Ship[]; hit: boolean; sunk: boolean } {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];

  let hit = false;
  let sunk = false;
  let newShips = ships.map(s => ({ ...s, cells: [...s.cells] }));

  if (cell.state === 'ship') {
    cell.state = 'hit';
    hit = true;

    // Check if the ship is sunk
    const shipId = cell.shipId;
    const shipIndex = newShips.findIndex(s => s.id === shipId);
    if (shipIndex !== -1) {
      if (checkSunk(newBoard, newShips[shipIndex])) {
        newShips[shipIndex] = { ...newShips[shipIndex], sunk: true };
        // Mark all cells as sunk
        for (const sc of newShips[shipIndex].cells) {
          newBoard[sc.row][sc.col].state = 'sunk';
        }
        sunk = true;
      }
    }
  } else if (cell.state === 'empty') {
    cell.state = 'miss';
  }

  return { board: newBoard, ships: newShips, hit, sunk };
}

export function botChooseTarget(
  board: Board,
  lastHit: { row: number; col: number } | null,
  hitStack: { row: number; col: number }[]
): { row: number; col: number } {
  // If we have a hit stack, try to sink the ship
  if (hitStack.length > 0) {
    // Try adjacent cells of the last hit in stack
    const directions = [
      { dr: -1, dc: 0 },
      { dr: 1, dc: 0 },
      { dr: 0, dc: -1 },
      { dr: 0, dc: 1 },
    ];

    // Try to find a pattern (if 2+ hits in line, continue that direction)
    if (hitStack.length >= 2) {
      const last = hitStack[hitStack.length - 1];
      const prev = hitStack[hitStack.length - 2];
      const dr = last.row - prev.row;
      const dc = last.col - prev.col;

      // Try continuing in same direction
      const nr = last.row + dr;
      const nc = last.col + dc;
      if (
        nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE &&
        (board[nr][nc].state === 'empty' || board[nr][nc].state === 'ship')
      ) {
        return { row: nr, col: nc };
      }

      // Try opposite direction from first hit
      const first = hitStack[0];
      const nr2 = first.row - dr;
      const nc2 = first.col - dc;
      if (
        nr2 >= 0 && nr2 < GRID_SIZE && nc2 >= 0 && nc2 < GRID_SIZE &&
        (board[nr2][nc2].state === 'empty' || board[nr2][nc2].state === 'ship')
      ) {
        return { row: nr2, col: nc2 };
      }
    }

    // Try adjacent to any hit in stack
    for (const hit of [...hitStack].reverse()) {
      for (const dir of directions) {
        const nr = hit.row + dir.dr;
        const nc = hit.col + dir.dc;
        if (
          nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE &&
          (board[nr][nc].state === 'empty' || board[nr][nc].state === 'ship')
        ) {
          return { row: nr, col: nc };
        }
      }
    }
  }

  // Random targeting with checkerboard pattern
  const available: { row: number; col: number }[] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (
        (board[r][c].state === 'empty' || board[r][c].state === 'ship') &&
        (r + c) % 2 === 0
      ) {
        available.push({ row: r, col: c });
      }
    }
  }

  if (available.length === 0) {
    // Fall back to any available cell
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (board[r][c].state === 'empty' || board[r][c].state === 'ship') {
          available.push({ row: r, col: c });
        }
      }
    }
  }

  return available[Math.floor(Math.random() * available.length)];
}
