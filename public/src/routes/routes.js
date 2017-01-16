import React from 'react';
import { Router, Route } from 'react-router';

import * as postsActions from '../actions/postsActions';

// async load component
const loadConmponentAsync = bundle => (location, callback) =>
{
	bundle(component => {
		callback(null, component.default);
	});
};

const postsListInit = (store, dispatch) =>
{
	return (nextState, replace, next) =>
	{
	    dispatch(postsActions.postsList()).then((data) =>
		{
	        next();
	    });
	};
};

export default function createRoutes(history, store, dispatch)
{
    return (
        <Router history={history}>
			<Route component={require('../components/main/main').default}>
				<Route path= "/" getComponent={loadConmponentAsync(require('bundle?lazy!../components/counter/counter'))} />
	    		<Route getComponent={loadConmponentAsync(require('bundle?lazy!../components/layout/layout'))}>
	    			<Route path= "/selectItems" getComponent={loadConmponentAsync(require('bundle?lazy!../components/selectItems/selectItems'))} />
	    			<Route path= "/drag" getComponent={loadConmponentAsync(require('bundle?lazy!../components/drag/drag'))} />
	    			<Route path= "/dnd" getComponent={loadConmponentAsync(require('bundle?lazy!../components/dnd/dnd'))} />
	    			<Route path= "/transMotion" getComponent={loadConmponentAsync(require('bundle?lazy!../components/transMotion/transMotion'))} />
	    			<Route path= "/sortable" getComponent={loadConmponentAsync(require('bundle?lazy!../components/sortable/sortable'))} />
	    			<Route path= "/carousel" getComponent={loadConmponentAsync(require('bundle?lazy!../components/carousel/carousel'))} />
	    			<Route path= "/draggableBalls" getComponent={loadConmponentAsync(require('bundle?lazy!../components/draggableBalls/draggableBalls'))} />
	    			<Route path= "/posts" getComponent={loadConmponentAsync(require('bundle?lazy!../components/posts/posts'))} onEnter={postsListInit(store, dispatch)}/>
	    			<Route path= "/counter" getComponent={loadConmponentAsync(require('bundle?lazy!../components/counter/counter'))} />
	    			<Route path= "/donut" getComponent={loadConmponentAsync(require('bundle?lazy!../components/donut/donut'))} />
					<Route path= "/slider" getComponent={loadConmponentAsync(require('bundle?lazy!../components/slider/slider'))} />
					<Route path= "/areaChart" getComponent={loadConmponentAsync(require('bundle?lazy!../components/areaChart/areaChart'))} />
					<Route path= "/calendar" getComponent={loadConmponentAsync(require('bundle?lazy!../components/calendar/calendar'))} />
	    		</Route>
			</Route>
        </Router>
    );
}
