

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Settings from "./Settings";

const Stack = createStackNavigator();

function NavigationUtils() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Setting" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationUtils;