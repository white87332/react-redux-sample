import React, { Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import * as postsActions from '../../actions/postsActions';
import { connect } from 'react-redux';

// Immutable object
function mapStateToProps(state)
{
    return {
        posts: state.get('posts')
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        actions : bindActionCreators(postsActions, dispatch)
    };
}

class Posts extends Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        const { postsList } = this.props.actions;
        postsList();
    }

    render()
    {
        const { posts } = this.props;

        let items = posts.get('list').map((data, key) => {
            return <div key={key}>{data.title}</div>;
        });

        return (
            <div>
               {items}
             </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
