import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise';

export default function configureStore(initialState)
{
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(promiseMiddleware),
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
