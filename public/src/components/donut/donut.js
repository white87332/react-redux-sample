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
                {apples:53245},
                {apples:28479},
                {apples:19697},
                {apples:24037},
                {apples:40245}
            ]
        };

        // this.drawFauxDOM = ReactFauxDOM.mixins.core.drawFauxDOM.bind(this);
        // this.componentWillMount =  ReactFauxDOM.mixins.core.componentWillMount.bind(this);
        // this.connectFauxDOM =  ReactFauxDOM.mixins.core.connectFauxDOM.bind(this);
        //
        // this.animateFauxDOM = ReactFauxDOM.mixins.anim.animateFauxDOM.bind(this);
        // this.isAnimatingFauxDOM = ReactFauxDOM.mixins.anim.isAnimatingFauxDOM.bind(this);
        // this.componentWillUnmount = ReactFauxDOM.mixins.anim.componentWillUnmount.bind(this);
        // this.stopAnimatingFauxDOM = ReactFauxDOM.mixins.anim.stopAnimatingFauxDOM.bind(this);
    }

    componentDidMount()
    {
        // let faux = this.connectFauxDOM('div', 'chart');
let data =
    [
        {apples:53245},
        {apples:28479},
        {apples:19697},
        {apples:24037},
        {apples:40245}
    ];

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();

        this.pie = d3.layout.pie()
            .value((d) =>
            {
                return d.apples;
            })
            .sort(null);

        this.arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);

        // var svg = d3.select(faux)
        var svg = d3.select(".donut")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        this.path = svg.datum(data).selectAll("path")
                        .data(this.pie)
                        .enter()
                        .append("path")
                        .attr("fill", (d, i) =>
                        {
                            return color(i);
                        })
                        .attr("d", this.arc)
                        .each((d) =>
                        {
                            // console.log(d);
                            this._current = d;
                        }); // store the initial angles

        // this.path.transition().duration(500).attrTween("d", this.arcTween.bind(this));
        // this.animateFauxDOM(500);
    }

    change()
    {
        let data = [
            {apples:200},
            {apples:200},
            {apples:200},
            {apples:200},
            {apples:200},
        ];

        // var value = this.value;

        // this.pie.value((d) =>
        // {
        //     return d.apples;
        // }); // change the value function

        this.path = this.path.data(this.pie(data)); // compute the new angles
        this.path.transition().duration(500).attrTween("d", this.arcTween.bind(this)); // redraw the arcs

        // this.animateFauxDOM(500);
    }

    arcTween(a)
    {
        var i = d3.interpolate(this._current, a);
        // console.log(this._current, a);
        this._current = i(0);
        return (t) =>
        {
            return this.arc(i(t));
        };
    }

    render()
    {
        return (
            <div className="donut" onClick={this.change.bind(this)}>
                {/*{this.state.chart}*/}
            </div>
        );
    }
}

export default Donut;
