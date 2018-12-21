import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import { loadingBarReducer } from 'react-redux-loading'
import posts from './posts';
import categories from './categories';
import post from './post';
import comments from './comments';

export default combineReducers({
    toastr: toastrReducer,
    loadingBar: loadingBarReducer,
    posts,
    categories,
    post,
    comments,
});
