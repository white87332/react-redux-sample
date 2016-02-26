import objectAssign from 'object-assign';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

const initialItems = {
    'numbers': 0
};

export default function counter(state = initialItems, action = {})
{
    switch (action.type)
    {
        case INCREMENT_COUNTER:
            return objectAssign({}, state, {
                'numbers': state.numbers + 1
            });
        case DECREMENT_COUNTER:
            return objectAssign({}, state, {
                'numbers': state.numbers - 1
            });
        default:
            return state;
    }
}
