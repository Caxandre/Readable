import { getAllCategories } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    };
}

export function handleGetAllCategories() {
    return dispatch => {
     
        return getAllCategories().then(({ categories }) => {
            dispatch(showLoading())
            dispatch(receiveCategories(categories));
            dispatch(hideLoading())
        })
       .catch(() => dispatch(hideLoading()))
    };
}