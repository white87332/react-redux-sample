import './carousel.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Carousel extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            currentSlide: 0
        };
    }

    onDotClick(index, e)
    {
        this.setState(
        {
            currentSlide: index,
            lastSlide: this.state.currentSlide
        });
    }

    renderSlides ()
    {
        return this.props.images.map((image, index) =>
        {
            const { currentSlide, lastSlide } = this.state;
            let isShown = index === currentSlide;
            let imgClass = classNames({
                'carousel__slide': true,
                'carousel__slide--shown': isShown,
                'carousel__slide--leaving': index === lastSlide
            });

            return (
                <img aria-hidden={!isShown} className={imgClass} src={image} alt='sup' />
            );
        });
    }

    renderDots()
    {
        return (
            <ul className='carousel__dots'>
            {
                this.props.images.map((_i, index) =>
                {
                    const { currentSlide } = this.state;
                    let liClass = classNames({
                        'carousel__dot': true,
                        'carousel__dot--active': index === currentSlide
                    });

                    let id = `carousel${index}`;
                    return (
                        <li className={liClass} key={index}>
                            <input className='carousel__dot-input' id={id} type='radio' name='carousel-dots' value={index} onChange={this.onDotClick.bind(this, index)}></input>
                            <label htmlFor={id}>•</label>
                        </li>
                    );
                })
            }
            </ul>
      );
    }

    render()
    {
        return (
            <div className='carousel'>
                <div className='carousel__slider'>
                    {this.renderSlides()}
                </div>
                {this.renderDots()}
            </div>
        );
    }
}

Carousel.defaultProps = {
    images:[
        'http://fillmurray.com/400/400',
        'http://placecage.com/400/400',
        'http://fillmurray.com/g/400/400',
        'http://placecage.com/c/400/400'
    ]
};

export default Carousel;
