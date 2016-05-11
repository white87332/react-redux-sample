import React, { Component } from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class Donut extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            data: [
                {apples:53245, oranges:200},
                {apples:28479, oranges:200},
                {apples:19697,oranges:200},
                {apples:24037,oranges:200},
                {apples:40245,oranges:200}
            ]
        };
    }

    donut()
    {
        let faux = ReactFauxDOM.createElement('div');

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();

        this.pie = d3.layout.pie()
            .value(function(d)
            {
                return d.apples;
            })
            .sort(null);

        this.arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);

        var svg = d3.select(faux)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        this.path = svg.selectAll("path")
                        .data(this.pie(this.state.data))
                        .enter()
                        .append("path")
                        .attr("fill", (d, i) =>
                        {
                            return color(i);
                        })
                        .attr("d", this.arc)
                        .each((d) =>
                        {
                            this._current = d;
                        }); // store the initial angles

        return faux.toReact();
    }

    change()
    {
        var value = this.value;
        clearTimeout(timeout);
        this.pie.value((d) =>
        {
            return d[value];
        }); // change the value function
        this.path = path.data(pie); // compute the new angles
        this.path.transition().duration(750).attrTween("d", this.arcTween.bind(this)); // redraw the arcs
    }

    type(d)
    {
        d.apples = + d.apples;
        d.oranges = + d.oranges;
        return d;
    }

    arcTween(a)
    {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return (t) =>
        {
            return this.arc(i(t));
        };
    }

    render()
    {
        return (
            <div className="donut">
                {this.donut.call(this)}
            </div>
        );
    }
}

export default Donut;
