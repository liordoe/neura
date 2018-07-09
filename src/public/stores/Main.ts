import { createStore, applyMiddleware, Store } from 'redux';
import MainReducer from '../reducers/Main';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import hookMiddleware from 'redux-hook-middleware';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const middleware = applyMiddleware(promiseMiddleware(), routerMiddleware(history), logger, thunk, hookMiddleware);

const Store:Store<any> = createStore(MainReducer, middleware);
export default Store;