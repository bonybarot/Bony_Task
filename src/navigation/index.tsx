import {
  createNavigationContainerRef, NavigationContainer
} from '@react-navigation/native';
import React from 'react';
import GlobalComponent from './GlobalComponent';
import StackNavigation from './Type/StackNavigation';

export default function AppNavigator() {
  const navigationRef = createNavigationContainerRef();


  return (
    <NavigationContainer ref={navigationRef}>
      <GlobalComponent navigation={navigationRef}>
        <StackNavigation />
      </GlobalComponent>
    </NavigationContainer>
  );
}
