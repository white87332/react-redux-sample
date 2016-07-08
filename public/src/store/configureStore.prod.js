import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise';

const enhancer = applyMiddleware(promiseMiddleware);

export default function configureStore(initialState)
{
    return createStore(rootReducer, initialState, enhancer);
}
