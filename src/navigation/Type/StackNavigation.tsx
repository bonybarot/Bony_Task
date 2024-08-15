import React from 'react';
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';
import {createStackNavigator} from '@react-navigation/stack';

export default function StackNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Auth}>
      <Stack.Screen name={StackNav.Auth} component={StackRoute.Auth} />
      <Stack.Screen
        name={StackNav.BottomNavigationTab}
        component={StackRoute.BottomNavigationTab}
      />
    </Stack.Navigator>
  );
}
