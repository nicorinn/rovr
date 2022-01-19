import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState } from './redux/store';
import likeSlice from './redux/likeSlice';
import waypointSlice from './redux/waypointSlice';
import imageSlice from './redux/imageSlice';

const initialState: RootState = {
  likes: {},
  waypoints: [],
  images: { imageList: [], selectedIndex: 0 },
};

function render(
  ui: ReactElement,
  {
    preloadedState = initialState,
    store = configureStore({
      reducer: {
        likes: likeSlice,
        waypoints: waypointSlice,
        images: imageSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
