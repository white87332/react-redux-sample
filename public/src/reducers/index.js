import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import posts from './posts';

const rootReducer = combineReducers({
    counter,
    posts,
    routing
});

export default rootReducer;
