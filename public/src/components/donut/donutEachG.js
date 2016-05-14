import React, { Component } from 'react';
import { clone } from 'lodash';
import d3 from 'd3';

class DonutEachG extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    componentDidMount()
    {
        this.path = d3.select(this.refs.path)
                    .attr("fill", (d, i) =>
                    {
                        return this.props.color[this.props.iKey];
                    })
                    .attr("d", this.getArc.bind(this));
        this.prevData = this.props.data;
    }

    componentWillUpdate()
    {
        this.path.transition().duration(500).attrTween("d", this.arcTween.bind(this));
    }

    componentDidUpdate()
    {
        this.prevData = this.props.data;
    }

    arcTween()
    {
        var i = d3.interpolate(this.props.data, this.prevData);
        let current = clone(this.props.data);
        console.log(i(0));
        current = i(0);
        return (t) =>
        {
            if(this.props.label === 'big')
            {
                return this.bigArc(i(t));
            }
            else
            {
                return this.normalArc(i(t));
            }
        };
    }

    getArc(d)
    {
        let { width, height, data, color, label } = this.props;
        let radius = Math.min(width, height) / 2;
        this.bigArc = d3.svg.arc().outerRadius(radius - 33).innerRadius(radius - 13);
        this.normalArc = d3.svg.arc().outerRadius(radius - 18).innerRadius(radius - 30);

        if (label == "big")
        {
            return this.bigArc(data);
        }
        else if (label == "normal")
        {
            return this.normalArc(data);
        }
    }

    render()
    {
        let { width, height, data, color, label } = this.props;
        return (
            <g>
                <path ref="path" />
            </g>
        );
    }
}

{/*<g>
    <path fill={color[this.props.iKey]} d={this.getArc.call(this)} />
</g>*/}

export default DonutEachG;
