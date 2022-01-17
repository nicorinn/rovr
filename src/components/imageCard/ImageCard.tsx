import { Box, Button, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RoverImage } from '../../common/types';
import { toggleLike } from '../../redux/likeSlice';
import { RootState } from '../../redux/store';

const unlikedStar = <Icon as={BsStar} boxSize="3em" />;
const likedStar = <Icon as={BsStar} boxSize="3em" />;

const ImageCard: React.FC<RoverImage> = ({
  id,
  img_src,
  earth_date,
  camera,
}) => {
  const isLiked = useSelector((state: RootState) => state.likes[id]);
  const dispatch = useDispatch();

  const likeChangeHandler = () => dispatch(toggleLike(id));

  return (
    <Box shadow="dark-lg" bgColor="gray.200" borderRadius="lg" p={5}>
      <Image
        boxSize="500px"
        src={img_src}
        alt={'NASA image'}
        fit="scale-down"
      />
      <Flex align="center" mt={2}>
        <Box>
          <Text fontSize={22} color="white">
            {camera.name}
          </Text>
          <Text fontSize={22} color="white">
            {earth_date}
          </Text>
        </Box>
        <Spacer />
        <Button
          size="lg"
          width="3em"
          variant="unstyled"
          onClick={likeChangeHandler}
          aria-label={`like-${id}`}
        >
          {!isLiked && <Icon as={BsStar} boxSize="2.5em" />}
          {isLiked && <Icon as={BsStarFill} boxSize="2.5em" color="red" />}
        </Button>
      </Flex>
    </Box>
  );
};

export default ImageCard;
