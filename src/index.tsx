import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from 'store/index';
import App from 'App';
import 'i18n';
import Loader from 'components/Loader';

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
