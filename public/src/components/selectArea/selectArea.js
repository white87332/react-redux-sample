
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { addEventListener, removeEventListener } from '../../utils/event';
import { forIn } from 'lodash';
import Drag from '../drag/drag';
import createSelectable from './createSelectable';

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

        this.selectableItems = [];
        this.act = null;
    }

    getChildContext()
    {
        // context可以將資料做父子間的上或下傳遞
        return {
            selectable: {
                register: (key, domNode) => {
                    this.selectableItems.push(
                    {
                        key,
                        domNode
                    });
                },
                unregister: (key) => {
                    this.selectableItems = this.selectableItems.filter(data => data.key !== key);
                }
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
        e.stopPropagation();
        this.act = "mouseDown";
        this.initX = e.pageX || e.clientX;
        this.initY = e.pageY || e.clientY;
    }

    mouseMove(e)
    {
        e.stopPropagation();
        if(this.initX !== undefined && this.initY !== undefined)
        {
            this.act = "mouseMove";
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
                    position: 'absolute',
                    zIndex: 1,
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
        e.stopPropagation();
        this.initX = this.initY = undefined;
        
        if(this.act === "mouseMove")
        {
            this.selectElements();
            this.setState({
                style: {
                    display: "none"
                }
            });

            this.act = "mouseUp";
        }
    }

    selectElements()
    {
        let selectedItems = [];
        let selectDiv = findDOMNode(this.refs.selectDiv);

        forIn(this.selectableItems, (dataObj) =>
        {
            // 判斷是否在圈選範圍內
            if(this.collide(this.refs.selectDiv, dataObj.domNode))
            {
                selectedItems.push(dataObj.key);
            }
        });

        this.props.onHandled(selectedItems);
    }

    collide(selectDiv, domNode)
    {
        return !(
            ((selectDiv.offsetTop + selectDiv.offsetHeight) < domNode.offsetTop) ||
            ((selectDiv.offsetTop) > (domNode.offsetTop + domNode.offsetHeight)) ||
            ((selectDiv.offsetLeft + selectDiv.offsetWidth) < domNode.offsetLeft) ||
            ((selectDiv.offsetLeft) > (domNode.offsetLeft + domNode.offsetWidth))
        );
    }

    render()
    {
        return (
            <div ref="selectArea">
                <div ref="selectDiv" style={this.state.style} />
                {this.props.children}
            </div>
        );
    }
}

SelectArea.defaultProps = {};
SelectArea.propTypes = {
    onHandled: PropTypes.func.isRequired
};
SelectArea.childContextTypes = {
    selectable: PropTypes.object
};

export { SelectArea, createSelectable };
