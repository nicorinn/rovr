import { useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getLatestImages } from '../../api/roverPhotos.api';
import { motion, useViewportScroll } from 'framer-motion';
import ImageCard from '../imageCard';
import { getWaypoints } from '../../api/nasaMsl.api';
import { useDispatch, useSelector } from 'react-redux';
import { setWaypoints } from '../../redux/waypointSlice';
import { RootState } from '../../redux/store';
import { setImages, setSelectedIndex } from '../../redux/imageSlice';
import useDebounce from '../../hooks/useDebounce';

const ImageList: React.FC = () => {
  const dispatch = useDispatch();
  const waypoints = useSelector((state: RootState) => state.waypoints);
  const images = useSelector((state: RootState) => state.images.imageList);
  const selectedIndex = useSelector(
    (state: RootState) => state.images.selectedIndex
  );
  const [imageSpace, setImageSpace] = useState(0);
  const [offset, setOffset] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useViewportScroll();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const debounceRepositionSelected = useDebounce(() => {
    window.scrollTo({
      top: imageSpace * selectedIndex,
    });
    setOffset(scrollY.get() - selectedIndex * imageSpace);
  });

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
          } else {
            debounceRepositionSelected();
          }
        }
      }),
    [scrollY, selectedIndex, imageSpace, debounceRepositionSelected, dispatch]
  );

  const selectedStyle = {
    scale: 1,
    opacity: 1,
    transition: 'all 200ms ease-in-out',
    y: offset,
  };

  const unselectedStyle = {
    scale: isLargerThan768 ? 0.5 : 1,
    opacity: 0,
    transition: 'all 200ms ease-in-out',
  };

  const displayImages = images.map((img, index) => (
    <motion.div
      key={img.id}
      data-testid="imageCardWrapper"
      style={selectedIndex === index ? selectedStyle : unselectedStyle}
    >
      <ImageCard {...img} />
    </motion.div>
  ));

  return (
    <VStack spacing={0} mb={10} ref={listRef}>
      {displayImages}
    </VStack>
  );
};

export default ImageList;
