import * as actionTypes from './ActionType';

const initialState = {
	isLoading: false,
	loaderMessage: '',

};

const AuthReducer = (state = initialState, action) => {

	switch (action.type) {

		case actionTypes.GET_CATEGORY:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.GET_CATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.GET_CATEGORY_ERROR:
			return {
				...state,
				isLoading: false,
			};

		case actionTypes.GET_PRODUCTS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.GET_PRODUCTS_ERROR:
			return {
				...state,
				isLoading: false,
			};

		case actionTypes.GET_SUBCATEGORY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.GET_SUBCATEGORY_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case actionTypes.GET_SUBCATEGORY_SUCCESS:
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
