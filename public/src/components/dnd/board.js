import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './boardSquare';
import Knight from './knight';

@DragDropContext(HTML5Backend)
class Board extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    renderSquare(i)
    {
        const x = i % 8;
        const y = Math.floor(i / 8);

        return (
          <div key={i}
               style={{ width: '12.5%', height: '12.5%' }}>
                <BoardSquare x={x}
                             y={y}>
                  {this.renderPiece(x, y)}
                </BoardSquare>
          </div>
        );
    }

    renderPiece(x, y)
    {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY)
        {
            return <Knight />;
        }
    }

    render()
    {
        const squares = [];
        for (let i = 0; i < 64; i++)
        {
            squares.push(this.renderSquare(i));
        }

        return (
          <div className='Board'>
            {squares}
          </div>
        );
    }
}

export default Board;
