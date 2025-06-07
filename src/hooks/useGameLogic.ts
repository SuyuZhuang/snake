import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Direction, Position, SnakeSegment, TouchStart, Trigram } from '../types/game';
import { getRandomTrigram, initialAchievements, findTrigramByName } from '../utils/iching';

const BOARD_SIZE = 20;
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_SPEED = 300;
const FOOD_COUNT = 3;  // Number of foods to show at once

export const useGameLogic = () => {
  // Define generateRandomPosition first without useCallback
  const generateRandomPosition = (currentSnake: SnakeSegment[] = [], currentSymbols: { x: number; y: number }[] = []): Position => {
    let position: Position;
    let isValidPosition: boolean;

    do {
      position = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
      
      // Check if position overlaps with snake or other symbols
      isValidPosition = !currentSnake.some(segment => 
        segment.position.x === position.x && segment.position.y === position.y
      ) && !currentSymbols.some(symbol => 
        symbol.x === position.x && symbol.y === position.y
      );
    } while (!isValidPosition);

    return position;
  };

  const [gameState, setGameState] = useState<GameState>(() => {
    const initialSnake: SnakeSegment[] = [];
    const initialSymbols: (Trigram & { position: Position })[] = [];

    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({
        position: { x: 10 - i, y: 10 }, 
        trigram: getRandomTrigram().name
      });
    }

    // Generate initial symbols
    for (let i = 0; i < FOOD_COUNT; i++) {
      const symbol = getRandomTrigram();
      const pos = generateRandomPosition(initialSnake, initialSymbols.map(s => s.position));
      initialSymbols.push({
        ...symbol,
        position: pos
      });
    }

    return {
      snake: initialSnake,
      direction: 'RIGHT',
      symbols: initialSymbols,
      score: 0,
      gameRunning: false,
      gameOver: false,
      speed: INITIAL_SPEED,
      achievements: initialAchievements
    };
  });

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const [streak, setStreak] = useState(0);
  const [masteredTrigrams, setMasteredTrigrams] = useState<Set<string>>(new Set());
  const touchStartRef = useRef<TouchStart | null>(null);

  // Memoize generateRandomPosition for use in callbacks
  const generateRandomPositionMemo = useCallback((): Position => {
    return generateRandomPosition(
      gameState.snake,
      gameState.symbols.map(s => s.position)
    );
  }, [gameState.snake, gameState.symbols]);

  const checkCollision = useCallback((head: Position, snake: SnakeSegment[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    
    // Self collision
    return snake.some(segment => segment.position.x === head.x && segment.position.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameRunning || prev.gameOver) return prev;

      const head = prev.snake[0];
      let newHead: Position;

      switch (prev.direction) {
        case 'UP':
          newHead = { x: head.position.x, y: head.position.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.position.x, y: head.position.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.position.x - 1, y: head.position.y };
          break;
        case 'RIGHT':
          newHead = { x: head.position.x + 1, y: head.position.y };
          break;
      }

      if (checkCollision(newHead, prev.snake)) {
        return { ...prev, gameOver: true, gameRunning: false };
      }

      const newSnake = [...prev.snake];
      newSnake.unshift({
        position: newHead,
        trigram: head.trigram
      });

      // Check if snake head matches any symbol
      const matchedSymbolIndex = prev.symbols.findIndex(symbol => 
        newHead.x === symbol.position.x && newHead.y === symbol.position.y
      );

      if (matchedSymbolIndex !== -1) {
        const matchedSymbol = prev.symbols[matchedSymbolIndex];
        const headTrigram = findTrigramByName(head.trigram);
        const isCorrect = headTrigram?.symbol === matchedSymbol.symbol;
        
        let newScore = prev.score;
        
        if (isCorrect) {
          newScore += 3;
          setStreak(s => s + 1);
          setMasteredTrigrams(m => new Set(m).add(head.trigram));
        } else {
          newScore -= 3;
          setStreak(0);
          if (newSnake.length > 1) {
            newSnake.pop();
          }
        }

        // Add new segment with random trigram if correct
        if (isCorrect) {
          newSnake[newSnake.length - 1] = {
            ...newSnake[newSnake.length - 1],
            trigram: getRandomTrigram().name
          };
        }

                  // Replace the eaten symbol with a new one
          const newSymbols = [...prev.symbols];
          const pos = generateRandomPosition(
            prev.snake,
            prev.symbols.map(s => s.position)
          );
          newSymbols[matchedSymbolIndex] = {
            ...getRandomTrigram(),
            position: pos
          };

        return {
          ...prev,
          snake: newSnake,
          score: Math.max(0, newScore),
          symbols: newSymbols
        };
      }

      // Remove tail if no food eaten
      newSnake.pop();

      return {
        ...prev,
        snake: newSnake
      };
    });
  }, [checkCollision, generateRandomPosition]);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prev => {
      // Prevent reverse direction
      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      };
      
      if (opposites[prev.direction] === newDirection) {
        return prev;
      }
      
      return { ...prev, direction: newDirection };
    });
  }, []);

      const startGame = useCallback(() => {
      setGameState(prev => {
        const newSymbols = [];
        for (let i = 0; i < FOOD_COUNT; i++) {
          const pos = generateRandomPosition(
            prev.snake,
            newSymbols.map(s => s.position)
          );
          newSymbols.push({
            ...getRandomTrigram(),
            position: pos
          });
        }
        
        return {
          ...prev,
          gameRunning: true,
          gameOver: false,
          symbols: newSymbols
        };
      });
    }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameRunning: !prev.gameRunning }));
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake: SnakeSegment[] = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({
        position: { x: 10 - i, y: 10 },
        trigram: getRandomTrigram().name
      });
    }

          const initialSymbols = [];
      for (let i = 0; i < FOOD_COUNT; i++) {
        const pos = generateRandomPosition(
          initialSnake,
          initialSymbols.map(s => s.position)
        );
        initialSymbols.push({
          ...getRandomTrigram(),
          position: pos
        });
      }

    setGameState({
      snake: initialSnake,
      direction: 'RIGHT',
      symbols: initialSymbols,
      score: 0,
      gameRunning: false,
      gameOver: false,
      speed: INITIAL_SPEED,
      achievements: initialAchievements
    });
    setStreak(0);
    setMasteredTrigrams(new Set());
  }, [generateRandomPosition]);

  // Touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const threshold = 30;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      changeDirection(deltaX > 0 ? 'RIGHT' : 'LEFT');
    } else if (Math.abs(deltaY) > threshold) {
      changeDirection(deltaY > 0 ? 'DOWN' : 'UP');
    }
    
    touchStartRef.current = null;
  }, [changeDirection]);

  // Game loop
  useEffect(() => {
    if (gameState.gameRunning && !gameState.gameOver) {
      gameLoopRef.current = setInterval(moveSnake, gameState.speed);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameRunning, gameState.gameOver, gameState.speed, moveSnake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.gameRunning) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
        case ' ':
          e.preventDefault();
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameRunning, changeDirection, pauseGame]);

  return {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    changeDirection,
    handleTouchStart,
    handleTouchEnd,
    streak,
    masteredTrigrams: masteredTrigrams.size,
    boardSize: BOARD_SIZE
  };
}