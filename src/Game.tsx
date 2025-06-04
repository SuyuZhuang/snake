import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Game: React.FC = () => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([{ x: 0, y: 0 }]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false); // 新增状态变量

  // 使用 useRef 保存最新的 direction 值
  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault(); // 阻止默认行为
      const currentDirection = directionRef.current; // 直接使用ref最新值
      console.log('currentDirection:', currentDirection);
      console.log('handleKeyDown:', e.key);
    switch (e.key) {
      case 'ArrowUp':
        if (currentDirection !== 'DOWN') directionRef.current = 'UP';
        break;
      case 'ArrowDown':
        if (currentDirection !== 'UP') directionRef.current = 'DOWN';
        break;
      case 'ArrowLeft':
        if (currentDirection !== 'RIGHT') directionRef.current = 'LEFT';
        break;
      case 'ArrowRight':
        if (currentDirection !== 'LEFT') directionRef.current = 'RIGHT';
        break;
    }
    setDirection(directionRef.current); // 同步更新state
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [gameStarted, gameOver]); // 保持原依赖项

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      let newHead = { ...snake[0] };
      
      switch (directionRef.current) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
        default:
          break;
      }
      
      // 检查是否吃到食物
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        });
        
        // 增加蛇的长度
        const newSnake = [newHead, ...snake];
        setSnake(newSnake);
      } else {
        // 移动蛇身
        const newSnake = [newHead, ...snake.slice(0, -1)];
        setSnake(newSnake);
      }
      
      // 检查碰撞
      if (
        newHead.x < 0 ||
        newHead.x >= 20 ||
        newHead.y < 0 ||
        newHead.y >= 20 ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        clearInterval(gameLoop);
      }
    }, 200);

    return () => {
      clearInterval(gameLoop);
    };
  }, [snake, direction, gameStarted, gameOver]);

  return (
    <div className="game-container">
      <h1>贪吃蛇游戏</h1>
      {gameOver && <p>游戏结束！</p>}
      {!gameStarted && (
        <button onClick={() => setGameStarted(true)} className="start-button">
          开始游戏
        </button>
      )}
      <div className="game-board">
        {Array.from({ length: 20 }).map((_, y) => (
          <div key={y} className="row">
            {Array.from({ length: 20 }).map((_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              return (
                <div
                  key={`${x}-${y}`}
                  className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;