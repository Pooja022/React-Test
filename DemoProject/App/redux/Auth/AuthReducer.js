import * as actionTypes from './ActionType';

const initialState = {
	isLoading: false,
	loaderMessage: '',

};

const AuthReducer = (state = initialState, action) => {

	switch (action.type) {

		case actionTypes.LOGIN_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.LOGIN_ERROR:
			return {
				...state,
				isLoading: false,
			};

		case actionTypes.GET_USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.GET_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.GET_USER_ERROR:
			return {
				...state,
				isLoading: false,
			};
		default:
			console.log('default', JSON.stringify(action.payload));
			return state;
	}
};

export default AuthReducer;
