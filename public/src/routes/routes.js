import React from 'react';
import { Router, Route } from 'react-router';
import * as postsActions from '../actions/postsActions';

// async load component
const async = bundle => (location, callback) =>
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
        // dispatch(postsActions.postsList()).then((data) =>
        dispatch(postsActions.postsList()).then(() =>
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
                <Route path="/" getComponent={async(require('bundle?name=counter&lazy!../containers/counter/counter'))} />
                <Route getComponent={async(require('bundle?name=layout&lazy!../components/layout/layout'))}>
                    <Route path="/selectItems" getComponent={async(require('bundle?name=selectItems&lazy!../containers/selectItems/selectItems'))} />
                    <Route path="/drag" getComponent={async(require('bundle?name=drag&lazy!../containers/drag/drag'))} />
                    <Route path="/dnd" getComponent={async(require('bundle?name=dnd&lazy!../containers/dnd/dnd'))} />
                    <Route path="/transMotion" getComponent={async(require('bundle?name=transMotion&lazy!../containers/transMotion/transMotion'))} />
                    <Route path="/sortable" getComponent={async(require('bundle?name=sortable&lazy!../containers/sortable/sortable'))} />
                    <Route path="/draggableBalls" getComponent={async(require('bundle?name=draggableBalls&lazy!../containers/draggableBalls/draggableBalls'))} />
                    <Route path="/posts" getComponent={async(require('bundle?name=posts&lazy!../containers/posts/posts'))} onEnter={postsListInit(store, dispatch)} />
                    <Route path="/donut" getComponent={async(require('bundle?name=donut&lazy!../containers/donut/donut'))} />
                    <Route path="/slider" getComponent={async(require('bundle?name=slider&lazy!../containers/slider/slider'))} />
                    <Route path="/areaChart" getComponent={async(require('bundle?name=areaChart&lazy!../containers/areaChart/areaChart'))} />
                    <Route path="/calendar" getComponent={async(require('bundle?name=calendar&lazy!../containers/calendar/calendar'))} />
                </Route>
            </Route>
        </Router>
    );
}
