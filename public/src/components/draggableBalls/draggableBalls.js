import './draggableBalls.scss';
import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { range } from 'lodash';

const springSetting1 = {
    stiffness: 180,
    damping: 10
};
const springSetting2 = {
    stiffness: 120,
    damping: 17
};

const allColors = [
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];
const [count, width, height] = [11, 70, 90];

// indexed by visual position
const layout = range(count).map(n =>
{
    const row = Math.floor(n / 3);
    const col = n % 3;
    return [width * col, height * row];
});

function reinsert(arr, from, to)
{
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max)
{
    return Math.max(Math.min(n, max), min);
}

class DraggableBalls extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            mouse: [0, 0],
            delta: [0, 0], // difference between mouse and circle pos, for dragging
            lastPress: null, // key of the last pressed component
            isPressed: false,
            order: range(count), // index: visual position. value: component key/id
        };
    }

    componentDidMount()
    {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        window.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseMove({pageX, pageY})
    {
        const { order, lastPress, isPressed, delta: [dx, dy] } = this.state;
        if (isPressed)
        {
            const mouse = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouse[0] / width), 0, 2);
            const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
            const index = row * 3 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);
            this.setState({mouse: mouse, order: newOrder});
        }
    }

    handleMouseDown(key, [pressX, pressY], e)
    {
        let {pageX, pageY} = e;
        this.setState({
            lastPress: key,
            isPressed: true,
            delta: [pageX - pressX, pageY - pressY],
            mouse: [pressX, pressY],
        });
    }

    handleMouseUp()
    {
        this.setState({isPressed: false, delta: [0, 0]});
    }

    render()
    {
        const {order, lastPress, isPressed, mouse} = this.state;

        return (
            <div className="demo2">
                {order.map((_, key) =>
                {
                    let style, x, y;
                    const visualPosition = order.indexOf(key);

                    if (key === lastPress && isPressed)
                    {
                        [x, y] = mouse;
                        style = {
                            translateX: x,
                            translateY: y,
                            scale: spring(1.2, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    }
                    else
                    {
                        [x, y] = layout[visualPosition];
                        style = {
                            translateX: spring(x, springSetting2),
                            translateY: spring(y, springSetting2),
                            scale: spring(1, springSetting1),
                            boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
                        };
                    }

                    return (
                        <Motion key={key} style={style}>
                            {(data) => {
                                let {translateX, translateY, scale, boxShadow} = data;
                                return <div onMouseDown={this.handleMouseDown.bind(this, key, [x, y])}
                                            className="demo2-ball"
                                            style={{
                                                backgroundColor: allColors[key],
                                                WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                                zIndex: key === lastPress ? 99 : visualPosition,
                                                boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                                            }}/>;
                            }}
                        </Motion>
                  );
                })}
             </div>
        );
    }
}

DraggableBalls.propTypes = {};

export default DraggableBalls;
