import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Waypoint } from '../common/types';

const waypointSlice = createSlice<Waypoint[], SliceCaseReducers<Waypoint[]>>({
  name: 'waypoints',
  initialState: [],
  reducers: {
    setWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
      return action.payload;
    },
  },
});

export const { setWaypoints } = waypointSlice.actions;

export default waypointSlice.reducer;
