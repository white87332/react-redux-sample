import React from 'react';
import { Router, Route } from 'react-router';
import * as postsActions from '../actions/postsActions';

// async load component
const loadConmponentAsync = bundle => (location, callback) =>
{
    bundle((component) =>
	{
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
				<Route path= "/" getComponent={loadConmponentAsync(require('bundle?name=counter&lazy!../components/counter/counter'))} />
                <Route getComponent={loadConmponentAsync(require('bundle?name=layout&lazy!../components/layout/layout'))}>
	    			<Route path= "/selectItems" getComponent={loadConmponentAsync(require('bundle?name=selectItems&lazy!../components/selectItems/selectItems'))} />
	    			<Route path= "/drag" getComponent={loadConmponentAsync(require('bundle?name=drag&lazy!../components/drag/drag'))} />
	    			<Route path= "/dnd" getComponent={loadConmponentAsync(require('bundle?name=dnd&lazy!../components/dnd/dnd'))} />
	    			<Route path= "/transMotion" getComponent={loadConmponentAsync(require('bundle?name=transMotion&lazy!../components/transMotion/transMotion'))} />
	    			<Route path= "/sortable" getComponent={loadConmponentAsync(require('bundle?name=sortable&lazy!../components/sortable/sortable'))} />
	    			<Route path= "/draggableBalls" getComponent={loadConmponentAsync(require('bundle?name=draggableBalls&lazy!../components/draggableBalls/draggableBalls'))} />
	    			<Route path= "/posts" getComponent={loadConmponentAsync(require('bundle?name=posts&lazy!../components/posts/posts'))} onEnter={postsListInit(store, dispatch)} />
	    			<Route path= "/donut" getComponent={loadConmponentAsync(require('bundle?name=donut&lazy!../components/donut/donut'))} />
					<Route path= "/slider" getComponent={loadConmponentAsync(require('bundle?name=slider&lazy!../components/slider/slider'))} />
					<Route path= "/areaChart" getComponent={loadConmponentAsync(require('bundle?name=areaChart&lazy!../components/areaChart/areaChart'))} />
					<Route path= "/calendar" getComponent={loadConmponentAsync(require('bundle?name=calendar&lazy!../components/calendar/calendar'))} />
	    		</Route>
			</Route>
        </Router>
    );
}
