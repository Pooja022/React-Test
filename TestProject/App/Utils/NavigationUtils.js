import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Screens 
import Dashboard from '../Screens/Dashboard';
import SplashScreen from '../Screens/SplashScreen';

const Stack = createStackNavigator();

const NavigationUtils = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={SplashScreen} options={{ gestureEnabled: true }}>

			<Stack.Screen
					name="SplashScreen" 
					component={SplashScreen}
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
