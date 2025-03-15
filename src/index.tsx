import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { MantineProvider } from '@mantine/core';
import dayjs from 'dayjs';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import App from './App';
import store from './store';
import { theme } from './theme';
import './i18n';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

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
