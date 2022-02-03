import {
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';

const About = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt={5} p={5}>
      <VStack spacing={5}>
        <Heading>What is this?</Heading>
        <Text fontSize={18}>
          This is a small project to work on my (almost nonexistent) goespatial
          web development skills.
        </Text>
        <Text fontSize={18}>
          The home pages loads the latest images of Mars from the NASA Curiosity
          rover, and can display were they were taken on a map of the landing
          site by the Gale Crater.
        </Text>
        <Text fontSize={18}>
          The globe displays nothing so far, but I plan on adding the location
          of the rover and maybe some other data to it.
        </Text>
        <Link href="https://github.com/nicorinn/rovr">
          <IconButton
            aria-label="github"
            size="lg"
            icon={<BsGithub color="#F43E5C" size={32} />}
          />
        </Link>
      </VStack>
    </Flex>
  );
};

export default About;
