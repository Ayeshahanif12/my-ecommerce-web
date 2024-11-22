import React from 'react';
import { Box } from '@chakra-ui/react';

const Food = ({ food }) => {
  return (
    <>
     
        <Box
          
          bg="red"
          border="5px solid red"
          gridColumn={food.x}
          gridRow={food.y}
          width="100%"
          height="100%"
        />
    
    </>
  );
};

export default Food;
