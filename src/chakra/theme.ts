import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const themeColors = {
  black: '#16161C',
  gray: {
    50: '#6C6F93',
    800: '#1C1E26',
    600: '#1A1C23',
    400: '#232530',
    200: '#2E303E',
  },
  white: '#FAC29A',
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  fonts: {
    body: 'IBM Plex Sans, sans-serif',
    heading: 'IBM Plex Sans, sans-serif',
  },
  colors: themeColors,
  components: {
    Box: {},
  },
});

export default theme;
