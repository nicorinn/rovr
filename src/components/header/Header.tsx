import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri/';

const Header = () => {
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px)');
  const location = useLocation();

  const mobileMenu = (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        color="teal"
        size="lg"
        icon={<RiMenu4Fill color="#F43E5C" size={32} />}
        variant="ghost"
      />
      <MenuList borderRadius={5} bg="black" border="none" height="90vh">
        <VStack spacing={5}>
          <Link to="latest">
            <MenuItem
              color={
                location.pathname === '/latest' || '/' ? 'red.200' : 'white'
              }
              fontSize="20"
            >
              LATEST IMAGES
            </MenuItem>
          </Link>
          <Link to="globe">
            <MenuItem
              color={location.pathname === '/globe' ? 'red.200' : 'white'}
              fontSize="20"
            >
              3D GLOBE
            </MenuItem>
          </Link>
          <Link to="about">
            <MenuItem
              color={location.pathname === '/about' ? 'red.200' : 'white'}
              fontSize="20"
            >
              3D GLOBE
            </MenuItem>
          </Link>
        </VStack>
      </MenuList>
    </Menu>
  );

  const desktopMenu = (
    <HStack spacing={5} mr={3}>
      <Link to="latest">
        <Box>
          <Button
            variant="ghost"
            color={location.pathname === '/latest' ? 'red.200' : 'white'}
          >
            LATEST IMAGES
          </Button>
        </Box>
      </Link>
      <Link to="globe">
        <Box>
          <Button
            variant="ghost"
            color={location.pathname === '/globe' ? 'red.200' : 'white'}
          >
            3D GLOBE
          </Button>
        </Box>
      </Link>
      <Link to="about">
        <Box>
          <Button
            variant="ghost"
            color={location.pathname === '/about' ? 'red.200' : 'white'}
          >
            ABOUT
          </Button>
        </Box>
      </Link>
    </HStack>
  );

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
        <Link to="/">
          <Heading color="white">ROVR</Heading>
        </Link>
      </Box>
      <Spacer />
      {isSmallerThan1024 && mobileMenu}
      {!isSmallerThan1024 && desktopMenu}
    </Flex>
  );
};

export default Header;
