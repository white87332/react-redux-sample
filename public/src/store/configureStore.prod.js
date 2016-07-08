import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(promiseMiddleware, thunk);

export default function configureStore(initialState)
{
    return createStore(rootReducer, initialState, enhancer);
}
