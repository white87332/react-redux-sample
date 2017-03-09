import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

const createSelectable = (WrapperComponent) =>
{
    class SelectAreaItem extends Component
    {
        componentDidMount()
        {
            this.context.selectable.register(this.props.selectAreaItemKey, findDOMNode(this));
        }

        componentWillUnmount()
        {
            this.context.selectable.unregister(this.props.selectAreaItemKey);
        }

        render()
        {
            return <WrapperComponent {...this.props} {...this.props.children} />;
        }
    }

    SelectAreaItem.contextTypes = {
        selectable: PropTypes.object
    };

    SelectAreaItem.propTypes = {
        selectAreaItemKey: PropTypes.any.isRequired
    };

    return SelectAreaItem;
};

export default createSelectable;
