import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Screens 
import Dashboard from '../Screens/Dashboard';
import SplashScreen from '../Screens/SplashScreen';
import ProductDetails from '../Screens/ProductDetails';

const Stack = createStackNavigator();

const NavigationUtils = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={Dashboard} options={{ gestureEnabled: true }}>

			
			
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
				
				<Stack.Screen
					name="ProductDetails" 
					component={ProductDetails}
					options={
						{
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
