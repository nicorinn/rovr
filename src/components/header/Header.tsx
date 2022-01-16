import { Box, Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex p={2} mb={4} align="center">
      <Box>
        <Heading color="white">ROVR</Heading>
      </Box>
    </Flex>
  );
};

export default Header;
