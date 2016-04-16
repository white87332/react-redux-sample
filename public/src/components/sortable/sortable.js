import './sortable.scss';
import React, { Component, PropTypes } from 'react';

class Sortable extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            data: ["Red","Green","Blue","Yellow","Black","White","Orange"]
        };
    }

    componentDidMount()
    {
        this.placeholder = document.createElement("li");
        this.placeholder.className = "placeholder";
    }

    dragOver(e)
    {
        e.preventDefault();

        this.dragged.style.display = "none";
        if(e.target.className == "placeholder") return;

        this.over = e.target;

        // Inside the dragOver method
        let relY = e.clientY - this.over.offsetTop;
        let height = this.over.offsetHeight / 2;
        let parent = e.target.parentNode;

        if(relY > height)
        {
            this.nodePlacement = "after";
            parent.insertBefore(this.placeholder, e.target.nextElementSibling);
        }
        else if(relY < height)
        {
            this.nodePlacement = "before";
            parent.insertBefore(this.placeholder, e.target);
        }
    }

    dragStart(e)
    {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';

        // Firefox requires calling dataTransfer.setData
        // for the drag to properly work
        e.dataTransfer.setData("text/html", e.currentTarget);
    }

    dragEnd(e)
    {
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(this.placeholder);

        // Update state
        let data = this.state.data;
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if(from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({data: data});
    }

    render()
    {
        let items = this.state.data.map((item, key) => {
            return <li key={key}
                        data-id={key}
                        draggable="true"
                        onDragEnd={this.dragEnd.bind(this)}
                        onDragStart={this.dragStart.bind(this)}>
                        {item}
                    </li>;
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
