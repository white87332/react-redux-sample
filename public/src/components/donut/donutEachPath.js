import React, { Component } from 'react';
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
    }

    componentWillReceiveProps(nextProps)
    {
        this.current = this.props.data;
        this.next = nextProps.data;
        this.path.transition().duration(500).attrTween("d", this.arcTween.bind(this));
    }

    arcTween()
    {
        var i = d3.interpolate(this.current, this.next);
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
        return (
            <path ref="path" />
        );
    }
}

export default DonutEachG;
