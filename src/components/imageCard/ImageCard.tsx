import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsImage, BsPinMapFill, BsStar, BsStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RoverImage, Waypoint } from '../../common/types';
import { toggleLike } from '../../redux/likeSlice';
import { RootState } from '../../redux/store';
import MapView from '../mapView';
import { findNearestWaypoint } from './imageCard.utils';

const ImageCard: React.FC<RoverImage> = (image) => {
  const isLiked = useSelector((state: RootState) => state.likes[image.id]);
  const waypoints = useSelector((state: RootState) => state.waypoints);
  const dispatch = useDispatch();
  const [isLikePressed, setLikePressed] = useState(false);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [nearestWaypoint, setNearestWaypoint] = useState<Waypoint | null>(null);
  const [mapView, setMapView] = useState(false);

  useEffect(() => {
    if (!nearestWaypoint && waypoints.length) {
      const nearestWp = waypoints.reduce(
        (prev, current) => findNearestWaypoint(prev, current, image.sol),
        waypoints[0]
      );
      setNearestWaypoint(nearestWp);
    }
  }, [waypoints, image.sol, nearestWaypoint]);

  useEffect(() => {
    setLikePressed(true);
    const likePressedTimer = setTimeout(() => setLikePressed(false), 100);
    return () => clearTimeout(likePressedTimer);
  }, [isLiked]);

  const likeChangeHandler = () => dispatch(toggleLike(image.id));

  return (
    <Box
      shadow="dark-lg"
      bgColor="gray.200"
      borderRadius="lg"
      p={5}
      width="100%"
      style={{ scrollSnapStop: 'always', scrollSnapAlign: 'center' }}
    >
      <Box
        width={isLargerThan768 ? 500 : ''}
        // height={isLargerThan768 ? '' : 'vh'}
      >
        {!mapView && (
          <Image
            draggable={false}
            src={image.img_src}
            alt={'NASA image'}
            fit="scale-down"
            borderRadius="lg"
            shadow="dark-lg"
          />
        )}
        {mapView && nearestWaypoint && (
          <MapView image={image} waypoint={nearestWaypoint} />
        )}
      </Box>
      <Stack
        direction={isLargerThan768 ? 'row' : 'column-reverse'}
        align="center"
        mt={2}
      >
        <Box>
          <Text fontSize={22} color="white">
            {image.camera.full_name}
          </Text>
          <Text fontSize={16} color="white">
            {image.earth_date}
          </Text>
        </Box>
        <Box>
          <Button
            size="lg"
            width="3em"
            variant="unstyled"
            onClick={() => setMapView(!mapView)}
            aria-label={`map-${image.id}`}
          >
            {!mapView && (
              <Icon
                as={BsPinMapFill}
                mt="0.3em"
                boxSize={'2em'}
                color="gray.50"
                role="img"
                aria-label="map icon"
              />
            )}
            {mapView && (
              <Icon
                as={BsImage}
                mt="0.3em"
                boxSize={'2em'}
                color="gray.50"
                role="img"
                aria-label="image icon"
              />
            )}
          </Button>
          <Button
            size="lg"
            width="3em"
            variant="unstyled"
            onClick={likeChangeHandler}
            aria-label={`like-${image.id}`}
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
        </Box>
      </Stack>
    </Box>
  );
};

export default ImageCard;
