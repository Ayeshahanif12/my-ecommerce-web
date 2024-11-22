import React from 'react';
import { Box } from '@chakra-ui/react';
import Snake from './snake.jsx';
import Food from './food.jsx';

const GameBoard = ({ snake, food, gridSize, walls }) => {
  return (
    
    <Box
      id="gameBoard"
      width="400px"
      height="400px"
      display="grid"
      gridTemplateColumns={`repeat(${gridSize}, 1fr)`}
      gridTemplateRows={`repeat(${gridSize}, 1fr)`}
      border="10px solid black"
      bg="white"
    >

       {/* Render Walls */}
       {walls.map((wall, index) => (
        <Box
          key={index}
          bg="gray.600"
          gridColumn={wall.x}
          gridRow={wall.y}
          width="100%"
          height="100%"
        />
      ))}

      <Snake snake={snake} />
      <Food food={food} />
    </Box>
  );
};

export default GameBoard;
