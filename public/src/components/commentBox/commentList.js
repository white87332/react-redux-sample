import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

const springPreset = {
	wobbly: [120,11]
};

class CommentList extends Component
{
	componentDidMount()
	{
		this.comDisplay = $('.comment-list');
	}

	componentDidUpdate()
	{
		let comHeight = this.comDisplay.outerHeight();
		let comScroll = this.comDisplay[0].scrollHeight;

		this.comDisplay.stop().animate({'scrollTop': comScroll - comHeight}, 200);
	}

	getStyles()
	{
		let configs = this.props.data.map((val, index) => {
			return {
				key: index,
				style: {
					opacity: spring(1),
					top: spring(0, springPreset.wobbly)
				}
			};
		});

		return configs;
	}

	willEnter(key)
	{
		return {
			opacity: spring(0),
			top: spring(100, springPreset.wobbly)
		};
	}

	render()
	{
		return (
			<TransitionMotion
				styles={this.getStyles.bind(this)}
				willEnter={this.willEnter}
				willLeave={this.willLeave}>
				{
					(interp) =>
					{
						return <div className='comment-list'>
									{this.props.data.map((comment, i) =>
									{
										const { style } = interp[i];
										return (
											<div className='comment-node' author={comment.author} key={comment.id} style={style}>
												<div className='print-author'>
													{comment.author + ' - '}
												</div>
												{comment.text}
											</div>
										);
									})}
								</div>;
					}
				}
			</TransitionMotion>
		);
	}
}

export default CommentList;
