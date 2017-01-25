import React from 'react';
import { DropTarget } from 'react-dnd';
import Square from './square';
import { canMoveKnight, moveKnight } from './game';

const squareTarget = {
    canDrop(props)
    {
        return canMoveKnight(props.x, props.y);
    },

    drop(props)
    {
        moveKnight(props.x, props.y);
    }
};

function collect(connect, monitor)
{
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

@DropTarget('knight', squareTarget, collect)
class BoardSquare extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    renderOverlay(color)
    {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: color
                }}
            />
        );
    }

    render()
    {
        const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;
        const black = (x + y) % 2 === 1;

        return connectDropTarget(
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Square black={black}>
                    {children}
                </Square>
                {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')}
            </div>
        );
    }
}

export default BoardSquare;
