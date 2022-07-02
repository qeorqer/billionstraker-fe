import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import Loader from 'components/Loader';
import App from 'App';
import store from 'store';
import 'i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper.scss';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Suspense fallback={() => <Loader fullHeight={true} />}>
          <App />
        </Suspense>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
