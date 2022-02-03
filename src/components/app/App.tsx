import { Box, ChakraProvider } from '@chakra-ui/react';
import Header from '../header';
import theme from '../../chakra/theme';
import ImageList from '../imageList';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MarsGlobe } from '../marsGlobe';
import { About } from '../about';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Box as="main" pt="10vh">
          <Routes>
            <Route path="/" element={<ImageList />} />
            <Route path="latest" element={<ImageList />} />
            <Route path="globe" element={<MarsGlobe />} />
            <Route path="about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
