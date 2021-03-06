import { icon, LatLngTuple } from 'leaflet';
import { Waypoint } from '../../common/types';

/**
 * Reducer - Finds the waypoint with the nearest sol to when the image was taken
 * @param nearest Accumulator value
 * @param next Next value
 * @param targetSol Target sol date
 * @returns Waypoint that is temporally closest to the image
 */
export function findNearestWaypoint(
  nearest: Waypoint,
  next: Waypoint,
  targetSol: number
) {
  const nextSol = next.properties.sol;
  const nearestSol = nearest.properties.sol;
  if (Math.abs(nextSol - targetSol) <= Math.abs(nearestSol - targetSol)) {
    return next;
  } else {
    return nearest;
  }
}

export function reverseLatLngTuple([n1, n2]: LatLngTuple) {
  return [n2, n1] as LatLngTuple;
}

export const MarkerIcon = icon({
  iconUrl: 'https://mars.nasa.gov/mmgis-maps/MSL/Layers/icon/MSL_icon.png',
  iconSize: [65, 64],
});
