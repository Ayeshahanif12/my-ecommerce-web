import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

const Snake = ({ snake = [] }) => {
  const [ currentSnake, setCurrentSnake] = useState(snake);

  useEffect(() => {
    setCurrentSnake(snake);
  }, [snake])
 
  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          bg="darkgreen"
          className='snake-segment'
          border="1px solid darkgreen"
          gridColumn={segment.x}
          gridRow={segment.y}
          width="100%"
          height="100%"
        />
      ))}
    </>
  );
};

export default Snake;
