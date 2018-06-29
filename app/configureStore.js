import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


export default function configureStore () {
    return createStore(appReducer, applyMiddleware(thunk, logger))
}
