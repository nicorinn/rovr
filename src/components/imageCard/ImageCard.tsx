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
import { RoverImage, Waypoint } from '../../common/types';
import { toggleLike } from '../../redux/likeSlice';
import { RootState } from '../../redux/store';

const ImageCard: React.FC<RoverImage> = ({
  id,
  img_src,
  earth_date,
  camera,
  sol,
}) => {
  const isLiked = useSelector((state: RootState) => state.likes[id]);
  const waypoints = useSelector((state: RootState) => state.waypoints);
  const dispatch = useDispatch();
  const [isLikePressed, setLikePressed] = useState(false);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!coords && waypoints.length) {
      const nearestWp = waypoints.reduce(
        (prev, current) => findNearestWaypoint(prev, current, sol),
        waypoints[0]
      );
      const wpCoords = nearestWp.geometry.coordinates;
      setCoords({ x: wpCoords[0], y: wpCoords[1] });
    }
  }, [coords, waypoints, sol]);

  useEffect(() => {
    setLikePressed(true);
    const likePressedTimer = setTimeout(() => setLikePressed(false), 100);
    return () => clearTimeout(likePressedTimer);
  }, [isLiked]);

  /**
   * Reducer - Finds the waypoint with the nearest sol to when the image was taken
   * @param nearest Accumulator value
   * @param next Next value
   * @param targetSol Target sol date
   * @returns Waypoint that is temporally closest to the image
   */
  function findNearestWaypoint(
    nearest: Waypoint,
    next: Waypoint,
    targetSol: number
  ) {
    const nextSol = next.properties.sol;
    const nearestSol = nearest.properties.sol;
    if (Math.abs(nextSol - targetSol) <= Math.abs(nearestSol - targetSol)) {
      return next;
    } else {
      return nearest;
    }
  }

  const likeChangeHandler = () => dispatch(toggleLike(id));

  return (
    <Box shadow="dark-lg" bgColor="gray.200" borderRadius="lg" p={5}>
      <Box width={isLargerThan768 ? 500 : ''} height="70vh">
        <Image
          draggable={false}
          src={img_src}
          alt={'NASA image'}
          fit="scale-down"
          borderRadius="lg"
          shadow="dark-lg"
        />
      </Box>
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
              color="gray.50"
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
