import { Box } from '@chakra-ui/react';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
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
  const coords = [...waypoint.geometry.coordinates].reverse() as LatLngTuple;
  const attribution =
    '<a href="https://github.com/NASA-AMMOS/MMGIS/">NASA MMGIS</a>';

  return (
    <Box width={mapDimensions.w} height={mapDimensions.h}>
      <MapContainer
        center={coords}
        zoom={13}
        style={{ height: mapDimensions.h }}
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

        <Marker position={coords}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapView;
