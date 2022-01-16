import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllImages } from '../../api/marsRover.api';
import { RoverImage } from '../../common/types';
import ImageCard from '../imageCard';

function displayImages(images: RoverImage[]) {
  return images.map((img) => {
    return (
      <ImageCard
        key={img.id}
        src={img.img_src}
        alt={img.earth_date}
        caption={img.rover.name}
      />
    );
  });
}

const ImageList = () => {
  const [images, setImages] = useState<RoverImage[]>([]);

  useEffect(() => {
    (async () => {
      const api_images = await getAllImages();
      setImages(api_images);
    })();
  }, []);

  return <VStack>{displayImages(images)}</VStack>;
};

export default ImageList;
