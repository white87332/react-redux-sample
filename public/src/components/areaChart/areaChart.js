import './areaChart.scss';
import React from 'react';
import * as d3 from 'd3';
import AreaChartSvgG from './areaChartSvgG';

class AreaChart extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            data: [
                { date: '1-May-12', close: '58.13' },
                { date: '30-Apr-12', close: '59.13' },
                { date: '27-Apr-12', close: '40.13' },
                { date: '26-Apr-12', close: '85.13' },
                { date: '25-Apr-12', close: '30.13' }
            ]
        };
    }

    componentDidMount()
    {
        let margin = {top: 20, right: 20, bottom: 30, left: 50};
        let width = 960 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        // parse the date / time
        let parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        // define the area
        let area = d3.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.close); });

        // define the line
        let valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        let svg = d3.select(".areaChart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let data = Object.assign([], this.state.data);

        data.forEach(function(d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        svg.append("path")
          .data([data])
          .attr("class", "area")
          .on("mouseover", function(d) {
             console.log(d);
          })
          .on("mouseout", function () {
              console.log("mouseout");
          })
          .attr("d", area);

        svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);

          // add the X Axis
          svg.append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(d3.axisBottom(x));

          // add the Y Axis
          svg.append("g")
              .attr("transform", `translate(${width}, 0)`)
              .call(d3.axisLeft(y));
    }

    render()
    {
        let margin = {top: 20, right: 20, bottom: 30, left: 50};
        let width = 960 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        return (
            <svg className="areaChart"
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>

                {/* <AreaChartSvgG data={this.props.data} style={{ margin, width, height }}/> */}
            </svg>
        );
    }
}

export default AreaChart;
