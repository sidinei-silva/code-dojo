/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ThemeContainer from '../contexts/theme/ThemeContainer';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
