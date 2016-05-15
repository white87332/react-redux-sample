import React, { Component } from 'react';
import d3 from 'd3';
import DonutSvg from './donutSvg';
import DonutEachDataSeries from './donutEachDataSeries';

class DonutEach extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            width: 210,
            height: 210,
            data: [{
                "label": "big",
                "percent": 25
            },
            {
                "label": "big",
                "percent": 10
            },
            {
                "label": "normal",
                "percent": 65
            }],
            color: ["#ffa22f",  "#f2e", "#e5e5e5"]
        };
    }

    ch()
    {
        this.setState({
            width: 210,
            height: 210,
            data: [{
                "label": "big",
                "percent": 25
            },
            {
                "label": "big",
                "percent": 30
            },
            {
                "label": "normal",
                "percent": 45
            }],
            color: ["#ffa22f",  "#f2e", "#e5e5e5"]
        });
    }

    render()
    {
        let { width, height, data, color } = this.state;
        return (
            <div className="donutEach" onClick={this.ch.bind(this)}>
                <DonutSvg width={width} height={height}>
                    <DonutEachDataSeries data={data} color={color} width={width} height={height} />
                </DonutSvg>
            </div>
        );
    }
}

export default DonutEach;
