import * as actionType from './ActionType';
import api from '../../Utils/API';
import { printLog } from '../../Utils/Validators';

export const doLogin = data => ({
	type: actionType.LOGIN,
	payload: api
		.post('register', data)
		.then((res) => {
			printLog('doLogin', res.data);
			
			return responseData;
		})
		.catch(err => {
			printLog('doLogin Catch', err);
		}),
});



export const getUser = data => ({
	type: actionType.GET_USER,
	payload: api
		.post('list', data)
		.then((res) => {
			printLog('getUser', res.data.Result);
			const responseData = res.data.Result;
			return responseData;
		})
		.catch(err => {
			printLog('getUser Catch', err);
		}),
});






