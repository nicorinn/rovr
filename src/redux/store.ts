import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import imageSlice from './imageSlice';
import likeSlice from './likeSlice';
import { saveLikes } from './utils/localStorage';
import waypointSlice from './waypointSlice';

export const store = configureStore({
  reducer: {
    likes: likeSlice,
    waypoints: waypointSlice,
    images: imageSlice,
  },
});

// Save liked images to localStorage
// Throttle to prevent excessively frequent calling of JSON.stringify()
store.subscribe(throttle(() => saveLikes(store.getState()), 1000));

export type RootState = ReturnType<typeof store.getState>;
