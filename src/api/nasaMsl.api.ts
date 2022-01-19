import axios from 'axios';
import { Waypoint } from '../common/types';

const instance = axios.create({
  baseURL: 'https://mars.nasa.gov/mmgis-maps/MSL/',
});

type WaypointResponse = { features: Waypoint[] };

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
