import React from 'react';
import * as d3 from 'd3';
// import AreaChartSvgGPath from './areaChartSvgGPath';

class AreaChartSvgG extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    // area()
    // {
    //     let { height } = this.props.style;
    //     let area = d3.area()
    //                 .x(function(d) { return x(d.date); })
    //                 .y0(height)
    //                 .y1(function(d) { return y(d.close); });
    // }

    render()
    {
        let { margin, width, height } = this.props.style;
        // let xScale = d3.scaleTime().range([0, width]);
        // let yScale = d3.scaleLinear().range([height, 0]);

        return (
            <g style={{transform: `translate(${margin.left}, ${margin.bottom})`}}>

            </g>
        );
    }
}

export default AreaChartSvgG;
