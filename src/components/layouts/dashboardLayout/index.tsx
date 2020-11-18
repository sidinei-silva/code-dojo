import { Flex, BoxProps } from '@chakra-ui/core';
import React from 'react';

import HeaderLoggedIn from '../../sections/header/loggedIn';
import UserAuth from '../../utils/userAuth';

const DashboardLayout: React.FC<BoxProps> = props => {
  const { children } = props;

  return (
    <UserAuth>
      <Flex direction="column" align="center" m="0 auto" {...props}>
        <HeaderLoggedIn />
        <Flex
          backgroundImage="url('/img/bg3.png')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          paddingTop="110px"
          paddingX={{ base: '25px', xxl: '300px' }}
          w="100%"
          justify="center"
          minHeight="100vh"
        >
          {children}
        </Flex>
      </Flex>
    </UserAuth>
  );
};

export default DashboardLayout;
