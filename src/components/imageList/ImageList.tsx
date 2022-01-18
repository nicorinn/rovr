import { VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { getLatestImages } from '../../api/marsRover.api';
import { RoverImage } from '../../common/types';
import { motion, useViewportScroll } from 'framer-motion';
import ImageCard from '../imageCard';

const ImageList: React.FC = () => {
  const [images, setImages] = useState<RoverImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [imageSpace, setImageSpace] = useState(0);
  const [offset, setOffset] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useViewportScroll();

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
        if (imageSpace && y !== 0) {
          const centeredImgIndex = Math.round(y / imageSpace);
          if (selectedIndex !== centeredImgIndex) {
            setSelectedIndex(centeredImgIndex);
          } else {
            setOffset(y - selectedIndex * imageSpace);
          }
        }
      }),
    [scrollY, images.length, selectedIndex, imageSpace]
  );

  useEffect(() => {
    console.log(selectedIndex);
    window.scrollTo({
      top: imageSpace * selectedIndex,
    });
  }, [selectedIndex, images.length, imageSpace]);

  const selectedStyle = {
    scale: 1,
    opacity: 1,
    transition: 'all 200ms ease-in-out',
    y: offset,
    zIndex: 999,
  };

  const unselectedStyle = {
    scale: 0.5,
    opacity: 0.5,
    transition: 'all 200ms ease-in-out',
  };

  const displayImages = images.map((img, index) => (
    <motion.div
      key={img.id}
      style={selectedIndex === index ? selectedStyle : unselectedStyle}
      transition={{ ease: 'easeOut', duration: 1 }}
    >
      <ImageCard {...img} />
    </motion.div>
  ));

  useEffect(() => {
    (async () => {
      const api_images = await getLatestImages();
      setImages(api_images);
    })();
  }, []);

  return (
    <VStack spacing={10} mb={10} ref={listRef}>
      {displayImages}
    </VStack>
  );
};

export default ImageList;
