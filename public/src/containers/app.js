import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import configureStore from '../store/configureStore';
import createRoutes from '../routes/routes';
import i18n from '../i18n/i18n';

if (process.env.NODE_ENV !== 'production')
{
    window.Perf = require('react-addons-perf');
}

// store
const store = configureStore();

// react-router-redux
const history = syncHistoryWithStore(browserHistory, store);

// routes
const routes = createRoutes(history, store, store.dispatch);

render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            {routes}
        </I18nextProvider>
    </Provider>,
	document.getElementById('root')
);
