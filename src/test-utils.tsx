import React, { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState } from './redux/store';
import likeSlice from './redux/likeSlice';
import roverSlice from './redux/roverSlice';
import imageSlice from './redux/imageSlice';
import { BrowserRouter } from 'react-router-dom';

const initialState: RootState = {
  likes: {},
  roverData: { waypoints: [], path: [] },
  images: { imageList: [] },
};

function render(
  ui: ReactElement,
  {
    preloadedState = initialState,
    store = configureStore({
      reducer: {
        likes: likeSlice,
        roverData: roverSlice,
        images: imageSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: any = {}
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
