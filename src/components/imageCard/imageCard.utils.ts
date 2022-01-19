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
