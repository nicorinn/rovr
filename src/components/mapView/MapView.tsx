import { Box } from '@chakra-ui/react';
import { RoverImage, Waypoint } from '../../common/types';

interface MapViewProps {
  image: RoverImage;
  waypoint: Waypoint;
  mapDimensions: { w: number; h: number };
}

const MapView: React.FC<MapViewProps> = ({
  image,
  waypoint,
  mapDimensions,
}) => {
  const coords = waypoint.geometry.coordinates;

  const baseUrl = 'https://mars.nasa.gov/maps/location/?mission=MSL';
  const coordsUrl = `&site=NOW&mapLon=${coords[0]}&mapLat=${coords[1]}`;
  const selectedWp = `&selected=Waypoints,${coords[1]},${coords[0]}`;

  return (
    <Box height="100%" width="100%" minHeight={350} minWidth={350}>
      <iframe
        height={mapDimensions.h}
        width={mapDimensions.w}
        // title={`map-${image.id.toString()}`}
        title="iframe"
        src={baseUrl + coordsUrl + selectedWp}
      ></iframe>
    </Box>
  );
};

export default MapView;
