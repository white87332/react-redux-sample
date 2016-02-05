// import { combineReducers } from 'redux';
import counter from './counter';
import posts from './posts';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers(
{
    counter,
    posts,
    routing: routeReducer
});

export default rootReducer;
