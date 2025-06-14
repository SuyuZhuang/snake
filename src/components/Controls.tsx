import React from 'react';
import { Play, Pause, RotateCcw, Info, ZoomIn, ZoomOut } from 'lucide-react';

interface ControlsProps {
  gameRunning: boolean;
  gameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onShowInstructions: () => void;
  isZoomed: boolean;
  onToggleZoom: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  gameRunning,
  gameOver,
  onStart,
  onPause,
  onReset,
  onShowInstructions,
  isZoomed,
  onToggleZoom
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* {!gameRunning && !gameOver ? (
        <button
          onClick={onStart}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Play size={20} />
          开始 · Start Game 
        </button>
      ) : gameRunning ? (
        <button
          onClick={onPause}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Pause size={20} />
          暂停 · Pause
        </button>
      ) : null} */}
      
      {/* <button
        onClick={onReset}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
      >
        <RotateCcw size={20} />
        重置 · Reset
      </button> */}
      
      <button
        onClick={onShowInstructions}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
      >
        <Info size={20} />
        说明 · Instructions
      </button>

      <button
        onClick={onToggleZoom}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
      >
        {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        {isZoomed ? '缩小 · Zoom Out' : '放大 · Zoom In'}
      </button>
    </div>
  );
};

export default Controls;