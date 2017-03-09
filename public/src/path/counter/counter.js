import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import i18n from '../../i18n/i18n';
import * as CounterActions from '../../actions/counter';
import './counter.scss';

function mapStateToProps(state)
{
    return {
        numbers: state.counter.numbers
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators(CounterActions, dispatch);
}

@translate(['common'], { wait: true })
class Counter extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    componentDidMount()
    {
        i18n.changeLanguage('en');
    }

    render()
    {
        const { increment, incrementIfOdd, incrementAsync, decrement, numbers } = this.props;
        return (
            <div className="counter">
                Clicked: {numbers} times
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={() => incrementAsync()}>Increment async</button>
            </div>
        );
    }
}

Counter.propTypes = {
    increment: React.PropTypes.func.isRequired,
    incrementIfOdd: React.PropTypes.func.isRequired,
    incrementAsync: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
    numbers: React.PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
