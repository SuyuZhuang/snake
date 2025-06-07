import React from 'react';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  boardSize: number;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  boardSize,
  onTouchStart,
  onTouchEnd
}) => {
  const cellSize = 20;
  const boardPixelSize = boardSize * cellSize;

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-lg shadow-2xl border-4 border-yellow-600">
      <svg
        width={boardPixelSize}
        height={boardPixelSize}
        className="block"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Grid pattern */}
        <defs>
          <pattern
            id="grid"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Snake */}
        {gameState.snake.map((segment, index) => (
          <g key={index}>
            <rect
              x={segment.position.x * cellSize + 1}
              y={segment.position.y * cellSize + 1}
              width={cellSize - 2}
              height={cellSize - 2}
              fill={index === 0 ? '#fbbf24' : '#60a5fa'}
              rx="3"
              className="drop-shadow-lg"
            />
            <text
              x={segment.position.x * cellSize + cellSize / 2}
              y={segment.position.y * cellSize + cellSize / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
              className="select-none"
            >
              {segment.trigram}
            </text>
          </g>
        ))}

        {/* Current symbol */}
        {gameState.currentSymbol && gameState.currentSymbol.position && (
          <g>
            <circle
              cx={gameState.currentSymbol.position.x * cellSize + cellSize / 2}
              cy={gameState.currentSymbol.position.y * cellSize + cellSize / 2}
              r={cellSize / 2 - 2}
              fill="#ef4444"
              className="animate-pulse drop-shadow-lg"
            />
            <text
              x={gameState.currentSymbol.position.x * cellSize + cellSize / 2}
              y={gameState.currentSymbol.position.y * cellSize + cellSize / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="white"
              fontWeight="bold"
              className="select-none"
            >
              {gameState.currentSymbol.symbol}
            </text>
          </g>
        )}
      </svg>

      {/* Game Over Overlay */}
      {gameState.gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">游戏结束</h2>
            <p className="text-lg mb-4">Game Over</p>
            <p className="text-yellow-400">Final Score: {gameState.score}</p>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {!gameState.gameRunning && !gameState.gameOver && gameState.snake.length > 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">暂停</h2>
            <p className="text-lg">Paused</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;