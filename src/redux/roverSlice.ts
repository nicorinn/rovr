import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { LatLngTuple } from 'leaflet';
import { Waypoint } from '../common/types';

interface WaypointState {
  waypoints: Waypoint[];
  path: LatLngTuple[][];
}

const roverSlice = createSlice<WaypointState, SliceCaseReducers<WaypointState>>(
  {
    name: 'waypoints',
    initialState: { waypoints: [], path: [] },
    reducers: {
      setWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
        return { ...state, waypoints: action.payload };
      },
      setRoverPath: (state, action: PayloadAction<LatLngTuple[][]>) => {
        return { ...state, path: action.payload };
      },
    },
  }
);

export const { setWaypoints, setRoverPath } = roverSlice.actions;

export default roverSlice.reducer;
