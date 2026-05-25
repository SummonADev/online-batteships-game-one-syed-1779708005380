export type CellState = 'empty' | 'ship' | 'hit' | 'miss' | 'sunk';

export type Orientation = 'horizontal' | 'vertical';

export type GamePhase = 'setup' | 'battle' | 'gameover';

export type Turn = 'player' | 'bot';

export interface Ship {
  id: string;
  name: string;
  size: number;
  placed: boolean;
  sunk: boolean;
  cells: { row: number; col: number }[];
  orientation: Orientation;
}

export interface Cell {
  row: number;
  col: number;
  state: CellState;
  shipId: string | null;
}

export type Board = Cell[][];

export interface GameState {
  phase: GamePhase;
  playerBoard: Board;
  botBoard: Board;
  playerShips: Ship[];
  botShips: Ship[];
  turn: Turn;
  selectedShip: Ship | null;
  orientation: Orientation;
  winner: 'player' | 'bot' | null;
  message: string;
  botLastHit: { row: number; col: number } | null;
  botHitStack: { row: number; col: number }[];
}
