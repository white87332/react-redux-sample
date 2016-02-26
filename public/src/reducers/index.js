import { combineReducers } from 'redux';
import counter from './counter';
import posts from './posts';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers(
{
    counter,
    posts,
    routing
});

export default rootReducer;
