import { useRouter } from 'next/router';
import React from 'react';

import useAuth from '../../../contexts/auth';
import LoadingScreen from '../../ui/loadingScreen';

const ProtectRoute = props => {
  const { children } = props;

  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) {
    if (typeof window !== 'undefined') {
      router.push('/entrar');
    }
  }

  if (isAuthenticated && !isLoading) {
    return children;
  }

  return <LoadingScreen />;
};

export default ProtectRoute;
