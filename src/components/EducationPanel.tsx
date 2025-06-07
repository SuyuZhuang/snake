import React from 'react';
import { Trigram } from '../types/game';
import { findTrigramByName } from '../utils/iching';

interface EducationPanelProps {
  currentTrigram: string | null;
  targetSymbol: string | null;
}

const EducationPanel: React.FC<EducationPanelProps> = ({
  currentTrigram,
  targetSymbol
}) => {
  const trigram = currentTrigram ? findTrigramByName(currentTrigram) : null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg p-6 shadow-xl border-2 border-amber-200 min-h-[200px]">
      <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
        八卦知识 · Trigram Knowledge
      </h3>
      
      {trigram ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2 text-gray-800">{trigram.symbol}</div>
            <div className="text-2xl font-bold text-amber-800">
              {trigram.name} ({trigram.pinyin})
            </div>
          </div>
          
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="mb-2">
              <span className="font-semibold text-amber-800">五行元素 · Element:</span>
              <span className="ml-2 text-amber-700">{trigram.element}</span>
            </div>
            
            
            <div>
              <span className="font-semibold text-amber-800">助记 · Memory:</span>
              <p className="ml-2 text-amber-700 text-sm leading-relaxed">
                {trigram.memory}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-amber-700">
          <div className="text-6xl mb-4">☯</div>
          <p className="text-lg">
            Move the snake to collect trigram symbols 
          </p>
          <p className="text-sm mt-2 italic">
            操控蛇身收集八卦符号
          </p>
        </div>
      )}
      
    
    </div>
  );
};

export default EducationPanel;