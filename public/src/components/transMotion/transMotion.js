import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

class TransMotion extends Component
{
    constructor()
    {
        super();
        this.state = {
            items: [
                {key: 'a', size: 100},
                {key: 'b', size: 200},
                {key: 'c', size: 300}
            ]
        };
    }

    componentDidMount()
    {
        this.setState({
            items: [
                {key: 'a', size: 100},
                {key: 'b', size: 200},
                {key: 'c', size: 200},
                {key: 'd', size: 200}
            ]
        });
    }

    willLeave()
    {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return {width: spring(0), height: spring(0)};
    }

    willEnter()
    {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return {width: spring(0), height: spring(1)};
    }

    render()
    {
        return (
          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={this.state.items.map(item => ({
              key: item.key,
              style: {width: item.size, height: item.size},
            }))}>
            {interpolatedStyles =>
              // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
              <div>
                {interpolatedStyles.map(config => {
                    return <div key={config.key} style={{...config.style, border: '1px solid'}} />
                })}
              </div>
            }
          </TransitionMotion>
        );
    }
}

TransMotion.propTypes = {};

export default TransMotion;
