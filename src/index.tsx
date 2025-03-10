import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import App from './App';
import store from './store';
import './i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper.min.css';

// Register service worker
if ('serviceWorker' in navigator) {
  registerSW();
}

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  </Provider>,
  document.getElementById('root'),
);
