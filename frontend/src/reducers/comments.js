import { RECEIVE_COMMENTS, ADD_POST_COMMENT, UPDATE_COMMENT_SCORE, DELETE_COMMENT } from '../actions/comments';

export default function (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS:
			return action.comments;
		case ADD_POST_COMMENT:
			return state.concat([action.comment])
		case DELETE_COMMENT:
			return state.filter(f => f.id !== action.id)
		case UPDATE_COMMENT_SCORE:
			const updatedComment = state.map(comment => {
				if (comment.id === action.voteScore.id) {
					return {
						...comment,
						voteScore: action.voteScore.option === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
					}
				}
				return comment
			})
			return updatedComment
		default:
			return state;
	}
}
