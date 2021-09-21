import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/index'
import App from './App'
import './i18n'

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Suspense fallback={(<div>Loading</div>)}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
