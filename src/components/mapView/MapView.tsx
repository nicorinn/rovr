import { Box, Flex, Spinner } from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RoverImage, Waypoint } from '../../common/types';
import { RootState } from '../../redux/store';
import {
  findNearestWaypoint,
  MarkerIcon,
  reverseLatLngTuple,
} from './mapView.utils';

interface MapViewProps {
  image: RoverImage;
  mapDimensions: { w: number; h: number };
}

const MapView: React.FC<MapViewProps> = ({ image, mapDimensions }) => {
  const [nearestWaypoint, setNearestWaypoint] = useState<Waypoint | null>(null);
  const [center, setCenter] = useState<LatLngTuple | null>(null);
  const waypoints = useSelector(
    (state: RootState) => state.roverData.waypoints
  );
  const roverPath = useSelector((state: RootState) => state.roverData.path);

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
    if (nearestWaypoint) {
      setCenter(reverseLatLngTuple(nearestWaypoint.geometry.coordinates));
    }
  }, [nearestWaypoint]);

  const attribution =
    '<a href="https://github.com/NASA-AMMOS/MMGIS/">NASA MMGIS</a>';

  return (
    <Box
      width={mapDimensions.w}
      height={mapDimensions.h}
      minWidth={250}
      minHeight={250}
      shadow="dark-lg"
    >
      {!center && (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Spinner size="xl" color="red.600" />
        </Flex>
      )}
      {center && (
        <MapContainer
          center={center}
          zoom={13}
          style={{
            height: mapDimensions.h,
            width: mapDimensions.w,
            minWidth: 250,
            minHeight: 250,
          }}
        >
          <TileLayer
            className="gale crater map"
            minZoom={6}
            maxNativeZoom={13}
            maxZoom={22}
            tms={true}
            attribution={attribution}
            url="https://mars.nasa.gov/mmgis-maps/MSL/Layers/MSL_CTX_ortho_mosaic_6m/{z}/{x}/{y}.png"
            bounds={[
              [-4.87560429259321, 137.32672354505786],
              [-4.55506331169111, 137.4785574965306],
            ]}
          />
          <TileLayer
            className="basemap"
            minZoom={10}
            maxNativeZoom={18}
            maxZoom={22}
            tms={true}
            attribution={attribution}
            url="https://mars.nasa.gov/mmgis-maps/MSL/Layers/MSL_Gale_HiRISE-LRGB_78quads/{z}/{x}/{y}.png"
            bounds={[
              [-6.33348668791018, 136.4996580968144],
              [-4.13060156470986, 138.19948720529013],
            ]}
          />
          {roverPath.map((leg, index) => (
            <Polyline
              key={index}
              positions={leg.map((l) => reverseLatLngTuple(l))}
              pathOptions={{ color: '#6C6F93' }}
            />
          ))}

          <Marker position={center} icon={MarkerIcon}>
            <Popup>
              Sol: {nearestWaypoint && nearestWaypoint.properties.sol}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </Box>
  );
};

export default MapView;
