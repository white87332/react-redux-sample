import React, { Component } from 'react';
import d3 from 'd3';
import DonutEachPath from './donutEachPath';

class DonutEachDataSeries extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        let { data, color, width, height } = this.props;
        let pie = d3.layout.pie().sort(null).value((data) =>
        {
            return data.percent;
        });

        let pies = (pie(data)).map((pieData, i) =>
        {
            return (
                <DonutEachPath data={pieData} label={data[i].label} iKey={i} key={i} color={color} width={width} height={height} />
            );
        });

        let position = "translate(" + width/2 + "," + height/2 + ")";
        return (
            <g transform={position}>
                {pies}
            </g>
        );
    }
}

export default DonutEachDataSeries;
