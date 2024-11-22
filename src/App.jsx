import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, VStack, Center } from '@chakra-ui/react';
import GameBoard from './assets/components/gameboard';
import { generateFood, checkCollisions, increaseSpeed } from './utils/gamelogic';
import GameOver from './assets/components/gameover';
import walls from './levelsWall/walls';

const gridSize = 20;
const initialSpeed = 200;

const App = () => {
    const [paused, setpaused] = useState('false');
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState('right'); // by default
    const [food, setFood] = useState(generateFood(gridSize, [{ x: 10, y: 10 }]));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(initialSpeed);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false); // New state for game over
    //mounted method
    useEffect(() => {
        let gameInterval;
        if (gameStarted && !gameOver) {
            gameInterval = setInterval(() => {
                moveSnake();
            }, gameSpeed);
        }
        return () => clearInterval(gameInterval);
    }, [gameStarted, direction, gameSpeed, snake, gameOver]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false); // Reset game over state when starting a new game
    };

    const resetGame = () => {
        setHighScore(Math.max(score, highScore));
        setSnake([{ x: 10, y: 10 }]);
        setDirection('right');
        setFood(generateFood(gridSize, [{ x: 10, y: 10 }]));
        setScore(0);
        setGameSpeed(initialSpeed);
        setGameStarted(false);
        setGameOver(false); // Reset game over state when resetting the game
    };


    const moveSnake = () => {
        // Prevent movement when the game is paused or hasn't started
        if (paused || !gameStarted) return;
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        // Update head position based on direction
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
            default:
                break;
        }
        head.x = (head.x + gridSize) % gridSize;
        head.y = (head.y + gridSize) % gridSize;


        // Check for collisions
        if (checkCollisions(head, gridSize, newSnake, walls[levels])) {
            setGameOver(true);
            return;
        }

        // Add new head to the snake
        newSnake.unshift(head);

        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            setScore(prev => prev + 1);
            setFood(generateFood(gridSize, newSnake));
            const newSpeed = increaseSpeed(gameSpeed);
            setGameSpeed(newSpeed);
        } else {
            // Remove the last segment of the snake if food is not eaten
            newSnake.pop();
        }

        // Update the snake state
        setSnake(newSnake);
    };
    //from keyboard
    const handleKeyPress = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') setDirection('up');
                break;
            case 'ArrowDown':
                if (direction !== 'up') setDirection('down');
                break;
            case 'ArrowLeft':
                if (direction !== 'right') setDirection('left');
                break;
            case 'ArrowRight':
                if (direction !== 'left') setDirection('right');
                break;
            case ' ':
                startGame();
                break;
            case 'p':
                setpaused(!paused);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameStarted]);

    return (
        <ChakraProvider>
            <Center height="100vh" bg="#abb78a" flexDirection="column" fontFamily="VT323, monospace">
                <VStack spacing={5}>
                    <Box className="scores" display="flex" justifyContent="space-between" width="400px">
                        <Text color="green" fontSize="2xl">Score: {score}</Text>
                        <Text color="green" fontSize="2xl">High Score: {highScore}</Text>
                    </Box>

                    <GameBoard snake={snake} food={food} gridSize={gridSize} />
                    {/* if game not started then display this*/}
                    {!gameStarted && !gameOver && (
                        <Text id="instruction-text" color="black" textAlign="center" fontSize="xl">
                            Press Space to Start the Game
                        </Text>
                    )}
                    {/*the gameover container for my game       */}
// https://github.com/menard-codes/snakes-game/blob/main/src/SnakesGame/SnakesGame.tsx
                    {gameOver && (
                        <GameOver
                            resetGame={resetGame}
                            score={score}
                            highScore={highScore}
                            walls={walls[levels]}
                        />
                    )}
                </VStack>
            </Center>
        </ChakraProvider>
    );

}
export default App

