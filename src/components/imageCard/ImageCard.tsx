import { Box, Center, Image, Text, theme } from '@chakra-ui/react';

interface ImageCardProps {
  src: string;
  alt?: string;
  caption: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption }) => {
  return (
    <Box shadow="dark-lg" bgColor="gray.200" borderRadius="lg" p={5} mb={5}>
      <Image boxSize="500px" src={src} alt={alt || 'NASA image'} />
      <Center>
        <Box>
          <Text fontSize={22} color="white">
            {caption}
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default ImageCard;
