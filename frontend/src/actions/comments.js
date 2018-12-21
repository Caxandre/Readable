import * as api from '../utils/api';
import { toastr } from 'react-redux-toastr'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT'
export const EDIT_POST_COMMENT = 'EDIT_POST_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE'

// GET COMMENTS
function receiveComments(comments) {
	return {
		type: RECEIVE_COMMENTS,
		comments,
	};
}

export function handleGetComments(id) {
	return dispatch => {
		return api.getComments(id).then(comments => {
			dispatch(receiveComments(comments));
		});
	};
}

// ADD COMMENT
function addComment(comment) {
	return {
		type: ADD_POST_COMMENT,
		comment: {
			...comment,
			voteScore: 0
		}
	}
}

export function handleAddPostComment(comment) {
	return (dispatch) => {
		api.addPostComment(comment)
			.then(() => {
				toastr.success('Sucess', 'Comment created successfully!')
				dispatch(addComment(comment))
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	}
}

// DELETE COMMENT
function deleteCommentFunc(id) {
	return {
		type: DELETE_COMMENT,
		id,
	};
}

export function handleDeleteComment(id) {
	return dispatch => {
		return api.deleteComment(id)
			.then(() => {
				toastr.success('Sucess', 'Comment deleted successfully!')
				dispatch(deleteCommentFunc(id));
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	};
}

// EDIT COMMENT
function editComment(comment) {
	return {
		type: EDIT_POST_COMMENT,
		comment,
	}
}

export function handleEditPostComment(comment) {
	return (dispatch) => {
		api.editPostComment(comment)
			.then(() => {
				toastr.success('Sucess', 'Comment edited successfully!')
				dispatch(editComment(comment))
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	}
}

// VOTE COMMENT
function updateCommentScore(voteScore) {
	return {
		type: UPDATE_COMMENT_SCORE,
		voteScore,
	}
}

export function handleUpdateCommentScore(voteScore) {
	return (dispatch) => {
		api.updateCommentScore(voteScore)
			.then(() => {
				dispatch(updateCommentScore(voteScore))
			})
	}
}
