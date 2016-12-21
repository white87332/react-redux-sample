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
			<Route path= "/" getComponent={loadConmponentAsync(require('bundle?lazy&name=counter!../components/counter/counter'))} />
    		<Route getComponent={loadConmponentAsync(require('bundle?lazy&name=layout!../components/layout/layout'))}>
    			<Route path= "/selectItems" getComponent={loadConmponentAsync(require('bundle?lazy&name=selectItems!../components/selectItems/selectItems'))} />
    			<Route path= "/drag" getComponent={loadConmponentAsync(require('bundle?lazy&name=drag!../components/drag/drag'))} />
    			<Route path= "/dnd" getComponent={loadConmponentAsync(require('bundle?lazy&name=board!../components/dnd/dnd'))} />
    			<Route path= "/transMotion" getComponent={loadConmponentAsync(require('bundle?lazy&name=transMotion!../components/transMotion/transMotion'))} />
    			<Route path= "/sortable" getComponent={loadConmponentAsync(require('bundle?lazy&name=sortable!../components/sortable/sortable'))} />
    			<Route path= "/carousel" getComponent={loadConmponentAsync(require('bundle?lazy&name=carousel!../components/carousel/carousel'))} />
    			<Route path= "/draggableBalls" getComponent={loadConmponentAsync(require('bundle?lazy&name=draggableBalls!../components/draggableBalls/draggableBalls'))} />
    			<Route path= "/posts" getComponent={loadConmponentAsync(require('bundle?lazy&name=posts!../components/posts/posts'))} onEnter={postsListInit(store, dispatch)}/>
    			<Route path= "/counter" getComponent={loadConmponentAsync(require('bundle?lazy&name=counter!../components/counter/counter'))} />
    			<Route path= "/donut" getComponent={loadConmponentAsync(require('bundle?lazy&name=donut!../components/donut/donut'))} />
				<Route path= "/slider" getComponent={loadConmponentAsync(require('bundle?lazy&name=donut!../components/slider/slider'))} />
				<Route path= "/areaChart" getComponent={loadConmponentAsync(require('bundle?lazy&name=areaChart!../components/areaChart/areaChart'))} />
    		</Route>
        </Router>
    );
}
