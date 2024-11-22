import React from 'react';
import { Center, Box, Text, Button } from '@chakra-ui/react';

export default function GameOver({ resetGame, score, highScore }) {
  return (
    <Center
      pos="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="rgba(0, 0, 0, 0.6)"
      onClick={resetGame}
    >
      <Box bg="white" p={5} borderRadius="md" boxShadow="lg" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">Game Over</Text>
        <Text fontSize="lg">Your Final Score: <span>{score}</span></Text>
        {score > highScore && score > 0 && (
          <Text fontSize="lg" color="green.500" mt={2}> congratulations: 🏆 You beat the high score! 🏆</Text>
        )}
        <Button mt={4} colorScheme='teal' onClick={resetGame}> Restart Game</Button>
      </Box>
    </Center>
  );
}
