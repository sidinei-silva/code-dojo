/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { AuthProvider } from '../contexts/auth';
import ThemeContainer from '../contexts/theme/ThemeContainer';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeContainer>
        <Component {...pageProps} />
      </ThemeContainer>
    </AuthProvider>
  );
}

export default MyApp;
