import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

class TransMotion extends Component
{
    constructor()
    {
        super();
        this.state = {
            items: [
                { key: 'a', width: 100, height: 100, opacity: 1 },
                { key: 'b', width: 100, height: 100, opacity: 1 },
                { key: 'c', width: 100, height: 100, opacity: 1 }
            ]
        };
    }

    willLeave()
    {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return { width: spring(100), height: spring(100), opacity: spring(0) };
    }

    willEnter()
    {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        return { width: 100, height: 100, opacity: 0 };
    }

    del()
    {
        this.setState({
            items: [
                { key: 'a', width: 100, height: 100, opacity: 1 },
                { key: 'b', width: 100, height: 100, opacity: 1 }
            ]
        });
    }

    add()
    {
        this.setState({
            items: [
                { key: 'a', width: 100, height: 100, opacity: 1 },
                { key: 'b', width: 100, height: 100, opacity: 1 },
                { key: 'c', width: 100, height: 100, opacity: 1 },
                { key: 'd', width: 100, height: 100, opacity: 1 }
            ]
        });
    }

    // update css => willEnter -> add,
    render()
    {
        return (
            <div>
                <TransitionMotion
                    willEnter={this.willEnter.bind(this)}
                    willLeave={this.willLeave.bind(this)}
                    styles={this.state.items.map(item => ({
                        key: item.key,
                        style: { width: item.width, height: item.height, opacity: spring(item.opacity) },
                    }))}
                >
                    {styles =>
                        <div>
                            {styles.map((config) =>
                            {
                                return <div key={config.key} style={{ ...config.style, border: '1px solid' }} />;
                            })}
                        </div>
                    }
                </TransitionMotion>
                <button onClick={this.add.bind(this)}>add</button>
                <button onClick={this.del.bind(this)}>del</button>
            </div>
        );
    }
}

TransMotion.propTypes = {};

export default TransMotion;
