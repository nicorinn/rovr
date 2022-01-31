import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '../header';
import theme from '../../chakra/theme';

import './App.css';
import ImageList from '../imageList';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        mt="70px"
        style={{
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          height: '90vh',
        }}
      >
        <Header />
        <Box as="main" pt={30}>
          <ImageList />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
