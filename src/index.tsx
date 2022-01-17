import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './chakra/theme';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
