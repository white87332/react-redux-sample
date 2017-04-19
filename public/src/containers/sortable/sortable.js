import React from 'react';
import './sortable.scss';

class Sortable extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            data: ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange']
        };
    }

    componentDidMount()
    {
        this.placeholder = document.createElement('li');
        this.placeholder.className = 'placeholder';
    }

    dragOver(e)
    {
        e.preventDefault();

        this.dragged.style.display = 'none';
        if (e.target.className === 'placeholder') return;

        this.over = e.target;

        // Inside the dragOver method
        const relY = e.clientY - this.over.offsetTop;
        const height = this.over.offsetHeight / 2;
        const parent = e.target.parentNode;

        if (relY > height)
        {
            this.nodePlacement = 'after';
            parent.insertBefore(this.placeholder, e.target.nextElementSibling);
        }
        else if (relY < height)
        {
            this.nodePlacement = 'before';
            parent.insertBefore(this.placeholder, e.target);
        }
    }

    dragStart(e)
    {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';

        // Firefox requires calling dataTransfer.setData
        // for the drag to properly work
        e.dataTransfer.setData('text/html', e.currentTarget);
    }

    dragEnd()
    {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(this.placeholder);

        // Update state
        const data = this.state.data;
        const from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if (from < to) to -= 1;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({ data });
    }

    render()
    {
        const items = this.state.data.map((item, key) =>
        {
            return (
                <li
                    key={key}
                    data-id={key}
                    draggable="true"
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}
                >
                    {item}
                </li>
            );
        });

        return (
            <ul onDragOver={this.dragOver.bind(this)}>
                {items}
            </ul>
        );
    }
}

Sortable.propTypes = {};

export default Sortable;
