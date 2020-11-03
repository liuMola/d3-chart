import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { curveCardinal } from "d3";
import "./style.scss";

const LineChart = () => {

    useEffect(() => {
        draw();
    }, [])

    const svgSelector = useRef(null);

    //declare svg canvas
    const svgMargin = {
        top: 10,
        bottom: 10,
        right: 20,
        left: 20
    }
    let width = 500;
    let height = 200 + svgMargin.top + svgMargin.bottom;

    const data1 = [1, 2, 3, 4, 5];

    var data5 = [
        { x: 0, y: 1.89 },
        { x: 1, y: 2.77 },
        { x: 2, y: 0.86 },
        { x: 3, y: 3.45 },
        { x: 4, y: 3.13 },
        { x: 5, y: 3.39 },
        { x: 6, y: 2.33 },
        { x: 7, y: 3.79 },
        { x: 8, y: 2.61 },
        { x: 9, y: 2.15 }
    ];

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv")

    const draw = () => {


        //define scales
        const xScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width]);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data5, d => d.y)])
            .range([height, 0]);

        //select svg instance
        const svg = d3.select(svgSelector.current)
            .attr('class', 'line-chart')
        //grouping x and y axis
        svg.append('g')
            .attr('class', 'x-axis')
            .call(d3.axisBottom(xScale).tickSizeOuter(0))
            .attr('transform', `translate(0, ${height - 20})`)

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale).tickSizeOuter(0))

        //line function 
        const createLine = d3
            .line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y))
        // .curve(curveCardinal)

        svg
            .append('path')
            .data([data5])
            .attr('d', d => createLine(d))
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .style('stroke', '#09c');

    }


    return (
        <>
            <div className="svg-wrapper">
                <svg
                    ref={svgSelector}
                    width={width}
                    height={height}
                >
                </svg>
            </div>
        </>
    )
}

export default LineChart;