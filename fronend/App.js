import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import NewWorkout from './views/NewWorkout';
import RegisterForm from './views/Register';
import Home from './views/Home';
import LoginScreen from './views/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'New Workout') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      activeBackgroundColor: '#EFEFE6',
      inactiveBackgroundColor: '#EFEFE6',
      activeTintColor: '#04151F',
      inactiveTintColor: '#6B818C',
    })}
  >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New Workout" component={NewWorkout} />
      <Tab.Screen name="Register" component={RegisterForm} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='MyTabs'
          component={MyTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
