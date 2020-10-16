/* eslint-disable prefer-destructuring */
import { theme, DefaultTheme } from '@chakra-ui/core';

// First, create an alias for breakpoints
const breakpoints = [
  /* xs 0 < */
  '30em' /* sm 480<  */,
  '48em' /* md 768< */,
  '62em' /* lg 992< */,
  '80em' /* xl 1280< */,
  '160em' /* xxl 2560< */
];
// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints.xxl = breakpoints[4];

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Overpass, sans-serif',
    heading: 'Overpass, sans-serif',
    mono: 'Overpass, sans-serif'
  },

  breakpoints,

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
