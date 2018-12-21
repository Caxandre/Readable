import { RECEIVE_POSTS, REMOVE_POST, UPDATE_VOTE_SCORE,ADD_POST } from '../actions/posts';

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts;
        case ADD_POST:
            return state.concat([action.post])
        case REMOVE_POST:
            return [action.post]
        case UPDATE_VOTE_SCORE:
            const updatedPost = state.map(post => {
                if (post.id === action.voteScore.id) {
                    return {
                        ...post,
                        voteScore: action.voteScore.option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
                    }
                }
                return post
            })
            return updatedPost
        default:
            return state;
    }
}
