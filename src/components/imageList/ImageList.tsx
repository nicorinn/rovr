import { Box, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { getLatestImages } from '../../api/roverPhotos.api';
import { useViewportScroll } from 'framer-motion';
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
  const { scrollY } = useViewportScroll();
  const [imageSpace, setImageSpace] = useState(0);
  const selectedIndex = useSelector(
    (state: RootState) => state.images.selectedIndex
  );
  const listRef = useRef<HTMLDivElement | null>(null);

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
    document.addEventListener('keyup', keyPressHandler);
    return () => document.removeEventListener('keyup', keyPressHandler);
  }, [keyPressHandler]);

  useEffect(() => {
    if (!waypoints.length) {
      (async () => {
        const waypoints = await getWaypoints();
        dispatch(setWaypoints(waypoints));
      })();
    }
  }, [dispatch, waypoints.length]);

  useEffect(() => {
    (async () => {
      const api_images = await getLatestImages();
      dispatch(setImages(api_images));
    })();
  }, [dispatch]);

  // The yProgess value ranges from 0 to 1
  // Each image is approximately 1/nth of the page
  useEffect(() => {
    if (listRef.current) {
      setImageSpace(listRef.current.scrollHeight / images.length);
    }
  }, [images.length]);

  useEffect(
    () =>
      scrollY.onChange((y) => {
        if (imageSpace) {
          const centeredImgIndex = Math.round(y / imageSpace);
          if (selectedIndex !== centeredImgIndex) {
            dispatch(setSelectedIndex(centeredImgIndex));
          }
        }
      }),
    [scrollY, selectedIndex, imageSpace, dispatch]
  );

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
