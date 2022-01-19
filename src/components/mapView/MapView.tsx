import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RoverImage, Waypoint } from '../../common/types';
import { RootState } from '../../redux/store';

interface MapViewProps {
  image: RoverImage;
  waypoint: Waypoint;
}

const MapView: React.FC<MapViewProps> = ({ image, waypoint }) => {
  const isSelected = useSelector((state: RootState) => {
    const selectedImage = state.images.imageList[state.images.selectedIndex];
    return selectedImage.id === image.id;
  });

  const coords = waypoint.geometry.coordinates;

  const baseUrl = 'https://mars.nasa.gov/maps/location/?mission=MSL';
  const coordsUrl = `&site=NOW&mapLon=${coords[0]}&mapLat=${coords[1]}`;
  const selectedWp = `&selected=Waypoints,${coords[1]},${coords[0]}`;

  return (
    <Box height="100%" width="100%">
      {isSelected && (
        <iframe
          height="100%"
          width="100%"
          title={image.id.toString()}
          src={baseUrl + coordsUrl + selectedWp}
        ></iframe>
      )}
    </Box>
  );
};

export default MapView;
