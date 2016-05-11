import React, { Component } from 'react';
import d3 from 'd3';
import DonutEachSvg from './donutTotalSvg';
import DonutEachDataSeries from './donutTotalDataSeries';

class DonutEach extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            width: 480,
            height: 250,
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
                "percent": 75
            }],
            color: ["#ffa22f", "#fecd03","#e5e5e5"]
        };
    }

    render()
    {
        let { width, height, data, color } = this.state;
        return (
            <div className="donutEach">
                <DonutEachSvg width={width} height={height}>
                    <DonutEachDataSeries data={data} color={color} width={width} height={height} />
                </DonutEachSvg>
            </div>
        );
    }
}

export default DonutEach;
