import * as api from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { toastr } from 'react-redux-toastr'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_VOTE_SCORE = 'UPDATE_VOTE_SCORE'
export const POST_SORT_BY = 'POST_SORT_BY'

// GET ALL POSTS
function receivePosts(posts) {
	return {
		type: RECEIVE_POSTS,
		posts,
	};
}

export function handleGetAllPosts(category) {
	return dispatch => {

		return api.getAllPosts(category)
			.then(posts => {
				dispatch(showLoading())
				dispatch(receivePosts(posts));
				dispatch(hideLoading())
			})
			.catch(() => dispatch(hideLoading()))
	};
}

// GET POST BY ID
function receivePost(post) {
	return {
		type: RECEIVE_POST,
		post,
	};
}

export function handleGetPost(id) {
	return dispatch => {
		dispatch(showLoading())
		return api.getPost(id)
			.then(post => {
				dispatch(receivePost(post));
				dispatch(hideLoading())
			})
			.catch(() => dispatch(hideLoading()))
	};
}

// ADD POST
function addPost(post) {
	return {
		type: ADD_POST,
		post: { 
			...post,
			voteScore: 0
		}
	}
}

export function handleAddPost(post) {
	return (dispatch) => {
		api.addPost(post)
			.then(() => {
				toastr.success('Sucesso', 'Post adicionado com sucesso.')
				dispatch(addPost(post))
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	}
}

// UPDATE POST
function updatePost(post) {
	return {
		type: UPDATE_POST,
		post,
	}
}

export function handleUpdatePost(post) {
	return (dispatch) => {
		api.updatePost(post)
			.then(() => {
				toastr.success('Sucesso', 'Post atualizado com sucesso.')
				dispatch(updatePost(post))
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	}
}

// REMOVE POST  
function removePost(post) {
	return {
		type: REMOVE_POST,
		post,
	}
}

export function handleRemovePost(post) {
	return (dispatch) => {
		api.removePost(post.id)
			.then(() => {
				toastr.success('Sucesso', 'Post removido com sucesso.')
				dispatch(removePost(post))
			})
			.catch(e => {
				e.response.data.errors.forEach(error => toastr.error('Erro', error))
			})
	}
}

// VOTESCORE
function updatePostVoteScore(voteScore) {
	return {
		type: UPDATE_VOTE_SCORE,
		voteScore
	}
}

export function handleUpdatePostVoteScore(voteScore) {
	return (dispatch) => {
		api.updatePostVoteScore(voteScore)
			.then(() => {
				dispatch(updatePostVoteScore(voteScore))
			})
	}
}

// SORT BY
export function postSortBy(sortEvent) {
	return {
		type: POST_SORT_BY,
		payload: sortEvent,
	};
}