import './main.scss';
import React from 'react';

class Main extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Main;
