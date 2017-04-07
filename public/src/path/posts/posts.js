import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postsActions from '../../actions/postsActions';

function mapStateToProps(state)
{
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        actions : bindActionCreators(postsActions, dispatch)
    };
}

class Posts extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { posts } = this.props;
        let items = posts.list.map((data, key) => {
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
