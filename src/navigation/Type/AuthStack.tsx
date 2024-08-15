import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StackNav } from '../NavigationKeys';
import { StackRoute } from '../NavigationRoutes';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={StackNav.LoginPage}>
      <Stack.Screen name={StackNav.LoginPage} component={StackRoute.LoginPage} />
    </Stack.Navigator>
  );
}
