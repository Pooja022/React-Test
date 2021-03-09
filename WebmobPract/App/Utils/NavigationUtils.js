import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";


//Screens 
import Dashboard from '../Screens/Dashboard';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import { printLog } from './Validators';
import Constant from './Constant';

const Stack = createStackNavigator();
var token = '';
getDataFromAsyncStorage();

async function getDataFromAsyncStorage() {
	let data = ''
	try {
		token = JSON.parse(await AsyncStorage.getItem(Constant.TOKEN));
		printLog('try=======>', token);

		return data
	} catch (error) {
		printLog('catch=======>', error);


	}
}

const NavigationUtils = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={Login} options={{ gestureEnabled: true }}>
				<Stack.Screen
					name="Login"
					component={Login}
					options={
						{
							header: () => null,
							gestureEnabled: false,
							headerTransparent: true,
						}
					}
				/>

				<Stack.Screen
					name="Dashboard"
					component={Dashboard}
					options={
						{
							header: () => null,
							gestureEnabled: false,
							headerTransparent: true,
						}
					}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default NavigationUtils;
