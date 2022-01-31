import { Box, Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      as="header"
      p={2}
      align="center"
      position="fixed"
      width="100%"
      height="10vh"
      bgColor="black"
      zIndex={9999}
      top={0}
    >
      <Box>
        <Heading color="white">ROVR</Heading>
      </Box>
    </Flex>
  );
};

export default Header;
