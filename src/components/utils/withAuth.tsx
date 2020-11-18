import { CircularProgress, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { loggedIn } from '../../services/auth';

const withAuth = (Component): any => {
  return () => {
    const [isLoad, setIsLoad] = useState(true);

    const router = useRouter();

    React.useEffect(() => {
      if (!loggedIn()) {
        router.push('/entrar');
      } else {
        setIsLoad(false);
      }
    });

    if (isLoad) {
      return (
        <Flex align="center" height="100vh" justify="center">
          <CircularProgress isIndeterminate color="blue" />
        </Flex>
      );
    }

    return <Component />;
  };
};

export default withAuth;
