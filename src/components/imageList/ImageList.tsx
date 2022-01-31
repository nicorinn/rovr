import { Box, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useCallback } from 'react';
import { getLatestImages } from '../../api/roverPhotos.api';
import ImageCard from '../imageCard';
import { getWaypoints } from '../../api/nasaMsl.api';
import { useDispatch, useSelector } from 'react-redux';
import { setWaypoints } from '../../redux/waypointSlice';
import { RootState } from '../../redux/store';
import { setImages, setSelectedIndex } from '../../redux/imageSlice';

const ImageList: React.FC = () => {
  const dispatch = useDispatch();
  const waypoints = useSelector((state: RootState) => state.waypoints);
  const images = useSelector((state: RootState) => state.images.imageList);
  const selectedIndex = useSelector(
    (state: RootState) => state.images.selectedIndex
  );
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const keyPressHandler = useCallback(
    (e: KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.key === 'ArrowDown') {
        dispatch(
          setSelectedIndex(
            selectedIndex === images.length ? selectedIndex : selectedIndex + 1
          )
        );
      } else if (e.key === 'ArrowUp') {
        dispatch(
          setSelectedIndex(
            selectedIndex === 0 ? selectedIndex : selectedIndex - 1
          )
        );
      }
    },
    [dispatch, images.length, selectedIndex]
  );

  useEffect(() => {
    if (!waypoints.length) {
      (async () => {
        const waypoints = await getWaypoints();
        dispatch(setWaypoints(waypoints));
      })();
    }
  }, [dispatch, waypoints.length]);

  useEffect(() => {
    document.addEventListener('keyup', keyPressHandler);
    return () => document.removeEventListener('keyup', keyPressHandler);
  }, [keyPressHandler]);

  useEffect(() => {
    (async () => {
      const api_images = await getLatestImages();
      dispatch(setImages(api_images));
    })();
  }, [dispatch]);

  const displayImages = images.map((img, index) => (
    <Box key={img.id} data-testid="imageCardWrapper">
      <ImageCard {...img} />
    </Box>
  ));

  return (
    <VStack spacing={10} mb={10} ref={listRef}>
      {displayImages}
    </VStack>
  );
};

export default ImageList;
