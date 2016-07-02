import './slider.scss';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Slider extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            dot: ["active", "", "", ""],
            imgSrc: "http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fc7%2F36%2Fc7363f990076faf717ad22260518dbe2.jpg"
        };

        this.src = [
            "http://imgapi.nownews.com/?w=640&q=60&src=http%3A%2F%2Fs.nownews.com%2Fc7%2F36%2Fc7363f990076faf717ad22260518dbe2.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFysgvNR5rWMKwhtsCA8fUHoAY9d3sj5anBsboLmOp73SyFpvE",
            "http://pic.ctitv.com/wpimg/2016/04/0418Image2.jpg",
            "http://www.beeweb.hk/upload/newspic/photo/2016/05/27/20160527015505241504.jpg"
        ];

        this.index = 0;
        this.lastIndex = 0;
    }

    componentDidMount()
    {
        setInterval(() => {
            let index = (this.index +1 === this.src.length)? 0 : this.index + 1;
            this.changeImg(index);
        }, 6000);
    }

    changeImg(index, e)
    {
        // last img index
        this.lastIndex = this.index;

        // now img index
        this.index = index;

        let dot = new Array(4);
        dot[index] = "active";

        this.setState({
            imgSrc:this.src[index],
            dot
        });
    }

    arrowChang(act, e)
    {
        this.lastIndex = this.index;
        switch (act)
        {
            case 'prev':
                this.index = (this.index-1 < 0)? this.src.length-1 : this.index-1;
                break;
            case 'next':
                this.index = (this.index+1 >= this.src.length)? 0 : this.index+1;
                break;
            default:
        }

        let dot = new Array(4);
        dot[this.index] = "active";

        this.setState({
            imgSrc:this.src[this.index],
            dot
        });
    }

    render()
    {
        let dotClass = this.state.dot;
        let transitionName = (this.lastIndex < this.index)? "sliderLeft" : "sliderRight";

        return (
            <div className='c-slider' >
                {/*arrow*/}
                <div onClick={this.arrowChang.bind(this, "prev")} className="arrow arrow-left"></div>
                <div onClick={this.arrowChang.bind(this, "next")} className="arrow arrow-right"></div>

                {/*img*/}
                <ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <img src={this.state.imgSrc} key={this.state.imgSrc} />
                </ReactCSSTransitionGroup>

                {/*content*/}
                <div className="content">
                    <div className="title">
                        <h1>title</h1>
                    </div>
                    <div className="description">
                        <h2>description</h2>
                    </div>
                    <div className="link">
                        <div className="go">
                            <a>see it</a>
                        </div>
                    </div>
                </div>

                {/*dots*/}
                <div className="dots">
                    <div className={dotClass[0]} onClick={this.changeImg.bind(this, 0)}></div>
                    <div className={dotClass[1]} onClick={this.changeImg.bind(this, 1)}></div>
                    <div className={dotClass[2]} onClick={this.changeImg.bind(this, 2)}></div>
                    <div className={dotClass[3]} onClick={this.changeImg.bind(this, 3)}></div>
                </div>
            </div>
        );
    }
}

export default Slider;
