import React, { Component, PropTypes } from 'react';

class CommentForm extends Component
{
    constructor()
    {
        super();
        this.state = {
            author: '',
            text: '',
            canPost: 'disabled'
        };
    }

    handleAuthorChange = (e) =>
    {
        this.setState(
        {
            author: e.target.value
        });
    }

    handleTextChange = (e) =>
    {
        this.setState(
        {
            text: e.target.value
        });
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        var author = this.state.author.trim(),
            text = this.state.text.trim();
        if (!text || !author)
        {
            return;
        }
        this.props.onCommentSubmit(
        {
            author: author,
            text: text
        });
        this.setState(
        {
            text: ''
        });
    }
    render()
    {
        return (
            <form className='comment-form' onSubmit={this.handleSubmit}>
            	<input
            		type='text'
            		placeholder='Name'
            		value={this.state.author}
            		onChange={this.handleAuthorChange}
            		maxLength='20'
            		className='name-input'
            		required
            	/>
            	<input
            		type='text'
            		placeholder='Comment'
            		value={this.state.text}
            		onChange={this.handleTextChange}
            	/>
            	<input
            		type='submit'
            		value='Post'
            		disabled={!this.state.author.trim() || !this.state.text.trim()}
            	/>
            </form>
        );
    }
}

export default CommentForm;
