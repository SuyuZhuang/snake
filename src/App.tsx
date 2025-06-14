import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import EducationPanel from './components/EducationPanel';
import Controls from './components/Controls';
import InstructionsModal from './components/InstructionsModal';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    handleTouchStart,
    handleTouchEnd,
    streak,
    masteredTrigrams,
    boardSize
  } = useGameLogic();

  const [showInstructions, setShowInstructions] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleToggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="text-center py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mb-2">
         八卦贪食蛇  · Ba Gua Snake
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
          匹配卦图符号来学习八卦！
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
          Combine the classic Snake game with the ancient Chinese philosophy of I Ching. 
          Match trigram symbols to learn the Eight Trigrams while playing!
        </p>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Left Column - Score and Education */}
          <div className="space-y-6">
            <ScoreBoard 
              gameState={gameState}
              streak={streak}
              masteredTrigrams={masteredTrigrams}
            />
            
            <EducationPanel
              currentTrigram={gameState.snake[0]?.trigram || null}
              targetSymbols={gameState.symbols.map(s => s.symbol)}
            />
          </div>

          {/* Center Column - Game Board */}
          <div className="flex flex-col items-center space-y-6">
            <GameBoard
              gameState={gameState}
              boardSize={boardSize}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              isZoomed={isZoomed}
            />
            
            <Controls
              gameRunning={gameState.gameRunning}
              gameOver={gameState.gameOver}
              onStart={startGame}
              onPause={pauseGame}
              onReset={resetGame}
              onShowInstructions={handleShowInstructions}
              isZoomed={isZoomed}
              onToggleZoom={handleToggleZoom}
            />
          </div>

          {/* Right Column - Game Stats and Tips */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gradient-to-r from-purple-800 to-purple-700 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-center">游戏状态 · Game Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>当前头部 Current Head:</span>
                  <span className="font-semibold text-yellow-400">
                    {gameState.snake[0]?.trigram || 'None'}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span>目标符号 Target Symbols:</span>
                  <span className="font-semibold text-red-400 text-lg">
                    {gameState.symbols.map(s => s.symbol).join(' ')}
                  </span>
                </div> */}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-green-800 to-emerald-700 rounded-lg p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-center">游戏技巧 · Pro Tips</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>学习符号，提升辨别准确性</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>点击说明按钮，了解更多</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>规划路线，避免和墙体或自己碰撞</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold"> </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Study the trigram symbols and their meanings to improve accuracy</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Plan your path to avoid walls and self-collision</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Take time to read the Instruction panel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm border-t border-gray-700">
        <p>Experience the wisdom of I Ching through interactive gameplay</p>
      </footer>
    </div>
  );
}

export default App;