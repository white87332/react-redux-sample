import React, { Component } from 'react';
import d3 from 'd3';

class DonutEachG extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    getArc()
    {
        let { width, height, data, color, label } = this.props;
        let radius = Math.min(width, height) / 2;
        let bigArc = d3.svg.arc().outerRadius(radius - 33).innerRadius(radius - 11);
        let normalArc = d3.svg.arc().outerRadius(radius - 15).innerRadius(radius - 30);

        if (label == "big")
        {
            return bigArc(data);
        }
        else if (label == "normal")
        {
            return normalArc(data);
        }
    }

    render()
    {
        let { color } = this.props;
        return (
            <g>
                <path fill={color[this.props.iKey]} d={this.getArc.call(this)} />
            </g>
        );
    }
}

export default DonutEachG;
