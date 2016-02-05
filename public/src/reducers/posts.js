import Immutable from 'immutable';
import { UPDATE_LOCATION } from 'react-router-redux';
import * as types from '../constants/actionTypes';

const initialItems = Immutable.fromJS(
{
    'list': []
});

// const initialItems = {
//     'list':[]
// };

export default function posts(state = initialItems, action = {})
{
    switch (action.type)
    {
        case types.GET_LATEST_LIST:
            // state = Object.assign({}, state, {
            //     'list':action.data
            // });
            return state.set('list', action.data);
        default:
            return state;
    }
}
