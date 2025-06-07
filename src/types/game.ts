export interface Position {
  x: number;
  y: number;
}

export interface SnakeSegment {
  position: Position;
  trigram: string;
}

export interface Trigram {
  pinyin: string;
  name: string;
  symbol: string;
  element: string;
  meaning: string;
  attributes: string[];
  description: string;
  memory: string;
}

export interface GameState {
  snake: SnakeSegment[];
  direction: Direction;
  symbols: (Trigram & { position: Position })[];
  score: number;
  gameRunning: boolean;
  gameOver: boolean;
  speed: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface TouchStart {
  x: number;
  y: number;
}