import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { SelectArea, createSelectable } from '../selectArea/selectArea';
import Drag from '../drag/drag';

let SelectAreaItem = createSelectable(Drag);

class SelectItems extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    onHandled(selectedItems)
    {
        console.log(selectedItems);
    }

    render()
    {
        return (
            <SelectArea onHandled={this.onHandled.bind(this)}>
                <SelectAreaItem selectAreaItemKey={1}/>
            </SelectArea>
        );
    }
}

SelectItems.defaultProps = {};
SelectItems.propTypes = {};
SelectItems.childContextTypes = {};

export default SelectItems;
