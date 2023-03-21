import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import NewWorkout from './views/NewWorkout';
import ProfileForm from './views/Profile';
import Home from './views/Home';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeBackgroundColor: '#EFEFE6',
        inactiveBackgroundColor: '#EFEFE6',
        activeTintColor: '#04151F',
        inactiveTintColor: '#6B818C'
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New Workout" component={NewWorkout} />
      <Tab.Screen name="Profile" component={ProfileForm} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
