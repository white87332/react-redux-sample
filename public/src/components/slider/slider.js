import './slider.scss';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Slider extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            src:"http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fc7%2F36%2Fc7363f990076faf717ad22260518dbe2.jpg"
        };
    }

    cb()
    {
        this.setState({
            src:"http://imgapi.nownews.com/?w=720&q=60&src=http://s.nownews.com/media_crop/124654/hash/2a/b2/2ab2a8eaa1e7642133efec7f849f9036.jpg"
        });
    }

    render()
    {
        return (
            <div className='carousel' onClick={this.cb.bind(this)}>
                <ReactCSSTransitionGroup transitionName="carousel2" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <img src={this.state.src} key={this.state.src} />
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Slider;
