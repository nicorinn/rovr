import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RoverImage } from '../common/types';

interface ImageState {
  imageList: RoverImage[];
  selectedIndex: number;
}

const imageSlice = createSlice<ImageState, SliceCaseReducers<ImageState>>({
  name: 'images',
  initialState: { imageList: [], selectedIndex: 0 },
  reducers: {
    setImages: (state, action: PayloadAction<RoverImage[]>) => {
      return { ...state, imageList: action.payload };
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      return { ...state, selectedIndex: action.payload };
    },
  },
});

export const { setImages, setSelectedIndex } = imageSlice.actions;

export default imageSlice.reducer;
