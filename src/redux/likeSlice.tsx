import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

interface LikeState {
  [imageId: number]: boolean;
}

const likeSlice = createSlice<LikeState, SliceCaseReducers<LikeState>>({
  name: 'likes',
  initialState: {},
  reducers: {
    setLikes: (state, action: PayloadAction<LikeState>) => {
      return action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      return { ...state, [action.payload]: !state[action.payload] };
    },
  },
});

export const { setLikes, toggleLike } = likeSlice.actions;

export default likeSlice.reducer;
