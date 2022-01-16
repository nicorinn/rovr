import { Box, Image, Text } from '@chakra-ui/react';

interface ImageCardProps {
  url: string;
  alt?: string;
  caption: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ url, alt, caption }) => {
  return (
    <Box shadow="lg">
      <Image src={url} alt={alt || 'NASA image'} />
      <Box>
        <Text>{caption}</Text>
      </Box>
    </Box>
  );
};

export default ImageCard;
