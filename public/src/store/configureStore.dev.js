import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState)
{
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(promiseMiddleware, thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot)
    {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () =>
        {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
}
