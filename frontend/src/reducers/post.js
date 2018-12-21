import { RECEIVE_POST} from '../actions/posts';

export default function (state = {}, action) {

	switch (action.type) {
		case RECEIVE_POST:
			return {
				...state,
				...action.post,
			};
		
		default:
			return state;
	}
}
