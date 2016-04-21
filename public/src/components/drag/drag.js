import './drag.scss';
import React, { Component, PropTypes } from 'react';

class Drag extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            style: {
                left: 0,
                top: 0
            }
        };
    }

    mouseDown(e)
    {
        let mousePosX = e.pageX || e.clientX;
        let mousePosY = e.pageY || e.clientY;

        // 滑鼠位置跟元素邊界的距離 -> 滑鼠位置到元素末端的距離
        this.diffX = mousePosX - e.target.offsetLeft;
        this.diffY = mousePosY - e.target.offsetTop;
    }

    mouseMove(e)
    {
        let mousePosX = e.pageX || e.clientX;
        let mousePosY = e.pageY || e.clientY;

        let parentNode = e.target.parentNode;

        // 所能移動的最大距離
        let bundWidth = parentNode.offsetWidth - e.target.offsetWidth;
        let bundHeight = parentNode.offsetHeight - e.target.offsetHeight;

        if(this.diffX !== undefined && this.diffY !== undefined)
        {
            let moveX = mousePosX - this.diffX;
            let moveY = mousePosY- this.diffY;
            if(moveX > 0 && moveY > 0 && moveX < bundWidth && moveY < bundHeight)
            {
                this.setState({
                    style: {
                        left: moveX,
                        top: moveY
                    }
                });
            }
        }
    }

    mouseUp(e)
    {
        this.diffX = this.diffY = undefined;
    }

    render()
    {
        return (
            <div className='drag'>
                <div className='drag-div'
                    onMouseDown={this.mouseDown.bind(this)}
                    onMouseMove={this.mouseMove.bind(this)}
                    onMouseUp={this.mouseUp.bind(this)}
                    style={this.state.style} />
            </div>
        );
    }
}

Drag.defaultProps = {};
Drag.propTypes = {};

export default Drag;
