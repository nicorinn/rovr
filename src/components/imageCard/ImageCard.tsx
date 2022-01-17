import { Box, Button, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react';
import { BsStar } from 'react-icons/bs';

interface ImageCardProps {
  src: string;
  alt?: string;
  caption: string;
}

const unlikedStar = <Icon as={BsStar} boxSize="3em" />;

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption }) => {
  return (
    <Box shadow="dark-lg" bgColor="gray.200" borderRadius="lg" p={5}>
      <Image
        boxSize="500px"
        src={src}
        alt={alt || 'NASA image'}
        fit="scale-down"
      />
      <Flex align="center" mt={2}>
        <Box>
          <Text fontSize={22} color="white">
            {caption}
          </Text>
        </Box>
        <Spacer />
        <Button size="lg" width="3em" variant="unstyled">
          <Icon as={BsStar} boxSize="2.5em" />
        </Button>
      </Flex>
    </Box>
  );
};

export default ImageCard;
