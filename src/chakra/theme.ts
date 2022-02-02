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
  red: {
    800: '#E9436F',
    400: '#E95379',
    200: '#F43E5C',
  },
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
    Button: { baseStyle: { _focus: { boxShadow: 'none' }, color: 'white' } },
    Text: { baseStyle: { color: 'white' } },
  },
});

export default theme;
