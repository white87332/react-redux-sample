import React from 'react';
import { Router, Route } from 'react-router';

// async load component
const loadConmponentAsync = bundle => (location, callback) =>
{
	bundle(component => {
		callback(null, component.default);
	});
};

export default function createRoutes(history)
{
    return (
        <Router history={history}>
    		<Route getComponent={loadConmponentAsync(require('bundle?lazy&name=layout!../components/layout/layout'))}>
    			<Route path= "/selectItems" getComponent={loadConmponentAsync(require('bundle?lazy&name=selectItems!../components/selectItems/selectItems'))} />
    			<Route path= "/drag" getComponent={loadConmponentAsync(require('bundle?lazy&name=drag!../components/drag/drag'))} />
    			<Route path= "/dnd" getComponent={loadConmponentAsync(require('bundle?lazy&name=board!../components/dnd/dnd'))} />
    			<Route path= "/transMotion" getComponent={loadConmponentAsync(require('bundle?lazy&name=transMotion!../components/transMotion/transMotion'))} />
    			<Route path= "/sortable" getComponent={loadConmponentAsync(require('bundle?lazy&name=sortable!../components/sortable/sortable'))} />
    			<Route path= "/carousel" getComponent={loadConmponentAsync(require('bundle?lazy&name=carousel!../components/carousel/carousel'))} />
    			<Route path= "/draggableBalls" getComponent={loadConmponentAsync(require('bundle?lazy&name=draggableBalls!../components/draggableBalls/draggableBalls'))} />
    			<Route path= "/posts" getComponent={loadConmponentAsync(require('bundle?lazy&name=posts!../components/posts/posts'))} />
    			<Route path= "/counter" getComponent={loadConmponentAsync(require('bundle?lazy&name=counter!../components/counter/counter'))} />
    			<Route path= "/donut" getComponent={loadConmponentAsync(require('bundle?lazy&name=donut!../components/donut/donut'))} />
    		</Route>
        </Router>
    );
}
