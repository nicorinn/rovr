import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RoverImage } from '../../common/types';
import { toggleLike } from '../../redux/likeSlice';
import { RootState } from '../../redux/store';

const ImageCard: React.FC<RoverImage> = ({
  id,
  img_src,
  earth_date,
  camera,
}) => {
  const isLiked = useSelector((state: RootState) => state.likes[id]);
  const dispatch = useDispatch();
  const [isLikePressed, setLikePressed] = useState(false);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const likeChangeHandler = () => dispatch(toggleLike(id));

  useEffect(() => {
    setLikePressed(true);
    const likePressedTimer = setTimeout(() => setLikePressed(false), 100);
    return () => clearTimeout(likePressedTimer);
  }, [isLiked]);

  return (
    <Box shadow="dark-lg" bgColor="gray.200" borderRadius="lg" p={5}>
      <Image
        boxSize={isLargerThan768 ? 500 : ''}
        draggable={false}
        src={img_src}
        alt={'NASA image'}
        fit="scale-down"
        borderRadius="lg"
        shadow="dark-lg"
      />
      <Flex align="center" mt={2}>
        <Box>
          <Text fontSize={22} color="white">
            {camera.name}
          </Text>
          <Text fontSize={16} color="white">
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
          {!isLiked && (
            <Icon
              as={BsStar}
              boxSize={isLikePressed ? '3.7em' : '2.5em'}
              role="img"
              aria-label="unstarred icon"
              transition="all 200ms ease-in-out"
            />
          )}
          {isLiked && (
            <Icon
              as={BsStarFill}
              boxSize={isLikePressed ? '3.7em' : '2.5em'}
              color="red.800"
              role="img"
              aria-label="starred icon"
              transition="all 200ms ease-in-out"
            />
          )}
        </Button>
      </Flex>
    </Box>
  );
};

export default ImageCard;
