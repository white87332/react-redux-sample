import './dnd.scss';
import React, { Component } from 'react';
import Board from './board';
import { observe } from './game';

class Index extends Component
{
    constructor(props)
    {
        super(props);
        this.unobserve = observe(this.handleChange.bind(this));
    }

    handleChange(knightPosition)
    {
        const nextState = { knightPosition };
        if (this.state)
        {
            this.setState(nextState);
        }
        else
        {
            this.state = nextState;
        }
    }

    componentWillUnmount()
    {
        this.unobserve();
    }

    render()
    {
        const { knightPosition } = this.state;
        return (
            <div>
                <div style={{
                      width: 500,
                      height: 500,
                      border: '1px solid gray'}}>

                    <Board knightPosition={knightPosition} />
                </div>
            </div>
        );
    }
}

export default Index;
