import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';
import { syncHistoryWithStore } from 'react-router-redux';

// store
const store = configureStore();

// react-router-redux
const history = syncHistoryWithStore(browserHistory, store);

// lazy load component
const loadContainerAsync = bundle => (location, callback) =>
{
	bundle(component => {
		callback(null, component.default);
	});
};

const routes = (
	<Router history={history}>
		<Route getComponent={loadContainerAsync(require('bundle?lazy&name=layout!../components/layout/layout'))}>
			<Route  path= "/posts" getComponent={loadContainerAsync(require('bundle?lazy&name=posts!../components/posts/posts'))} />
			<Route  path= "/counter" getComponent={loadContainerAsync(require('bundle?lazy&name=counter!../components/counter/counter'))} />
		</Route>
    </Router>
);

render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById('root')
);
