import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import 'dayjs/locale/ru';

import App from './App';
import store from './store';
import { theme } from './theme';
import './i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW();
}

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MantineProvider theme={theme} forceColorScheme="dark">
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </Provider>,
);
