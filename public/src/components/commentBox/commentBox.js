import './commentBox.scss';
import React, { Component, PropTypes } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList';

let commentData = [
    {author: 'Waympus Loonger', text: 'look at this comment!'},
    {author: 'Donderk Sept', text: 'No, this comment is more interesting!'},
    {author: 'Lentfop Abdus', text: 'I can say a thing here?'},
    {author: 'Stenin Bumk', text: 'Why is wall though?'},
    {author: 'Stenin Bumk', text: 'Waldo*'},
    {author: 'Hastov Lennonbrook', text: 'H- How did a typo of Waldo turn into wall though???'},
    {author: 'Lentfop Abdus', text: '^ this guy'},
    {author: 'Stenin Bumk', text: 'It sounds similar!'},
    {author: 'Henchtop X. Splathurdin', text: 'y\'all are freaky.'},
    {author: 'Snecknope Antlebee', text: 'Guys guys guys!'},
    {author: 'Lentfop Abdus', text: 'Jeez what?'},
    {author: 'Snecknope Antlebee', text: 'so they say comedy is observation plus time, right?'},
    {author: 'xXx_Ethan_xXx', text: 'I\'ll bite.'},
    {author: 'xXx_Ethan_xXx', text: 'Yeah that\'s what they say...'},
    {author: 'Snecknope Antlebee', text: 'Yeah, but then I got to thinking. Jerry Sienfeld showed us that observation is also comedy!'},
    {author: 'Jaymus Flabbergasser', text: 'SEVENTEEN!!!!'},
    {author: 'Snecknope Antlebee', text: 'It\'s basic algebra.'},
    {author: 'Snecknope Antlebee', text: 'tragedy + time = comedy'},
    {author: 'Snecknope Antlebee', text: 'observations = comedy'},
    {author: 'Snecknope Antlebee', text: 'thus!!! tragedy = observation - time'},
    {author: 'Snecknope Antlebee', text: 'in lame-man-speak timeless observation is equal to tragedy'}
];

class CommentBox extends Component
{
    constructor()
    {
        super();
        this.state = {
            data: []
        };
    }

    // componentDidMount()
    // {
    //     this.addRandomComment();
    // }

    handleCommentSubmit(comment)
    {
        comment.id = this.state.data.length + 1;
        this.setState(
        {
            data: this.state.data.concat(comment)
        });
    }

    addRandomComment()
    {
        this.handleCommentSubmit(commentData[0]);
        commentData.splice(0, 1);
        if (commentData.length > 0)
        {
            let cTime = Math.random() * 7000 + 500;
            setTimeout(this.addRandomComment, cTime);
        }
    }

    render()
    {
        return (
            <div className='comment-box'>
            	<h1>Comments</h1>
                <CommentList data={this.state.data}/>
            	<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}

CommentBox.propTypes = {};

export default CommentBox;
