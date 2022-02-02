import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BsImage, BsPinMapFill, BsStar, BsStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RoverImage } from '../../common/types';
import { toggleLike } from '../../redux/likeSlice';
import { RootState } from '../../redux/store';
import MapView from '../mapView';

const ImageCard: React.FC<RoverImage> = (image) => {
  const isLiked = useSelector((state: RootState) => state.likes[image.id]);
  const dispatch = useDispatch();
  const [isLikePressed, setLikePressed] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [mapDimensions, setMapDimensions] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null) as MutableRefObject<HTMLImageElement | null>;

  useEffect(() => {
    setLikePressed(true);
    const likePressedTimer = setTimeout(() => setLikePressed(false), 100);
    return () => clearTimeout(likePressedTimer);
  }, [isLiked]);

  useEffect(() => {
    const img = imageRef.current;
    if (loaded && img && img.width && img.height) {
      setMapDimensions({
        w: img.width,
        h: img.height,
      });
    }
  }, [imageRef, loaded]);

  const likeChangeHandler = () => dispatch(toggleLike(image.id));

  return (
    <Box
      shadow="dark-lg"
      bgColor="gray.200"
      borderRadius="lg"
      p={5}
      m={0}
      width="100%"
      style={{
        scrollSnapStop: 'always',
        scrollSnapAlign: 'center',
        display: loaded ? '' : 'hidden',
      }}
    >
      <Box width={{ sm: 500, base: '100%' }}>
        {!mapView && (
          <Image
            ref={imageRef as LegacyRef<HTMLImageElement>}
            draggable={false}
            src={image.img_src}
            alt={'NASA image'}
            fit="scale-down"
            borderRadius="lg"
            shadow="dark-lg"
            onLoad={() => setLoaded(true)}
          />
        )}
        {mapView && <MapView image={image} mapDimensions={mapDimensions} />}
      </Box>
      <Flex
        direction={{ md: 'row', base: 'column-reverse' }}
        justifyContent={{ md: 'space-between' }}
        align="center"
        mt={5}
      >
        <Box>
          <Text fontSize={18} color="white">
            {image.camera.full_name}
          </Text>
          <Text fontSize={14} color="white">
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
      </Flex>
    </Box>
  );
};

export default ImageCard;
