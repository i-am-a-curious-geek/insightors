/*const TARGET = process.env.npm_lifecycle_event;*/

import {
  createStore,
  applyMiddleware,
  compose
}                               from 'redux';

import thunkMiddleware          from 'redux-thunk';
import { routerMiddleware }     from 'react-router-redux';

import { createLogger }         from 'redux-logger'; // for dev only
import { composeWithDevTools }  from 'redux-devtools-extension'; // for dev only

import createHistory            from 'history/createHashHistory';
import { default as reducer }   from './reducers';
import { localStorageManager }  from './localStorage';

export const history = createHistory();

var enhancer = null;
var configureStoreProd = null;
var configureStoreDev = null;

/*if(TARGET === "prod") { // for prod only  */
  enhancer = compose(
    applyMiddleware(
      localStorageManager,
      routerMiddleware(history),
      thunkMiddleware      
    )
  );

  configureStoreProd = (initialState) => {
    const store = createStore(reducer, initialState, enhancer);
    return store;
  }

/*} else { // for dev only 
  const loggerMiddleware = createLogger({ 
    level     : 'info',
    collapsed : true
  });

  enhancer = composeWithDevTools(
    applyMiddleware(
      localStorageManager,
      thunkMiddleware,            
      routerMiddleware(history),
      loggerMiddleware
    )
  );

  configureStoreDev = (initialState) => {
    const store = createStore(reducer, initialState, enhancer);
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers').default)
      );
    }
    return store;
  } 
}*/

export const configureStore = /*(TARGET === "prod") ? */configureStoreProd /*: configureStoreDev */

export default configureStore