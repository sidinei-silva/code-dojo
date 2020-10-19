import { Flex, Box } from '@chakra-ui/core';
import React from 'react';

import HeaderLoggedIn from '../../sections/header/loggedIn';

const DashboardLayout: React.FC = props => {
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
      <HeaderLoggedIn />
      <Box
        backgroundImage="url('/img/bg3.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        paddingTop="110px"
        paddingX={{ base: '25px', xxl: '300px' }}
        w="100vw"
        height="100vh"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
