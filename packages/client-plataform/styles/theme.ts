import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Overpass, sans-serif',
    heading: 'Overpass, sans-serif',
    mono: 'Overpass, sans-serif'
  },
  colors: {
    ...theme.colors,
    black: '#1C1C1C',
    white: '#FCFCFC',
    blue: {
      ...theme.colors.blue,
      '100': '#F2F7FF',
      '300': '#7F9CCE',
      '500': '#0B409C',
      '700': '2151A5'
    }
  }
};

export default customTheme;
