import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../container/DevTools/DevTools';
import rootReducer from '../reducers/reducer';
import {Map, List, fromJS} from 'immutable';

export function configureStore(initialState = {}) {
  initialState = Map(initialState);
  let enhancerClient;
  if (process.env.CLIENT) {
    enhancerClient = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    );
  }


  const enhancerServer = applyMiddleware(thunk);

  let store;

  if (process.env.CLIENT) {
    store = createStore(rootReducer, initialState, enhancerClient);
  } else {
    store = createStore(rootReducer, initialState, enhancerServer);
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducer', () => {
      const nextReducer = require('../reducers/reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
