import { Flex, Box, BoxProps } from '@chakra-ui/core';
import React from 'react';

import HeaderLoggedIn from '../../sections/header/loggedIn';

const DashboardLayout: React.FC<BoxProps> = props => {
  const { children } = props;

  return (
    <Flex direction="column" align="center" m="0 auto" {...props}>
      <HeaderLoggedIn />
      <Box
        backgroundImage="url('/img/bg3.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        paddingTop="110px"
        paddingX={{ base: '25px', xxl: '300px' }}
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
