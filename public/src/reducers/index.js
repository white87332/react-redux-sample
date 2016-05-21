import { combineReducers } from 'redux-immutable';
import counter from './counter';

const rootReducer = combineReducers(
{
    counter
});

export default rootReducer;
