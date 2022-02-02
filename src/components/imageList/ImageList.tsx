import { Box, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getLatestImages } from '../../api/roverPhotos.api';
import ImageCard from '../imageCard';
import { getRoverPath, getWaypoints } from '../../api/nasaMsl.api';
import { useDispatch, useSelector } from 'react-redux';
import { setRoverPath, setWaypoints } from '../../redux/roverSlice';
import { RootState } from '../../redux/store';
import { setImages } from '../../redux/imageSlice';

const ImageList = () => {
  const dispatch = useDispatch();
  const waypoints = useSelector(
    (state: RootState) => state.roverData.waypoints
  );
  const images = useSelector((state: RootState) => state.images.imageList);

  // Fetch data
  useEffect(() => {
    if (!waypoints.length) {
      (async () => {
        const waypoints = await getWaypoints();
        const roverPath = await getRoverPath();
        dispatch(setWaypoints(waypoints));
        dispatch(setRoverPath(roverPath));
      })();
    }
  }, [dispatch, waypoints.length]);

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
    <Box
      style={{
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        height: '90vh',
      }}
    >
      <VStack spacing={10} mb={10}>
        {displayImages}
      </VStack>
    </Box>
  );
};

export default ImageList;
