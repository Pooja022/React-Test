import * as actionType from './ActionType';
import api from '../../Utils/API';
import { printLog } from '../../Utils/Validators';

export const getCategory = data => ({
	type: actionType.GET_CATEGORY,
	payload: api
		.post('getStoreAPI', data)
		.then((res) => {
			printLog('getCategory', res.data);

			const responseData = res.data.details;
			return responseData; 
		})
		.catch(err => {
			printLog('getCategory Catch', err);
		}),
});



export const getSubcategory = (data) => ({

	type: actionType.GET_SUBCATEGORY,
	payload: api
		.post('DashBoard', data)
		.then((res) => {
			printLog('getSubcategory action', res.data);

			const responseData = res.data.Result;
			return responseData;
		})
		.catch(err => {
			printLog('getSubcategory Catch', err);
		}),
});

export const getSubProducts = (data) => ({

	type: actionType.GET_PRODUCTS,
	payload: api
		.post('ProductList', data)
		.then((res) => {
			printLog('getSubProducts action', res.data);

			const responseData = res.data.Result;
			return responseData;
		})
		.catch(err => {
			printLog('getSubProducts Catch', err);
		}),
});

