import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

// react-router-redux
const reduxRouterMiddleware = syncHistory(browserHistory);

export default function configureStore(initialState)
{
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(reduxRouterMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

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
