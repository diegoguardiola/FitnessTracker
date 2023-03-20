import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import NewWorkout from './views/NewWorkout';
import ProfileForm from './views/Profile';
import Home from './views/Home';

const Tab = createBottomTabNavigator();

function MyTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="New Workout" component={NewWorkout} />
      <Tab.Screen name="Profile" component={ProfileForm} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
