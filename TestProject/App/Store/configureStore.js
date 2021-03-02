import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';


import AuthReducer from '../redux/Auth/AuthReducer';
const rootReducer = combineReducers(
{ auth: AuthReducer }
);
const configureStore = () => {
	return createStore(rootReducer,applyMiddleware(thunk, createPromise({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']})));
}
export default configureStore;