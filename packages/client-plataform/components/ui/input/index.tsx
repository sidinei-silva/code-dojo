import {
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/core';
import { jsx } from '@emotion/core';
import React from 'react';

const Input: React.FC<ChakraInputProps> = props => {
  return (
    <ChakraInput
      css={{
        ':-webkit-autofill': {
          WebkitBoxShadow: '0 0 0px 1000px #FCFCFC inset;'
        }
      }}
      height="50px"
      backgroundColor="white"
      focusBorderColor="blue.500"
      borderRadius="sm"
      _focus={{ boxShadow: 'outline' }}
      {...props}
    />
  );
};

export default Input;
