import axios from 'axios';
import { LatLngTuple } from 'leaflet';
import { Waypoint } from '../common/types';

const instance = axios.create({
  baseURL: 'https://mars.nasa.gov/mmgis-maps/MSL/',
});

type WaypointResponse = { features: Waypoint[] };

type PathResponse = {
  features: [{ geometry: { coordinates: LatLngTuple[][] } }];
};

export async function getWaypoints() {
  const res = await instance.get<WaypointResponse>(
    '/Layers/json/MSL_waypoints.json'
  );
  if (res.status === 200) {
    return res.data.features;
  } else {
    console.error(res.statusText);
    return [];
  }
}

export async function getRoverPath() {
  const res = await instance.get<PathResponse>(
    '/Layers/json/MSL_traverse.json'
  );
  if (res.status === 200) {
    return res.data.features.map((feat) => feat.geometry.coordinates);
  } else {
    console.error(res.statusText);
    return [];
  }
}
