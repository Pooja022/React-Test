import * as actionType from './ActionType';
import api from '../../Utils/API';
import { printLog } from '../../Utils/Validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../../Utils/Constant';




export const doLogin = data => ({
	type: actionType.LOGIN,
	payload: api
		.post('DashBoard', data)
		.then((res) => {
			printLog('doLogin', res.data.Result);
			const responseData = res.data.Result;
			saveUserData(responseData);
			return responseData;
		})
		.catch(err => {
			printLog('doLogin Catch', err);
		}),
});

const saveUserData = (userDetails) => {
	try {
		AsyncStorage.setItem(Constant.USER, userDetails)
	} catch (error) {
		printLog('Error in AsyncStorage=====>', error)
	}
}


export const getUser = data => ({
	type: actionType.GET_USER,
	payload: api
		.post('DashBoard', data)
		.then((res) => {
			printLog('getUser', res.data.Result);
			const responseData = res.data.Result;
			return responseData;
		})
		.catch(err => {
			printLog('getUser Catch', err);
		}),
});






