import React from 'react';
import { GameState } from '../types/game';

interface ScoreBoardProps {
  gameState: GameState;
  streak: number;
  masteredTrigrams: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  gameState,
  streak,
  masteredTrigrams
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 shadow-xl border border-yellow-600">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {gameState.score}
          </div>
          <div className="text-xs text-gray-400">得分</div>
          <div className="text-sm text-gray-300">Score</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {gameState.snake.length}
          </div>
          <div className="text-xs text-gray-400">长度</div>
          <div className="text-sm text-gray-300">Length</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {streak}
          </div>
          <div className="text-xs text-gray-400">连击</div>
          <div className="text-sm text-gray-300">Streak</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {masteredTrigrams}/8
          </div>
          <div className="text-xs text-gray-400">掌握</div>
          <div className="text-sm text-gray-300">Mastered</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;