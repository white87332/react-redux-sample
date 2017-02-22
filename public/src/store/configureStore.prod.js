import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer = applyMiddleware(promiseMiddleware, thunk);

export default function configureStore(initialState)
{
    return createStore(rootReducer, initialState, enhancer);
}
