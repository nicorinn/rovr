import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '../header';
import theme from '../../chakra/theme';
import ImageList from '../imageList';

import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Box as="main" pt="10vh">
          <ImageList />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
