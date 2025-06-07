import React from 'react';
import { X } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              游戏说明 · How to Play
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🐍 游戏目标 · Game Objective
              </h3>
              <p className="text-gray-600 text-sm">
                操控蛇身，将八卦符号与蛇头显示的卦名进行匹配。
              </p>
              <p className="text-gray-600 mb-2">
                Guide your snake to match trigram symbols with the corresponding names displayed on the snake's head segment.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎮 控制方式 · Controls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>网页端 Web:</strong>
                  <ul className="mt-1 text-gray-600">
                    <li>• 使用上下左右或WASD键控制方向</li>
                     <li>• Arrow keys or WASD to move</li>
                    <li>• 使用空格暂停或恢复</li>
                    <li>• Spacebar to pause/resume</li>
                  </ul>
                </div>
                <div>
                  <strong>手机端 Mobile:</strong>
                  <ul className="mt-1 text-gray-600">
                    <li>• 手指在屏幕上滑动控制方向</li>
                    <li>• Swipe in any direction to move</li>
                    <li>• 轻触屏幕暂停或恢复</li>
                    <li>• Tap pause button to pause</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚡ 得分规则 · Scoring
              </h3>
              <ul className="text-gray-600 space-y-1">
                <li>• <span className="text-green-600 font-semibold">+3 points</span> for correct matches</li>
                <li>• <span className="text-red-600 font-semibold">-3 points</span> for incorrect matches</li>
                <li>• Snake grows longer with correct matches</li>
                <li>• Snake shrinks with incorrect matches</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ☰ 八卦 · The Eight Trigrams
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg">☰</span>
                  <span>Qian (乾) - Heaven</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☷</span>
                  <span>Kun (坤) - Earth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☳</span>
                  <span>Zhen (震) - Thunder</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☴</span>
                  <span>Xun (巽) - Wind</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☵</span>
                  <span>Kan (坎) - Water</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☲</span>
                  <span>Li (离) - Fire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☶</span>
                  <span>Gen (艮) - Mountain</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">☱</span>
                  <span>Dui (兑) - Lake</span>。
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
            >
              Start Playing · 开始游戏
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;