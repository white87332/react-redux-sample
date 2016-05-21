import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    'numbers': 0
});

export default function counter(state = initialState, action = {})
{
    switch (action.type)
    {
        case INCREMENT_COUNTER:
            return state.set('numbers', state.get('numbers') + 1 );

        case DECREMENT_COUNTER:
            return state.set('numbers', state.get('numbers') - 1 );

        default:
            return state;
    }
}
