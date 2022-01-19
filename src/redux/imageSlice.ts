import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RoverImage } from '../common/types';

const imageSlice = createSlice<RoverImage[], SliceCaseReducers<RoverImage[]>>({
  name: 'images',
  initialState: [],
  reducers: {
    setImages: (state, action: PayloadAction<RoverImage[]>) => {
      return action.payload;
    },
  },
});

export const { setImages } = imageSlice.actions;

export default imageSlice.reducer;
