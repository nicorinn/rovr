import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import Header from '../header';
import theme from '../../chakra/theme';

import './App.css';
import ImageList from '../imageList';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box className="App">
        <Header />
        <Box as="main" pt="80px">
          <ImageList />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
