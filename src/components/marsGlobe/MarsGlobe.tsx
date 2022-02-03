import * as Cesium from 'cesium';
import { Entity, Viewer, PointGraphics } from 'resium';

Cesium.Ion.defaultAccessToken = '';

const position = Cesium.Cartesian3.fromDegrees(-137, -4.9, 100);

const mars = new Cesium.Ellipsoid(3390000, 3390000, 3390000);

const globe = new Cesium.Globe(mars);
globe.baseColor = new Cesium.Color(173, 98, 66);
globe.enableLighting = true;

const wmtsMars = new Cesium.WebMapTileServiceImageryProvider({
  url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
  style: 'default',
  layer: 'Mars_Viking_MDIM21_ClrMosaic_global_232m',
  tileMatrixSetID: 'default028mm',
  tilingScheme: new Cesium.GeographicTilingScheme({ ellipsoid: mars }),
});

const MarsGlobe = () => {
  return (
    <Viewer
      full
      imageryProvider={wmtsMars}
      timeline={false}
      animation={false}
      fullscreenButton={false}
      globe={globe}
    >
      <Entity position={position}>
        <PointGraphics pixelSize={10} />
      </Entity>
    </Viewer>
  );
};

export default MarsGlobe;
