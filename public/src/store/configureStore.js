import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { hashHistory } from 'react-router';

// react-router-redux
const reduxRouterMiddleware = syncHistory(hashHistory);

// createStore and add thunk and reduxRouterMiddleware to applyMiddleware
const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouterMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export default function configureStore(initialState)
{
    const store = finalCreateStore(reducer, initialState);

    if (module.hot)
    {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () =>
        {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
