import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Overpass, sans-serif',
    heading: 'Overpass, sans-serif',
    mono: 'Overpass, sans-serif'
  }
};

export default customTheme;
