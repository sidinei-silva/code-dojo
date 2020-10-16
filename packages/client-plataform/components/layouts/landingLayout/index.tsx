import { Flex } from '@chakra-ui/core';
import React from 'react';

import HeaderLoggedOut from '../../sections/header/loggedOut';

const LandingLayout: React.FC = props => {
  const { children } = props;

  return (
    <Flex
      direction="column"
      align="center"
      maxW={{
        base: 'auto',
        sm: 'auto',
        md: 'auto',
        lg: 'auto',
        xl: '1200px'
      }}
      m="0 auto"
      {...props}
    >
      <HeaderLoggedOut />
      {children}
    </Flex>
  );
};

export default LandingLayout;
