import axios from 'axios';
import { BASE_URL } from "../Config";
import { printLog } from "./Validators";



 function makeHeaders() {
	let headerObj = {};
	/* const token = `Bearer`;
	headerObj = {
	  Authorization: token,
	}; */
	return headerObj;
  }
  
  function makeFileUploadHeaders() {
	let headerObj = {};
	const token = `Bearer`;
	headerObj = {
	  Authorization: token,
	  'Content-Type': 'multipart/form-data',
	  mimeType: 'multipart/form-data',
	};
	return headerObj;
  }
  
  const axiosApi = axios.create({
	baseURL: `${BASE_URL}/`,
	timeout: 1000,
  });

  axiosApi.interceptors.request.use(request => {
	//request.headers = makeHeaders();
	return request;
  });
  
  axiosApi.interceptors.request.use(request => {
	if (
	  request.url === 'updateProfile' ||
	  request.url === 'setprofilephoto' ||
	  request.url === 'addEvent'
	) {
	  request.headers = makeFileUploadHeaders();
	} else {
	  request.headers = makeHeaders();
	}
	printLog('<~~~~~~~~~~~ REQUEST:::=>' + JSON.stringify(request));
	return request;
  });
  
  
  axiosApi.interceptors.response.use(
	response => {
	  //checkRespAndRedirect(response);
	  return response;
	},
	err => {
	  //printLog('Error in interceptor', err.response);
	 
	  if (err.response && err.response.status === 401) {
		// if you don't return here, then an error will be thrown and you will see a loader infinitely
		return true;
	  }
	  else if (err.response && err.response.status === 403) {
	  }
	  else if (err.response && err.response.status === 500) {
		  printLog('danger', Constant.notResponding);
	  }else{
		printLog('danger', Constant.notResponding);
	  }
	  return Promise.reject(err);
	},
  );
  
  export default axiosApi;
  