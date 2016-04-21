
import './selectArea.scss';
import React, { Component, PropTypes } from 'react';
import { addEventListener, removeEventListener } from '../../utils/event';
import Drag from '../drag/drag';

class SelectArea extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            style: {
                display: "none"
            }
        };
    }

    componentDidMount()
    {
        addEventListener(this.refs.selectArea, 'mousedown', this.mouseDown.bind(this));
        addEventListener(this.refs.selectArea, 'mousemove', this.mouseMove.bind(this));
        addEventListener(this.refs.selectArea, 'mouseup', this.mouseUp.bind(this));
    }

    componentWillUnMount()
    {
        removeEventListener(this.refs.selectArea, 'mousedown', this.mouseDown.bind(this));
        removeEventListener(this.refs.selectArea, 'mousemove', this.mouseMove.bind(this));
        removeEventListener(this.refs.selectArea, 'mouseup', this.mouseUp.bind(this));
    }

    mouseDown(e)
    {
        this.initX = e.pageX || e.clientX;
        this.initY = e.pageY || e.clientY;
    }

    mouseMove(e)
    {
        if(this.initX !== undefined && this.initY !== undefined)
        {
            let mousePosX = e.pageX || e.clientX;
            let mousePosY = e.pageY || e.clientY;

            // 邊距多遠
            let left = Math.min(this.initX, mousePosX);
            let top = Math.min(this.initY, mousePosY);

            // 左或右邊的最大值
            let tmpWidth = Math.max(this.initX, mousePosX);
            let tmpHeight = Math.max(this.initY, mousePosY);

            // 實際大小
            let width = tmpWidth - left;
            let height = tmpHeight - top;

            this.setState({
                style: {
                    display: "block",
                    border: "1px solid #000",
                    left,
                    top,
                    width,
                    height
                }
            });
        }
    }

    mouseUp(e)
    {
        this.initX = this.initY = undefined;
        this.setState({
            style: {
                display: "none"
            }
        });
    }

    render()
    {
        return (
            <div className='selectArea' ref="selectArea">
                <div className='area' style={this.state.style}>
                </div>
                <Drag />
            </div>
        );
    }
}

SelectArea.defaultProps = {};
SelectArea.propTypes = {};

export default SelectArea;
