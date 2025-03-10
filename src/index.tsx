import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { MantineProvider } from '@mantine/core';

import App from './App';
import store from './store';
import { theme } from './theme';
import './i18n';

import '@mantine/core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper.min.css';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW();
}

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Router>
          <App />
        </Router>
      </MantineProvider>
    </StrictMode>
  </Provider>,
  document.getElementById('root'),
);
