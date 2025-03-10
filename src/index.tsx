import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <StrictMode>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Router>
          <App />
        </Router>
      </MantineProvider>
    </StrictMode>
  </Provider>
);
