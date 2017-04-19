import React from 'react';

class Square extends React.Component
{
    render()
    {
        const { black } = this.props;
        const backgroundColor = black ? 'black' : 'white';
        const color = black ? 'white' : 'black';

        return (
          <div style={{
            color,
            backgroundColor,
            width: '100%',
            height: '100%'}}>

            {this.props.children}
          </div>
        );
    }
}

export default Square;
