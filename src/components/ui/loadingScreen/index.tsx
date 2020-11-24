import { CircularProgress, Flex } from '@chakra-ui/core';
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <Flex align="center" height="100vh" justify="center">
      <CircularProgress isIndeterminate color="blue" />
    </Flex>
  );
};

export default LoadingScreen;
