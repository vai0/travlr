import 'styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';

import App from './components/app';
import reducers from './reducers';

const logger = createLogger({ collapsed: true });
const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(ReduxThunk, logger),
    autoRehydrate()
  )
)

persistStore(store, {
  whitelist: ['bookmarks']
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
